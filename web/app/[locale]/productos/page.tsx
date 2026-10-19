import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import {
  everestBrandNode,
  productNodes,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { pageBreadcrumb } from "@/lib/breadcrumbs";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/sections/productos/product-card";

type PageProps = {
  params: Promise<{ locale: string }>;
};

type Product = {
  titulo: string;
  descripcion: string;
  presentaciones: string[];
};

type DataSheet = { href: string; hrefLang: string };

/**
 * Data-sheet PDF for a product, read at build time from `public/fichas/<lang>/`.
 * Uses the page locale when that file exists and falls back to Spanish; returns
 * undefined when no sheet exists, which hides the download button.
 */
function dataSheet(locale: string, slug: string): DataSheet | undefined {
  for (const lang of [locale, "es"]) {
    const file = path.join(process.cwd(), "public", "fichas", lang, `${slug}.pdf`);
    if (existsSync(file)) return { href: `/fichas/${lang}/${slug}.pdf`, hrefLang: lang };
  }
  return undefined;
}

const PRODUCT_IMAGES = [
  "/images/productos/alcohol-gel.png",
  "/images/productos/alcohol-70.png",
  "/images/productos/jabon.png",
  "/images/productos/jabon-liquido.png",
  "/images/productos/repelente.png",
  "/images/productos/shampoo.png",
  "/images/productos/acondicionador.png",
];

const PRODUCT_SLUGS = [
  "alcohol-en-gel",
  "alcohol-70",
  "jabon-liquido-bactericida",
  "jabon-liquido",
  "repelente-en-spray",
  "shampoo",
  "acondicionador",
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.productos" });

  return buildMetadata({
    locale,
    path: "productos",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function ProductosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumb = await pageBreadcrumb(locale, "productos", "productos");

  const t = await getTranslations({ locale, namespace: "productos" });
  const items = t.raw("items") as Product[];
  const structuredProducts = items.map((item, index) => ({
    slug: PRODUCT_SLUGS[index],
    name: item.titulo,
    description: item.descripcion,
    image: PRODUCT_IMAGES[index],
    presentations: item.presentaciones,
  }));

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumb,
          everestBrandNode(locale),
          ...productNodes(locale, structuredProducts, t("presentaciones")),
        ]}
      />
      <main className="flex flex-1 flex-col">
        <section className="bg-gradient-to-b from-brand-cream-deep to-[#fefbf6] py-16 md:py-20">
          <Container>
            <div className="flex max-w-[820px] flex-col gap-5">
              <Heading as="h1">{t("hero.titulo")}</Heading>
              <p className="text-base leading-[24px] tracking-[0.02em] text-brand-muted">
                {t("hero.parrafo")}
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-gradient-to-b from-[#fefbf6] via-white to-white py-16 md:py-24">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.titulo} delay={(i % 3) * 110} className="flex">
                  <ProductCard
                    id={PRODUCT_SLUGS[i]}
                    titulo={item.titulo}
                    descripcion={item.descripcion}
                    presentaciones={item.presentaciones}
                    image={PRODUCT_IMAGES[i]}
                    presentacionesLabel={t("presentaciones")}
                    fichaLabel={t("ficha")}
                    ficha={dataSheet(locale, PRODUCT_SLUGS[i])}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <CtaBand
          title={t("cierre.titulo")}
          description={t("cierre.parrafo")}
          ctaLabel={t("cierre.cta")}
        />
      </main>
    </>
  );
}
