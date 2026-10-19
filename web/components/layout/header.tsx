import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import type { NavItem } from "@/components/layout/nav-items";
import { CtaButton } from "@/components/ui/cta-button";
import { siteConfig, telHref, whatsappUrl } from "@/lib/site";
import { WhatsappIcon } from "@/components/icons/brand-icons";

/**
 * Site header: a top contact bar (desktop) plus the main navigation with logo,
 * links, locale switcher and the primary contact CTA. Sticky, with the brand
 * teal drop shadow from the design.
 */
export function Header() {
  const t = useTranslations("navegacion");
  const tFooter = useTranslations("footer");
  const { contact } = siteConfig;

  const items: NavItem[] = [
    { href: "/", label: t("inicio") },
    { href: "/nosotros", label: t("equipo") },
    {
      label: t("servicios"),
      children: [
        { href: "/servicios/fabricacion", label: t("serviciosItems.fabricacion") },
        { href: "/servicios/hosting", label: t("serviciosItems.hosting") },
        { href: "/servicios/importacion", label: t("serviciosItems.importacion") },
      ],
    },
    { href: "/productos", label: t("productos") },
  ];

  const contactLinkClass = "transition-colors hover:text-brand-teal";

  const navLinkClass =
    "text-base font-semibold text-brand-slate transition-colors hover:text-brand-teal";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[4px_4px_8px_0px_rgba(15,76,92,0.16)]">
      {/* Top contact bar (desktop only). */}
      <div className="hidden border-b border-border lg:block">
        <Container className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-6 whitespace-nowrap text-[13px] text-brand-muted xl:gap-8">
            <span className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden />
              <span>
                {contact.emails.map((email, i) => (
                  <span key={email}>
                    {i > 0 ? " / " : null}
                    <a href={`mailto:${email}`} className={contactLinkClass}>
                      {email}
                    </a>
                  </span>
                ))}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden />
              <a href={telHref(contact.phone)} className={contactLinkClass}>
                {contact.phone}
              </a>
            </span>
            {/* From xl only: at lg the bar can't fit three emails, two phones and
                the switcher; the floating WhatsApp button covers smaller widths. */}
            <span className="hidden items-center gap-2 xl:flex">
              <WhatsappIcon className="size-4 shrink-0" aria-hidden />
              <a
                href={whatsappUrl(tFooter("whatsappMensaje"))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${tFooter("whatsapp")}: ${contact.whatsapp}`}
                className={contactLinkClass}
              >
                {contact.whatsapp}
              </a>
            </span>
          </div>
          <LocaleSwitcher />
        </Container>
      </div>

      {/* Main navigation. */}
      <Container className="relative flex items-center justify-between py-3">
        <Link href="/" aria-label={siteConfig.name} className="shrink-0">
          <Image
            src="/images/logo-seance-v2.png"
            alt={siteConfig.name}
            width={300}
            height={86}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {items.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} className={navLinkClass} />
            ) : (
              <NavLink key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <CtaButton href="/contacto" size="sm" className="hidden sm:inline-flex">
            {t("contacto")}
          </CtaButton>
          <div className="lg:hidden">
            <LocaleSwitcher />
          </div>
          <MobileNav
            items={items}
            labels={{ open: t("abrirMenu"), close: t("cerrarMenu") }}
          />
        </div>
      </Container>
    </header>
  );
}
