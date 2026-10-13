import { getLocale } from "@/lib/get-locale";
import { locales } from "@/lib/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body style={{ fontFamily: "system-ui", margin: 24, lineHeight: 1.6 }}>
        {children}
      </body>
    </html>
  );
}
