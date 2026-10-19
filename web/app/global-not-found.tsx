import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NavLink } from "@/components/layout/nav-link";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { CtaButton } from "@/components/ui/cta-button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cormorant, inter } from "@/lib/fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("noEncontrado");

  return { title: t("metaTitulo"), robots: { index: false } };
}

const links = [
  { key: "nosotros", href: "/nosotros" },
  { key: "fabricacion", href: "/servicios/fabricacion" },
  { key: "hosting", href: "/servicios/hosting" },
  { key: "importacion", href: "/servicios/importacion" },
  { key: "productos", href: "/productos" },
  { key: "contacto", href: "/contacto" },
] as const;

/**
 * Localized, server-rendered 404 for unknown URLs. The locale comes from the
 * next-intl proxy; the page reuses the site chrome and lists the main sections
 * so visitors and agents can continue instead of hitting a dead end.
 */
export default async function GlobalNotFound() {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("noEncontrado");
  const tMigas = await getTranslations("migas");

  return (
    <html lang={locale} className={`${inter.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider
          messages={{ navegacion: messages.navegacion, contacto: messages.contacto }}
        >
          <Header />
          <main className="flex flex-1 flex-col bg-gradient-to-b from-brand-cream-deep to-[#fefbf6] py-20 md:py-28">
            <Container className="flex flex-col items-start gap-6">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h1 className="font-serif text-4xl font-medium italic leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-[64px]">
                {t("titulo")}
              </h1>
              <p className="max-w-[640px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                {t("parrafo")}
              </p>
              <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {links.map(({ key, href }) => (
                  <li key={key}>
                    <NavLink
                      href={href}
                      className="text-base font-semibold text-brand-teal underline-offset-4 hover:underline"
                    >
                      {tMigas(key)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <CtaButton href="/">{t("cta")}</CtaButton>
              </div>
            </Container>
          </main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
