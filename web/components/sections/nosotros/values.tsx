import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type Item = { titulo: string; descripcion: string };

type ValuesProps = {
  eyebrow: string;
  items: Item[];
};

/**
 * Company values: an eyebrow over five columns, each a terracotta heading with
 * an accent rule and a short description.
 */
export function Values({ eyebrow, items }: ValuesProps) {
  return (
    <section className="bg-brand-cream-3 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 90} className="flex flex-col gap-3">
              <p className="text-base font-semibold tracking-[0.02em] text-brand-primary">
                {item.titulo}
              </p>
              <span className="h-0.5 w-5 bg-brand-primary" />
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-ink/80">
                {item.descripcion}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
