import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaButton } from "@/components/ui/cta-button";

type Category = { titulo: string; items: string[] };

type ProductCategoriesProps = {
  eyebrow: string;
  title: string;
  categories: Category[];
  /** Background image per category, in the same order. */
  images: string[];
  cta: { titulo: string; parrafo: string; cta: string };
};

/**
 * "¿Qué productos elaboramos?" — a 2×2 grid of category cards, each with a
 * photographic background, a title and a checklist of products. Closes with a
 * centered "don't see your product?" prompt and CTA.
 */
export function ProductCategories({
  eyebrow,
  title,
  categories,
  images,
  cta,
}: ProductCategoriesProps) {
  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((category, i) => (
            <div
              key={category.titulo}
              className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[8px] border border-border p-8 lg:p-10"
            >
              {images[i] ? (
                <Image
                  src={images[i]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />

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
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-semibold tracking-[0.02em] text-brand-ink">
              {cta.titulo}
            </p>
            <p className="max-w-[600px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
              {cta.parrafo}
            </p>
          </div>
          <CtaButton href="/contacto">{cta.cta}</CtaButton>
        </div>
      </Container>
    </section>
  );
}
