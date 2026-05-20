"use client";

import Link from "next/link";
import type { ComponentProps, Ref } from "react";
import { useI18n } from "./LocaleProvider";
import { withLocale } from "./locale-href";

type LinkProps = ComponentProps<typeof Link> & {
  ref?: Ref<HTMLAnchorElement>;
};

function isExternalOrSpecial(href: string): boolean {
  if (href.startsWith("#")) return true;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true;
  if (/^https?:\/\//.test(href)) return true;
  return false;
}

export function LocaleLink(props: LinkProps) {
  const { lang } = useI18n();
  const { href, ref, ...rest } = props;
  if (typeof href === "string") {
    const final = isExternalOrSpecial(href) ? href : withLocale(lang, href);
    return <Link href={final} ref={ref} {...rest} />;
  }
  return <Link href={href} ref={ref} {...rest} />;
}
