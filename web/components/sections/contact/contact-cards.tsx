import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

/**
 * Direct contact channels shown below the form: email, phone and address,
 * each in its own card. Server Component — content from `siteConfig`.
 */
export function ContactCards() {
  const t = useTranslations("contacto.tarjetas");
  const { footer } = siteConfig;

  const cards: Array<{ icon: LucideIcon; title: string; value: string }> = [
    { icon: Mail, title: t("email"), value: footer.email },
    { icon: Phone, title: t("telefono"), value: footer.phone },
    { icon: MapPin, title: t("direccion"), value: footer.address.join(", ") },
  ];

  return (
    <section className="bg-brand-cream py-16 md:py-24">
      <Container>
        <div className="grid gap-8 md:grid-cols-3 md:gap-14">
          {cards.map(({ icon: Icon, title, value }, i) => (
            <Reveal
              key={title}
              delay={i * 110}
              className="flex flex-col gap-6 rounded-[8px] border border-border bg-white p-10"
            >
              <span className="flex size-14 items-center justify-center rounded-[8px] bg-brand-cream-2 text-brand-teal">
                <Icon className="size-7" aria-hidden />
              </span>
              <div className="flex flex-col gap-3">
                <p className="text-base font-semibold tracking-[0.02em] text-brand-slate">
                  {title}
                </p>
                <p className="text-base leading-[22px] tracking-[0.04em] break-words text-brand-muted">
                  {value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
