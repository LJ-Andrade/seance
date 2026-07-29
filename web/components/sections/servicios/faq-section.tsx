import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { pregunta: string; respuesta: string };

type FaqSectionProps = {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
};

/**
 * Reusable FAQ accordion for the service pages (accessible, single-open).
 */
export function FaqSection({ eyebrow, title, items }: FaqSectionProps) {
  return (
    <section className="bg-brand-cream-2 py-16 md:py-24">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} />
        </Reveal>

        <Reveal as="div" delay={100} className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={item.pregunta} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-brand-ink">
                  {item.pregunta}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                  {item.respuesta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
