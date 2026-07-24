import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";
import { Reveal } from "@/components/ui/reveal";

/**
 * "Quiénes somos" — company story with a founder quote card on the left and an
 * embedded YouTube video with caption on the right.
 */
export function Nosotros() {
  const t = useTranslations("inicio.nosotros");

  return (
    <section id="nosotros" className="bg-brand-cream-2 py-20 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal from="up" className="flex flex-col gap-8">
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
        </Reveal>

        <Reveal from="up" delay={120} className="flex flex-col gap-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <YouTubeEmbed
              id="pePrqcVz88s"
              title={t("imagenAlt")}
              poster="/images/thumbnail-home-video.jpg"
            />
          </div>
          <p className="rounded-lg border border-border bg-brand-cream p-5 text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("epigrafe")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
