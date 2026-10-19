import { CondicionesPanel } from "@/components/sections/condiciones";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";

type RegistroProps = {
  title: string;
  paragraphs: string[];
};

/**
 * Full-width split panel (same pattern as Nosotros "Misión y visión"): the
 * ANMAT registration statement on the left and the minimum batch + timelines
 * on the right. Stacks on mobile. Used on Home and Fabricación.
 */
export function Registro({ title, paragraphs }: RegistroProps) {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="bg-brand-cream px-6 py-16 md:px-[62px] md:py-24">
        <Reveal from="left" className="flex max-w-[620px] flex-col gap-6 lg:ml-auto">
          <Heading className="text-3xl leading-[1.1] sm:text-4xl lg:text-[42px]">
            {title}
          </Heading>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-[22px] tracking-[0.02em] text-brand-muted"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      {/* Same background as the Home "Proceso" section. */}
      <div className="bg-[#F0EBE1] px-6 py-16 md:px-[62px] md:py-24">
        <Reveal from="right" delay={120} className="max-w-[620px]">
          <CondicionesPanel />
        </Reveal>
      </div>
    </section>
  );
}
