type Props = {
  onReset: () => void;
  cardConfirmed?: boolean;
};

export function ReservationSuccessScreen({ onReset, cardConfirmed }: Props) {
  return (
    <div className="bg-brand-ink text-brand-cream px-8 py-12 text-center">
      <p className="eyebrow text-brand-gold mb-4">
        {cardConfirmed ? "Réservation confirmée" : "Demande envoyée"}
      </p>
      <p className="font-serif text-2xl md:text-3xl mb-4">
        {cardConfirmed
          ? "Votre table est garantie. Merci."
          : "Nous confirmons votre table très vite."}
      </p>
      <p className="text-sm opacity-80 max-w-md mx-auto">
        Un email de récap (avec invitation calendrier) vient de vous être
        envoyé. {cardConfirmed
          ? "L'empreinte de votre carte ne sera débitée qu'en cas d'absence non signalée."
          : "Notre équipe vous recontacte sous quelques heures pour confirmer le créneau."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 border border-brand-cream/40 text-brand-cream px-7 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-cream hover:text-brand-ink transition-colors"
      >
        Nouvelle réservation
      </button>
    </div>
  );
}
