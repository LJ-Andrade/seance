import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centered content wrapper matching the design grid: max width 1540px with the
 * 62px horizontal gutters used across every section (reduced on small screens).
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1540px] px-6 md:px-[62px]", className)}>
      {children}
    </Tag>
  );
}
