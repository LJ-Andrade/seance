import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

type AnmatBandProps = {
  title: string;
  paragraph: string;
};

/**
 * Centered highlight band ("Registro ANMAT sin esperas"): teal serif title on a
 * soft cream background. Reused across the service pages.
 */
export function AnmatBand({ title, paragraph }: AnmatBandProps) {
  return (
    <section className="bg-brand-cream-2 py-16 md:py-20">
      <Container>
        <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-3 text-center">
          <h2 className="font-serif text-3xl font-medium italic leading-[1.1] tracking-[-0.02em] text-brand-teal sm:text-4xl lg:text-[52px]">
            {title}
          </h2>
          <p className="text-base leading-[24px] tracking-[0.02em] text-brand-muted">
            {paragraph}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
