import { OliveBranch } from "@/components/brand/OliveBranch";

export function Hero() {
  return (
    <section className="relative h-[88vh] min-h-[640px] overflow-hidden">
      {/* Dégradé chaud */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#5C4828_0%,#2E3A1E_100%)]" />

      {/* Lueurs / soleil */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 30%, rgba(212,175,110,0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(46,58,30,0.7) 0%, transparent 60%)
          `,
        }}
      />
      <div
        className="absolute left-[10%] top-[22%] w-[320px] h-[320px] rounded-full opacity-40 blur-[3px]"
        style={{
          background:
            "radial-gradient(circle, #E8D5A8 0%, #8B6F3A 60%, #3D2F18 100%)",
        }}
      />

      {/* Branche d'olivier décorative */}
      <OliveBranch
        className="absolute right-[6%] bottom-[12%] w-[180px] md:w-[240px] h-auto text-brand-cream opacity-25"
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,34,24,0.25)_0%,transparent_35%,rgba(31,34,24,0.45)_100%)]" />

      {/* Contenu */}
      <div className="relative h-full mx-auto max-w-7xl flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-20 text-brand-cream">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] mb-6 opacity-85">
          <span className="inline-block border-b border-brand-gold-light/60 pb-1">
            Cuisine méditerranéenne · Depuis 2019
          </span>
        </p>
        <h1 className="font-serif font-normal leading-none mb-7 text-[clamp(48px,7vw,92px)] tracking-[-1.5px]">
          La Méditerranée,
          <br />
          <span className="italic text-brand-gold-light">à votre table.</span>
        </h1>
        <p className="font-serif italic text-lg md:text-xl leading-snug max-w-[480px] opacity-90">
          Trois maisons, un même geste : célébrer la lumière du Sud à travers
          une cuisine sincère et le partage.
        </p>
      </div>

      <p className="hidden md:block absolute bottom-6 right-12 text-[11px] tracking-[0.25em] uppercase text-brand-cream/70">
        Marseille · Cassis · Villeneuve-Loubet
      </p>
    </section>
  );
}
