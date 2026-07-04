import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

/**
 * "Quiénes somos" — company story with a founder quote card on the left and a
 * press photo with caption on the right.
 */
export function Nosotros() {
  const t = useTranslations("inicio.nosotros");

  return (
    <section id="nosotros" className="bg-brand-cream-2 py-20 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeader eyebrow={t("eyebrow")} title={t("titulo")} />

          <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("parrafo")}
          </p>

          <blockquote className="rounded-lg border border-brand-primary bg-brand-cream p-8">
            <p className="font-serif text-[22px] italic leading-snug text-brand-ink">
              {t("cita")}
            </p>
            <footer className="mt-3 text-sm text-brand-muted">
              {t("citaAutor")}
            </footer>
          </blockquote>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[926/398] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/fundador-c5n.png"
              alt={t("imagenAlt")}
              fill
              sizes="(min-width: 1024px) 668px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="rounded-lg border border-border bg-brand-cream p-5 text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("epigrafe")}
          </p>
        </div>
      </Container>
    </section>
  );
}
