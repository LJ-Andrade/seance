import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";

type AboutHeroProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  videoAlt: string;
  scopeTitle: string;
  scopeItems: string[];
};

/**
 * About page hero: headline, intro and the ANMAT authorization scope on the
 * left; a lazy YouTube player with the founder interview on the right.
 */
export function AboutHero({
  eyebrow,
  title,
  paragraph,
  videoAlt,
  scopeTitle,
  scopeItems,
}: AboutHeroProps) {
  return (
    <section className="bg-gradient-to-b from-brand-cream-deep to-[#fefbf6] py-16 md:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-serif text-4xl font-medium italic leading-[1.03] tracking-tight text-brand-ink sm:text-5xl lg:text-[64px] lg:leading-[66px]">
              {title}
            </h1>
            <p className="max-w-[640px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
              {paragraph}
            </p>
            <div className="flex max-w-[640px] flex-col gap-3 rounded-[8px] border border-border bg-white/70 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand-teal">
                <ShieldCheck className="size-5 shrink-0" aria-hidden />
                {scopeTitle}
              </h2>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-sm leading-[20px] tracking-[0.02em] text-brand-slate marker:text-brand-primary">
                {scopeItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
            <YouTubeEmbed
              id="pePrqcVz88s"
              title={videoAlt}
              poster="/images/thumbnail-home-video.jpg"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
