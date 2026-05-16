"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check } from "lucide-react";
import { devisSchema, type DevisInput } from "@/types/devis";
import { maisons } from "@/data/maisons";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

function todayIso(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  const iso = d.toISOString();
  const part = iso.split("T")[0];
  return part ?? "";
}

export function DevisForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const minDate = todayIso();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DevisInput>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      maison: "marseille",
      typeEvenement: "anniversaire",
      convives: 8,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Une erreur est survenue.");
      }
      setStatus({ state: "success" });
      reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue.";
      setStatus({ state: "error", message });
    }
  });

  if (status.state === "success") {
    return (
      <div className="bg-brand-ink text-brand-cream px-8 py-14 text-center">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-gold/15 text-brand-gold mb-6">
          <Check className="h-7 w-7" aria-hidden />
        </span>
        <p className="eyebrow text-brand-gold mb-4">Merci !</p>
        <p className="font-serif text-2xl md:text-3xl mb-4">
          Votre demande nous est bien parvenue.
        </p>
        <p className="text-sm opacity-80 max-w-md mx-auto">
          Nous revenons vers vous sous 48 heures avec une proposition
          sur-mesure.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-8 text-[11px] uppercase tracking-[0.2em] text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-gold-light hover:border-brand-gold-light transition-colors"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10" noValidate>
      <fieldset className="contents">
        <legend className="eyebrow text-brand-olive mb-2">Vous</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nom complet" htmlFor="devis-nom" error={errors.nom?.message}>
            <Input id="devis-nom" {...register("nom")} autoComplete="name" required />
          </Field>
          <Field label="Email" htmlFor="devis-email" error={errors.email?.message}>
            <Input
              id="devis-email"
              type="email"
              inputMode="email"
              {...register("email")}
              autoComplete="email"
              required
            />
          </Field>
          <Field label="Téléphone" htmlFor="devis-tel" error={errors.telephone?.message} className="md:col-span-2">
            <Input
              id="devis-tel"
              type="tel"
              inputMode="tel"
              {...register("telephone")}
              autoComplete="tel"
              required
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="contents">
        <legend className="eyebrow text-brand-olive mb-2">Votre événement</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Maison" htmlFor="devis-maison" error={errors.maison?.message}>
            <Select id="devis-maison" {...register("maison")}>
              {maisons.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.nom}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="Type d'événement"
            htmlFor="devis-type"
            error={errors.typeEvenement?.message}
          >
            <Select id="devis-type" {...register("typeEvenement")}>
              <option value="anniversaire">Anniversaire</option>
              <option value="mariage">Mariage</option>
              <option value="seminaire">Séminaire</option>
              <option value="repas-affaires">Repas d&apos;affaires</option>
              <option value="famille">Réunion de famille</option>
              <option value="autre">Autre</option>
            </Select>
          </Field>
          <Field
            label="Nombre de convives"
            htmlFor="devis-convives"
            error={errors.convives?.message}
          >
            <Input
              id="devis-convives"
              type="number"
              min={2}
              max={500}
              inputMode="numeric"
              {...register("convives", { valueAsNumber: true })}
              required
            />
          </Field>
          <Field
            label="Date souhaitée"
            htmlFor="devis-date"
            error={errors.date?.message}
          >
            <Input id="devis-date" type="date" min={minDate} {...register("date")} required />
          </Field>
          <Field
            label="Précisions"
            htmlFor="devis-message"
            error={errors.message?.message}
            hint="Envies, contraintes, allergies, ambiance souhaitée…"
            className="md:col-span-2"
          >
            <Textarea
              id="devis-message"
              {...register("message")}
              rows={5}
              placeholder="Parlez-nous de votre projet"
            />
          </Field>
        </div>
      </fieldset>

      {status.state === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-red-300 bg-red-50 text-red-800 px-4 py-3 text-sm"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden />
          <p>{status.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between border-t border-brand-ink/15 pt-7">
        <p className="text-xs text-brand-text-muted max-w-sm">
          Réponse personnalisée sous <strong>48 heures</strong>. Vos données ne
          servent qu&apos;à traiter votre demande.
        </p>
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="inline-flex items-center justify-center bg-brand-ink text-brand-cream px-8 h-12 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-w-[220px]"
        >
          {status.state === "submitting"
            ? "Envoi en cours…"
            : "Envoyer la demande"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  htmlFor,
  children,
  className,
}: {
  label: string;
  error?: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-2 block">
        {label}
      </Label>
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
