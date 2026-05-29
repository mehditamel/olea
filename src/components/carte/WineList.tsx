import type { WineGroup } from "@/data/menu";

export function WineList({ vins }: { vins: readonly WineGroup[] }) {
  return (
    <section aria-labelledby="section-vins" className="scroll-mt-24">
      <div className="flex items-center gap-4 mb-10">
        <span aria-hidden className="h-px flex-1 bg-brand-ink/15" />
        <h2
          id="section-vins"
          className="eyebrow text-brand-gold-deep text-center"
        >
          Notre cave
        </h2>
        <span aria-hidden className="h-px flex-1 bg-brand-ink/15" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {vins.map((group) => (
          <div key={group.couleur}>
            <h3 className="font-sans text-xl md:text-2xl text-brand-olive mb-3">
              {group.couleur}
            </h3>
            <ul className="space-y-1.5">
              {group.cuvees.map((cuvee) => (
                <li
                  key={cuvee}
                  className="text-[15px] leading-[1.7] text-brand-text-muted"
                >
                  {cuvee}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
