import Link from "next/link";
import { maisons } from "@/data/maisons";

export function PrivatReservSection() {
  return (
    <section
      id="privatisation"
      className="bg-brand-cream px-6 md:px-12 pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-0 md:gap-0 items-stretch pt-16 md:pt-20 border-t border-brand-ink/15">
        <div className="md:pr-14 pb-12 md:pb-0">
          <p className="eyebrow text-brand-olive mb-5">
            Privatisation & événements
          </p>
          <h2 className="font-serif font-normal text-4xl md:text-[42px] leading-[1.1] tracking-[-0.5px] mb-6 text-brand-ink">
            Vos célébrations,{" "}
            <span className="italic">à notre table.</span>
          </h2>
          <p className="text-[15px] leading-[1.85] text-[#4A4232] mb-8 max-w-[460px]">
            Anniversaires, repas d&apos;affaires, mariages, séminaires. Nos
            trois maisons accueillent vos événements avec des menus
            sur-mesure, dans un cadre chaleureux inspiré du Sud.
          </p>
          <Link
            href="/privatisation"
            className="inline-block bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
          >
            Demander un devis
          </Link>
        </div>

        <div
          id="reserver"
          className="bg-brand-ink text-brand-cream p-8 md:p-11"
        >
          <p className="eyebrow text-brand-gold mb-2">Réserver maintenant</p>
          <ul className="flex flex-col gap-5 mt-6">
            {maisons.map((maison, idx) => {
              const last = idx === maisons.length - 1;
              const content = (
                <>
                  <span className="font-serif text-[22px]">{maison.nom}</span>
                  <span
                    className={`text-[11px] uppercase tracking-[0.18em] ${
                      maison.ouvert ? "opacity-70" : "text-brand-gold"
                    }`}
                  >
                    {maison.ouvert
                      ? `${maison.telephoneAffichage} →`
                      : "Bientôt →"}
                  </span>
                </>
              );

              return (
                <li
                  key={maison.slug}
                  className={
                    last
                      ? ""
                      : "border-b border-brand-cream/15 pb-5"
                  }
                >
                  {maison.ouvert ? (
                    <a
                      href={`tel:${maison.telephone}`}
                      className="flex items-center justify-between hover:opacity-80 transition-opacity"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
