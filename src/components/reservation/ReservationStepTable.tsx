import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { ReservationInput } from "@/types/reservation";
import type { Maison } from "@/types/maison";
import type { Slot } from "@/lib/reservation-slots";
import { todayIsoParis } from "@/lib/date-paris";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SlotPicker } from "./SlotPicker";
import { ReservationField } from "./ReservationField";
import { LocaleLink } from "@/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatPlural, interpolate } from "@/i18n/format";

const PRIVATISATION_THRESHOLD = 11;

type ReservationStepTableProps = {
  f: Dictionary["reservationForm"];
  lang: Locale;
  maisonsOuvertes: readonly Maison[];
  register: UseFormRegister<ReservationInput>;
  errors: FieldErrors<ReservationInput>;
  setValue: UseFormSetValue<ReservationInput>;
  slots: Slot[];
  selectedDate: string;
  selectedHeure: string;
  selectedConvives: number | undefined;
  noSlots: boolean;
  onSlotSelect: (slot: Slot) => void;
  onContinue: () => void;
};

/** Étape 1 : maison, date, convives, créneau et occasion. */
export function ReservationStepTable({
  f,
  lang,
  maisonsOuvertes,
  register,
  errors,
  setValue,
  slots,
  selectedDate,
  selectedHeure,
  selectedConvives,
  noSlots,
  onSlotSelect,
  onContinue,
}: ReservationStepTableProps) {
  const showPrivatisationCallout =
    typeof selectedConvives === "number" &&
    selectedConvives >= PRIVATISATION_THRESHOLD;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ReservationField
          label={f.maison}
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
        </ReservationField>

        <ReservationField label={f.date} error={errors.date?.message}>
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
        </ReservationField>

        <ReservationField label={f.convives} error={errors.convives?.message}>
          <Select {...register("convives", { valueAsNumber: true })} required>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {formatPlural(n, lang, f.personnePlurals)}
              </option>
            ))}
          </Select>
        </ReservationField>

        {showPrivatisationCallout && (
          <div className="md:col-span-2 border border-brand-gold bg-brand-cream-soft px-5 py-4 text-sm">
            <p className="font-medium text-brand-ink mb-1">
              {interpolate(f.privatisationTitre, { n: selectedConvives })}
            </p>
            <p className="text-brand-text-muted">
              {f.privatisationTexte}{" "}
              <LocaleLink
                href="/privatisation"
                className="underline decoration-brand-olive underline-offset-4 hover:text-brand-ink"
              >
                {f.privatisationCta}
              </LocaleLink>
            </p>
          </div>
        )}

        <ReservationField
          label={f.heure}
          error={errors.heure?.message}
          hint={
            !selectedDate
              ? f.choisirDate
              : noSlots
                ? f.fermeCeJour
                : undefined
          }
          className="md:col-span-2"
        >
          <input type="hidden" {...register("heure")} />
          <input type="hidden" {...register("service")} />
          <SlotPicker
            slots={slots}
            value={selectedHeure ?? ""}
            onSelect={onSlotSelect}
            disabled={noSlots}
            labels={{
              dejeuner: f.services.dejeuner,
              diner: f.services.diner,
            }}
          />
        </ReservationField>

        <ReservationField label={f.occasion} className="md:col-span-2">
          <Select {...register("occasion")}>
            <option value="aucune">{f.occasions.aucune}</option>
            <option value="anniversaire">{f.occasions.anniversaire}</option>
            <option value="romantique">{f.occasions.romantique}</option>
            <option value="famille">{f.occasions.famille}</option>
            <option value="professionnel">{f.occasions.professionnel}</option>
            <option value="autre">{f.occasions.autre}</option>
          </Select>
        </ReservationField>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="button"
          onClick={onContinue}
          disabled={noSlots || !selectedHeure}
          className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {f.continuer}
        </button>
        <p className="text-xs text-brand-text-muted">
          <LocaleLink
            href="/privatisation"
            className="underline decoration-brand-olive underline-offset-4 hover:text-brand-ink"
          >
            {f.privatisationLink}
          </LocaleLink>
        </p>
      </div>
    </>
  );
}
