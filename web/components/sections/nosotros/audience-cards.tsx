import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

type Item = { titulo: string; descripcion: string };

type AudienceCardsProps = {
  eyebrow: string;
  title: string;
  items: Item[];
};

/**
 * "Marcas e Importadores que confían en Séance" — four audience segments as
 * simple text columns (teal heading + description).
 */
export function AudienceCards({ eyebrow, title, items }: AudienceCardsProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.titulo} className="flex flex-col gap-3">
              <h3 className="text-base font-semibold tracking-[0.02em] text-brand-teal">
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
