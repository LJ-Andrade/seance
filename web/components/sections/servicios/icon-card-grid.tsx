import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";

type Item = { titulo: string; descripcion: string };

type IconCardGridProps = {
  eyebrow?: string;
  title: string;
  items: Item[];
  /** One icon per item, in order. */
  icons: LucideIcon[];
  align?: "left" | "center";
};

/**
 * Grid of cards, each with an icon tile, a serif title and a description.
 * Reused for "Qué incluye el hosting regulatorio" and the import steps.
 */
export function IconCardGrid({
  eyebrow,
  title,
  items,
  icons,
  align = "center",
}: IconCardGridProps) {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            align={align}
            className={align === "center" ? "mx-auto max-w-[820px]" : undefined}
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                key={item.titulo}
                delay={i * 100}
                className="flex flex-col gap-6 rounded-[8px] border border-border bg-white p-8 lg:p-10"
              >
                <span className="flex size-14 items-center justify-center rounded-[8px] bg-brand-cream-2 text-brand-teal">
                  {Icon ? <Icon className="size-6" aria-hidden /> : null}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-serif text-3xl leading-tight text-brand-slate">
                    {item.titulo}
                  </h3>
                  <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                    {item.descripcion}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
