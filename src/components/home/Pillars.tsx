const PILLARS = [
  {
    icon: "◍",
    title: "Produits frais & locaux",
    text: "Le savoir-faire des producteurs régionaux à chaque assiette.",
  },
  {
    icon: "✦",
    title: "Fait maison",
    text: "Des plats préparés sur place, dans la tradition méditerranéenne.",
  },
  {
    icon: "◯",
    title: "Partage & convivialité",
    text: "Une table pensée pour les moments à plusieurs, en famille ou entre amis.",
  },
];

export function Pillars() {
  return (
    <section className="bg-brand-cream px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-9">
        {PILLARS.map((pillar, idx) => (
          <div
            key={pillar.title}
            className={
              idx === 1
                ? "px-3 md:px-9 py-8 md:py-0 border-y md:border-y-0 md:border-x border-brand-ink/15 text-center"
                : "px-3 text-center"
            }
          >
            <span
              className="block text-[32px] md:text-[34px] mb-4 text-brand-olive"
              aria-hidden
            >
              {pillar.icon}
            </span>
            <h2 className="font-serif text-xl md:text-[20px] mb-2 text-brand-ink">
              {pillar.title}
            </h2>
            <p className="text-sm leading-relaxed text-brand-text-muted">
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
