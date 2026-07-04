import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
  className?: string;
  /** Hide the trailing arrow icon. */
  hideArrow?: boolean;
};

/**
 * Primary call-to-action used across the site (hero, header, final CTA,
 * newsletter…): solid teal button with a trailing arrow. Locale-aware for
 * internal paths; falls back to a plain anchor for hash and external links.
 */
export function CtaButton({
  href,
  children,
  size = "lg",
  variant = "default",
  className,
  hideArrow = false,
}: CtaButtonProps) {
  const isInternal = href.startsWith("/");

  const content = (
    <>
      {children}
      {!hideArrow ? <ArrowRight className="size-3.5" aria-hidden /> : null}
    </>
  );

  return (
    <Button
      asChild
      size={size}
      variant={variant}
      // Primary button spec from Figma (node 32:815): 12px/24px padding,
      // 14px semibold with 1px tracking, 8px radius, 8px gap.
      className={cn(
        "h-auto gap-2 rounded-[8px] px-6 py-3 text-sm font-semibold leading-6 tracking-[1px]",
        className,
      )}
    >
      {isInternal ? (
        <Link href={href}>{content}</Link>
      ) : (
        <a href={href}>{content}</a>
      )}
    </Button>
  );
}
