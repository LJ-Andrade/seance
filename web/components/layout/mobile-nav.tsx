"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/layout/nav-link";
import type { NavItem } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

/**
 * Mobile disclosure menu (shown below the desktop breakpoint). Labels are
 * resolved on the server and passed in, so this island stays translation-free.
 */
export function MobileNav({
  items,
  labels,
}: {
  items: NavItem[];
  labels: { open: string; close: string };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-md text-brand-ink"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div
        className={cn(
          "absolute inset-x-0 top-full z-50 origin-top border-b border-border bg-white shadow-lg transition",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col">
              <NavLink
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-semibold text-brand-slate hover:bg-brand-cream-2"
              >
                {item.label}
              </NavLink>
              {item.children ? (
                <div className="mb-1 flex flex-col border-l border-border pl-3">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2 py-2 text-sm font-medium text-brand-muted hover:bg-brand-cream-2 hover:text-brand-teal"
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
