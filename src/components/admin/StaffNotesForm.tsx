"use client";

import { useState, useTransition } from "react";

type Props = {
  reservationId: string;
  initial: string;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
};

export function StaffNotesForm({ reservationId, initial, action }: Props) {
  const [notes, setNotes] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<
    { kind: "success" | "error"; message: string } | null
  >(null);

  return (
    <form
      className="space-y-3"
      action={(formData) => {
        setFeedback(null);
        startTransition(async () => {
          const result = await action(formData);
          setFeedback(
            result.ok
              ? { kind: "success", message: "Notes enregistrées." }
              : {
                  kind: "error",
                  message: result.error ?? "Erreur inconnue.",
                },
          );
        });
      }}
    >
      <input type="hidden" name="id" value={reservationId} />
      <textarea
        name="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        maxLength={2000}
        placeholder="Allergies, table préférée, anniversaire surprise, etc."
        className="w-full border border-brand-ink/20 bg-white px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-brand-ink text-brand-cream px-5 py-2 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-50"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        {feedback && (
          <span
            className={
              feedback.kind === "success"
                ? "text-xs text-emerald-800"
                : "text-xs text-red-800"
            }
          >
            {feedback.message}
          </span>
        )}
      </div>
    </form>
  );
}
