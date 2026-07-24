import Image from "next/image";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Dark teal confidentiality section: copy and a bulleted list of guarantees on
 * the left, product imagery on the right.
 */
export function Confidencialidad() {
  const t = useTranslations("inicio.confidencialidad");
  const bullets = t.raw("bullets") as string[];

  return (
    <section className="bg-brand-teal py-20 md:py-24">
      <Container className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <Reveal from="left" className="flex flex-1 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[2px] text-brand-cream-2">
              <Lock className="size-5 text-brand-cream-2" aria-hidden />
              {t("eyebrow")}
            </p>
            <h2 className="font-serif text-4xl font-medium italic leading-[1.05] tracking-[-0.02em] text-brand-cream sm:text-5xl lg:text-[60px]">
              {t("titulo")}
            </h2>
          </div>

          <p className="max-w-[640px] text-base leading-[22px] tracking-[0.02em] text-brand-cream-2">
            {t("parrafo")}
          </p>

          <ul className="flex flex-col gap-4">
            {bullets.map((text) => (
              <li key={text} className="flex items-center gap-3 text-base text-brand-cream">
                <span className="size-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          from="right"
          delay={120}
          className="relative aspect-[5/4] w-full max-w-[500px] shrink-0 overflow-hidden rounded-lg"
        >
          <Image
            src="/images/confidencialidad.png"
            alt={t("imagenAlt")}
            fill
            sizes="(min-width: 1024px) 500px, 100vw"
            className="object-cover"
          />
        </Reveal>
      </Container>
    </section>
  );
}
