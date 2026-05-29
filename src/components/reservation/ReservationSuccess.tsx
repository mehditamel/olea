import type { Dictionary } from "@/i18n/dictionaries";

type ReservationSuccessProps = {
  f: Dictionary["reservationForm"];
  onDismiss: () => void;
};

/** Écran de confirmation affiché après une réservation aboutie. */
export function ReservationSuccess({ f, onDismiss }: ReservationSuccessProps) {
  return (
    <div className="bg-brand-ink text-brand-cream px-8 py-12 text-center">
      <p className="eyebrow text-brand-gold mb-4">{f.successEyebrow}</p>
      <p className="font-serif text-2xl md:text-3xl mb-4">{f.successTitre}</p>
      <p className="text-sm opacity-80 max-w-md mx-auto">{f.successTexte}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="mt-8 border border-brand-cream/40 text-brand-cream px-7 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-cream hover:text-brand-ink transition-colors"
      >
        {f.successCta}
      </button>
    </div>
  );
}
