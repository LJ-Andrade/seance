import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

const keys = ["fabricacion", "hosting", "importacion"] as const;

/**
 * "Nuestros servicios" — a compact three-column breakdown of what each service
 * includes (text only, no cards).
 */
export function Servicios() {
  const t = useTranslations("inicio.servicios");

  return (
    <section className="bg-white py-20 md:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={t("eyebrow")} title={t("titulo")} />

        <div className="grid gap-10 md:grid-cols-3">
          {keys.map((key) => (
            <div key={key} className="flex flex-col gap-4">
              <h3 className="font-serif text-2xl text-brand-slate">
                {t(`items.${key}.titulo`)}
              </h3>
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                {t(`items.${key}.descripcion`)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
