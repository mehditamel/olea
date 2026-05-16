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
} from "@/lib/reservation-slots";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const MAISONS_OUVERTES = maisons.filter((m) => m.ouvert);

function todayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = (now.getMonth() + 1).toString().padStart(2, "0");
  const d = now.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

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

  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      maison: initialMaison,
      convives: 2,
      occasion: "aucune",
      date: "",
      heure: "",
      service: "diner",
      demandesParticulieres: "",
    },
  });

  const selectedMaisonSlug = watch("maison");
  const selectedDate = watch("date");

  const selectedMaison = useMemo(
    () => getMaisonBySlug(selectedMaisonSlug),
    [selectedMaisonSlug],
  );

  const slots = useMemo(() => {
    if (!selectedMaison || !selectedDate) return [];
    return getSlotsForDate(selectedMaison, selectedDate);
  }, [selectedMaison, selectedDate]);

  const dejeunerSlots = slots.filter((s) => s.service === "dejeuner");
  const dinerSlots = slots.filter((s) => s.service === "diner");

  const noSlots =
    selectedMaison !== undefined && selectedDate !== "" && slots.length === 0;

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
      });
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
          Votre demande de réservation nous est bien parvenue. Notre équipe vous
          recontacte sous quelques heures pour confirmer le créneau.
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

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              {m.nom} — {m.ville}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Date" error={errors.date?.message}>
        <Input
          type="date"
          min={todayIso()}
          {...register("date", {
            onChange: () => {
              setValue("heure", "");
            },
          })}
          required
        />
      </Field>

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
      >
        <Select
          {...register("heure", {
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              if (!selectedMaison || !selectedDate) return;
              const service = getServiceForSlot(
                selectedMaison,
                selectedDate,
                e.target.value,
              );
              if (service) setValue("service", service);
            },
          })}
          disabled={!selectedDate || noSlots}
          required
        >
          <option value="">— Sélectionnez un horaire —</option>
          {dejeunerSlots.length > 0 && (
            <optgroup label="Déjeuner">
              {dejeunerSlots.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </optgroup>
          )}
          {dinerSlots.length > 0 && (
            <optgroup label="Dîner">
              {dinerSlots.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </optgroup>
          )}
        </Select>
        <input type="hidden" {...register("service")} />
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

      <Field label="Occasion (facultatif)" error={errors.occasion?.message}>
        <Select {...register("occasion")}>
          <option value="aucune">Aucune en particulier</option>
          <option value="anniversaire">Anniversaire</option>
          <option value="romantique">Dîner romantique</option>
          <option value="famille">Repas de famille</option>
          <option value="professionnel">Repas professionnel</option>
          <option value="autre">Autre</option>
        </Select>
      </Field>

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
        className="md:col-span-2"
      >
        <Input
          type="tel"
          {...register("telephone")}
          autoComplete="tel"
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

      <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="submit"
          disabled={status.state === "submitting" || noSlots}
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

      <p className="md:col-span-2 text-xs text-brand-text-muted leading-relaxed border-t border-brand-ink/10 pt-5 mt-2">
        Plus de 12 convives, un menu sur-mesure, un événement privé ?{" "}
        <Link
          href="/privatisation"
          className="underline decoration-brand-olive underline-offset-4 hover:text-brand-ink"
        >
          Demandez un devis de privatisation
        </Link>
        .
      </p>
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
    <div className={className}>
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
