import Image from "next/image";
import { Download } from "lucide-react";
import { ChromeTilt } from "@/components/ui/chrome-tilt";

type ProductCardProps = {
  id: string;
  titulo: string;
  descripcion: string;
  presentaciones: string[];
  image: string;
  presentacionesLabel: string;
  fichaLabel: string;
  fichaHref?: string;
};

/**
 * Everest product card: photo, name, description, available formats as chips
 * and a "download data sheet" button.
 */
export function ProductCard({
  id,
  titulo,
  descripcion,
  presentaciones,
  image,
  presentacionesLabel,
  fichaLabel,
  fichaHref = "#",
}: ProductCardProps) {
  return (
    <ChromeTilt
      id={id}
      className="chrome-tilt-card group flex flex-1 scroll-mt-24 flex-col rounded-[8px] border border-border bg-brand-cream"
    >
      <div className="relative h-[280px] w-full overflow-hidden">
        <Image
          src={image}
          alt={titulo}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl text-brand-teal">{titulo}</h3>
          <p className="text-base leading-[22px] tracking-[0.02em] text-brand-slate">
            {descripcion}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold uppercase tracking-[1px] text-brand-muted">
            {presentacionesLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {presentaciones.map((format) => (
              <span
                key={format}
                className="rounded-[2px] border-[0.5px] border-brand-muted bg-white px-2 py-1 text-[11px] font-medium text-brand-slate"
              >
                {format}
              </span>
            ))}
          </div>
        </div>

        <a
          href={fichaHref}
          className="mt-auto flex items-center justify-center gap-2 rounded-[4px] border border-brand-teal px-4 py-3 text-sm font-semibold uppercase tracking-[1px] text-brand-teal transition-colors hover:bg-brand-teal hover:text-white"
        >
          <Download className="size-4" aria-hidden />
          {fichaLabel}
        </a>
      </div>
    </ChromeTilt>
  );
}
