import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";

export type ProcessStep = {
  numero: string;
  titulo: string;
  parrafo?: string;
  bullets?: string[];
  destacado?: { titulo: string; parrafo: string };
  tags?: string[];
};

type ProcessStepsProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  steps: ProcessStep[];
};

/**
 * "Fabricamos tu línea en 4 pasos" — a row of numbered step cards (terracotta
 * badges). Cards support an optional bullet list, a highlighted note and tag
 * pills, so heavier steps (e.g. formula development) render inline.
 */
export function ProcessSteps({
  eyebrow,
  title,
  paragraph,
  steps,
}: ProcessStepsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} description={paragraph} />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.numero} delay={i * 120} className="flex flex-col gap-5">
              <span className="flex size-12 items-center justify-center rounded-full bg-brand-primary text-base font-bold text-white shadow-[0px_10px_7.5px_rgba(144,138,129,0.25)]">
                {step.numero}
              </span>

              <div className="flex flex-1 flex-col gap-4 rounded-[8px] border border-border bg-white p-7">
                <h3 className="font-serif text-2xl leading-tight text-brand-slate">
                  {step.titulo}
                </h3>

                {step.parrafo ? (
                  <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                    {step.parrafo}
                  </p>
                ) : null}

                {step.bullets ? (
                  <ul className="flex flex-col gap-3">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-primary" />
                        <span className="text-sm font-semibold leading-[22px] tracking-[0.02em] text-brand-muted">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {step.destacado ? (
                  <div className="flex flex-col gap-2 rounded-[8px] border border-brand-primary bg-brand-cream p-5">
                    <p className="text-base font-semibold tracking-[0.02em] text-brand-primary">
                      {step.destacado.titulo}
                    </p>
                    <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                      {step.destacado.parrafo}
                    </p>
                  </div>
                ) : null}

                {step.tags ? (
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-brand-muted px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-brand-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
