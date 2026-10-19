import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Category = { titulo: string; items: string[] };

type ProductCategoriesProps = {
  eyebrow: string;
  title: string;
  categories: Category[];
  /** Background image per category, in the same order. */
  images: string[];
  cta: { titulo: string; parrafo: string; cta: string };
};

// Desktop span (out of 6 columns) for the cards of an incomplete last row.
const LAST_ROW_SPAN: Record<number, string> = {
  1: "lg:col-span-6",
  2: "lg:col-span-3",
};

/**
 * "¿Qué productos elaboramos?" — category cards, each with an optional
 * photographic background, a title and a checklist of products. On desktop
 * they fill rows of three; an incomplete last row stretches its cards (e.g.
 * five categories render as 3 + 2). Closes with a centered "don't see your
 * product?" prompt and CTA.
 */
export function ProductCategories({
  eyebrow,
  title,
  categories,
  images,
  cta,
}: ProductCategoriesProps) {
  const lastRowCount = categories.length % 3;

  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-6">
          {categories.map((category, i) => {
            const wide = i >= categories.length - lastRowCount;
            return (
              <Reveal
                key={category.titulo}
                delay={i * 110}
                className={cn(
                  "group relative flex min-h-[300px] flex-col overflow-hidden rounded-[8px] border border-border p-8 lg:p-10",
                  !images[i] && "min-h-0 bg-white",
                  wide ? LAST_ROW_SPAN[lastRowCount] : "lg:col-span-2",
                )}
              >
                {images[i] ? (
                  <Image
                    src={images[i]}
                    alt=""
                    fill
                    sizes={
                      wide
                        ? "(min-width: 1024px) 50vw, 100vw"
                        : "(min-width: 1024px) 33vw, 100vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : null}
                {images[i] ? (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
                ) : null}

                <div className="relative flex flex-col gap-4">
                  <h3 className="text-[28px] font-semibold tracking-[0.02em] text-brand-slate">
                    {category.titulo}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-teal shadow-sm">
                          <Check className="size-3" aria-hidden />
                        </span>
                        <span className="text-sm tracking-[0.02em] text-brand-slate">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-semibold tracking-[0.02em] text-brand-ink">
              {cta.titulo}
            </p>
            <p className="max-w-[600px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
              {cta.parrafo}
            </p>
          </div>
          <CtaButton href="/contacto">{cta.cta}</CtaButton>
        </Reveal>
      </Container>
    </section>
  );
}
