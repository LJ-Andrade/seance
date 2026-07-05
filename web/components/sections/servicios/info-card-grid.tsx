import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { cn } from "@/lib/utils";

type Item = { titulo: string; descripcion: string };

type InfoCardGridProps = {
  eyebrow?: string;
  title: string;
  items: Item[];
  columns?: 3 | 4;
};

/**
 * Section with an eyebrow + title and a responsive grid of simple text cards
 * (serif title + description). Reused for "¿A quién servimos?" and "¿Es para
 * vos?" across the service pages.
 */
export function InfoCardGrid({
  eyebrow,
  title,
  items,
  columns = 4,
}: InfoCardGridProps) {
  return (
    <section className="bg-brand-cream-3 py-16 md:py-24">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div
          className={cn(
            "mt-12 grid gap-6",
            columns === 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((item) => (
            <div
              key={item.titulo}
              className="flex flex-col gap-3 rounded-[8px] bg-brand-cream p-10"
            >
              <h3 className="font-serif text-3xl leading-tight text-brand-slate">
                {item.titulo}
              </h3>
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
