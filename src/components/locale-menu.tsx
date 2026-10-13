"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { type Locale, locales } from "@/lib/locales";

type Props = {
  current: Locale;
  children: React.ReactNode;
};

/** Like the real Select: the language links only mount (and prefetch) once the menu is opened. */
export default function LocaleMenu({ current, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <span>
      <button type="button" onClick={() => setOpen(!open)}>
        {children} ▾
      </button>
      {open && <LocaleLinks current={current} />}
    </span>
  );
}

function LocaleLinks({ current }: { current: Locale }) {
  const rest = usePathname().split("/").slice(2).join("/");

  return locales
    .filter((locale) => locale !== current)
    .map((locale) => (
      <Link
        key={locale}
        href={rest ? `/${locale}/${rest}` : `/${locale}`}
        hrefLang={locale}
        replace
        scroll={false}
        style={{ marginLeft: 8 }}
      >
        Switch to {locale.toUpperCase()}
      </Link>
    ));
}
