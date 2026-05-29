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
import { CardConfirmationStep } from "./CardConfirmationStep";
import { ReservationStepTable } from "./ReservationStepTable";
import { ReservationStepDetails } from "./ReservationStepDetails";
import { ReservationSuccess } from "./ReservationSuccess";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type ReservationErrorCode = keyof Dictionary["reservationForm"]["errors"];

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
  | { state: "success" }
  | { state: "error"; code: ReservationErrorCode };

const MAISONS_OUVERTES = maisons.filter((m) => m.ouvert);

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

  const resetForm = () => {
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
    setStatus({ state: "idle" });
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
        const raw = (data?.error ?? "generic") as string;
        const code = (raw in f.errors ? raw : "generic") as ReservationErrorCode;
        throw new Error(code);
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
      setStatus({ state: "success" });
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "generic";
      const code = (msg in f.errors ? msg : "generic") as ReservationErrorCode;
      setStatus({ state: "error", code });
    }
  });

  if (status.state === "card") {
    return (
      <CardConfirmationStep
        clientSecret={status.clientSecret}
        publishableKey={status.publishableKey}
        montantGarantieCents={status.montantGarantieCents}
        onSuccess={() => setStatus({ state: "success" })}
        onBack={resetForm}
      />
    );
  }

  if (status.state === "success") {
    return (
      <ReservationSuccess f={f} onDismiss={() => setStatus({ state: "idle" })} />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <StepIndicator
        current={step}
        labels={[f.etapeTable, f.etapeCoordonnees]}
        ariaLabel={f.progression}
      />

      <div className={step === 1 ? "block" : "hidden"}>
        <ReservationStepTable
          f={f}
          lang={lang}
          maisonsOuvertes={MAISONS_OUVERTES}
          register={register}
          errors={errors}
          setValue={setValue}
          slots={slots}
          selectedDate={selectedDate}
          selectedHeure={selectedHeure}
          selectedConvives={selectedConvives}
          noSlots={noSlots}
          onSlotSelect={handleSlotSelect}
          onContinue={goToStep2}
        />
      </div>

      <div className={step === 2 ? "block" : "hidden"}>
        <ReservationStepDetails
          f={f}
          register={register}
          errors={errors}
          isSubmitting={status.state === "submitting"}
          errorMessage={
            status.state === "error" ? f.errors[status.code] : undefined
          }
          onBack={() => setStep(1)}
        />
      </div>
    </form>
  );
}
