import type { LucideIcon } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";

export type SolucionCardProps = {
  icon: LucideIcon;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  enlace: string;
  href: string;
};

/**
 * Solution card: icon tile, serif title, italic pull-quote subtitle, body copy
 * and an arrow link pinned to the bottom so cards align in a row.
 */
export function SolucionCard({
  icon: Icon,
  titulo,
  subtitulo,
  descripcion,
  enlace,
  href,
}: SolucionCardProps) {
  return (
    <article className="flex flex-1 flex-col gap-6 rounded-lg bg-white p-10">
      <div className="flex size-14 items-center justify-center rounded-lg bg-brand-cream-2">
        <Icon className="size-7 text-brand-teal" aria-hidden />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-serif text-3xl text-brand-slate">{titulo}</h3>
        <p className="font-serif text-lg italic text-brand-primary">{subtitulo}</p>
      </div>

      <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
        {descripcion}
      </p>

      <ArrowLink href={href} className="mt-auto">
        {enlace}
      </ArrowLink>
    </article>
  );
}
