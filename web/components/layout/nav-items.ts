export type NavLinkItem = {
  /** Locale-aware href (internal path). */
  href: string;
  label: string;
};

/**
 * Top-level navigation entry: either a plain link or a dropdown parent (e.g.
 * Servicios), which is a disclosure label without its own destination.
 */
export type NavItem =
  | (NavLinkItem & { children?: undefined })
  | { href?: undefined; label: string; children: NavLinkItem[] };
