import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Column = { titulo: string; items: string[] };

type ResponsibilitiesProps = {
  eyebrow?: string;
  title: string;
  /** Two columns, in order: what Séance provides, then what the client provides. */
  columns: Column[];
  note?: string;
};

/**
 * "Qué aporta Séance y qué aportás vos": two side-by-side columns of numbered
 * responsibilities (stacked on mobile, Séance first) and a closing note.
 */
export function Responsibilities({ eyebrow, title, columns, note }: ResponsibilitiesProps) {
  return (
    <section className="bg-brand-cream-2 py-16 md:py-24">
      <Container className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {columns.map((column, i) => (
            <Reveal
              key={column.titulo}
              delay={i * 120}
              className={cn(
                "flex flex-col gap-6 rounded-[8px] border p-8 md:p-10",
                i === 0
                  ? "border-brand-teal bg-brand-teal text-brand-cream"
                  : "border-border bg-white",
              )}
            >
              <h3
                className={cn(
                  "font-serif text-3xl font-medium italic leading-[1.1]",
                  i === 0 ? "text-brand-cream" : "text-brand-slate",
                )}
              >
                {column.titulo}
              </h3>
              <ol className="flex flex-col">
                {column.items.map((item, n) => (
                  <li
                    key={item}
                    className={cn(
                      "flex items-start gap-5 border-t py-4 first:border-t-0 first:pt-0 last:pb-0",
                      i === 0 ? "border-brand-cream/20" : "border-border",
                    )}
                  >
                    <span
                      className="w-8 shrink-0 font-serif text-2xl leading-none text-brand-primary"
                      aria-hidden
                    >
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={cn(
                        "text-base leading-[22px] tracking-[0.02em]",
                        i === 0 ? "text-brand-cream-2" : "text-brand-muted",
                      )}
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>

        {note ? (
          <Reveal>
            <p className="mx-auto max-w-[720px] text-center text-sm leading-[22px] tracking-[0.02em] text-brand-muted">
              {note}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
