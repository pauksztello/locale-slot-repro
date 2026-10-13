import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { cache } from "react";
import type { Locale } from "@/lib/locales";

/** Same shape as next-intl's getLocale(): React-cached, reads the root param once per request. */
export const getLocale = cache(async (): Promise<Locale> => {
  const locale = await rootParams.locale();
  if (locale === "en" || locale === "fr") return locale;
  notFound();
});
