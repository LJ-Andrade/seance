import { Building2, CircleX, FlaskConical } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { ArrowLink } from "@/components/ui/arrow-link";

type Item = { titulo: string; descripcion: string; enlace: string };

type SolutionsOverviewProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  items: Item[];
};

const ICONS = [FlaskConical, Building2, CircleX];
const HREFS = [
  "/servicios/fabricacion",
  "/servicios/hosting",
  "/servicios/importacion",
];

/**
 * Overview of the three services, linking through to each service page.
 */
export function SolutionsOverview({
  eyebrow,
  title,
  paragraph,
  items,
}: SolutionsOverviewProps) {
  return (
    <section className="bg-brand-cream-2 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader eyebrow={eyebrow} title={title} description={paragraph} />

        <div className="grid gap-8 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={item.titulo}
                className="flex flex-1 flex-col gap-6 rounded-lg bg-brand-cream p-10"
              >
                <div className="flex size-14 items-center justify-center rounded-lg bg-brand-cream-2">
                  {Icon ? (
                    <Icon className="size-7 text-brand-teal" aria-hidden />
                  ) : null}
                </div>
                <h3 className="font-serif text-3xl text-brand-slate">
                  {item.titulo}
                </h3>
                <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                  {item.descripcion}
                </p>
                <ArrowLink href={HREFS[i]} className="mt-auto">
                  {item.enlace}
                </ArrowLink>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
