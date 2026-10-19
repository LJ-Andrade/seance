import { routing } from "@/i18n/routing";

/**
 * Site-wide constants. The absolute base URL is required for canonical URLs,
 * hreflang alternates, sitemap and Open Graph tags, so it must be an absolute
 * origin in production.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment (e.g.
 * `https://www.laboratorioseance.com`). It falls back to localhost for local
 * development only.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Laboratorio Séance",
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  contact: {
    // Order matters: [0] general inbox, [1] foreign trade (used by page CTAs and JSON-LD).
    emails: [
      "info@laboratorioseance.com.ar",
      "comex@laboratorioseance.com.ar",
      "seancepelliza@gmail.com",
    ],
    phone: "+54 11 4750-0763",
    /** WhatsApp line as displayed; `whatsappNumber` is its wa.me form. */
    whatsapp: "(+54) 9 11-5740-6182",
    address: "Directorio 3548, Caseros, Buenos Aires, Argentina",
    addressLines: ["Directorio 3548, Caseros", "(1678) Buenos Aires, Argentina"],
  },
  social: {
    youtube: "https://www.youtube.com/@AndreaPellizaOK",
    facebook: "https://www.facebook.com/seancesrl/",
    linkedin: "https://www.linkedin.com/company/seancesrl/",
  },
  whatsappNumber: "5491157406182",
  // Google Maps "Seance" place (Directorio 3548, Caseros).
  maps: {
    query: "Seance, Directorio 3548, Caseros, Buenos Aires, Argentina",
    lat: -34.6145544,
    lng: -58.549096,
    placeUrl: "https://www.google.com/maps/place/Seance/@-34.6145544,-58.549096,17z",
  },
} as const;

/** WhatsApp click-to-chat URL with a localized prefilled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** `tel:` href for a display-formatted phone number. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Absolute URL for a given locale + path (path without leading locale). */
export function absoluteUrl(locale: string, path = ""): string {
  const clean = path.replace(/^\//, "");
  return `${siteUrl}/${locale}${clean ? `/${clean}` : ""}`;
}
