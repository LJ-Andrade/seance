import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { faqPageNode, serviceNode, type FaqItem } from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { pageBreadcrumb } from "@/lib/breadcrumbs";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/servicios/faq-section";
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
  const breadcrumb = await pageBreadcrumb(locale, "importacion", "servicios/importacion");

  const t = await getTranslations({ locale, namespace: "servicios.importacion" });
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumb,
          serviceNode({
            locale,
            path: "servicios/importacion",
            // The hero H1 is a two-line slogan; the eyebrow names the service.
            name: t("hero.eyebrow"),
            description: t("hero.parrafo"),
            serviceType:
              locale === "en"
                ? "Full cosmetics import"
                : "Importación integral de cosméticos",
          }),
          faqPageNode(locale, "servicios/importacion", faqItems),
        ]}
      />
      <main className="flex flex-1 flex-col">
        <ServiceHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.titulo")}
          paragraph={t("hero.parrafo")}
          ctaLabel={t("hero.cta")}
          image="/images/servicios/import-hero.png"
          mobileImage="/images/servicios/import-hero.mobile.png"
          imageAlt={t("hero.imagenAlt")}
          // The containers in the portrait image reach ~92vw; start the copy below them.
          mobileCopyOffset="pt-[100vw]"
        />

        <TrustBar items={t.raw("confianza") as string[]} />

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
          highlight={t.raw("cumplimiento.destacado")}
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

        <FaqSection
          eyebrow={t("faq.eyebrow")}
          title={t("faq.titulo")}
          items={faqItems}
        />

        <CtaBand
          eyebrow={t("cierre.eyebrow")}
          title={t("cierre.titulo")}
          description={t("cierre.parrafo")}
          note={t("cierre.plazo")}
          ctaLabel={t("cierre.cta")}
          // Foreign-trade inbox (comex@), as specified for this page's closing.
          email={siteConfig.contact.emails[1]}
        />
      </main>
    </>
  );
}
