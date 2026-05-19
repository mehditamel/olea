import type { Metadata } from "next";
// eslint-disable-next-line no-restricted-imports -- admin space is locale-free
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCurrentStaff } from "@/lib/auth/staff";

export const metadata: Metadata = {
  title: "Espace équipe",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const staff = await getCurrentStaff(supabase);
  if (!staff) {
    redirect("/admin/logout?reason=forbidden");
  }

  return (
    <div className="min-h-screen bg-brand-cream-soft">
      <header className="bg-brand-ink text-brand-cream px-6 md:px-10 py-4 sticky top-0 z-10 border-b border-brand-cream/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="font-serif text-lg tracking-tight hover:text-brand-gold transition-colors"
            >
              Maison Oléa · Équipe
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-[0.2em]">
              <Link href="/admin" className="hover:text-brand-gold">
                Réservations
              </Link>
              <Link href="/admin/capacites" className="hover:text-brand-gold">
                Capacités
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline opacity-70">{staff.email}</span>
            <Link
              href="/admin/logout"
              className="border border-brand-cream/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] hover:bg-brand-cream hover:text-brand-ink transition-colors"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </header>
      <main className="px-6 md:px-10 py-8 mx-auto max-w-7xl">{children}</main>
    </div>
  );
}
