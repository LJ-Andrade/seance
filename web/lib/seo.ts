import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, siteUrl, siteConfig } from "@/lib/site";

type BuildMetadataArgs = {
  locale: string;
  /** Logical path shared across locales, without the locale prefix (e.g. "servicios"). Empty for home. */
  path?: string;
  title: string;
  description: string;
  /** Search keywords when explicitly provided for the route. */
  keywords?: string[];
  /** Open Graph image path relative to the site (optional). */
  ogImage?: string;
};

/**
 * Builds a complete, SEO-compliant Metadata object for a localized route:
 * canonical URL, hreflang alternates for every supported locale (plus
 * `x-default`), and Open Graph tags. Every page must resolve its title and
 * description from the translation dictionaries and pass them here.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  ogImage,
}: BuildMetadataArgs): Metadata {
  const canonical = absoluteUrl(locale, path);
  const openGraphLocale = locale === "es" ? "es_AR" : "en_US";
  const alternateLocale = routing.locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => (candidate === "es" ? "es_AR" : "en_US"));

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = absoluteUrl(l, path);
  }
  // x-default points at the default locale variant.
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: openGraphLocale,
      alternateLocale,
      url: canonical,
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}
