"use client";

import Link from "next/link";
import type {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import type { ReservationInput } from "@/types/reservation";
import type { Maison } from "@/types/maison";
import type { Slot } from "@/lib/reservation-slots";
import { todayIsoParis } from "@/lib/date-paris";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SlotPicker } from "./SlotPicker";
import { Field } from "./Field";

const PRIVATISATION_THRESHOLD = 11;

type Props = {
  maisonsOuvertes: ReadonlyArray<Maison>;
  register: UseFormRegister<ReservationInput>;
  setValue: UseFormSetValue<ReservationInput>;
  errors: FieldErrors<ReservationInput>;
  slots: Slot[];
  selectedDate: string;
  selectedHeure: string;
  selectedConvives: number | undefined;
  onSlotSelect: (slot: Slot) => void;
  onContinue: () => void;
};

export function ReservationStep1({
  maisonsOuvertes,
  register,
  setValue,
  errors,
  slots,
  selectedDate,
  selectedHeure,
  selectedConvives,
  onSlotSelect,
  onContinue,
}: Props) {
  const noSlots = selectedDate !== "" && slots.length === 0;
  const showPrivatisationCallout =
    typeof selectedConvives === "number" &&
    selectedConvives >= PRIVATISATION_THRESHOLD;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Maison"
          error={errors.maison?.message}
          className="md:col-span-2"
        >
          <Select
            {...register("maison", {
              onChange: () => {
                setValue("heure", "");
              },
            })}
          >
            {maisonsOuvertes.map((m) => (
              <option key={m.slug} value={m.slug}>
                Oléa {m.nom}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Date" error={errors.date?.message}>
          <Input
            type="date"
            min={todayIsoParis()}
            {...register("date", {
              onChange: () => {
                setValue("heure", "");
              },
            })}
            required
          />
        </Field>

        <Field label="Nombre de convives" error={errors.convives?.message}>
          <Select {...register("convives", { valueAsNumber: true })} required>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "personne" : "personnes"}
              </option>
            ))}
          </Select>
        </Field>

        {showPrivatisationCallout && (
          <div className="md:col-span-2 border border-brand-gold bg-brand-cream-soft px-5 py-4 text-sm">
            <p className="font-medium text-brand-ink mb-1">
              Pour {selectedConvives} convives, optez pour une privatisation.
            </p>
            <p className="text-brand-text-muted">
              Au-delà de 10 convives, nous vous proposons un menu sur-mesure et
              la salle privatisée.{" "}
              <Link
                href="/privatisation"
                className="underline decoration-brand-olive underline-offset-4 hover:text-brand-ink"
              >
                Demander un devis privatisation
              </Link>
            </p>
          </div>
        )}

        <Field
          label="Heure"
          error={errors.heure?.message}
          hint={
            !selectedDate
              ? "Choisissez d'abord une date"
              : noSlots
                ? "Fermé ce jour — choisissez une autre date"
                : undefined
          }
          className="md:col-span-2"
        >
          <input type="hidden" {...register("heure")} />
          <input type="hidden" {...register("service")} />
          <SlotPicker
            slots={slots}
            value={selectedHeure}
            onSelect={onSlotSelect}
            disabled={noSlots}
          />
        </Field>

        <Field label="Occasion (facultatif)" className="md:col-span-2">
          <Select {...register("occasion")}>
            <option value="aucune">Aucune en particulier</option>
            <option value="anniversaire">Anniversaire</option>
            <option value="romantique">Dîner romantique</option>
            <option value="famille">Repas de famille</option>
            <option value="professionnel">Repas professionnel</option>
            <option value="autre">Autre</option>
          </Select>
        </Field>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="button"
          onClick={onContinue}
          disabled={noSlots || !selectedHeure}
          className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Continuer
        </button>
        <p className="text-xs text-brand-text-muted">
          Plus de 10 convives ?{" "}
          <Link
            href="/privatisation"
            className="underline decoration-brand-olive underline-offset-4 hover:text-brand-ink"
          >
            Devis privatisation
          </Link>
        </p>
      </div>
    </div>
  );
}
