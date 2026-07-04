import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

/**
 * Thin credibility strip: short uppercase claims separated by dots.
 */
export function TrustBar() {
  const t = useTranslations("inicio.confianza");
  const items = t.raw("bar") as string[];

  return (
    <section className="border-b border-border bg-brand-cream">
      <Container className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3.5">
        {items.map((text, i) => (
          <span
            key={text}
            className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[1.5px] text-brand-muted"
          >
            {i > 0 ? (
              <span className="size-1 rounded-full bg-brand-primary" aria-hidden />
            ) : null}
            {text}
          </span>
        ))}
      </Container>
    </section>
  );
}
