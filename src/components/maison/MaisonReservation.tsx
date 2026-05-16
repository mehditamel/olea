import Link from "next/link";
import type { Maison } from "@/types/maison";

export function MaisonReservation({ maison }: { maison: Maison }) {
  if (!maison.ouvert) {
    return (
      <section className="bg-brand-cream px-6 md:px-12 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl border-t border-brand-ink/15 pt-14 md:pt-16 text-center">
          <p className="eyebrow text-brand-olive mb-4">Bientôt</p>
          <p className="font-serif italic text-2xl md:text-3xl text-brand-ink mb-6">
            Cette maison ouvrira ses portes prochainement.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
          >
            Être tenu informé
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-cream px-6 md:px-12 pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl border-t border-brand-ink/15 pt-14 md:pt-16 text-center">
        <p className="eyebrow text-brand-olive mb-4">Réserver à {maison.nom}</p>
        <h2 className="font-serif text-3xl md:text-4xl mb-7 text-brand-ink">
          Une table vous attend.
        </h2>
        <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {maison.reservationUrl ? (
            <a
              href={maison.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              Réserver en ligne
            </a>
          ) : null}
          <a
            href={`tel:${maison.telephone}`}
            className="border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
          >
            {maison.telephoneAffichage}
          </a>
        </div>
      </div>
    </section>
  );
}
