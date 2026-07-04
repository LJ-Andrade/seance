import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { pregunta: string; respuesta: string };

/**
 * Frequently asked questions rendered as an accessible accordion.
 */
export function Faq() {
  const t = useTranslations("inicio.faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="bg-white py-20 md:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={t("eyebrow")} title={t("titulo")} />

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
      </Container>
    </section>
  );
}
