import { defineRouting } from "next-intl/routing";

/**
 * Central i18n routing configuration.
 *
 * Locales are always prefixed in the URL (`/es`, `/en`) so every locale
 * variant has a single, stable, canonical URL — a hard SEO requirement.
 * Adding a locale here is the only change needed to expand routing coverage.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
