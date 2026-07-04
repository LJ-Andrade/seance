import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";

/**
 * Centered statement section: "Registro ANMAT sin esperas".
 */
export function Registro() {
  const t = useTranslations("inicio.registro");

  return (
    <section className="bg-brand-cream-2 py-20 md:py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Heading className="max-w-[800px]">{t("titulo")}</Heading>
        <p className="max-w-[800px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
          {t("parrafo")}
        </p>
      </Container>
    </section>
  );
}
