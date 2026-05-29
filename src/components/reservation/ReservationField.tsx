import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

type ReservationFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/** Champ de formulaire : label + contenu + indice ou message d'erreur. */
export function ReservationField({
  label,
  error,
  hint,
  children,
  className,
}: ReservationFieldProps) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-brand-text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
