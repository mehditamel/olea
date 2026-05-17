import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { maisons } from "@/data/maisons";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description:
    "Conditions Générales d'Utilisation du site Maison Oléa : usage du site, statut des demandes de réservation et devis, propriété intellectuelle, responsabilité.",
  alternates: { canonical: absoluteUrl("/cgu") },
  robots: { index: true, follow: true },
};

export default function CguPage() {
  return (
    <>
      <section className="bg-brand-ink text-brand-cream px-6 md:px-12 pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            variant="light"
            className="mb-6"
            items={[
              { href: "/", label: "Accueil" },
              { href: "/cgu", label: "CGU" },
            ]}
          />
          <p className="eyebrow text-brand-gold mb-5">Conditions d&apos;utilisation</p>
          <h1 className="font-serif font-normal text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-1px] max-w-3xl">
            Conditions générales{" "}
            <span className="italic text-brand-gold-light">d&apos;utilisation.</span>
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-80">
            Dernière mise à jour : 17 mai 2026.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream px-6 md:px-12 py-14 md:py-20">
        <article className="mx-auto max-w-3xl text-brand-ink text-[15px] md:text-base leading-[1.75]">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-0 mb-4">
            1. Objet
          </h2>
          <p className="mb-6">
            Les présentes Conditions Générales d&apos;Utilisation (ci-après
            «&nbsp;CGU&nbsp;») ont pour objet de définir les modalités et
            conditions d&apos;utilisation du site{" "}
            <strong>olea-restaurant.fr</strong> (ci-après le «&nbsp;Site&nbsp;»),
            édité par Maison Oléa. Le Site présente les trois maisons Oléa et
            permet aux visiteurs (ci-après l&apos;«&nbsp;Utilisateur&nbsp;») de
            soumettre des demandes de réservation et des demandes de devis pour
            une privatisation.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            2. Acceptation des CGU
          </h2>
          <p className="mb-4">
            L&apos;accès et l&apos;utilisation du Site emportent acceptation
            pleine et entière des présentes CGU. Si l&apos;Utilisateur
            n&apos;accepte pas tout ou partie des CGU, il lui appartient de ne
            pas utiliser le Site.
          </p>
          <p className="mb-6">
            Maison Oléa se réserve le droit de modifier les CGU à tout moment.
            La version applicable est celle en vigueur sur le Site au moment de
            son utilisation par l&apos;Utilisateur.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            3. Services proposés
          </h2>
          <p className="mb-4">
            Le Site propose les services suivants&nbsp;:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>
              Présentation des trois maisons Oléa —{" "}
              {maisons.map((m, idx) => (
                <span key={m.slug}>
                  {m.nom}
                  {idx < maisons.length - 2
                    ? ", "
                    : idx === maisons.length - 2
                      ? " et "
                      : ""}
                </span>
              ))}
              &nbsp;— avec leurs adresses, horaires, photographies et
              suggestions de carte.
            </li>
            <li>
              Soumission d&apos;une <strong>demande de réservation</strong> via
              le formulaire <code>/reserver</code>.
            </li>
            <li>
              Soumission d&apos;une <strong>demande de devis</strong> pour la
              privatisation d&apos;une maison via le formulaire{" "}
              <code>/privatisation</code>.
            </li>
            <li>Coordonnées de contact direct (e-mail et téléphone).</li>
          </ul>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            3.1 Statut des demandes de réservation
          </h3>
          <p className="mb-4">
            La soumission du formulaire de réservation constitue une{" "}
            <strong>demande</strong> de l&apos;Utilisateur, et non une
            réservation ferme. <strong>Aucune table n&apos;est garantie</strong>{" "}
            à la simple réception du formulaire. La réservation n&apos;est
            effective qu&apos;après confirmation expresse de Maison Oléa, par
            e-mail ou par téléphone, dans la limite des disponibilités.
          </p>
          <p className="mb-6">
            Toute demande de modification ou d&apos;annulation doit être
            communiquée à Maison Oléa par téléphone ou par e-mail dans un délai
            raisonnable, et idéalement au moins 24&nbsp;heures avant
            l&apos;heure prévue. Aucune transaction financière n&apos;est
            effectuée via le Site lors de la demande&nbsp;: aucun moyen de
            paiement n&apos;est demandé ni prélevé.
          </p>

          <h3 className="font-serif text-xl md:text-2xl text-brand-ink mt-6 mb-3">
            3.2 Statut des demandes de devis (privatisation)
          </h3>
          <p className="mb-6">
            Le formulaire de privatisation permet à l&apos;Utilisateur de
            transmettre une demande d&apos;information en vue de privatiser
            tout ou partie d&apos;une maison. Le devis qui pourra lui être
            adressé par Maison Oléa à la suite de cette demande est un document
            <strong> non contractuel jusqu&apos;à sa signature</strong> par les
            deux parties. Les conditions tarifaires, modalités de versement
            d&apos;un éventuel acompte, conditions d&apos;annulation et de
            modification de l&apos;événement seront définies au cas par cas
            dans le devis signé.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            4. Tarifs
          </h2>
          <p className="mb-6">
            Les prix des plats et boissons sont affichés en salle dans chaque
            maison (carte papier), exprimés en euros et toutes taxes comprises
            (TVA en vigueur incluse). Ils sont susceptibles d&apos;évoluer en
            fonction des saisons et des arrivages.{" "}
            <strong>Aucune transaction monétaire n&apos;est conclue via le
            Site.</strong> Le règlement s&apos;effectue exclusivement sur place
            ou, pour les événements privatisés, selon les modalités précisées
            dans le devis signé.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            5. Propriété intellectuelle
          </h2>
          <p className="mb-6">
            L&apos;ensemble du contenu du Site est protégé par les droits de
            propriété intellectuelle. Les modalités sont détaillées dans nos{" "}
            <Link
              href="/mentions-legales"
              className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
            >
              mentions légales
            </Link>
            .
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            6. Données personnelles
          </h2>
          <p className="mb-6">
            Les modalités de collecte, de traitement et de conservation des
            données personnelles, ainsi que les droits dont dispose
            l&apos;Utilisateur, sont décrits dans nos{" "}
            <Link
              href="/mentions-legales"
              className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
            >
              mentions légales
            </Link>
            .
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            7. Disponibilité du Site
          </h2>
          <p className="mb-6">
            Maison Oléa met en œuvre les moyens raisonnables pour assurer la
            disponibilité du Site 24&nbsp;heures sur 24 et 7&nbsp;jours sur 7.
            Des interruptions peuvent toutefois survenir, notamment pour des
            opérations de maintenance, des mises à jour, ou en raison de causes
            extérieures (panne de l&apos;hébergeur, force majeure, attaque
            informatique, etc.). La responsabilité de Maison Oléa ne saurait
            être engagée à ce titre.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            8. Liens externes
          </h2>
          <p className="mb-6">
            Le Site peut contenir des liens vers des sites tiers (réseaux
            sociaux, cartographie, etc.). Maison Oléa n&apos;exerce aucun
            contrôle sur ces sites et ne saurait être tenue responsable de leur
            contenu, de leur politique de confidentialité ou de leur
            disponibilité.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            9. Comportement de l&apos;Utilisateur
          </h2>
          <p className="mb-4">
            L&apos;Utilisateur s&apos;engage à utiliser le Site de manière
            loyale et conforme à sa destination. Sont notamment interdits&nbsp;:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>
              toute tentative d&apos;intrusion ou d&apos;atteinte à
              l&apos;intégrité du Site&nbsp;;
            </li>
            <li>
              l&apos;extraction massive et automatisée de données
              (<em>scraping</em>)&nbsp;;
            </li>
            <li>
              la soumission de formulaires de manière automatisée ou
              frauduleuse&nbsp;;
            </li>
            <li>
              l&apos;envoi de contenus injurieux, diffamatoires, ou portant
              atteinte aux droits de tiers via les champs libres des
              formulaires.
            </li>
          </ul>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            10. Loi applicable et juridiction
          </h2>
          <p className="mb-6">
            Les présentes CGU sont régies par le droit français. En cas de
            litige et à défaut de résolution amiable ou de médiation (voir nos
            mentions légales), les tribunaux français seront seuls compétents.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl text-brand-ink mt-10 mb-4">
            11. Contact
          </h2>
          <p className="mb-10">
            Pour toute question relative aux présentes CGU, vous pouvez nous
            écrire à{" "}
            <a
              href="mailto:contact@olea-restaurant.fr"
              className="underline decoration-brand-olive underline-offset-4 hover:text-brand-olive transition-colors"
            >
              contact@olea-restaurant.fr
            </a>
            .
          </p>

          <div className="border-t border-brand-ink/15 pt-8 mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/mentions-legales"
              className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-brand-olive border-b border-brand-olive pb-1 hover:text-brand-olive-deep transition-colors w-fit"
            >
              Lire les mentions légales →
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
