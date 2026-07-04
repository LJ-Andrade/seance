import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading } from "@/components/ui/heading";
import { cn } from "@/lib/utils";

type Paso = { numero: string; titulo: string; descripcion: string };

/**
 * "Proceso de trabajo" — intro copy on the left, numbered steps
 * (Hablamos / Planificamos / Ejecutamos) on the right.
 */
export function Proceso() {
  const t = useTranslations("inicio.proceso");
  const pasos = t.raw("pasos") as Paso[];

  return (
    <section className="bg-white py-20 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Heading>{t("titulo")}</Heading>
          <p className="max-w-[520px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
            {t("parrafo")}
          </p>
        </div>

        <ol className="flex flex-col">
          {pasos.map((paso, i) => (
            <li
              key={paso.numero}
              className={cn(
                "flex gap-6 py-8",
                i > 0 && "border-t border-border",
              )}
            >
              <span className="font-serif text-2xl leading-none text-brand-primary">
                {paso.numero}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-brand-slate">
                  {paso.titulo}
                </h3>
                <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                  {paso.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
