import type { Metadata } from "next";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { maisons } from "@/data/maisons";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Réserver une table",
  description:
    "Réservez votre table dans nos trois maisons Oléa — Marseille, Cassis, Villeneuve-Loubet. Confirmation rapide par notre équipe.",
  alternates: { canonical: absoluteUrl("/reserver") },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawMaison = params.maison;
  const defaultMaison = Array.isArray(rawMaison) ? rawMaison[0] : rawMaison;
  const maisonsOuvertes = maisons.filter((m) => m.ouvert);

  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-gold mb-5">Réserver</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Une table vous attend,{" "}
            <span className="italic text-brand-gold-light">
              chez Oléa.
            </span>
          </h1>
          <p className="mt-7 font-serif italic text-lg md:text-xl opacity-90 max-w-2xl">
            Réservez votre table dans l&apos;une de nos trois maisons. Notre
            équipe vous confirme votre venue dans la journée.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-brand-olive mb-4">Votre réservation</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-10 text-brand-ink">
            Choisissez votre maison, votre date et votre heure.
          </h2>
          <ReservationForm defaultMaison={defaultMaison} />
        </div>
      </section>

      <section className="bg-brand-cream-soft px-6 md:px-12 py-14 md:py-16 border-t border-brand-ink/10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-olive mb-6 text-center">
            Préférez le téléphone ?
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {maisonsOuvertes.map((maison) => (
              <li key={maison.slug} className="text-center">
                <p className="font-serif text-2xl text-brand-ink mb-2">
                  {maison.nom}
                </p>
                <p className="text-sm text-brand-text-muted mb-3">
                  {maison.adresse} · {maison.ville}
                </p>
                <a
                  href={`tel:${maison.telephone}`}
                  className="font-serif text-xl text-brand-ink border-b border-brand-olive pb-1 hover:text-brand-olive transition-colors"
                >
                  {maison.telephoneAffichage}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
