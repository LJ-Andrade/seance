import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationNode, websiteNode } from "@/lib/structured-data";
import { cormorant, inter } from "@/lib/fonts";
import "../globals.css";


/** Pre-render every locale at build time (static rendering, best for CWV). */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this request.
  setRequestLocale(locale);

  // Only Client Components need serialized messages; ship just their
  // namespaces instead of the whole dictionary on every page.
  const messages = await getMessages();
  const clientMessages = {
    navegacion: messages.navegacion,
    contacto: messages.contacto,
  };

  // Shared entities on every page, so page-level nodes can reference them.
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd nodes={[organizationNode(tFooter("tagline")), websiteNode(locale)]} />
        <NextIntlClientProvider messages={clientMessages}>
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
