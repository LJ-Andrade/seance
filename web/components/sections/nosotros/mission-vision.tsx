import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

type Block = { eyebrow: string; titulo: string; parrafo: string };

type MissionVisionProps = {
  mision: Block;
  vision: Block;
};

/**
 * Full-width split panel with the mission and vision statements.
 */
export function MissionVision({ mision, vision }: MissionVisionProps) {
  return (
    <section className="grid lg:grid-cols-2">
      <Panel block={mision} className="bg-brand-cream" from="left" />
      <Panel block={vision} className="bg-brand-cream-2" from="right" delay={120} />
    </section>
  );
}

function Panel({
  block,
  className,
  from,
  delay = 0,
}: {
  block: Block;
  className: string;
  from: "left" | "right";
  delay?: number;
}) {
  return (
    <div className={`${className} px-6 py-16 md:px-[62px] md:py-24`}>
      <Reveal from={from} delay={delay} className="flex max-w-[620px] flex-col gap-6">
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <p className="font-serif text-3xl font-medium italic leading-[1.1] tracking-[-0.02em] text-brand-slate sm:text-4xl lg:text-[42px]">
          {block.titulo}
        </p>
        <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
          {block.parrafo}
        </p>
      </Reveal>
    </div>
  );
}
