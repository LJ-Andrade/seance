"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Compact ES | EN segmented control. Switches locale while keeping the user on
 * the same logical page (SEO requirement), not sending them back home.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("navegacion");

  return (
    <div
      role="group"
      aria-label={t("cambiarIdioma")}
      className="flex items-center gap-0.5 rounded-full border border-brand-muted/40 p-0.5"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={l === locale}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium uppercase transition-colors",
            l === locale
              ? "bg-brand-teal text-brand-cream"
              : "text-brand-muted hover:text-brand-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
