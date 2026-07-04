import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Inline text link with a trailing arrow ("Ver fabricación →", "Descargar
 * guía →"). Teal, semibold. Locale-aware for internal paths.
 */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isInternal = href.startsWith("/");
  const classes = cn(
    "group inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-brand-teal transition-colors hover:text-brand-ink",
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRight
        className="size-3.5 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </>
  );

  return isInternal ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
