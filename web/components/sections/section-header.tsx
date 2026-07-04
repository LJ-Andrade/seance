import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";

/**
 * Eyebrow + serif title block that opens most sections. Optionally renders a
 * supporting paragraph. Shared so every section heading stays consistent.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading>{title}</Heading>
      {description ? (
        <p className="max-w-[720px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
