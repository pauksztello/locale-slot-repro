import Link from "next/link";
import { getLocale } from "@/lib/get-locale";
import { text } from "@/lib/locales";

export default async function PortalLayout({
  children,
  localeSwitch,
}: {
  children: React.ReactNode;
  localeSwitch: React.ReactNode;
}) {
  const locale = await getLocale();
  const t = text[locale];

  return (
    <>
      <header style={{ borderBottom: "1px solid #ccc", paddingBottom: 12 }}>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link href={`/${locale}`}>{t.home}</Link>
          <Link href={`/${locale}/about/people`}>{t.people} (catch-all slot)</Link>
          <Link href={`/${locale}/about/media`}>{t.media} (explicit slot page)</Link>
          <Link href={`/${locale}/books`}>{t.books} (catch-all slot)</Link>
        </nav>
        <p>
          Layout: <b data-testid="layout-locale">{locale.toUpperCase()}</b>
        </p>
        <div>{localeSwitch}</div>
      </header>
      <main>{children}</main>
      <footer style={{ borderTop: "1px solid #ccc", paddingTop: 12 }}>
        {localeSwitch}
      </footer>
    </>
  );
}
