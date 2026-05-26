"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Share, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const VISIT_KEY = "olea:visit-count";
const DISMISSED_KEY = "olea:install-dismissed";
const MIN_VISITS_ANDROID = 2;
const MIN_VISITS_IOS = 3;

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}

function incrementVisitCount(): number {
  try {
    const raw = localStorage.getItem(VISIT_KEY);
    const next = (raw ? parseInt(raw, 10) || 0 : 0) + 1;
    localStorage.setItem(VISIT_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

export function InstallPrompt({ dict }: { dict: Dictionary["pwa"] }) {
  const [variant, setVariant] = useState<"android" | "ios" | null>(null);
  const deferredRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (isStandalone()) return;

    let dismissed = false;
    try {
      dismissed = localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      return;
    }
    if (dismissed) return;

    const visits = incrementVisitCount();

    const onBefore = (e: Event) => {
      e.preventDefault();
      deferredRef.current = e as BeforeInstallPromptEvent;
      if (visits >= MIN_VISITS_ANDROID) setVariant("android");
    };

    window.addEventListener("beforeinstallprompt", onBefore);

    if (isIOS() && visits >= MIN_VISITS_IOS) {
      queueMicrotask(() => setVariant("ios"));
    }

    const onInstalled = () => {
      setVariant(null);
      deferredRef.current = null;
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBefore);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!variant) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      /* noop */
    }
    setVariant(null);
  };

  const install = async () => {
    const deferred = deferredRef.current;
    if (!deferred) return;
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } finally {
      deferredRef.current = null;
      setVariant(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-label={dict.ariaInstall}
      className="md:hidden fixed start-3 end-3 z-50 bg-brand-ink/95 text-brand-cream backdrop-blur-md border border-brand-cream/15 shadow-2xl"
      style={{ top: "calc(env(safe-area-inset-top) + 12px)" }}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <span className="mt-0.5 inline-flex w-9 h-9 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold flex-shrink-0">
          {variant === "android" ? (
            <Download className="h-4 w-4" aria-hidden />
          ) : (
            <Share className="h-4 w-4" aria-hidden />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[17px] leading-tight mb-0.5">
            {dict.installerOlea}
          </p>
          {variant === "android" ? (
            <p className="text-[12px] text-brand-text-soft leading-snug">
              {dict.androidTexte}
            </p>
          ) : (
            <p className="text-[12px] text-brand-text-soft leading-snug">
              {dict.iosBefore}
              <Share
                className="inline h-3 w-3 mx-0.5 align-text-bottom"
                aria-hidden
              />
              {dict.iosAfter}
            </p>
          )}
        </div>
        {variant === "android" && (
          <button
            type="button"
            onClick={install}
            className="text-[11px] uppercase tracking-[0.18em] bg-brand-cream text-brand-ink px-3.5 h-9 hover:bg-brand-gold-light transition-colors flex-shrink-0"
          >
            {dict.androidCta}
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label={dict.dismiss}
          className="-me-1.5 -mt-1 text-brand-cream/60 hover:text-brand-cream p-3 flex-shrink-0"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
