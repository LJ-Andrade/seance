import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small uppercase terracotta label that introduces most sections
 * (e.g. "¿Qué necesitás resolver?"). Inter Medium 11px, 2px tracking.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[2px] text-brand-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}
