import type { ReactNode } from "react";

type AdminFieldProps = {
  label: string;
  children: ReactNode;
};

/** Champ de formulaire admin : label en capitales + contrôle. */
export function AdminField({ label, children }: AdminFieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-[0.15em] text-brand-text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
