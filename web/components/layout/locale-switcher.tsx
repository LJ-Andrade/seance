"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Compact ES | EN segmented control. Switches locale while keeping the user on
 * the same logical page (SEO requirement), not sending them back home.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("navegacion");

  return (
    <div
      role="group"
      aria-label={t("cambiarIdioma")}
      className="flex items-center gap-0.5 rounded-full border border-brand-muted/40 p-0.5"
    >
      {routing.locales.map((l) => {
        const isActive = l === locale;
        const className = cn(
          "rounded-full px-2.5 py-1 text-xs font-medium uppercase transition-colors",
          isActive
            ? "bg-brand-teal text-brand-cream"
            : "text-brand-muted hover:text-brand-ink",
        );

        return isActive ? (
          <span key={l} aria-current="page" className={className}>
            {l}
          </span>
        ) : (
          <a
            key={l}
            href={getPathname({ locale: l, href: pathname })}
            hrefLang={l}
            lang={l}
            className={className}
          >
            {l}
          </a>
        );
      })}
    </div>
  );
}
