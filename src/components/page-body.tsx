import { getLocale } from "@/lib/get-locale";
import { type Page, text } from "@/lib/locales";

export default async function PageBody({ page }: { page: Page }) {
  const locale = await getLocale();

  return (
    <>
      <h1>{text[locale][page]}</h1>
      <p>
        Page: <b data-testid="page-locale">{locale.toUpperCase()}</b>
      </p>
    </>
  );
}
