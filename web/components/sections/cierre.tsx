import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton } from "@/components/ui/cta-button";

/**
 * Closing band: the primary contact CTA next to the newsletter sign-up.
 * Anchors the `#contacto` target used by CTAs across the page.
 */
export function Cierre() {
  const c = useTranslations("inicio.contacto");
  const n = useTranslations("inicio.newsletter");

  return (
    <section id="contacto" className="bg-brand-cream-2 py-20 md:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-xl border border-border lg:grid-cols-2">
          {/* Contact CTA */}
          <div className="flex flex-col justify-between gap-10 bg-white p-10 lg:p-14">
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-3xl text-brand-slate">
                {c("titulo")}
              </h2>
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-slate">
                {c("parrafo")}
              </p>
            </div>
            <CtaButton href="#contacto">{c("cta")}</CtaButton>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-5 bg-brand-teal p-10 lg:p-14">
            <Eyebrow className="text-brand-cream-2">{n("eyebrow")}</Eyebrow>
            <h2 className="font-serif text-3xl text-brand-cream">{n("titulo")}</h2>
            <p className="text-base leading-[22px] tracking-[0.02em] text-brand-cream-2">
              {n("parrafo")}
            </p>
            <CtaButton
              href="#contacto"
              className="mt-2 bg-brand-cream text-brand-teal hover:bg-white"
            >
              {n("cta")}
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
