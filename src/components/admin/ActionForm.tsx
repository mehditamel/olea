"use client";

import { useTransition, useState, useRef } from "react";

type Props = {
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  className?: string;
  children: React.ReactNode;
  /** Reset le form au succès. */
  resetOnSuccess?: boolean;
};

/**
 * Wrapper de form qui appelle une Server Action retournant `{ ok, error }`.
 * Affiche un message d'erreur sous le form en cas d'échec.
 */
export function ActionForm({
  action,
  className,
  children,
  resetOnSuccess = true,
}: Props) {
  const ref = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <form
        ref={ref}
        action={(formData) => {
          setError(null);
          startTransition(async () => {
            const result = await action(formData);
            if (!result.ok) {
              setError(result.error ?? "Erreur inconnue.");
            } else if (resetOnSuccess) {
              ref.current?.reset();
            }
          });
        }}
        className={className}
        aria-busy={pending}
      >
        {children}
      </form>
      {error && (
        <p className="text-xs text-red-800 bg-red-50 border border-red-200 px-3 py-2 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
