import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Own-brand callout ("Everest"): a warm cream band with the brand logo plate
 * and a short trust statement, no bordered card.
 */
export function Everest() {
  const t = useTranslations("inicio.everest");

  return (
    <section className="bg-brand-cream-deep py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          <Reveal
            from="left"
            className="relative h-[92px] w-full shrink-0 overflow-hidden rounded-md bg-white md:w-[263px]"
          >
            <Image
              src="/images/logo-everest.jpg"
              alt={t("logoAlt")}
              fill
              sizes="263px"
              className="object-contain"
            />
          </Reveal>
          <Reveal from="right" delay={120} className="flex flex-col gap-2">
            <h3 className="font-serif text-3xl text-brand-slate">{t("titulo")}</h3>
            <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
              {t("parrafo")}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
