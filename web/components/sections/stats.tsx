import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

type Stat = { valor: string; etiqueta: string };

/**
 * Four headline metrics (registered brands, processed SKUs, compliance, years).
 */
export function Stats() {
  const t = useTranslations("inicio.stats");
  const items = t.raw("items") as Stat[];

  return (
    <section className="bg-brand-cream py-16 md:py-20">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
        {items.map((stat) => (
          <div key={stat.etiqueta} className="flex flex-col gap-3">
            <span className="font-serif text-6xl leading-none text-brand-teal lg:text-[84px]">
              {stat.valor}
            </span>
            <span className="max-w-[200px] text-sm leading-[22px] text-brand-muted">
              {stat.etiqueta}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
