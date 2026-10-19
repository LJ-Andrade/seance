import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

/**
 * Public route inventory, shared across locales. Each key is a logical path
 * without the locale prefix; the value is the date that page's content last
 * changed (ISO, YYYY-MM-DD). Bump it whenever the page content changes — never
 * use the build date, or every deploy tells crawlers that everything changed.
 * Add new pages here so every localized variant is enumerated in the sitemap
 * with hreflang alternates.
 */
const routes: Record<string, string> = {
  "": "2026-10-08", // home
  nosotros: "2026-10-08",
  productos: "2026-10-19",
  contacto: "2026-10-07",
  "servicios/fabricacion": "2026-10-08",
  "servicios/hosting": "2026-10-19",
  "servicios/importacion": "2026-10-15",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routes).flatMap(([path, lastModified]) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, absoluteUrl(l, path)]),
        ),
      },
    })),
  );
}
