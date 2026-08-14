"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  numero: string;
  titulo: string;
  parrafo?: string;
  bullets?: string[];
  destacado?: { titulo: string; parrafo: string };
  tags?: string[];
};

type ProcessStepsProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  steps: ProcessStep[];
};

/**
 * Pinned process scene. On desktop the heading and card stage stay centered
 * while each equal-height step slides over the previous one. Mobile keeps the
 * same semantic list in normal document flow.
 */
export function ProcessSteps({
  eyebrow,
  title,
  paragraph,
  steps,
}: ProcessStepsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let frame = 0;

    const update = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!desktop) {
        setProgress(1);
        frame = 0;
        return;
      }

      const stickyOffset = 112;
      const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
      const start = sceneTop - stickyOffset;
      const distance = Math.max(
        1,
        scene.offsetHeight - window.innerHeight + stickyOffset,
      );
      const raw = (window.scrollY - start) / distance;

      setProgress(Math.min(1, Math.max(0, raw)));
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the first card alone briefly, then distribute the three arrivals over
  // the remaining pinned distance. The fourth completes exactly at release.
  const stackProgress = Math.min(1, Math.max(0, (progress - 0.12) / 0.88));
  const phase = stackProgress * Math.max(1, steps.length - 1);

  return (
    <section className="bg-white py-16 md:py-24 lg:py-0">
      <div ref={sceneRef} data-process-scene className="lg:h-[360vh]">
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-7rem)]">
          <Container className="flex h-full flex-col justify-center gap-8 py-8 lg:gap-6 lg:py-2">
            <Reveal>
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                description={paragraph}
                className="lg:gap-3"
              />
            </Reveal>

            <ol className="flex flex-col gap-8 lg:relative lg:h-[412px] lg:shrink-0 lg:gap-0">
              {steps.map((step, i) => {
                const hasAside = Boolean(step.destacado || step.tags);
                const reveal =
                  i === 0 ? 1 : Math.min(1, Math.max(0, phase - i + 1));

                return (
                  <li
                    key={step.numero}
                    className="process-stack-card relative lg:absolute lg:inset-0"
                    style={
                      {
                        zIndex: i + 1,
                        "--stack-opacity":
                          i === 0 ? 1 : Math.min(1, reveal / 0.08),
                        "--stack-y": `${i === 0 ? 0 : (1 - reveal) * 420 + i * 14}px`,
                      } as CSSProperties
                    }
                  >
                    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_18px_45px_rgba(15,76,92,0.10)] lg:flex lg:h-[370px]">
                      <div className="flex items-center bg-brand-cream-3 px-6 py-5 lg:w-32 lg:shrink-0 lg:justify-center lg:px-8 lg:py-10">
                        <span className="flex size-12 items-center justify-center rounded-full bg-brand-primary text-base font-bold text-white shadow-[0px_10px_7.5px_rgba(144,138,129,0.25)]">
                          {step.numero}
                        </span>
                      </div>

                      <div
                        className={cn(
                          "grid flex-1 content-center gap-8 p-7 md:p-10 lg:p-12",
                          hasAside &&
                            "lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]",
                        )}
                      >
                        <div className="flex flex-col gap-4">
                          <h3 className="font-serif text-2xl leading-tight text-brand-slate md:text-3xl">
                            {step.titulo}
                          </h3>

                          {step.parrafo ? (
                            <p className="max-w-[760px] text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                              {step.parrafo}
                            </p>
                          ) : null}

                          {step.bullets ? (
                            <ul className="flex flex-col gap-3">
                              {step.bullets.map((bullet) => (
                                <li
                                  key={bullet}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brand-primary" />
                                  <span className="text-sm font-semibold leading-[22px] tracking-[0.02em] text-brand-muted">
                                    {bullet}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>

                        {hasAside ? (
                          <div className="flex flex-col justify-center gap-4">
                            {step.destacado ? (
                              <div className="flex flex-col gap-2 rounded-[8px] border border-brand-primary bg-brand-cream p-5">
                                <p className="text-base font-semibold tracking-[0.02em] text-brand-primary">
                                  {step.destacado.titulo}
                                </p>
                                <p className="text-base leading-[22px] tracking-[0.02em] text-brand-muted">
                                  {step.destacado.parrafo}
                                </p>
                              </div>
                            ) : null}

                            {step.tags ? (
                              <div className="flex flex-wrap gap-2">
                                {step.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-brand-muted px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-brand-muted"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </Container>
        </div>
      </div>
    </section>
  );
}
