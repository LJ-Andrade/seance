import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";

/**
 * Closing band: the primary contact CTA next to the newsletter sign-up.
 * Full-bleed, edge-to-edge, no rounding or border. Anchors the `#contacto`
 * target used by CTAs across the page.
 */
export function Cierre() {
  const c = useTranslations("inicio.contacto");
  const n = useTranslations("inicio.newsletter");

  return (
    <section id="contacto" className="bg-brand-cream-2">
      {/* Backgrounds bleed edge-to-edge; the inner blocks are capped at half the
          1540px design width and aligned to the shared container gutters, so the
          content lines up with every other section while the colors reach the
          viewport edges. */}
      <div className="grid lg:grid-cols-2">
        {/* Contact CTA */}
        <div className="flex bg-white lg:justify-end">
          <Reveal
            from="up"
            className="flex w-full max-w-[1540px] flex-col justify-between gap-10 px-6 py-14 md:px-[62px] lg:max-w-[770px] lg:py-20 lg:pr-14"
          >
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-3xl text-brand-slate">
                {c("titulo")}
              </h2>
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-slate">
                {c("parrafo")}
              </p>
            </div>
            <CtaButton href="/contacto" className="self-start">
              {c("cta")}
            </CtaButton>
          </Reveal>
        </div>

        {/* Newsletter */}
        <div className="flex bg-brand-teal lg:justify-start">
          <Reveal
            from="up"
            delay={120}
            className="flex w-full max-w-[1540px] flex-col gap-5 px-6 py-14 md:px-[62px] lg:max-w-[770px] lg:py-20 lg:pl-14"
          >
            <Eyebrow className="text-brand-cream-2">{n("eyebrow")}</Eyebrow>
            <h2 className="font-serif text-3xl text-brand-cream">
              {n("titulo")}
            </h2>
            <p className="text-base leading-[22px] tracking-[0.02em] text-brand-cream-2">
              {n("parrafo")}
            </p>
            <CtaButton
              href="#contacto"
              liquid={false}
              className="newsletter-attention mt-auto self-start bg-brand-cream text-brand-teal hover:bg-white"
            >
              {n("cta")}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
