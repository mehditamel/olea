import type { ReactNode } from "react";

type ReservationDetailFieldProps = {
  label: string;
  value: ReactNode;
  full?: boolean;
};

/** Paire label / valeur d'une fiche réservation (admin). */
export function ReservationDetailField({
  label,
  value,
  full,
}: ReservationDetailFieldProps) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-[10px] uppercase tracking-[0.15em] text-brand-text-muted mb-1">
        {label}
      </div>
      <div className="text-brand-ink">{value}</div>
    </div>
  );
}
