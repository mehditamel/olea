"use client";

import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ReservationInput } from "@/types/reservation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Field } from "./Field";

type Props = {
  register: UseFormRegister<ReservationInput>;
  errors: FieldErrors<ReservationInput>;
  onBack: () => void;
  submitting: boolean;
  errorMessage?: string;
};

export function ReservationStep2({
  register,
  errors,
  onBack,
  submitting,
  errorMessage,
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom complet" error={errors.nom?.message}>
          <Input {...register("nom")} autoComplete="name" required />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            autoComplete="email"
            required
          />
        </Field>
        <Field
          label="Téléphone"
          error={errors.telephone?.message}
          hint="Format français — ex. 06 25 15 13 33"
          className="md:col-span-2"
        >
          <Input
            type="tel"
            {...register("telephone")}
            autoComplete="tel"
            placeholder="06 25 15 13 33"
            required
          />
        </Field>

        <Field
          label="Demandes particulières (facultatif)"
          error={errors.demandesParticulieres?.message}
          hint="Allergies, intolérances, fauteuil roulant, table calme, poussette…"
          className="md:col-span-2"
        >
          <Textarea
            {...register("demandesParticulieres")}
            rows={4}
            placeholder="Précisez vos contraintes ou souhaits."
          />
        </Field>

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
            <span className="text-sm text-brand-ink leading-snug">
              J&apos;accepte que mes coordonnées soient utilisées par Maison
              Oléa pour traiter cette demande de réservation. Aucune
              communication marketing sans consentement explicite.
            </span>
          </label>
          {errors.consentement?.message && (
            <p className="mt-1.5 text-xs text-red-700 ml-7" role="alert">
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
          ← Retour
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Envoi en cours..." : "Demander la réservation"}
        </button>
        {errorMessage && (
          <p className="text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
