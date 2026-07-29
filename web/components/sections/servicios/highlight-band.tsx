import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type HighlightBandProps = {
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  paragraph: string;
  variant?: "muted" | "teal";
};

/**
 * Centered emphasis band with an icon medallion, eyebrow, serif title and
 * paragraph on a solid background. Reused for the ownership guarantees
 * ("La titularidad siempre es tuya" / "Tu marca sigue siendo tuya").
 */
export function HighlightBand({
  icon: Icon,
  eyebrow,
  title,
  paragraph,
  variant = "muted",
}: HighlightBandProps) {
  return (
    <section
      className={cn("py-16 md:py-20", variant === "teal" ? "bg-brand-teal" : "bg-brand-muted")}
    >
      <Container>
        <Reveal className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-white/10 text-white">
            <Icon className="size-9" aria-hidden />
          </span>
          <div className="flex flex-col gap-2">
            {eyebrow ? (
              <p
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[2px]",
                  variant === "teal" ? "text-brand-cream-2" : "text-brand-teal",
                )}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-[-0.01em] text-white sm:text-5xl lg:text-[54px]">
              {title}
            </h2>
          </div>
          <p className="text-base leading-[24px] tracking-[0.02em] text-white/90">
            {paragraph}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
