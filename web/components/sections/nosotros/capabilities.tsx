import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";

type CapabilitiesProps = {
  eyebrow: string;
  title: string;
  items: string[];
};

/**
 * Technical capabilities: a title over a row of check-marked statements.
 */
export function Capabilities({ eyebrow, title, items }: CapabilitiesProps) {
  return (
    <section className="bg-brand-cream-3 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeader eyebrow={eyebrow} title={title} />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {items.map((item) => (
            <div key={item} className="flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="size-6 shrink-0 text-brand-primary" aria-hidden />
              <p className="text-base leading-[22px] tracking-[0.02em] text-brand-slate">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
