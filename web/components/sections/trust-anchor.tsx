import { Award, ShieldCheck, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

const icons: LucideIcon[] = [ShieldCheck, Award];

/**
 * Slim teal reassurance bar right under the hero: two key trust statements with
 * icons.
 */
export function TrustAnchor() {
  const t = useTranslations("inicio.confianza");
  const items = t.raw("anchor") as string[];

  return (
    <section className="bg-brand-teal">
      <Container className="flex flex-col items-center justify-center gap-4 py-6 sm:flex-row sm:gap-16">
        {items.map((text, i) => {
          const Icon = icons[i] ?? ShieldCheck;
          return (
            <div key={text} className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Icon className="size-6 text-brand-cream" aria-hidden />
              </span>
              <p className="text-sm text-brand-cream">{text}</p>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
