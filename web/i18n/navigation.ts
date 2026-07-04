import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers. Use these instead of the ones from
 * `next/navigation` and `next/link` so links and redirects keep the active
 * locale prefix automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
