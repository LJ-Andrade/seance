import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Building2,
  FileText,
  RefreshCcw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import {
  faqPageNode,
  serviceNode,
  type FaqItem,
} from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { pageBreadcrumb } from "@/lib/breadcrumbs";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceHero } from "@/components/sections/servicios/service-hero";
import { SplitFeature } from "@/components/sections/servicios/split-feature";
import { IconCardGrid } from "@/components/sections/servicios/icon-card-grid";
import { HighlightBand } from "@/components/sections/servicios/highlight-band";
import { Responsibilities } from "@/components/sections/servicios/responsibilities";
import { CheckCards } from "@/components/sections/servicios/check-cards";
import { FaqSection } from "@/components/sections/servicios/faq-section";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.hosting" });

  return buildMetadata({
    locale,
    path: "servicios/hosting",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function HostingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumb = await pageBreadcrumb(locale, "hosting", "servicios/hosting");

  const t = await getTranslations({ locale, namespace: "servicios.hosting" });
  const faqItems = t.raw("faq.items") as FaqItem[];

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumb,
          serviceNode({
            locale,
            path: "servicios/hosting",
            // The eyebrow is the service name; the H1 is a longer benefit statement.
            name: t("hero.eyebrow"),
            description: t("hero.parrafo"),
            serviceType:
              locale === "en"
                ? "Regulatory hosting for cosmetics importers"
                : "Hosting regulatorio para importadores de cosméticos",
          }),
          faqPageNode(locale, "servicios/hosting", faqItems),
        ]}
      />
      <main className="flex flex-1 flex-col">
        <ServiceHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.titulo")}
          paragraph={t("hero.parrafo")}
          ctaLabel={t("hero.cta")}
          image="/images/servicios/hosting-hero.png"
          mobileImage="/images/servicios/hosting-hero-mobile.png"
          imageAlt={t("hero.imagenAlt")}
        />

        <TrustBar items={t.raw("confianza") as string[]} />

        <SplitFeature
          eyebrow={t("intro.eyebrow")}
          title={t("intro.titulo")}
          paragraphs={t.raw("intro.parrafos") as string[]}
          image="/images/servicios/hosting-intro.png"
          imageAlt={t("intro.imagenAlt")}
        />

        <IconCardGrid
          eyebrow={t("incluye.eyebrow")}
          title={t("incluye.titulo")}
          items={t.raw("incluye.items")}
          icons={[Building2, UserCheck, FileText, RefreshCcw]}
        />

        <HighlightBand
          icon={ShieldCheck}
          eyebrow={t("titularidad.eyebrow")}
          title={t("titularidad.titulo")}
          paragraph={t("titularidad.parrafo")}
        />

        <Responsibilities
          eyebrow={t("responsabilidades.eyebrow")}
          title={t("responsabilidades.titulo")}
          columns={t.raw("responsabilidades.columnas")}
          note={t("responsabilidades.nota")}
        />

        <CheckCards
          eyebrow={t("paraVos.eyebrow")}
          title={t("paraVos.titulo")}
          items={t.raw("paraVos.items")}
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
          // General inbox (info@), as specified for this page's closing.
          email={siteConfig.contact.emails[0]}
        />
      </main>
    </>
  );
}
