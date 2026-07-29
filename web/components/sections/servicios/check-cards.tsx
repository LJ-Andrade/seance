import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";

type CheckCardsProps = {
  title: string;
  items: string[];
};

/**
 * "¿Es para vos?" — a centered title over a row of check-marked audience cards.
 */
export function CheckCards({ title, items }: CheckCardsProps) {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <Reveal>
          <Heading className="text-center">{title}</Heading>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 100}
              className="flex items-start gap-5 rounded-[8px] border border-border bg-brand-cream p-8"
            >
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                <Check className="size-4" aria-hidden />
              </span>
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-ink">
                {item}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
