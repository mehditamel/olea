"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isLocale } from "./config";
import { replaceLocale } from "./locale-href";

export async function switchLocale(formData: FormData) {
  const target = formData.get("target");
  const currentPath = (formData.get("currentPath") as string | null) ?? "/";
  if (typeof target !== "string" || !isLocale(target)) {
    redirect(currentPath);
  }
  const jar = await cookies();
  jar.set("NEXT_LOCALE", target, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  redirect(replaceLocale(currentPath, target));
}
