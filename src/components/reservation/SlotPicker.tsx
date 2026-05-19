"use client";

import { cn } from "@/lib/utils";
import type { Slot } from "@/lib/reservation-slots";

type SlotPickerProps = {
  slots: Slot[];
  value: string;
  onSelect: (slot: Slot) => void;
  disabled?: boolean;
  labels: { dejeuner: string; diner: string };
};

export function SlotPicker({
  slots,
  value,
  onSelect,
  disabled,
  labels,
}: SlotPickerProps) {
  if (slots.length === 0) return null;

  const dejeuner = slots.filter((s) => s.service === "dejeuner");
  const diner = slots.filter((s) => s.service === "diner");

  return (
    <div className="space-y-5">
      {dejeuner.length > 0 && (
        <Group label={labels.dejeuner}>
          <Grid>
            {dejeuner.map((slot) => (
              <SlotButton
                key={slot.value}
                slot={slot}
                selected={value === slot.value}
                disabled={disabled}
                onSelect={onSelect}
              />
            ))}
          </Grid>
        </Group>
      )}
      {diner.length > 0 && (
        <Group label={labels.diner}>
          <Grid>
            {diner.map((slot) => (
              <SlotButton
                key={slot.value}
                slot={slot}
                selected={value === slot.value}
                disabled={disabled}
                onSelect={onSelect}
              />
            ))}
          </Grid>
        </Group>
      )}
    </div>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-brand-olive mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
      role="radiogroup"
    >
      {children}
    </div>
  );
}

function SlotButton({
  slot,
  selected,
  disabled,
  onSelect,
}: {
  slot: Slot;
  selected: boolean;
  disabled?: boolean;
  onSelect: (slot: Slot) => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(slot)}
      data-selected={selected ? "true" : undefined}
      className={cn(
        "border px-2 py-2.5 text-[13px] font-medium tabular-nums transition-[background-color,color,border-color,transform] duration-200 ease-out active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-olive focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream",
        selected
          ? "bg-brand-ink text-brand-cream border-brand-ink olea-pop"
          : "bg-white text-brand-ink border-brand-ink/20 hover:border-brand-olive hover:bg-brand-cream-soft",
        disabled && "opacity-40 cursor-not-allowed",
      )}
    >
      {slot.label}
    </button>
  );
}
