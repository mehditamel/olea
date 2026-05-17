export const RESERVATION_STATUTS = [
  "pending_card",
  "confirmed",
  "cancelled_by_client",
  "cancelled_by_staff",
  "noshow",
  "honored",
  "expired",
] as const;

export type ReservationStatut = (typeof RESERVATION_STATUTS)[number];

export const ACTIVE_STATUTS: ReadonlyArray<ReservationStatut> = [
  "pending_card",
  "confirmed",
];

export function isActiveStatut(s: ReservationStatut): boolean {
  return ACTIVE_STATUTS.includes(s);
}
