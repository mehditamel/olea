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
import { StepIndicator } from "./StepIndicator";
import { ReservationStep1 } from "./ReservationStep1";
import { ReservationStep2 } from "./ReservationStep2";
import { ReservationSuccessScreen } from "./ReservationSuccessScreen";
import { CardConfirmationStep } from "./CardConfirmationStep";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | {
      state: "card";
      clientSecret: string;
      publishableKey: string;
      reservationId: string;
      montantGarantieCents: number;
    }
  | { state: "success"; cardConfirmed: boolean }
  | { state: "error"; message: string };

const MAISONS_OUVERTES = maisons.filter((m) => m.ouvert);

function isMaisonSlug(value: string): value is MaisonSlug {
  return MAISONS_OUVERTES.some((m) => m.slug === value);
}

const DEFAULT_VALUES: ReservationInput = {
  maison: (MAISONS_OUVERTES[0]?.slug ?? "marseille") as MaisonSlug,
  convives: 2,
  occasion: "aucune",
  date: "",
  heure: "",
  service: "diner",
  nom: "",
  email: "",
  telephone: "",
  demandesParticulieres: "",
  siteWeb: "",
  consentement: false,
};

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
    defaultValues: { ...DEFAULT_VALUES, maison: initialMaison },
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

  const handleSlotSelect = (slot: Slot) => {
    setValue("heure", slot.value, { shouldValidate: true, shouldDirty: true });
    setValue("service", slot.service);
  };

  const goToStep2 = async () => {
    const ok = await trigger(["maison", "date", "heure", "convives"]);
    if (ok) setStep(2);
  };

  const resetForm = () => {
    reset({ ...DEFAULT_VALUES, maison: initialMaison });
    setStep(1);
    setStatus({ state: "idle" });
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
      const data = (await res.json().catch(() => null)) as
        | {
            error?: string;
            requiresCard?: boolean;
            clientSecret?: string;
            publishableKey?: string;
            reservationId?: string;
            montantGarantieCents?: number;
          }
        | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Une erreur est survenue.");
      }
      if (
        data?.requiresCard &&
        data.clientSecret &&
        data.publishableKey &&
        data.reservationId
      ) {
        setStatus({
          state: "card",
          clientSecret: data.clientSecret,
          publishableKey: data.publishableKey,
          reservationId: data.reservationId,
          montantGarantieCents: data.montantGarantieCents ?? 0,
        });
        return;
      }
      setStatus({ state: "success", cardConfirmed: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue.";
      setStatus({ state: "error", message });
    }
  });

  if (status.state === "card") {
    return (
      <CardConfirmationStep
        clientSecret={status.clientSecret}
        publishableKey={status.publishableKey}
        montantGarantieCents={status.montantGarantieCents}
        onSuccess={() => setStatus({ state: "success", cardConfirmed: true })}
        onBack={resetForm}
      />
    );
  }
  if (status.state === "success") {
    return (
      <ReservationSuccessScreen
        onReset={resetForm}
        cardConfirmed={status.cardConfirmed}
      />
    );
  }

  const errorMessage =
    status.state === "error" ? status.message : undefined;

  return (
    <form onSubmit={onSubmit} noValidate>
      <StepIndicator
        current={step}
        labels={["Votre table", "Vos coordonnées"]}
      />

      <div className={step === 1 ? "block" : "hidden"}>
        <ReservationStep1
          maisonsOuvertes={MAISONS_OUVERTES}
          register={register}
          setValue={setValue}
          errors={errors}
          slots={slots}
          selectedDate={selectedDate}
          selectedHeure={selectedHeure ?? ""}
          selectedConvives={selectedConvives}
          onSlotSelect={handleSlotSelect}
          onContinue={goToStep2}
        />
      </div>

      <div className={step === 2 ? "block" : "hidden"}>
        <ReservationStep2
          register={register}
          errors={errors}
          onBack={() => setStep(1)}
          submitting={status.state === "submitting"}
          errorMessage={errorMessage}
        />
      </div>
    </form>
  );
}
