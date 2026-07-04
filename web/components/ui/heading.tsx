import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Display heading in Cormorant Garamond italic, the serif used for every
 * section title in the design. Size scales responsively toward the ~60px used
 * on desktop.
 */
export function Heading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-serif text-4xl font-medium italic leading-[1.05] tracking-[-0.02em] text-brand-ink sm:text-5xl lg:text-[60px]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
