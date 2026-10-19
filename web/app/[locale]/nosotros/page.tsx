import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { aboutPageNode } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { pageBreadcrumb } from "@/lib/breadcrumbs";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBand } from "@/components/sections/cta-band";
import { AboutHero } from "@/components/sections/nosotros/about-hero";
import { SolutionsOverview } from "@/components/sections/nosotros/solutions-overview";
import { Capabilities } from "@/components/sections/nosotros/capabilities";
import { AudienceCards } from "@/components/sections/nosotros/audience-cards";
import { MissionVision } from "@/components/sections/nosotros/mission-vision";
import { Values } from "@/components/sections/nosotros/values";
import { OwnBrand } from "@/components/sections/nosotros/own-brand";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.nosotros" });

  return buildMetadata({
    locale,
    path: "nosotros",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function NosotrosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumb = await pageBreadcrumb(locale, "nosotros", "nosotros");

  const t = await getTranslations({ locale, namespace: "nosotros" });

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumb,
          aboutPageNode(locale, t("hero.titulo"), t("hero.parrafo")),
        ]}
      />
      <main className="flex flex-1 flex-col">
        <AboutHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.titulo")}
          paragraph={t("hero.parrafo")}
          videoAlt={t("hero.videoAlt")}
          scopeTitle={t("hero.alcance.titulo")}
          scopeItems={t.raw("hero.alcance.items") as string[]}
        />

        <TrustBar />

        <SolutionsOverview
          eyebrow={t("soluciones.eyebrow")}
          title={t("soluciones.titulo")}
          paragraph={t("soluciones.parrafo")}
          items={t.raw("soluciones.items")}
        />

        <Capabilities
          eyebrow={t("capacidades.eyebrow")}
          title={t("capacidades.titulo")}
          metrics={t.raw("capacidades.cifras")}
          items={t.raw("capacidades.items")}
        />

        <AudienceCards
          eyebrow={t("marcas.eyebrow")}
          title={t("marcas.titulo")}
          items={t.raw("marcas.items")}
        />

        <MissionVision
          mision={t.raw("mision")}
          vision={t.raw("vision")}
        />

        <Values eyebrow={t("valores.eyebrow")} items={t.raw("valores.items")} />

        <OwnBrand
          eyebrow={t("everest.eyebrow")}
          title={t("everest.titulo")}
          paragraph={t("everest.parrafo")}
          products={t.raw("everest.productos")}
          logoAlt={t("everest.logoAlt")}
        />

        <CtaBand
          title={t("cierre.titulo")}
          description={t("cierre.parrafo")}
          ctaLabel={t("cierre.cta")}
          liquidEffect
        />
      </main>
    </>
  );
}
