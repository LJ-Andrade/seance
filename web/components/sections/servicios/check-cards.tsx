import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";

type CheckCard = { titulo: string; descripcion: string };

type CheckCardsProps = {
  eyebrow?: string;
  title: string;
  items: CheckCard[];
};

/**
 * Audience section ("¿Es para tu proyecto?"): a centered header over a row of
 * check-marked cards, each with a title and a short description.
 */
export function CheckCards({ eyebrow, title, items }: CheckCardsProps) {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.titulo}
              delay={i * 100}
              className="flex items-start gap-5 rounded-[8px] border border-border bg-brand-cream p-8"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                <Check className="size-4" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-[24px] tracking-[0.02em] text-brand-ink">
                  {item.titulo}
                </h3>
                <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                  {item.descripcion}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
