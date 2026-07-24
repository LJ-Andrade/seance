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
    emails: ["seancepelliza@gmail.com", "seance.comex@gmail.com"],
    phones: ["(+54) 4750-0763", "(+54) 9 15-5740-6182"],
    address: "Directorio 3548, Caseros. Buenos Aires, Argentina",
  },
  footer: {
    email: "info@laboratorioseance.com.ar",
    phone: "(+54) 11 4750-0763",
    address: ["Directorio 3548, Caseros", "(1678) Buenos Aires, Argentina"],
  },
  social: {
    youtube: "#",
    facebook: "#",
    linkedin: "#",
  },
  whatsappUrl:
    "https://wa.me/541157406182?text=Hola%2C+me+interesa+conocer+m%C3%A1s+sobre+los+servicios+de+Laboratorio+S%C3%A9ance",
  // Google Maps "Seance" place (Directorio 3548, Caseros).
  maps: {
    query: "Seance, Directorio 3548, Caseros, Buenos Aires, Argentina",
    lat: -34.6145544,
    lng: -58.549096,
    placeUrl: "https://www.google.com/maps/place/Seance/@-34.6145544,-58.549096,17z",
  },
} as const;

/** Absolute URL for a given locale + path (path without leading locale). */
export function absoluteUrl(locale: string, path = ""): string {
  const clean = path.replace(/^\//, "");
  return `${siteUrl}/${locale}${clean ? `/${clean}` : ""}`;
}
