import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ReservationInput } from "@/types/reservation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ReservationField } from "./ReservationField";
import type { Dictionary } from "@/i18n/dictionaries";

type ReservationStepDetailsProps = {
  f: Dictionary["reservationForm"];
  register: UseFormRegister<ReservationInput>;
  errors: FieldErrors<ReservationInput>;
  isSubmitting: boolean;
  errorMessage?: string;
  onBack: () => void;
};

/** Étape 2 : coordonnées, demandes, consentement RGPD et soumission. */
export function ReservationStepDetails({
  f,
  register,
  errors,
  isSubmitting,
  errorMessage,
  onBack,
}: ReservationStepDetailsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ReservationField label={f.nom} error={errors.nom?.message}>
          <Input {...register("nom")} autoComplete="name" required />
        </ReservationField>
        <ReservationField label={f.email} error={errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            autoComplete="email"
            required
          />
        </ReservationField>
        <ReservationField
          label={f.telephone}
          error={errors.telephone?.message}
          hint={f.telephoneHint}
          className="md:col-span-2"
        >
          <Input
            type="tel"
            {...register("telephone")}
            autoComplete="tel"
            placeholder="06 25 15 13 33"
            required
          />
        </ReservationField>

        <ReservationField
          label={f.demandes}
          error={errors.demandesParticulieres?.message}
          hint={f.demandesHint}
          className="md:col-span-2"
        >
          <Textarea
            {...register("demandesParticulieres")}
            rows={4}
            placeholder={f.demandesHint}
          />
        </ReservationField>

        <div aria-hidden className="hidden" tabIndex={-1}>
          <label>
            Site web
            <input
              type="text"
              autoComplete="off"
              tabIndex={-1}
              {...register("siteWeb")}
            />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("consentement")}
              className="mt-1 h-4 w-4 border-brand-ink/30 text-brand-olive focus-visible:ring-brand-olive"
              required
            />
            <span className="text-sm text-brand-ink leading-snug">{f.rgpd}</span>
          </label>
          {errors.consentement?.message && (
            <p className="mt-1.5 text-xs text-red-700 ms-7" role="alert">
              {errors.consentement.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
        >
          {f.retour}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? f.envoiEnCours : f.envoyer}
        </button>
        {errorMessage && (
          <p className="text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
}
