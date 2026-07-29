import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";

type OwnBrandProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  products: string[];
  logoAlt: string;
};

/**
 * "Marca propia" — the Everest own-brand block: copy and product pills beside
 * the Everest wordmark.
 */
export function OwnBrand({
  eyebrow,
  title,
  paragraph,
  products,
  logoAlt,
}: OwnBrandProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal from="left" className="flex flex-col gap-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading>{title}</Heading>
            <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
              {paragraph}
            </p>
            <div className="flex flex-wrap gap-3">
              {products.map((product) => (
                <span
                  key={product}
                  className="rounded-2xl border border-brand-teal px-4 py-2.5 text-[11px] font-medium uppercase tracking-[2px] text-brand-teal"
                >
                  {product}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal
            from="right"
            delay={120}
            className="flex h-[360px] items-center justify-center rounded-2xl bg-brand-cream p-12"
          >
            <Image
              src="/images/nosotros/everest-logo.png"
              alt={logoAlt}
              width={300}
              height={120}
              className="h-auto w-full max-w-[300px] object-contain"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
