import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton } from "@/components/ui/cta-button";
import { HeroMotion } from "@/components/ui/hero-motion";

/**
 * Home hero. The product line is baked into a full-bleed background image
 * (cream on the left for the copy, products on the right) rendered without any
 * overlay/mask so it stays crisp. Copy lives in the left column of a two-column
 * grid; the right column is intentionally empty so the products show through.
 * A dedicated portrait image is used on mobile. Server Component.
 */
export function Hero() {
  const t = useTranslations("inicio.hero");

  return (
    <HeroMotion className="hero-background relative isolate overflow-hidden bg-[#fefbf6]">
      {/* Desktop (>=900px): full-bleed product background, capped at the 1540px
          design width and centered. Beyond the cap, extend the image's own edge
          colors so no seam shows: white on the left, the cream vertical gradient
          on the right (sampled from the image edges). */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-1/2 hidden bg-[#fcfcfa] min-[900px]:block" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 right-0 hidden bg-gradient-to-b from-[#f4e6d9] to-[#fbf4ec] min-[900px]:block" />
      <div className="hero-background-frame pointer-events-none absolute inset-y-0 right-0 hidden w-full max-w-[1540px] min-[900px]:block">
        <Image
          src="/images/hero-productos.png"
          alt=""
          fill
          priority
          sizes="(min-width: 900px) 100vw, 0px"
          className="hero-background-media object-cover object-center"
        />
      </div>

      {/* Mobile (<900px): portrait product image pinned to the top at its
          natural width (object-contain avoids the products scaling up), with the
          cream lower half baked in. The copy overlays that cream area — the
          extra section height below the image keeps the same cream color so no
          white gap appears. */}
      <div className="hero-background-frame pointer-events-none absolute inset-0 min-[900px]:hidden">
        <Image
          src="/images/hero-productos-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-background-media object-contain object-top"
        />
      </div>

      <Container className="relative">
        {/* pt-[88vw] drops the copy just below the products (they end at ~48% of
            the image height, i.e. ~86vw). */}
        <div className="grid grid-cols-1 pb-14 pt-[88vw] min-[900px]:min-h-[646px] min-[900px]:grid-cols-2 min-[900px]:pb-0 min-[900px]:pt-0">
          <div className="flex flex-col gap-6 min-[900px]:justify-center">
            <Eyebrow>{t("eyebrow")}</Eyebrow>

            <h1 className="font-serif text-4xl font-medium italic leading-[1.02] tracking-tight text-brand-ink sm:text-5xl lg:text-[80px] lg:leading-[80px]">
              {t("titulo")}
            </h1>

            <p className="max-w-[720px] text-[14px] leading-[20px] tracking-[0.02em] text-brand-muted min-[900px]:text-base min-[900px]:leading-[22px]">
              {t("parrafo")}
            </p>

            <div className="pt-4">
              <CtaButton href="/contacto">{t("cta")}</CtaButton>
            </div>
          </div>
          {/* Second column intentionally empty — products come from the image. */}
        </div>
      </Container>
    </HeroMotion>
  );
}
