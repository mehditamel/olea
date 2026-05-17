"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reservationSchema,
  type ReservationInput,
} from "@/types/reservation";
import type { MaisonSlug } from "@/types/maison";
import { maisons, getMaisonBySlug } from "@/data/maisons";
import {
  getSlotsForDate,
  getServiceForSlot,
  type Slot,
} from "@/lib/reservation-slots";
import { todayIsoParis } from "@/lib/date-paris";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { StepIndicator } from "./StepIndicator";
import { SlotPicker } from "./SlotPicker";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const MAISONS_OUVERTES = maisons.filter((m) => m.ouvert);
const PRIVATISATION_THRESHOLD = 11;

function isMaisonSlug(value: string): value is MaisonSlug {
  return MAISONS_OUVERTES.some((m) => m.slug === value);
}

type ReservationFormProps = {
  defaultMaison?: string;
};

export function ReservationForm({ defaultMaison }: ReservationFormProps) {
  const initialMaison: MaisonSlug =
    defaultMaison && isMaisonSlug(defaultMaison)
      ? defaultMaison
      : (MAISONS_OUVERTES[0]?.slug ?? "marseille");

  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    mode: "onTouched",
    defaultValues: {
      maison: initialMaison,
      convives: 2,
      occasion: "aucune",
      date: "",
      heure: "",
      service: "diner",
      demandesParticulieres: "",
      siteWeb: "",
      consentement: false,
    },
  });

  const selectedMaisonSlug = watch("maison");
  const selectedDate = watch("date");
  const selectedHeure = watch("heure");
  const selectedConvives = watch("convives");

  const selectedMaison = useMemo(
    () => getMaisonBySlug(selectedMaisonSlug),
    [selectedMaisonSlug],
  );

  const slots = useMemo(() => {
    if (!selectedMaison || !selectedDate) return [];
    return getSlotsForDate(selectedMaison, selectedDate);
  }, [selectedMaison, selectedDate]);

  const noSlots =
    selectedMaison !== undefined && selectedDate !== "" && slots.length === 0;

  const handleSlotSelect = (slot: Slot) => {
    setValue("heure", slot.value, { shouldValidate: true, shouldDirty: true });
    setValue("service", slot.service);
  };

  const goToStep2 = async () => {
    const ok = await trigger(["maison", "date", "heure", "convives"]);
    if (ok) setStep(2);
  };

  const onSubmit = handleSubmit(async (values) => {
    const maison = getMaisonBySlug(values.maison);
    if (!maison) {
      setStatus({ state: "error", message: "Maison inconnue." });
      return;
    }
    const service = getServiceForSlot(maison, values.date, values.heure);
    if (!service) {
      setStatus({
        state: "error",
        message: "Veuillez choisir un horaire valide.",
      });
      setStep(1);
      return;
    }
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, service }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Une erreur est survenue.");
      }
      setStatus({ state: "success" });
      reset({
        maison: initialMaison,
        convives: 2,
        occasion: "aucune",
        date: "",
        heure: "",
        service: "diner",
        demandesParticulieres: "",
        nom: "",
        email: "",
        telephone: "",
        siteWeb: "",
        consentement: false,
      });
      setStep(1);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue.";
      setStatus({ state: "error", message });
    }
  });

  if (status.state === "success") {
    return (
      <div className="bg-brand-ink text-brand-cream px-8 py-12 text-center">
        <p className="eyebrow text-brand-gold mb-4">Demande envoyée</p>
        <p className="font-serif text-2xl md:text-3xl mb-4">
          Nous confirmons votre table très vite.
        </p>
        <p className="text-sm opacity-80 max-w-md mx-auto">
          Un email de récap (avec invitation calendrier) vient de vous être
          envoyé. Notre équipe vous recontacte sous quelques heures pour
          confirmer le créneau.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 border border-brand-cream/40 text-brand-cream px-7 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-cream hover:text-brand-ink transition-colors"
        >
          Nouvelle réservation
        </button>
      </div>
    );
  }

  const showPrivatisationCallout =
    typeof selectedConvives === "number" &&
    selectedConvives >= PRIVATISATION_THRESHOLD;

  return (
    <form onSubmit={onSubmit} noValidate>
      <StepIndicator
        current={step}
        labels={["Votre table", "Vos coordonnées"]}
      />

      <div className={step === 1 ? "block" : "hidden"}>
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
              {MAISONS_OUVERTES.map((m) => (
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
            <Select
              {...register("convives", { valueAsNumber: true })}
              required
            >
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
                Au-delà de 10 convives, nous vous proposons un menu sur-mesure
                et la salle privatisée.{" "}
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
              value={selectedHeure ?? ""}
              onSelect={handleSlotSelect}
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
            onClick={goToStep2}
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

      <div className={step === 2 ? "block" : "hidden"}>
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

          {/* Honeypot anti-spam : champ caché aux humains, visible aux bots. */}
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
              <p
                className="mt-1.5 text-xs text-red-700 ml-7"
                role="alert"
              >
                {errors.consentement.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
          >
            ← Retour
          </button>
          <button
            type="submit"
            disabled={status.state === "submitting"}
            className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status.state === "submitting"
              ? "Envoi en cours..."
              : "Demander la réservation"}
          </button>
          {status.state === "error" && (
            <p className="text-sm text-red-700" role="alert">
              {status.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-brand-text-muted">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
