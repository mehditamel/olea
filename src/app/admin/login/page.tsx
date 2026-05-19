import type { Metadata } from "next";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { requestMagicLinkAction } from "./actions";

export const metadata: Metadata = {
  title: "Connexion équipe",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const ERROR_MESSAGES: Record<string, string> = {
  email: "Adresse email invalide.",
  send: "Impossible d'envoyer le lien. Vérifiez votre email ou réessayez.",
  forbidden: "Votre compte n'est pas autorisé à accéder à cet espace.",
  expired: "Lien expiré ou invalide. Demandez-en un nouveau.",
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const error = typeof sp.error === "string" ? sp.error : undefined;
  const sent = sp.sent === "1";
  const emailSent = typeof sp.email === "string" ? sp.email : "";
  const next = typeof sp.next === "string" ? sp.next : "/admin";

  return (
    <main className="bg-brand-cream min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md">
        <p className="eyebrow text-brand-olive mb-3 text-center">
          Espace équipe
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-brand-ink text-center mb-2">
          Connexion Maison Oléa
        </h1>
        <p className="text-sm text-brand-text-muted text-center mb-10">
          Recevez un lien de connexion par email.
        </p>

        {sent ? (
          <div className="bg-brand-cream-soft border border-brand-olive/30 p-6 text-center">
            <p className="font-serif text-xl text-brand-ink mb-2">
              Lien envoyé.
            </p>
            <p className="text-sm text-brand-text-muted">
              Ouvrez votre boîte <strong>{emailSent}</strong> et cliquez sur le
              lien pour vous connecter. Pensez à vérifier vos spams.
            </p>
          </div>
        ) : (
          <form action={requestMagicLinkAction} className="space-y-5">
            <input type="hidden" name="next" value={next} />
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email professionnel
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="vous@olea-restaurant.fr"
              />
            </div>
            {error && ERROR_MESSAGES[error] && (
              <p className="text-sm text-red-700" role="alert">
                {ERROR_MESSAGES[error]}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-brand-ink text-brand-cream py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors"
            >
              Recevoir mon lien
            </button>
            <p className="text-xs text-brand-text-muted text-center">
              Seuls les comptes ajoutés par un administrateur peuvent accéder à
              cet espace.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
