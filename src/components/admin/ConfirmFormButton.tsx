"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type Variant = "danger" | "primary" | "neutral";

const VARIANT_CLASSES: Record<Variant, string> = {
  danger:
    "bg-red-800 text-white hover:bg-red-900 disabled:bg-red-300",
  primary:
    "bg-brand-ink text-brand-cream hover:bg-brand-olive disabled:opacity-50",
  neutral:
    "bg-brand-cream-soft text-brand-ink border border-brand-ink/20 hover:bg-brand-cream disabled:opacity-50",
};

type Props = {
  label: string;
  confirmLabel: string;
  variant?: Variant;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  hidden?: Record<string, string>;
  children?: React.ReactNode;
  successMessage?: string;
};

/**
 * Bouton qui ouvre un mini-popover de confirmation. Au submit, appelle
 * la Server Action et affiche success/erreur. Les `children` sont les
 * champs visibles dans le popover (textarea, checkbox, etc.).
 */
export function ConfirmFormButton({
  label,
  confirmLabel,
  variant = "primary",
  action,
  hidden,
  children,
  successMessage = "Action effectuée.",
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2">
        {successMessage}
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors",
          VARIANT_CLASSES[variant],
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <form
      className="border border-brand-ink/20 bg-white p-4 space-y-3"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const result = await action(formData);
          if (result.ok) {
            setDone(true);
            setOpen(false);
          } else {
            setError(result.error ?? "Erreur inconnue.");
          }
        });
      }}
    >
      {hidden &&
        Object.entries(hidden).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}
      {children}
      {error && (
        <p className="text-xs text-red-800 bg-red-50 border border-red-200 px-3 py-2">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors",
            VARIANT_CLASSES[variant],
          )}
        >
          {pending ? "..." : confirmLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          disabled={pending}
          className="px-4 py-2 text-[11px] uppercase tracking-[0.2em] border border-brand-ink/20 hover:bg-brand-cream-soft"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
