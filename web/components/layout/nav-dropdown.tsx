import { ChevronDown } from "lucide-react";
import { NavLink } from "@/components/layout/nav-link";
import type { NavItem } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

/**
 * Desktop nav item with a dropdown of child links (e.g. Servicios). Pure CSS
 * disclosure via `group-hover` / `group-focus-within`, so it stays a Server
 * Component and works for both mouse and keyboard users. The panel's top
 * padding bridges the gap so the menu doesn't close while moving the cursor.
 */
export function NavDropdown({
  item,
  className,
}: {
  item: NavItem;
  className?: string;
}) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="menu" className={cn("inline-flex items-center gap-1", className)}>
        {item.label}
        <ChevronDown
          className="size-4 transition-transform duration-200 group-hover:rotate-180"
          aria-hidden
        />
      </button>

      <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="min-w-[240px] rounded-lg border border-border bg-white p-2 shadow-[4px_4px_8px_0px_rgba(15,76,92,0.16)]">
          {item.children?.map((child) => (
            <li key={child.href}>
              <NavLink
                href={child.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-brand-slate transition-colors hover:bg-brand-cream-2 hover:text-brand-teal"
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
