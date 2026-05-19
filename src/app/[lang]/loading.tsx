import { OliveBranch } from "@/components/brand/OliveBranch";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-brand-cream min-h-[60svh] flex flex-col items-center justify-center px-6 py-24 text-brand-ink"
    >
      <OliveBranch
        className="w-20 h-24 text-brand-olive olea-scroll-hint mb-5"
        color="currentColor"
      />
      <p className="font-serif italic text-xl text-brand-text-muted">
        Oléa
      </p>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
