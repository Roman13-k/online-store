import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "zh-CH"],

  defaultLocale: "en",
});
