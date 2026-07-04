import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton } from "@/components/ui/cta-button";

/**
 * Home hero. Left-aligned copy over a warm cream gradient, with the product
 * line rendered on the right and faded into the background so the text stays
 * legible. Server Component — no client interactivity.
 */
export function Hero() {
  const t = useTranslations("inicio.hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-cream-deep to-[#fefbf6]">
      {/* Product image, right side. Hidden on small screens to keep copy clean.
          The image itself is masked to fade out toward the left, so it blends
          into whatever background is behind it (no colored overlay = no seam). */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[70%] md:block lg:w-[62%]">
        <Image
          src="/images/hero-productos.png"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 62vw, 0px"
          className="object-contain object-right [mask-image:linear-gradient(to_right,transparent,#000_45%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_45%)]"
        />
      </div>

      <Container className="relative">
        <div className="flex min-h-[520px] max-w-[840px] flex-col justify-center gap-6 py-20 md:min-h-[646px] md:py-0">
          <Eyebrow>{t("eyebrow")}</Eyebrow>

          <h1 className="font-serif text-4xl font-medium italic leading-[1.02] tracking-tight text-brand-ink sm:text-5xl lg:text-[80px] lg:leading-[80px]">
            {t("titulo")}
          </h1>

          <p className="max-w-[720px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("parrafo")}
          </p>

          <div className="pt-4">
            <CtaButton href="#contacto">{t("cta")}</CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
