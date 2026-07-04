import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";

/**
 * Public route inventory, shared across locales. Each entry is a logical path
 * without the locale prefix. Add new pages here so every localized variant is
 * enumerated in the sitemap with hreflang alternates.
 */
const routes: string[] = [
  "", // home
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, absoluteUrl(l, path)]),
        ),
      },
    })),
  );
}
