import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

/** Approximate characters needed for one marquee group to span wide screens. */
const MIN_GROUP_CHARS = 200;
/** Seconds per repetition, so the scroll speed stays the same at any length. */
const SECONDS_PER_REPEAT = 30;

/**
 * Thin credibility marquee: short uppercase claims separated by dots. Uses the
 * shared Home claims unless a page passes its own `items`. Short claim sets are
 * repeated inside each group so the loop never shows a gap on wide screens;
 * repeats are hidden from assistive tech and under reduced motion.
 */
export function TrustBar({ items: pageItems }: { items?: string[] } = {}) {
  const t = useTranslations("inicio.confianza");
  const items = pageItems ?? (t.raw("bar") as string[]);
  const chars = items.join("").length || 1;
  const repeats = Math.max(1, Math.ceil(MIN_GROUP_CHARS / chars));

  const renderItems = (duplicate = false) => (
    <ul
      className={`trust-marquee-group${duplicate ? " trust-marquee-copy" : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {Array.from({ length: repeats }, (_, r) =>
        items.map((text, i) => (
          <li
            key={`${r}-${text}`}
            aria-hidden={r > 0 || undefined}
            className={`flex shrink-0 items-center gap-6 text-[11px] font-medium uppercase tracking-[1.5px] text-brand-muted${r > 0 ? " trust-marquee-copy" : ""}`}
          >
            {i > 0 || r > 0 ? (
              <span className="size-1 rounded-full bg-brand-primary" aria-hidden />
            ) : null}
            {text}
          </li>
        )),
      )}
    </ul>
  );

  return (
    <section className="overflow-hidden border-b border-border bg-brand-cream py-3.5">
      <div
        className="trust-marquee-track"
        style={{ animationDuration: `${repeats * SECONDS_PER_REPEAT}s` } as CSSProperties}
      >
        {renderItems()}
        {renderItems(true)}
      </div>
    </section>
  );
}
