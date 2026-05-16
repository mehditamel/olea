import type { Maison, Jour } from "@/types/maison";

const JOUR_INDEX: Record<number, Jour> = {
  0: "dimanche",
  1: "lundi",
  2: "mardi",
  3: "mercredi",
  4: "jeudi",
  5: "vendredi",
  6: "samedi",
};

export const JOUR_LABEL: Record<Jour, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche",
};

const ORDER: readonly Jour[] = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

export type MaisonStatus =
  | { state: "open"; closesAt: string; closingSoon: boolean }
  | {
      state: "closed";
      nextOpen: { jour: Jour; opens: string; isTomorrow: boolean } | null;
    }
  | { state: "unknown" };

type ParisNow = { jour: Jour; minutes: number };

function parisNow(now: Date): ParisNow {
  // Récupère l'heure réelle à Paris quelle que soit la TZ serveur
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "00";

  const dayMap: Record<string, Jour> = {
    Mon: "lundi",
    Tue: "mardi",
    Wed: "mercredi",
    Thu: "jeudi",
    Fri: "vendredi",
    Sat: "samedi",
    Sun: "dimanche",
  };

  return {
    jour: dayMap[weekday] ?? JOUR_INDEX[now.getDay()] ?? "lundi",
    minutes: parseInt(hour, 10) * 60 + parseInt(minute, 10),
  };
}

function toMinutes(time: string): number {
  const parts = time.split(":");
  const h = parts[0];
  const m = parts[1];
  if (!h || !m) return 0;
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}

function formatHHMM(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function nextJour(current: Jour, offset: number): Jour {
  const idx = ORDER.indexOf(current);
  const fallback = ORDER[0];
  if (idx === -1 || !fallback) return fallback ?? "lundi";
  const next = ORDER[(idx + offset) % ORDER.length];
  return next ?? fallback;
}

const CLOSING_SOON_MIN = 30;

export function getMaisonStatus(maison: Maison, now: Date): MaisonStatus {
  if (!maison.ouvert || maison.horaires.length === 0) return { state: "unknown" };

  const horairesByJour = new Map(maison.horaires.map((h) => [h.jour, h]));
  const { jour: todayJour, minutes: nowMin } = parisNow(now);

  const today = horairesByJour.get(todayJour);

  if (today) {
    for (const service of ["dejeuner", "diner"] as const) {
      const range = today[service];
      if (!range) continue;
      const parts = range.split("-");
      const opens = parts[0];
      const closes = parts[1];
      if (!opens || !closes) continue;
      const openMin = toMinutes(opens);
      const closeMin = toMinutes(closes);
      if (nowMin >= openMin && nowMin < closeMin) {
        return {
          state: "open",
          closesAt: closes,
          closingSoon: closeMin - nowMin <= CLOSING_SOON_MIN,
        };
      }
    }
  }

  for (let offset = 0; offset < 7; offset++) {
    const candidateJour = nextJour(todayJour, offset);
    const day = horairesByJour.get(candidateJour);
    if (!day) continue;
    for (const service of ["dejeuner", "diner"] as const) {
      const range = day[service];
      if (!range) continue;
      const parts = range.split("-");
      const opens = parts[0];
      if (!opens) continue;
      if (offset === 0 && toMinutes(opens) <= nowMin) continue;
      return {
        state: "closed",
        nextOpen: {
          jour: candidateJour,
          opens: formatHHMM(toMinutes(opens)),
          isTomorrow: offset === 1,
        },
      };
    }
  }

  return { state: "closed", nextOpen: null };
}
