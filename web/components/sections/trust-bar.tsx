import { useTranslations } from "next-intl";

/**
 * Thin credibility marquee: short uppercase claims separated by dots.
 */
export function TrustBar() {
  const t = useTranslations("inicio.confianza");
  const items = t.raw("bar") as string[];

  const renderItems = (duplicate = false) => (
    <ul
      className={`trust-marquee-group${duplicate ? " trust-marquee-copy" : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {items.map((text, i) => (
        <li
          key={text}
          className="flex shrink-0 items-center gap-6 text-[11px] font-medium uppercase tracking-[1.5px] text-brand-muted"
        >
          {i > 0 ? (
            <span className="size-1 rounded-full bg-brand-primary" aria-hidden />
          ) : null}
          {text}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="overflow-hidden border-b border-border bg-brand-cream py-3.5">
      <div className="trust-marquee-track">
        {renderItems()}
        {renderItems(true)}
      </div>
    </section>
  );
}
