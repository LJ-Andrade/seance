import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { TrustAnchor } from "@/components/sections/trust-anchor";
import { TrustBar } from "@/components/sections/trust-bar";
import { Soluciones } from "@/components/sections/soluciones";
import { Confidencialidad } from "@/components/sections/confidencialidad";
import { Stats } from "@/components/sections/stats";
import { Servicios } from "@/components/sections/servicios";
import { Proceso } from "@/components/sections/proceso";
import { Guia } from "@/components/sections/guia";
import { Registro } from "@/components/sections/registro";
import { Nosotros } from "@/components/sections/nosotros";
import { Everest } from "@/components/sections/everest";
import { Faq } from "@/components/sections/faq";
import { Cierre } from "@/components/sections/cierre";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.inicio" });

  return buildMetadata({
    locale,
    path: "",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TrustAnchor />
      <TrustBar />
      <Soluciones />
      <Confidencialidad />
      <Stats />
      <Servicios />
      <Proceso />
      <Guia />
      <Registro />
      <Nosotros />
      <Everest />
      <Faq />
      <Cierre />
    </main>
  );
}
