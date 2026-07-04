import { BookOpenText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { ArrowLink } from "@/components/ui/arrow-link";

/**
 * Lead magnet: the downloadable ANMAT registration guide, with a preview panel
 * on the left and copy + download link on the right.
 *
 * TODO: swap the placeholder panel for the real guide cover once exported.
 */
export function Guia() {
  const t = useTranslations("inicio.guia");

  return (
    <section className="bg-brand-cream-2 py-20 md:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex aspect-[733/410] w-full items-center justify-center rounded-lg bg-brand-cream-3">
          <BookOpenText className="size-16 text-brand-primary" aria-hidden />
        </div>

        <div className="flex flex-col gap-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading className="text-3xl sm:text-4xl lg:text-[44px]">
            {t("titulo")}
          </Heading>
          <p className="max-w-[560px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("parrafo")}
          </p>
          <ArrowLink href="#contacto" className="mt-2">
            {t("enlace")}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
