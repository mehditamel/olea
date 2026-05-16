"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export function DevisForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

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
      <div className="bg-brand-ink text-brand-cream px-8 py-12 text-center">
        <p className="eyebrow text-brand-gold mb-4">Merci !</p>
        <p className="font-serif text-2xl md:text-3xl mb-4">
          Votre demande nous est bien parvenue.
        </p>
        <p className="text-sm opacity-80">
          Nous revenons vers vous sous 48 heures avec une proposition
          sur-mesure.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Field label="Nom complet" error={errors.nom?.message}>
        <Input {...register("nom")} autoComplete="name" required />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} autoComplete="email" required />
      </Field>
      <Field label="Téléphone" error={errors.telephone?.message}>
        <Input type="tel" {...register("telephone")} autoComplete="tel" required />
      </Field>
      <Field label="Maison" error={errors.maison?.message}>
        <Select {...register("maison")}>
          {maisons.map((m) => (
            <option key={m.slug} value={m.slug}>
              {m.nom}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Type d'événement" error={errors.typeEvenement?.message}>
        <Select {...register("typeEvenement")}>
          <option value="anniversaire">Anniversaire</option>
          <option value="mariage">Mariage</option>
          <option value="seminaire">Séminaire</option>
          <option value="repas-affaires">Repas d&apos;affaires</option>
          <option value="famille">Réunion de famille</option>
          <option value="autre">Autre</option>
        </Select>
      </Field>
      <Field label="Nombre de convives" error={errors.convives?.message}>
        <Input
          type="number"
          min={2}
          max={500}
          {...register("convives", { valueAsNumber: true })}
          required
        />
      </Field>
      <Field
        label="Date souhaitée"
        error={errors.date?.message}
        className="md:col-span-2"
      >
        <Input type="date" {...register("date")} required />
      </Field>
      <Field
        label="Message"
        error={errors.message?.message}
        className="md:col-span-2"
      >
        <Textarea
          {...register("message")}
          rows={5}
          placeholder="Précisez vos envies, contraintes, allergies..."
        />
      </Field>

      <div className="md:col-span-2 flex flex-col md:flex-row md:items-center gap-4">
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="bg-brand-ink text-brand-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-brand-olive transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status.state === "submitting"
            ? "Envoi en cours..."
            : "Envoyer la demande"}
        </button>
        {status.state === "error" && (
          <p className="text-sm text-red-700" role="alert">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
