import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";

type Metric = { valor: string; etiqueta: string };

type CapabilitiesProps = {
  eyebrow: string;
  title: string;
  /** Plant figures shown above the statements. */
  metrics: Metric[];
  items: string[];
};

/**
 * Technical capabilities: a title, a row of plant figures and a row of
 * check-marked statements.
 */
export function Capabilities({ eyebrow, title, metrics, items }: CapabilitiesProps) {
  return (
    <section className="bg-brand-cream-3 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <dl className="grid gap-8 border-y border-brand-muted/25 py-10 sm:grid-cols-3">
          {metrics.map((metric, i) => (
            <Reveal key={metric.etiqueta} delay={i * 90} className="flex flex-col gap-2">
              <dt className="order-2 text-sm leading-[22px] text-brand-muted">
                {metric.etiqueta}
              </dt>
              <dd className="order-1 font-serif text-5xl leading-none text-brand-teal sm:text-4xl lg:text-5xl xl:text-[64px]">
                {metric.valor}
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {items.map((item, i) => (
            <Reveal
              key={item}
              delay={i * 90}
              className="flex flex-col items-center gap-4 text-center"
            >
              <CheckCircle2 className="size-6 shrink-0 text-brand-primary" aria-hidden />
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-slate">
                {item}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
