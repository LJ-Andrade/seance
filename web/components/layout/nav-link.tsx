import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Renders a locale-aware link for internal paths ("/…") and a plain anchor for
 * on-page hash targets ("#…"). Usable from both Server and Client Components.
 */
export function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: MouseEventHandler;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
