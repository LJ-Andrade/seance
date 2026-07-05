import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import type { NavItem } from "@/components/layout/nav-items";
import { CtaButton } from "@/components/ui/cta-button";
import { siteConfig } from "@/lib/site";

/**
 * Site header: a top contact bar (desktop) plus the main navigation with logo,
 * links, locale switcher and the primary contact CTA. Sticky, with the brand
 * teal drop shadow from the design.
 */
export function Header() {
  const t = useTranslations("navegacion");
  const { contact } = siteConfig;

  const items: NavItem[] = [
    { href: "/", label: t("inicio") },
    { href: "/nosotros", label: t("equipo") },
    {
      href: "#servicios",
      label: t("servicios"),
      children: [
        { href: "/servicios/fabricacion", label: t("serviciosItems.fabricacion") },
        { href: "/servicios/hosting", label: t("serviciosItems.hosting") },
        { href: "/servicios/importacion", label: t("serviciosItems.importacion") },
      ],
    },
    { href: "/productos", label: t("productos") },
  ];

  const navLinkClass =
    "text-base font-semibold text-brand-slate transition-colors hover:text-brand-teal";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[4px_4px_8px_0px_rgba(15,76,92,0.16)]">
      {/* Top contact bar (desktop only). */}
      <div className="hidden border-b border-border lg:block">
        <Container className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-8 text-[13px] text-brand-muted">
            <span className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" aria-hidden />
              {contact.emails.join(" / ")}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" aria-hidden />
              {contact.phones.join(" / ")}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden />
              {contact.address}
            </span>
          </div>
          <LocaleSwitcher />
        </Container>
      </div>

      {/* Main navigation. */}
      <Container className="relative flex items-center justify-between py-3">
        <Link href="/" aria-label={siteConfig.name} className="shrink-0">
          <Image
            src="/images/logo-seance.png"
            alt={siteConfig.name}
            width={155}
            height={44}
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
