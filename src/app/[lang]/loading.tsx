import { OleaSymbol } from "@/components/brand/OleaSymbol";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-brand-cream min-h-[60svh] flex flex-col items-center justify-center px-6 py-24 text-brand-ink"
    >
      <OleaSymbol className="w-12 h-12 text-brand-olive olea-spin mb-5" />
      <p className="font-serif italic text-xl text-brand-text-muted">
        Oléa
      </p>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
