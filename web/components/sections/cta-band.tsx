import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

type CtaBandProps = {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref?: string;
};

/**
 * Full-width teal closing band with a centered heading and a light CTA button.
 * Reused at the bottom of the service pages ("Contanos sobre tu proyecto…").
 */
export function CtaBand({
  title,
  description,
  ctaLabel,
  ctaHref = "/contacto",
}: CtaBandProps) {
  return (
    <section className="bg-brand-teal py-16 md:py-20">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-[-0.01em] text-brand-cream sm:text-5xl lg:text-[54px]">
            {title}
          </h2>
          {description ? (
            <p className="max-w-[680px] text-base leading-[24px] tracking-[0.02em] text-brand-cream-2/90">
              {description}
            </p>
          ) : null}
          <CtaButton
            href={ctaHref}
            liquid={false}
            className="mt-2 bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            {ctaLabel}
          </CtaButton>
        </Reveal>
      </Container>
    </section>
  );
}
