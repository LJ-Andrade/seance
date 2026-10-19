import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { faqPageNode, serviceNode, type FaqItem } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { pageBreadcrumb } from "@/lib/breadcrumbs";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServiceHero } from "@/components/sections/servicios/service-hero";
import { InfoCardGrid } from "@/components/sections/servicios/info-card-grid";
import { ProductCategories } from "@/components/sections/servicios/product-categories";
import {
  ProcessSteps,
  type ProcessStep,
} from "@/components/sections/servicios/process-steps";
import { Registro } from "@/components/sections/registro";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const PRODUCT_IMAGES = [
  "/images/servicios/prod-faciales.png",
  "/images/servicios/prod-perfumes.png",
  "/images/servicios/prod-capilares.png",
  "/images/servicios/prod-corporales.png",
  "/images/servicios/domisanitarios.jpeg",
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
  const breadcrumb = await pageBreadcrumb(locale, "fabricacion", "servicios/fabricacion");

  const t = await getTranslations({ locale, namespace: "servicios.fabricacion" });
  // Same FAQ as Home (single source in `inicio.faq`), as requested by the client.
  const tFaq = await getTranslations({ locale, namespace: "inicio.faq" });
  const faqItems = tFaq.raw("items") as FaqItem[];

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumb,
          serviceNode({
            locale,
            path: "servicios/fabricacion",
            name: t("hero.titulo"),
            description: t("hero.parrafo"),
            serviceType:
              locale === "en"
                ? "Contract cosmetics manufacturing (private label)"
                : "Fabricación cosmética tercerista (private label)",
          }),
          faqPageNode(locale, "servicios/fabricacion", faqItems),
        ]}
      />
      <main className="flex flex-1 flex-col">
        <ServiceHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.titulo")}
          paragraph={t("hero.parrafo")}
          ctaLabel={t("hero.cta")}
          image="/images/servicios/fabricacion-hero.png"
          mobileImage="/images/servicios/fabricacion-hero-mobile.jpg"
          imageAlt={t("hero.imagenAlt")}
          fullDesktopImage
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

        <Registro
          title={t("anmat.titulo")}
          paragraphs={t.raw("anmat.parrafos") as string[]}
        />

        <Faq />

        <CtaBand
          title={t("cierre.titulo")}
          description={t("cierre.parrafo")}
          ctaLabel={t("cierre.cta")}
        />
      </main>
    </>
  );
}
