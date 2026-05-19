import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaisonBySlug } from "@/data/maisons";
import { findReservationByToken } from "@/lib/reservation/repository";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { cancelReservationAction } from "./actions";

export const metadata: Metadata = {
  title: "Annuler ma réservation",
  description: "Annulez votre réservation Maison Oléa.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TOKEN_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function CancelReservationPage({
  params,
  searchParams,
}: PageProps) {
  const { token } = await params;
  const sp = await searchParams;
  if (!TOKEN_REGEX.test(token)) notFound();

  const status = typeof sp.status === "string" ? sp.status : undefined;
  const error = typeof sp.error === "string" ? sp.error : undefined;

  if (!isSupabaseConfigured()) {
    return <Layout>
      <Title>Service indisponible</Title>
      <Body>L&apos;annulation en ligne n&apos;est pas configurée. Contactez-nous directement.</Body>
    </Layout>;
  }

  const reservation = await findReservationByToken(token);
  if (!reservation) notFound();

  const maison = getMaisonBySlug(reservation.maison_slug);
  const heureLisible = reservation.heure.slice(0, 5).replace(":", "h");
  const dateLisible = new Date(reservation.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isCancelled =
    reservation.statut === "cancelled_by_client" ||
    reservation.statut === "cancelled_by_staff";
  const isFinalized =
    reservation.statut === "noshow" ||
    reservation.statut === "honored" ||
    reservation.statut === "expired";

  return (
    <Layout>
      <p className="eyebrow text-brand-olive mb-4">Annulation</p>
      <Title>
        {status === "done"
          ? "Réservation annulée."
          : isCancelled
            ? "Réservation déjà annulée."
            : isFinalized
              ? "Cette réservation ne peut plus être annulée en ligne."
              : "Confirmer l'annulation"}
      </Title>

      <div className="bg-brand-cream-soft border border-brand-ink/10 p-6 my-8 text-sm">
        <p className="font-serif text-xl text-brand-ink mb-3">
          {maison?.nom ?? reservation.maison_slug}
        </p>
        <ul className="space-y-1 text-brand-text-muted">
          <li><strong className="text-brand-ink">Date :</strong> {dateLisible}</li>
          <li><strong className="text-brand-ink">Heure :</strong> {heureLisible}</li>
          <li><strong className="text-brand-ink">Convives :</strong> {reservation.convives}</li>
          <li><strong className="text-brand-ink">Au nom de :</strong> {reservation.nom}</li>
        </ul>
      </div>

      {error === "server" && (
        <p role="alert" className="text-red-700 text-sm mb-4">
          Une erreur est survenue. Réessayez ou contactez-nous.
        </p>
      )}
      {error === "finalized" && (
        <p role="alert" className="text-red-700 text-sm mb-4">
          Cette réservation ne peut plus être annulée en ligne.
        </p>
      )}

      {status === "done" || isCancelled ? (
        <Body>
          Si vous avez besoin de reprogrammer, vous pouvez{" "}
          <Link
            href="/reserver"
            className="underline decoration-brand-olive underline-offset-4 hover:text-brand-ink"
          >
            réserver une nouvelle table
          </Link>
          .
        </Body>
      ) : isFinalized ? (
        <Body>
          Contactez la maison au{" "}
          <a
            href={`tel:${maison?.telephone ?? ""}`}
            className="underline decoration-brand-olive"
          >
            {maison?.telephoneAffichage ?? ""}
          </a>{" "}
          pour toute question.
        </Body>
      ) : (
        <form
          action={async () => {
            "use server";
            await cancelReservationAction(token);
          }}
        >
          <p className="text-brand-text-muted text-sm mb-6">
            L&apos;annulation est gratuite jusqu&apos;à 24h avant le service. Au-delà,
            une éventuelle empreinte de carte pourrait être débitée.
          </p>
          <button
            type="submit"
            className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
          >
            Confirmer l&apos;annulation
          </button>
          <Link
            href="/"
            className="ml-4 text-sm text-brand-text-muted hover:text-brand-ink underline underline-offset-4"
          >
            Garder ma réservation
          </Link>
        </form>
      )}
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-brand-cream min-h-screen px-6 md:px-12 pt-40 pb-24">
      <div className="mx-auto max-w-2xl">{children}</div>
    </main>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-serif font-normal text-3xl md:text-4xl text-brand-ink leading-tight">
      {children}
    </h1>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-brand-text-muted text-sm leading-relaxed">{children}</p>;
}
