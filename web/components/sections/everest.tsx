import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

/**
 * Own-brand callout ("Everest"): a bordered strip with the brand mark and a
 * short trust statement.
 *
 * TODO: replace the text mark with the Everest logo asset once exported.
 */
export function Everest() {
  const t = useTranslations("inicio.everest");

  return (
    <section className="bg-brand-cream py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-start gap-8 rounded-lg border border-border bg-white p-8 md:flex-row md:items-center md:gap-12">
          <div className="flex h-[92px] w-full shrink-0 items-center justify-center rounded-md bg-brand-cream-2 md:w-[263px]">
            <span className="font-serif text-2xl uppercase tracking-[0.2em] text-brand-slate">
              Everest
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-3xl text-brand-slate">{t("titulo")}</h3>
            <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
              {t("parrafo")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
