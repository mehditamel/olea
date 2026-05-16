import type { Horaire, Jour, Maison } from "@/types/maison";
import type { Service } from "@/types/reservation";
import { isIsoDateInPastParis, jourFromIsoParis } from "./date-paris";

const SLOT_STEP_MIN = 30;
const MIN_DINING_MIN = 60;

export type Slot = { value: string; label: string; service: Service };

function parseRange(range: string): { start: number; end: number } | null {
  const match = /^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/.exec(range);
  if (!match) return null;
  const sh = match[1];
  const sm = match[2];
  const eh = match[3];
  const em = match[4];
  if (!sh || !sm || !eh || !em) return null;
  return {
    start: Number(sh) * 60 + Number(sm),
    end: Number(eh) * 60 + Number(em),
  };
}

function formatMinutes(total: number): string {
  const h = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const m = (total % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function buildSlots(range: string | null, service: Service): Slot[] {
  if (!range) return [];
  const parsed = parseRange(range);
  if (!parsed) return [];
  const lastStart = parsed.end - MIN_DINING_MIN;
  const slots: Slot[] = [];
  for (let t = parsed.start; t <= lastStart; t += SLOT_STEP_MIN) {
    const value = formatMinutes(t);
    slots.push({
      value,
      label: value.replace(":", "h"),
      service,
    });
  }
  return slots;
}

export function getJourFromIsoDate(isoDate: string): Jour | null {
  return jourFromIsoParis(isoDate);
}

export function isMaisonClosedOn(maison: Maison, isoDate: string): boolean {
  return maison.fermeturesExceptionnelles?.includes(isoDate) ?? false;
}

export function getHoraireForDate(
  maison: Maison,
  isoDate: string,
): Horaire | null {
  if (isMaisonClosedOn(maison, isoDate)) return null;
  const jour = getJourFromIsoDate(isoDate);
  if (!jour) return null;
  return maison.horaires.find((h) => h.jour === jour) ?? null;
}

export function getSlotsForDate(maison: Maison, isoDate: string): Slot[] {
  if (isIsoDateInPastParis(isoDate)) return [];
  const horaire = getHoraireForDate(maison, isoDate);
  if (!horaire) return [];
  return [
    ...buildSlots(horaire.dejeuner, "dejeuner"),
    ...buildSlots(horaire.diner, "diner"),
  ];
}

export function getServiceForSlot(
  maison: Maison,
  isoDate: string,
  heure: string,
): Service | null {
  const slots = getSlotsForDate(maison, isoDate);
  return slots.find((s) => s.value === heure)?.service ?? null;
}
