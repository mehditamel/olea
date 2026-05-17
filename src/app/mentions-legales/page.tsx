import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { maisons } from "@/data/maisons";

// À COMPLÉTER avant publication : forme juridique, capital social, siège social,
// RCS, SIRET, n° TVA intra, directeur de publication, hébergeur (nom/adresse/tél),
// médiateur de la consommation désigné, crédits photo.

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Maison Oléa : éditeur, hébergeur, propriété intellectuelle, protection des données personnelles, cookies et médiation de la consommation.",
  alternates: { canonical: absoluteUrl("/mentions-legales") },
  robots: { index: true, follow: true },
};

const maisonPrincipale = maisons[0];

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/mentions-legales", label: "Mentions légales" },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">Informations légales</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Mentions{" "}
            <span className="italic text-brand-gold-light">légales.</span>
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-80">
            Dernière mise à jour : 17 mai 2026.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
        <article className="mx-auto max-w-3xl text-brand-ink text-[15px] md:text-base leading-[1.75]">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-0 mb-4">
            1. Éditeur du site
          </h2>
          <p className="mb-4">
            Le présent site <strong>olea-restaurant.fr</strong> est édité par{" "}
            <strong>Maison Oléa</strong>, [forme juridique à compléter] au
            capital social de [montant] €.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Siège social : [adresse complète à compléter]</li>
            <li>RCS : [Ville] [numéro à compléter]</li>
            <li>SIRET : [14 chiffres à compléter]</li>
            <li>N° TVA intracommunautaire : [FR… à compléter]</li>
            <li>Directeur de la publication : [nom à compléter]</li>
            <li>
              Contact :{" "}
              <a
                href="mailto:contact@olea-restaurant.fr"
                className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
              >
                contact@olea-restaurant.fr
              </a>{" "}
              — Téléphone :{" "}
              <a
                href={`tel:${maisonPrincipale?.telephone ?? ""}`}
                className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
              >
                {maisonPrincipale?.telephoneAffichage ?? ""}
              </a>
            </li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            2. Hébergeur
          </h2>
          <p className="mb-6">
            Le site est hébergé par <strong>[Nom de l&apos;hébergeur]</strong>,{" "}
            [adresse complète], téléphone : [numéro].
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            3. Propriété intellectuelle
          </h2>
          <p className="mb-4">
            La marque «&nbsp;Maison Oléa&nbsp;», le logo, l&apos;identité
            visuelle, les textes, photographies, illustrations et l&apos;ensemble
            des éléments composant le site sont la propriété exclusive de Maison
            Oléa ou de ses partenaires, et sont protégés par les lois françaises
            et internationales relatives à la propriété intellectuelle.
          </p>
          <p className="mb-6">
            Toute reproduction, représentation, modification, publication ou
            adaptation, totale ou partielle, par quelque procédé que ce soit,
            est interdite sans autorisation écrite préalable de Maison Oléa.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            4. Crédits
          </h2>
          <p className="mb-6">
            Direction artistique, photographies et rédaction : [à compléter].
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            5. Protection des données personnelles
          </h2>
          <p className="mb-4">
            Conformément au Règlement Général sur la Protection des Données
            (Règlement UE 2016/679, dit «&nbsp;RGPD&nbsp;») et à la loi
            «&nbsp;Informatique et Libertés&nbsp;» du 6&nbsp;janvier 1978
            modifiée, Maison Oléa s&apos;engage à protéger les données
            personnelles des utilisateurs du site.
          </p>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            Données collectées
          </h3>
          <p className="mb-4">
            Les données suivantes sont susceptibles d&apos;être collectées via
            les formulaires du site :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>
              Formulaire de réservation (<code>/reserver</code>) : nom, e-mail,
              téléphone, date et heure souhaitées, nombre de convives,
              occasion, demandes particulières.
            </li>
            <li>
              Formulaire de privatisation (<code>/privatisation</code>) : nom,
              e-mail, téléphone, maison choisie, type d&apos;événement, nombre
              de convives, date envisagée, message.
            </li>
          </ul>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            Finalités et base légale
          </h3>
          <p className="mb-4">
            Ces données sont collectées dans le seul but de traiter votre
            demande&nbsp;: confirmer une réservation, élaborer un devis de
            privatisation, ou répondre à un message. La base légale de ce
            traitement est l&apos;exécution de mesures précontractuelles prises
            à votre demande (art. 6.1.b du RGPD).
          </p>
          <p className="mb-4">
            <strong>
              Vos données ne sont utilisées à aucune fin commerciale ou
              publicitaire et ne sont jamais cédées à des tiers.
            </strong>
          </p>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            Destinataires
          </h3>
          <p className="mb-4">
            Seules les personnes habilitées au sein de Maison Oléa ont accès à
            vos données. L&apos;acheminement des e-mails est assuré par notre
            prestataire <strong>Resend</strong> (Resend, Inc., États-Unis) ; le
            transfert hors UE est encadré par les clauses contractuelles types
            adoptées par la Commission européenne.
          </p>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            Durée de conservation
          </h3>
          <p className="mb-4">
            Les données sont conservées <strong>12&nbsp;mois</strong> à compter
            du dernier échange, sauf demande de suppression antérieure de votre
            part ou obligation légale de conservation plus longue.
          </p>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            Vos droits
          </h3>
          <p className="mb-4">
            Vous disposez d&apos;un droit d&apos;accès, de rectification,
            d&apos;effacement, d&apos;opposition, de portabilité et de
            limitation du traitement de vos données. Pour exercer ces droits,
            écrivez-nous à{" "}
            <a
              href="mailto:contact@olea-restaurant.fr"
              className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
            >
              contact@olea-restaurant.fr
            </a>{" "}
            en justifiant de votre identité.
          </p>
          <p className="mb-6">
            En cas de litige non résolu, vous pouvez introduire une réclamation
            auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
            >
              Commission Nationale de l&apos;Informatique et des Libertés
              (CNIL)
            </a>
            .
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            6. Cookies
          </h2>
          <p className="mb-4">
            Le site <strong>n&apos;utilise aucun cookie</strong> de mesure
            d&apos;audience, de traçage publicitaire ou de réseaux sociaux.
          </p>
          <p className="mb-6">
            Un cookie technique lié au <em>service worker</em> peut être déposé
            par votre navigateur pour permettre le fonctionnement hors-ligne du
            site (application web progressive). Ce cookie est strictement
            nécessaire au service demandé et ne requiert pas de consentement
            préalable (art. 82 de la loi Informatique et Libertés).
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            7. Médiation de la consommation
          </h2>
          <p className="mb-4">
            Conformément à l&apos;article L.616-1 du Code de la consommation,
            en cas de litige relatif à une réservation ou à une prestation, le
            client consommateur peut recourir gratuitement à un médiateur de la
            consommation&nbsp;: <strong>[Nom du médiateur désigné]</strong>,
            [adresse], [site web].
          </p>
          <p className="mb-6">
            Les consommateurs résidant dans l&apos;Union européenne peuvent
            également utiliser la plateforme européenne de règlement en ligne
            des litiges&nbsp;:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors break-all"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            8. Loi applicable
          </h2>
          <p className="mb-10">
            Les présentes mentions légales sont régies par le droit français.
            En cas de litige, et à défaut de résolution amiable, les tribunaux
            français seront seuls compétents.
          </p>

          <div className="border-t border-brand-ink/15 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/cgu"
              className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 hover:text-brand-olive-deep transition-colors w-fit"
            >
              Lire nos CGU →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-7 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors w-fit"
            >
              Nous contacter
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
