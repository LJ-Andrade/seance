import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BookOpen,
  Building2,
  Eye,
  FileText,
  Info,
  RefreshCcw,
  Shield,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { TrustBar } from "@/components/sections/trust-bar";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceHero } from "@/components/sections/servicios/service-hero";
import { SplitFeature } from "@/components/sections/servicios/split-feature";
import { IconCardGrid } from "@/components/sections/servicios/icon-card-grid";
import { HighlightBand } from "@/components/sections/servicios/highlight-band";
import { MethodPoints } from "@/components/sections/servicios/method-points";
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

  const t = await getTranslations({ locale, namespace: "servicios.hosting" });

  return (
    <main className="flex flex-1 flex-col">
      <ServiceHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.titulo")}
        paragraph={t("hero.parrafo")}
        ctaLabel={t("hero.cta")}
        image="/images/servicios/hosting-hero.png"
        imageAlt={t("hero.imagenAlt")}
      />

      <TrustBar />

      <SplitFeature
        eyebrow={t("intro.eyebrow")}
        title={t("intro.titulo")}
        paragraph={t("intro.parrafo")}
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

      <MethodPoints
        eyebrow={t("metodo.eyebrow")}
        title={t("metodo.titulo")}
        paragraph={t("metodo.parrafo")}
        points={t.raw("metodo.puntos")}
        icons={[Shield, Eye, Info, BookOpen]}
      />

      <CheckCards title={t("paraVos.titulo")} items={t.raw("paraVos.items")} />

      <FaqSection
        eyebrow={t("faq.eyebrow")}
        title={t("faq.titulo")}
        items={t.raw("faq.items")}
      />

      <CtaBand
        title={t("cierre.titulo")}
        description={t("cierre.parrafo")}
        ctaLabel={t("cierre.cta")}
      />
    </main>
  );
}
