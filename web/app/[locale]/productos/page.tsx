import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import {
  everestBrandNode,
  productNodes,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
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

const PRODUCT_IMAGES = [
  "/images/productos/alcohol-gel.png",
  "/images/productos/alcohol-70.png",
  "/images/productos/jabon.png",
  "/images/productos/repelente.png",
  "/images/productos/shampoo.png",
  "/images/productos/acondicionador.png",
];

const PRODUCT_SLUGS = [
  "alcohol-en-gel",
  "alcohol-70",
  "jabon-liquido-bactericida",
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

        <section className="bg-white py-16 md:py-24">
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
