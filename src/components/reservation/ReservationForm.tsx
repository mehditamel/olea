"use client";

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
import { LocaleLink } from "@/i18n/LocaleLink";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatPlural, interpolate } from "@/i18n/format";

type ReservationErrorCode = keyof Dictionary["reservationForm"]["errors"];

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; code: ReservationErrorCode };

const MAISONS_OUVERTES = maisons.filter((m) => m.ouvert);
const PRIVATISATION_THRESHOLD = 11;

function isMaisonSlug(value: string): value is MaisonSlug {
  return MAISONS_OUVERTES.some((m) => m.slug === value);
}

type ReservationFormProps = {
  defaultMaison?: string;
  lang: Locale;
  dict: Dictionary;
};

export function ReservationForm({
  defaultMaison,
  lang,
  dict,
}: ReservationFormProps) {
  const f = dict.reservationForm;
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
      setStatus({ state: "error", code: "maison_unknown" });
      return;
    }
    const service = getServiceForSlot(maison, values.date, values.heure);
    if (!service) {
      setStatus({ state: "error", code: "invalidSlot" });
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
        const raw = (data?.error ?? "generic") as string;
        const code = (raw in f.errors ? raw : "generic") as ReservationErrorCode;
        throw new Error(code);
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
      const msg = err instanceof Error ? err.message : "generic";
      const code = (msg in f.errors ? msg : "generic") as ReservationErrorCode;
      setStatus({ state: "error", code });
    }
  });

  if (status.state === "success") {
    return (
      <div className="bg-brand-ink text-brand-cream px-8 py-12 text-center">
        <p className="eyebrow text-brand-gold mb-4">{f.successEyebrow}</p>
        <p className="font-serif text-2xl md:text-3xl mb-4">{f.successTitre}</p>
        <p className="text-sm opacity-80 max-w-md mx-auto">{f.successTexte}</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 border border-brand-cream/40 text-brand-cream px-7 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-cream hover:text-brand-ink transition-colors"
        >
          {f.successCta}
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
        labels={[f.etapeTable, f.etapeCoordonnees]}
        ariaLabel={f.progression}
      />

      <div className={step === 1 ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
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
              {MAISONS_OUVERTES.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.nom} — {m.ville}
                </option>
              ))}
            </Select>
          </Field>

          <Field label={f.date} error={errors.date?.message}>
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

          <Field label={f.convives} error={errors.convives?.message}>
            <Select
              {...register("convives", { valueAsNumber: true })}
              required
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {formatPlural(n, lang, f.personnePlurals)}
                </option>
              ))}
            </Select>
          </Field>

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

          <Field
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
              onSelect={handleSlotSelect}
              disabled={noSlots}
              labels={{
                dejeuner: f.services.dejeuner,
                diner: f.services.diner,
              }}
            />
          </Field>

          <Field label={f.occasion} className="md:col-span-2">
            <Select {...register("occasion")}>
              <option value="aucune">{f.occasions.aucune}</option>
              <option value="anniversaire">{f.occasions.anniversaire}</option>
              <option value="romantique">{f.occasions.romantique}</option>
              <option value="famille">{f.occasions.famille}</option>
              <option value="professionnel">{f.occasions.professionnel}</option>
              <option value="autre">{f.occasions.autre}</option>
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
      </div>

      <div className={step === 2 ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label={f.nom} error={errors.nom?.message}>
            <Input {...register("nom")} autoComplete="name" required />
          </Field>
          <Field label={f.email} error={errors.email?.message}>
            <Input
              type="email"
              {...register("email")}
              autoComplete="email"
              required
            />
          </Field>
          <Field
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
          </Field>

          <Field
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
                {f.rgpd}
              </span>
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
            onClick={() => setStep(1)}
            className="border border-brand-ink text-brand-ink px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-brand-cream transition-colors"
          >
            {f.retour}
          </button>
          <button
            type="submit"
            disabled={status.state === "submitting"}
            className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status.state === "submitting" ? f.envoiEnCours : f.envoyer}
          </button>
          {status.state === "error" && (
            <p className="text-sm text-red-700" role="alert">
              {f.errors[status.code]}
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
