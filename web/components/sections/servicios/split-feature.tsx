import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SplitFeatureProps = {
  eyebrow?: string;
  title: string;
  paragraph?: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
  /** Which side the image sits on at lg+ (default right). */
  imageSide?: "left" | "right";
  background?: "cream" | "cream-2" | "white";
};

const BG = {
  cream: "bg-brand-cream",
  "cream-2": "bg-brand-cream-2",
  white: "bg-white",
} as const;

/**
 * Two-column section: copy (eyebrow + title + paragraph, optional checklist)
 * beside a photographic image. Reused for the hosting intro and the import
 * "compliance" block.
 */
export function SplitFeature({
  eyebrow,
  title,
  paragraph,
  bullets,
  image,
  imageAlt,
  imageSide = "right",
  background = "cream-2",
}: SplitFeatureProps) {
  return (
    <section className={cn(BG[background], "py-16 md:py-24")}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal
            from={imageSide === "left" ? "right" : "left"}
            className={cn("flex flex-col gap-6", imageSide === "left" && "lg:order-2")}
          >
            <SectionHeader eyebrow={eyebrow} title={title} description={paragraph} />
            {bullets ? (
              <ul className="flex flex-col gap-3">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-base leading-[22px] tracking-[0.02em] text-brand-slate">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          <Reveal
            from={imageSide === "left" ? "left" : "right"}
            delay={120}
            className="group relative aspect-[4/3] overflow-hidden rounded-[8px] border border-border"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
