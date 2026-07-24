import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Lead magnet: the downloadable ANMAT registration guide, with the guide cover
 * image on the left and copy + download link on the right.
 */
export function Guia() {
  const t = useTranslations("inicio.guia");

  return (
    <section className="bg-brand-cream-2 py-20 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal
          from="left"
          className="relative aspect-[733/410] w-full overflow-hidden rounded-lg bg-brand-cream-3"
        >
          <Image
            src="/images/guia-de-registro.jpg"
            alt={t("titulo")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal from="right" delay={120} className="flex flex-col gap-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading className="text-3xl sm:text-4xl lg:text-[44px]">
            {t("titulo")}
          </Heading>
          <p className="max-w-[560px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("parrafo")}
          </p>
          <div className="mt-2">
            <CtaButton
              href="/docs/guia-de-registro-anmat-productos-importados.docx"
              download
            >
              {t("enlace")}
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
