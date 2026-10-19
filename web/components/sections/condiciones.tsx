import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";

type Plazo = { etapa: string; plazo: string };

/**
 * Minimum batch and the three separate timelines (development, registration,
 * production), sized for the registration split panel. Timelines are a real
 * HTML table so the data stays readable in the initial HTML for search engines
 * and assistants. Copy comes from the shared `condiciones` namespace.
 */
export function CondicionesPanel() {
  const t = useTranslations("condiciones");
  const filas = t.raw("plazos.filas") as Plazo[];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="font-serif text-3xl font-medium italic leading-[1.1] tracking-[-0.02em] text-brand-slate lg:text-[36px]">
          {t("titulo")}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-[0.02em] text-brand-slate">
          {t("loteMinimo.titulo")}
        </h3>
        <p className="font-serif text-4xl leading-none text-brand-teal">
          {t("loteMinimo.valor")}
        </p>
        <p className="text-sm leading-[20px] tracking-[0.02em] text-brand-muted">
          {t("loteMinimo.detalle")}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold tracking-[0.02em] text-brand-slate">
          {t("plazos.titulo")}
        </h3>
        <table className="w-full border-collapse text-left">
          <thead className="sr-only">
            <tr>
              <th scope="col">{t("plazos.columnas.etapa")}</th>
              <th scope="col">{t("plazos.columnas.plazo")}</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr
                key={fila.etapa}
                className="flex flex-col gap-1 border-b border-brand-muted/25 py-3 last:border-b-0 sm:table-row"
              >
                <th
                  scope="row"
                  className="font-serif text-lg font-medium italic leading-tight text-brand-ink sm:w-[40%] sm:py-3 sm:pr-5 sm:align-top"
                >
                  {fila.etapa}
                </th>
                <td className="text-sm leading-[20px] tracking-[0.02em] text-brand-muted sm:py-3 sm:align-top">
                  {fila.plazo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
