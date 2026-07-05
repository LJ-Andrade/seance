import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceHero } from "@/components/sections/servicios/service-hero";
import {
  ProcessSteps,
  type ProcessStep,
} from "@/components/sections/servicios/process-steps";
import { SplitFeature } from "@/components/sections/servicios/split-feature";
import { HighlightBand } from "@/components/sections/servicios/highlight-band";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.importacion" });

  return buildMetadata({
    locale,
    path: "servicios/importacion",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function ImportacionPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "servicios.importacion" });

  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.titulo")}
        paragraph={t("hero.parrafo")}
        ctaLabel={t("hero.cta")}
        image="/images/servicios/import-hero.png"
        imageAlt={t("hero.imagenAlt")}
      />

      <TrustBar />

      <ProcessSteps
        eyebrow={t("recorrido.eyebrow")}
        title={t("recorrido.titulo")}
        paragraph={t("recorrido.parrafo")}
        steps={t.raw("recorrido.pasos") as ProcessStep[]}
      />

      <SplitFeature
        eyebrow={t("cumplimiento.eyebrow")}
        title={t("cumplimiento.titulo")}
        paragraph={t("cumplimiento.parrafo")}
        bullets={t.raw("cumplimiento.bullets")}
        image="/images/servicios/import-cumplimiento.png"
        imageAlt={t("cumplimiento.imagenAlt")}
        imageSide="left"
        background="white"
      />

      <HighlightBand
        icon={ShieldCheck}
        eyebrow={t("titularidad.eyebrow")}
        title={t("titularidad.titulo")}
        paragraph={t("titularidad.parrafo")}
      />

      <CtaBand
        title={t("cierre.titulo")}
        description={t("cierre.parrafo")}
        ctaLabel={t("cierre.cta")}
      />
    </main>
  );
}
