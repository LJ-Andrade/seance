import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton } from "@/components/ui/cta-button";

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref?: string;
  image: string;
  imageAlt: string;
};

/**
 * Shared hero for the service pages: left-aligned copy over a warm cream
 * gradient, with a photographic image bleeding in from the right and masked so
 * the headline stays legible. Server Component.
 */
export function ServiceHero({
  eyebrow,
  title,
  paragraph,
  ctaLabel,
  ctaHref = "/contacto",
  image,
  imageAlt,
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-cream-deep to-[#fefbf6]">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] md:block">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 768px) 55vw, 0px"
          className="object-cover object-center [mask-image:linear-gradient(to_right,transparent,#000_38%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_38%)]"
        />
      </div>

      <Container className="relative">
        <div className="flex min-h-[480px] max-w-[760px] flex-col justify-center gap-6 py-20 md:min-h-[560px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-serif text-4xl font-medium italic leading-[1.03] tracking-tight text-brand-ink sm:text-5xl lg:text-[72px] lg:leading-[74px]">
            {title}
          </h1>
          <p className="max-w-[620px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {paragraph}
          </p>
          <div className="pt-2">
            <CtaButton href={ctaHref}>{ctaLabel}</CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
