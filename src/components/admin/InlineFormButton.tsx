"use client";

import { useTransition } from "react";

type Props = {
  label: string;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  hidden: Record<string, string>;
  variant?: "danger" | "neutral";
  className?: string;
};

/**
 * Bouton "destructif" sans popover : utile pour delete simple (override,
 * blocage). Pas de confirm — l'action est légère et réversible.
 */
export function InlineFormButton({
  label,
  action,
  hidden,
  variant = "neutral",
  className,
}: Props) {
  const [pending, startTransition] = useTransition();
  const cls =
    variant === "danger"
      ? "text-red-800 hover:text-red-900"
      : "text-brand-olive hover:underline";
  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await action(formData);
        });
      }}
      className="inline"
    >
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <button
        type="submit"
        disabled={pending}
        className={`text-xs ${cls} disabled:opacity-50 ${className ?? ""}`}
      >
        {pending ? "..." : label}
      </button>
    </form>
  );
}
