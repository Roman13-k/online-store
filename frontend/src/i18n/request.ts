import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const API = process.env.API_URL_INTERNAL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// Подписи интерфейса хранятся в таблице ui_strings; локальный файл нужен, если сервер недоступен
async function loadMessages(locale: string) {
  try {
    const res = await fetch(`${API}/api/i18n/${locale}`, { next: { revalidate: 60 } });
    if (res.ok) return await res.json();
  } catch {
    // переходим к локальному файлу
  }
  return (await import(`../../messages/${locale}.json`)).default;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: await loadMessages(locale) };
});
