import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

type Point = { titulo: string; descripcion: string };

type MethodPointsProps = {
  eyebrow?: string;
  title: string;
  paragraph: string;
  points: Point[];
  /** One icon per point, in order. */
  icons: LucideIcon[];
};

/**
 * Two-column section: a heading block on the left and a stack of icon + text
 * points on the right ("Seguridad, transparencia y claridad en cada paso").
 */
export function MethodPoints({
  eyebrow,
  title,
  paragraph,
  points,
  icons,
}: MethodPointsProps) {
  return (
    <section className="bg-brand-cream-2 py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeader eyebrow={eyebrow} title={title} description={paragraph} />

          <div className="flex flex-col gap-6">
            {points.map((point, i) => {
              const Icon = icons[i];
              return (
                <div key={point.titulo} className="flex items-start gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-white text-brand-teal shadow-[4px_4px_4px_rgba(15,76,92,0.12)]">
                    {Icon ? <Icon className="size-5" aria-hidden /> : null}
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold tracking-[0.02em] text-brand-ink">
                      {point.titulo}
                    </p>
                    <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                      {point.descripcion}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
