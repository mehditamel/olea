"use client";

import { useState, useTransition } from "react";

type Props = {
  maisonSlug: string;
  service: "dejeuner" | "diner";
  jour: string;
  initial: number | null;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
};

/**
 * Input editable de couverts_max pour une cellule (maison, service, jour).
 * Sauve via Server Action au blur (si la valeur a changé).
 */
export function CapaciteInput({
  maisonSlug,
  service,
  jour,
  initial,
  action,
}: Props) {
  const [value, setValue] = useState<string>(
    initial === null ? "" : String(initial),
  );
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<"saved" | "error" | null>(null);

  return (
    <form
      action={(formData) => {
        setFeedback(null);
        startTransition(async () => {
          const result = await action(formData);
          setFeedback(result.ok ? "saved" : "error");
          window.setTimeout(() => setFeedback(null), 1500);
        });
      }}
      className="flex items-center gap-1"
    >
      <input type="hidden" name="maison_slug" value={maisonSlug} />
      <input type="hidden" name="service" value={service} />
      <input type="hidden" name="jour" value={jour} />
      <input
        type="number"
        name="couverts_max"
        min={0}
        max={500}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          const newVal = e.target.value;
          if (newVal === "" || newVal === String(initial ?? "")) return;
          (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
        }}
        disabled={pending}
        className="w-16 border border-brand-ink/20 bg-white px-2 py-1 text-sm disabled:opacity-50"
      />
      {feedback === "saved" && (
        <span className="text-emerald-700 text-xs">✓</span>
      )}
      {feedback === "error" && (
        <span className="text-red-700 text-xs">✗</span>
      )}
    </form>
  );
}
