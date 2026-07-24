import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton } from "@/components/ui/cta-button";
import { HeroMotion } from "@/components/ui/hero-motion";

type ServiceHeroProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref?: string;
  image: string;
  mobileImage: string;
  imageAlt: string;
};

/**
 * Shared responsive hero for service pages. Desktop uses the wide photograph
 * bleeding in from the right; mobile uses a portrait composition with a clear
 * lower area reserved for the copy. Server Component.
 */
export function ServiceHero({
  eyebrow,
  title,
  paragraph,
  ctaLabel,
  ctaHref = "/contacto",
  image,
  mobileImage,
  imageAlt,
}: ServiceHeroProps) {
  return (
    <HeroMotion className="hero-background relative isolate overflow-hidden bg-[#f7f7f7] min-[900px]:bg-gradient-to-b min-[900px]:from-brand-cream-deep min-[900px]:to-[#fefbf6]">
      <div className="hero-background-frame pointer-events-none absolute inset-x-0 top-0 aspect-[768/1376] min-[900px]:hidden">
        <Image
          src={mobileImage}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 899px) 100vw, 0px"
          className="hero-background-media object-contain object-top"
        />
      </div>

      <div className="hero-background-frame pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] min-[900px]:block">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 900px) 55vw, 0px"
          className="hero-background-media object-cover object-center [mask-image:linear-gradient(to_right,transparent,#000_38%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_38%)]"
        />
      </div>

      <Container className="relative">
        <div className="flex max-w-[760px] flex-col gap-6 pb-14 pt-[88vw] min-[900px]:min-h-[560px] min-[900px]:justify-center min-[900px]:py-20">
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
    </HeroMotion>
  );
}
