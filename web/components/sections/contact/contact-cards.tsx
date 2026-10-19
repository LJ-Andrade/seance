import type { LucideIcon } from "lucide-react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig, telHref, whatsappUrl } from "@/lib/site";

/**
 * Direct contact channels shown below the form: email, phone + WhatsApp,
 * address and business hours, each in its own card (four in a row from xl).
 * Server Component — content from `siteConfig.contact`.
 */
export function ContactCards() {
  const t = useTranslations("contacto.tarjetas");
  const tComun = useTranslations("comun");
  const tFooter = useTranslations("footer");
  const { contact } = siteConfig;

  const cards: Array<{
    icon: LucideIcon;
    title: string;
    lines: Array<{ text: string; href?: string; label?: string; external?: boolean }>;
  }> = [
    {
      icon: Mail,
      title: t("email"),
      lines: contact.emails.map((email) => ({ text: email, href: `mailto:${email}` })),
    },
    {
      icon: Phone,
      title: t("telefono"),
      lines: [
        { text: contact.phone, href: telHref(contact.phone) },
        {
          text: `WhatsApp ${contact.whatsapp}`,
          href: whatsappUrl(tFooter("whatsappMensaje")),
          label: `${tFooter("whatsapp")}: ${contact.whatsapp}`,
          external: true,
        },
      ],
    },
    {
      icon: MapPin,
      title: t("direccion"),
      lines: [{ text: contact.addressLines.join(", ") }],
    },
    {
      icon: Clock,
      title: t("horario"),
      lines: [{ text: tComun("horario") }],
    },
  ];

  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {cards.map(({ icon: Icon, title, lines }, i) => (
            <Reveal
              key={title}
              delay={i * 110}
              className="flex flex-col gap-5 rounded-[8px] border border-border bg-white p-7 xl:p-5"
            >
              <span className="flex size-12 items-center justify-center rounded-[8px] bg-brand-cream-2 text-brand-teal">
                <Icon className="size-6" aria-hidden />
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold tracking-[0.02em] text-brand-slate">
                  {title}
                </p>
                {lines.map(({ text, href, label, external }) => (
                  <p
                    key={text}
                    className="text-sm leading-[22px] break-words text-brand-muted"
                  >
                    {href ? (
                      <a
                        href={href}
                        aria-label={label}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="transition-colors hover:text-brand-teal"
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
