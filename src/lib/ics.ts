type IcsInput = {
  uid: string;
  summary: string;
  description: string;
  location: string;
  startIso: string;
  heure: string;
  durationMinutes: number;
  organizerEmail: string;
  attendeeEmail: string;
};

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function toIcsUtc(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

function toIcsLocalParis(isoDate: string, heure: string): string {
  return `${isoDate.replace(/-/g, "")}T${heure.replace(":", "")}00`;
}

function addMinutesToLocal(isoDate: string, heure: string, minutes: number): string {
  const [yStr, moStr, dStr] = isoDate.split("-");
  const [hStr, miStr] = heure.split(":");
  const y = Number(yStr);
  const mo = Number(moStr);
  const d = Number(dStr);
  const h = Number(hStr);
  const mi = Number(miStr);
  const totalMin = h * 60 + mi + minutes;
  const addDays = Math.floor(totalMin / (24 * 60));
  const remaining = ((totalMin % (24 * 60)) + 24 * 60) % (24 * 60);
  const endHour = Math.floor(remaining / 60);
  const endMin = remaining % 60;
  const endDate = new Date(Date.UTC(y, mo - 1, d + addDays));
  return `${endDate.getUTCFullYear()}${pad(endDate.getUTCMonth() + 1)}${pad(endDate.getUTCDate())}T${pad(endHour)}${pad(endMin)}00`;
}

/**
 * Génère un fichier .ics minimal avec TZID=Europe/Paris pour les heures locales,
 * encodé en CRLF conformément à la RFC 5545.
 */
export function buildReservationIcs(input: IcsInput): {
  filename: string;
  contentBase64: string;
} {
  const dtstamp = toIcsUtc(new Date());
  const dtstart = toIcsLocalParis(input.startIso, input.heure);
  const dtend = addMinutesToLocal(input.startIso, input.heure, input.durationMinutes);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maison Olea//Reservation//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${input.uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Paris:${dtstart}`,
    `DTEND;TZID=Europe/Paris:${dtend}`,
    `SUMMARY:${escapeIcsText(input.summary)}`,
    `DESCRIPTION:${escapeIcsText(input.description)}`,
    `LOCATION:${escapeIcsText(input.location)}`,
    `ORGANIZER:mailto:${input.organizerEmail}`,
    `ATTENDEE;CN=${escapeIcsText(input.attendeeEmail)};RSVP=TRUE:mailto:${input.attendeeEmail}`,
    "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const content = lines.join("\r\n") + "\r\n";
  return {
    filename: `reservation-olea-${input.startIso}.ics`,
    contentBase64: Buffer.from(content, "utf8").toString("base64"),
  };
}
