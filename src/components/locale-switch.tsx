import LocaleMenu from "@/components/locale-menu";
import { getLocale } from "@/lib/get-locale";

/** Rendered by the @localeSwitch slot. The label comes from the server, like the real switch. */
export default async function LocaleSwitch() {
  const current = await getLocale();

  return (
    <LocaleMenu current={current}>
      Slot: <b data-testid="slot-locale">{current.toUpperCase()}</b>
    </LocaleMenu>
  );
}
