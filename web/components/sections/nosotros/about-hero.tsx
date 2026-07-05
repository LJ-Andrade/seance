import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site";

type AboutHeroProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  videoAlt: string;
  certAlt: string;
  certLinea1: string;
  certLinea2: string;
};

/**
 * About page hero: headline and intro on the left, a founder interview video
 * thumbnail (links to YouTube) plus the ISO certification badge.
 */
export function AboutHero({
  eyebrow,
  title,
  paragraph,
  videoAlt,
  certAlt,
  certLinea1,
  certLinea2,
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
            <div className="flex items-center gap-3 pt-2">
              <Image
                src="/images/nosotros/iso-cert.png"
                alt={certAlt}
                width={42}
                height={42}
                className="shrink-0 rounded-sm"
              />
              <div className="text-xs leading-[16px] text-brand-muted">
                <p>{certLinea1}</p>
                <p>{certLinea2}</p>
              </div>
            </div>
          </div>

          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={videoAlt}
            className="group relative aspect-video overflow-hidden rounded-xl border border-border"
          >
            <Image
              src="/images/nosotros/video-c5n.png"
              alt={videoAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
              <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-brand-teal transition group-hover:scale-105">
                <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
              </span>
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
