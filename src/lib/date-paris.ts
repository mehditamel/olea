import type { Jour } from "@/types/maison";

const JOURS: readonly Jour[] = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const;

const PARIS_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
});

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

type ParisParts = { year: string; month: string; day: string; weekday: string };

function partsFromDate(date: Date): ParisParts {
  const parts = PARIS_FORMATTER.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    weekday: get("weekday"),
  };
}

export function todayIsoParis(): string {
  const p = partsFromDate(new Date());
  return `${p.year}-${p.month}-${p.day}`;
}

export function isIsoDateInPastParis(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return true;
  return iso < todayIsoParis();
}

export function jourFromIsoParis(iso: string): Jour | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const y = match[1];
  const mo = match[2];
  const d = match[3];
  if (!y || !mo || !d) return null;
  const noonUtc = new Date(
    Date.UTC(Number(y), Number(mo) - 1, Number(d), 12, 0, 0),
  );
  if (Number.isNaN(noonUtc.getTime())) return null;
  const p = partsFromDate(noonUtc);
  const idx = WEEKDAY_INDEX[p.weekday];
  if (idx === undefined) return null;
  return JOURS[idx] ?? null;
}
