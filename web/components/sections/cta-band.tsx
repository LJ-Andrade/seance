import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

type CtaBandProps = {
  /** Small uppercase line above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Short supporting line (e.g. response time) shown under the description. */
  note?: string;
  /** Contact email shown as a mailto link under the button. */
  email?: string;
  ctaLabel: string;
  ctaHref?: string;
  liquidEffect?: boolean;
};

/**
 * Full-width teal closing band with a centered heading and a light CTA button.
 * Reused at the bottom of the service pages ("Contanos sobre tu proyecto…").
 */
export function CtaBand({
  eyebrow,
  title,
  description,
  note,
  email,
  ctaLabel,
  ctaHref = "/contacto",
  liquidEffect = false,
}: CtaBandProps) {
  return (
    <section className="bg-brand-teal py-16 md:py-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[3px] text-brand-cream-2/80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-[-0.01em] text-brand-cream sm:text-5xl lg:text-[54px]">
            {title}
          </h2>
          {description ? (
            <p className="max-w-[680px] text-base leading-[24px] tracking-[0.02em] text-brand-cream-2/90">
              {description}
            </p>
          ) : null}
          {note ? (
            <p className="max-w-[680px] text-sm font-semibold leading-[22px] tracking-[0.02em] text-brand-cream">
              {note}
            </p>
          ) : null}
          <CtaButton
            href={ctaHref}
            liquid={liquidEffect}
            className={
              liquidEffect
                ? "mt-2 bg-brand-cream-3 text-brand-teal [--primary:#F0EBE1] hover:bg-brand-cream-3"
                : "mt-2 bg-brand-primary text-white hover:bg-brand-primary/90"
            }
          >
            {ctaLabel}
          </CtaButton>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="text-sm tracking-[0.04em] text-brand-cream-2/90 underline-offset-4 transition-colors hover:text-brand-cream hover:underline"
            >
              {email}
            </a>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
