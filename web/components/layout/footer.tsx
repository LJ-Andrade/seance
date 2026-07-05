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
import { siteConfig } from "@/lib/site";

const linkHrefs = ["/", "/nosotros", "/contacto"];

const socials: Array<{
  key: keyof typeof siteConfig.social;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}> = [
  { key: "youtube", Icon: YoutubeIcon, label: "YouTube" },
  { key: "facebook", Icon: FacebookIcon, label: "Facebook" },
  { key: "linkedin", Icon: LinkedinIcon, label: "LinkedIn" },
];

export function Footer() {
  const t = useTranslations("footer");
  const { footer, social } = siteConfig;
  const links = t.raw("links") as string[];
  const servicios = t.raw("servicios") as string[];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-cream-3">
      <Container className="pb-8 pt-20">
        {/* Brand + socials */}
        <div className="flex flex-col gap-6 border-b border-[#e4dfd4] pb-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo-seance.png"
              alt={siteConfig.name}
              width={148}
              height={44}
              className="h-11 w-auto"
            />
            <p className="max-w-[540px] text-sm text-brand-muted">
              {t("tagline")}
            </p>
          </div>
          <div className="flex gap-2.5">
            {socials.map(({ key, Icon, label }) => (
              <a
                key={key}
                href={social[key]}
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-brand-muted/60 text-brand-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <p className="max-w-[180px] text-sm leading-6 text-brand-muted">
            {t("tagline")}
          </p>

          <FooterColumn title={t("columnas.links")}>
            {links.map((label, i) => (
              <NavLink
                key={label}
                href={linkHrefs[i] ?? "#"}
                className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
              >
                {label}
              </NavLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("columnas.servicios")}>
            {servicios.map((label) => (
              <NavLink
                key={label}
                href="#servicios"
                className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
              >
                {label}
              </NavLink>
            ))}
          </FooterColumn>

          <FooterColumn title={t("columnas.contacto")}>
            <a
              href={`mailto:${footer.email}`}
              className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
            >
              {footer.email}
            </a>
            <a
              href={`tel:${footer.phone.replace(/[^+\d]/g, "")}`}
              className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
            >
              {footer.phone}
            </a>
          </FooterColumn>

          <FooterColumn title={t("columnas.direccion")}>
            <p className="text-sm leading-6 text-brand-muted">
              {footer.address.map((line) => (
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
