import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { contactPageNode, organizationNode } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { ContactMap } from "@/components/sections/contact/contact-map";
import { ContactCards } from "@/components/sections/contact/contact-cards";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadatos.contacto" });

  return buildMetadata({
    locale,
    path: "contacto",
    title: t("titulo"),
    description: t("descripcion"),
  });
}

export default async function ContactoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contacto" });

  return (
    <>
      <JsonLd
        nodes={[
          organizationNode(),
          contactPageNode(locale, t("titulo"), t("parrafo")),
        ]}
      />
      <main className="flex flex-1 flex-col">
        {/* Form + map */}
        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_1.4fr] lg:items-stretch lg:gap-14">
              <div className="flex flex-col gap-8">
                <header className="flex max-w-[560px] flex-col gap-2">
                  <h1 className="text-base font-semibold tracking-[0.02em] text-brand-slate">
                    {t("titulo")}
                  </h1>
                  <p className="text-base leading-[22px] tracking-[0.04em] text-brand-muted">
                    {t("parrafo")}
                  </p>
                </header>
                <ContactForm />
              </div>

              <ContactMap />
            </div>
          </Container>
        </section>

        {/* Direct channels */}
        <ContactCards />
      </main>
    </>
  );
}
