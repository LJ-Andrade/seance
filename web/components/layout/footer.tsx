import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { NavLink } from "@/components/layout/nav-link";
import {
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/icons/brand-icons";
import { siteConfig, telHref, whatsappUrl } from "@/lib/site";

const serviceHrefs = [
  "/servicios/fabricacion",
  "/servicios/hosting",
  "/servicios/importacion",
];

const socials: Array<{
  key: keyof typeof siteConfig.social;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { key: "youtube", Icon: YoutubeIcon },
  { key: "facebook", Icon: FacebookIcon },
  { key: "linkedin", Icon: LinkedinIcon },
];

export function Footer() {
  const t = useTranslations("footer");
  const tComun = useTranslations("comun");
  const { contact, social } = siteConfig;
  const servicios = t.raw("servicios") as string[];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-cream-3">
      <Container className="pb-8 pt-20">
        {/* Brand + socials */}
        <div className="flex flex-col gap-6 border-b border-[#e4dfd4] pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/images/logo-seance-v2.png"
              alt={siteConfig.name}
              width={300}
              height={86}
              className="h-11 w-auto self-start"
            />
          </div>
          <div className="flex gap-2.5">
            {socials.map(({ key, Icon }) => (
              <a
                key={key}
                href={social[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`redes.${key}`)}
                className="flex size-9 items-center justify-center rounded-full border border-brand-muted/60 text-brand-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        {/* Five columns from xl; three per row at lg so the emails fit. */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.1fr_1fr_1.4fr_1.2fr_1.1fr]">
          <p className="max-w-[180px] text-sm leading-6 text-brand-muted">
            {t("tagline")}
          </p>

          <FooterColumn title={t("columnas.servicios")}>
            {servicios.map((label, i) => (
              <NavLink
                key={label}
                href={serviceHrefs[i]}
                className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
              >
                {label}
              </NavLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("columnas.escribinos")}>
            {contact.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
              >
                {email}
              </a>
            ))}
          </FooterColumn>

          <FooterColumn title={t("columnas.contactanos")}>
            <a
              href={telHref(contact.phone)}
              className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
            >
              {contact.phone}
            </a>
            <a
              href={whatsappUrl(t("whatsappMensaje"))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("whatsapp")}: ${contact.whatsapp}`}
              className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
            >
              WhatsApp {contact.whatsapp}
            </a>
            <p className="text-sm text-brand-muted">{tComun("horario")}</p>
          </FooterColumn>

          <FooterColumn title={t("columnas.direccion")}>
            <p className="text-sm leading-6 text-brand-muted">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </FooterColumn>
        </div>

        {/* Legal */}
        <div className="border-t border-[#e4dfd4] pt-7 text-center text-xs text-brand-muted">
          © {year} Laboratorio Séance SRL. {t("derechos")}
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-brand-slate">{title}</span>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
