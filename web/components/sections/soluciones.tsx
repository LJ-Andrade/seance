import { Building2, CircleX, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import {
  SolucionCard,
  type SolucionCardProps,
} from "@/components/sections/solucion-card";

/**
 * "Soluciones integrales para tu Marca" — three solution cards over the warm
 * cream background.
 */
export function Soluciones() {
  const t = useTranslations("inicio.soluciones");

  const cards: Array<Pick<SolucionCardProps, "icon" | "href"> & { key: string }> =
    [
      { key: "fabricacion", icon: FlaskConical, href: "#servicios" },
      { key: "hosting", icon: Building2, href: "#servicios" },
      { key: "importacion", icon: CircleX, href: "#servicios" },
    ];

  return (
    <section id="servicios" className="bg-brand-cream-2 py-20 md:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={t("eyebrow")} title={t("titulo")} />

        <div className="flex flex-col gap-8 lg:flex-row">
          {cards.map(({ key, icon, href }) => (
            <SolucionCard
              key={key}
              icon={icon}
              href={href}
              titulo={t(`items.${key}.titulo`)}
              subtitulo={t(`items.${key}.subtitulo`)}
              descripcion={t(`items.${key}.descripcion`)}
              enlace={t(`items.${key}.enlace`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
