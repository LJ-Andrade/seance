import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServiceHero } from "@/components/sections/servicios/service-hero";
import { InfoCardGrid } from "@/components/sections/servicios/info-card-grid";
import { ProductCategories } from "@/components/sections/servicios/product-categories";
import {
  ProcessSteps,
  type ProcessStep,
} from "@/components/sections/servicios/process-steps";
import { AnmatBand } from "@/components/sections/servicios/anmat-band";
import { CtaBand } from "@/components/sections/cta-band";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const PRODUCT_IMAGES = [
  "/images/servicios/prod-faciales.png",
  "/images/servicios/prod-perfumes.png",
  "/images/servicios/prod-capilares.png",
  "/images/servicios/prod-corporales.png",
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.fabricacion" });

  return buildMetadata({
    locale,
    path: "servicios/fabricacion",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function FabricacionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "servicios.fabricacion" });

  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.titulo")}
        paragraph={t("hero.parrafo")}
        ctaLabel={t("hero.cta")}
        image="/images/servicios/fabricacion-hero.png"
        imageAlt={t("hero.imagenAlt")}
      />

      <TrustBar />

      <InfoCardGrid
        eyebrow={t("quienes.eyebrow")}
        title={t("quienes.titulo")}
        items={t.raw("quienes.items")}
        columns={4}
      />

      <ProductCategories
        eyebrow={t("productos.eyebrow")}
        title={t("productos.titulo")}
        categories={t.raw("productos.categorias")}
        images={PRODUCT_IMAGES}
        cta={t.raw("productos.sinProducto")}
      />

      <ProcessSteps
        eyebrow={t("proceso.eyebrow")}
        title={t("proceso.titulo")}
        paragraph={t("proceso.parrafo")}
        steps={t.raw("proceso.pasos") as ProcessStep[]}
      />

      <AnmatBand title={t("anmat.titulo")} paragraph={t("anmat.parrafo")} />

      <CtaBand
        title={t("cierre.titulo")}
        description={t("cierre.parrafo")}
        ctaLabel={t("cierre.cta")}
      />
    </main>
  );
}
