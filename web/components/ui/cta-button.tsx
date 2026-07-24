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
  /**
   * Render as a plain download anchor (bypasses the locale-aware Link so static
   * files under /public resolve correctly). Pass a string to set the saved
   * filename, or `true` to let the browser use the file's own name.
   */
  download?: boolean | string;
  /**
   * Enable the liquid-fill hover effect (a white wave rises from the bottom,
   * ends fully covering the button, and the label flips to dark ink). Tuned for
   * the default solid-teal button; turn it off for buttons that override the
   * background/foreground colors.
   */
  liquid?: boolean;
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
  download = false,
  liquid = true,
}: CtaButtonProps) {
  const isInternal = href.startsWith("/") && !download;

  const content = (
    <>
      {liquid ? (
        // Liquid fill: a white layer that rises from below on hover/focus with
        // a sloshing waterline (rotating carve shapes), then the waterline
        // climbs off the top so the button ends fully covered and still — see
        // globals.css (.cta-liquid).
        <span aria-hidden className="cta-liquid" />
      ) : null}
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-2",
          // Flip the label to dark ink once the gold has risen (slight delay so
          // the text stays readable on teal while the wave is still climbing).
          liquid &&
            "transition-colors duration-150 [transition-delay:180ms] group-hover/button:text-brand-ink group-focus-visible/button:text-brand-ink",
        )}
      >
        {children}
        {!hideArrow ? <ArrowRight className="size-3.5" aria-hidden /> : null}
      </span>
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
        // Keep the un-filled area solid teal (default variant lightens on hover)
        // so it contrasts cleanly with the rising wave. The thin ink outline
        // keeps the white-filled button defined against light backgrounds.
        liquid &&
          "relative isolate overflow-hidden hover:border-brand-ink/25 hover:bg-primary",
        className,
      )}
    >
      {isInternal ? (
        <Link href={href}>{content}</Link>
      ) : (
        <a
          href={href}
          download={download === true ? "" : download || undefined}
        >
          {content}
        </a>
      )}
    </Button>
  );
}
