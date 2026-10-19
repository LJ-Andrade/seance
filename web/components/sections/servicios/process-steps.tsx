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
  /** Optional caption shown above the tags. */
  tagsTitulo?: string;
  tags?: string[];
};

type ProcessStepsProps = {
  eyebrow: string;
  title: string;
  paragraph: string;
  steps: ProcessStep[];
};

// Preferred card height when the viewport has room for it.
const CARD_HEIGHT = 370;
// Visible strip of each stacked card.
const STRIP = 14;
// Vertical gap between the heading and the card stage while pinned (pin:gap-5).
const PINNED_GAP = 20;

/**
 * Pinned process scene. On desktop the heading and card stage stay centered
 * while each equal-height step slides over the previous one. The card height
 * adapts to the viewport (up to 370px, never below the richest step's
 * content); when even that does not fit under the header, and on mobile, the
 * same semantic list stays in normal document flow.
 */
export function ProcessSteps({
  eyebrow,
  title,
  paragraph,
  steps,
}: ProcessStepsProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [layout, setLayout] = useState({
    pinned: true,
    cardHeight: CARD_HEIGHT,
    headerHeight: 124,
  });

  useEffect(() => {
    const scene = sceneRef.current;
    const head = headRef.current;
    if (!scene || !head) return;

    let frame = 0;
    let pinned = true;
    let headerHeight = 124;

    // Fit check: header + heading + gap + tallest card content + strips must
    // fit in the viewport. Measurements do not depend on the pinned state.
    const measure = () => {
      headerHeight =
        document.querySelector("header")?.getBoundingClientRect().height ??
        headerHeight;
      const needed = Math.max(
        0,
        ...Array.from(scene.querySelectorAll("[data-step-body]")).map(
          (body) => {
            const style = getComputedStyle(body);
            const content = Math.max(
              0,
              ...Array.from(body.children).map(
                (child) => (child as HTMLElement).offsetHeight,
              ),
            );
            return (
              content +
              parseFloat(style.paddingTop) +
              parseFloat(style.paddingBottom)
            );
          },
        ),
      );
      const available =
        window.innerHeight -
        headerHeight -
        head.offsetHeight -
        PINNED_GAP -
        (steps.length - 1) * STRIP;

      pinned =
        window.matchMedia("(min-width: 1024px)").matches &&
        available >= needed;
      const cardHeight = Math.ceil(
        Math.max(needed, Math.min(CARD_HEIGHT, available)),
      );
      setLayout((prev) =>
        prev.pinned === pinned &&
        prev.cardHeight === cardHeight &&
        prev.headerHeight === headerHeight
          ? prev
          : { pinned, cardHeight, headerHeight },
      );
    };

    const update = () => {
      frame = 0;
      if (!pinned) {
        setProgress(1);
        return;
      }

      const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
      const start = sceneTop - headerHeight;
      const distance = Math.max(
        1,
        scene.offsetHeight - window.innerHeight + headerHeight,
      );
      const raw = (window.scrollY - start) / distance;

      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      requestUpdate();
    };

    onResize();
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  // Keep the first card alone briefly, then distribute the remaining arrivals
  // over the pinned distance. The last one completes exactly at release.
  const stackProgress = Math.min(1, Math.max(0, (progress - 0.12) / 0.88));
  const phase = stackProgress * Math.max(1, steps.length - 1);

  return (
    <section
      data-pinned={layout.pinned}
      className="bg-white py-16 md:py-24 pin:py-0"
    >
      <div
        ref={sceneRef}
        data-process-scene
        // Pinned scroll distance and card stage grow with the step count:
        // 60vh per step, and a 14px visible strip per stacked card.
        style={
          {
            "--process-steps": steps.length,
            "--card-h": `${layout.cardHeight}px`,
            "--header-h": `${layout.headerHeight}px`,
          } as CSSProperties
        }
        className="pin:h-[calc(120vh+var(--process-steps)*60vh)]"
      >
        <div className="pin:sticky pin:top-[var(--header-h)] pin:h-[calc(100vh-var(--header-h))]">
          <Container className="flex h-full flex-col justify-center gap-8 py-8 pin:gap-5 pin:py-0">
            <div ref={headRef}>
              <Reveal>
                <SectionHeader
                  eyebrow={eyebrow}
                  title={title}
                  description={paragraph}
                  className="lg:gap-3"
                />
              </Reveal>
            </div>

            <ol className="flex flex-col gap-8 pin:relative pin:h-[calc(var(--card-h)+(var(--process-steps)-1)*14px)] pin:shrink-0 pin:gap-0">
              {steps.map((step, i) => {
                const hasAside = Boolean(step.destacado || step.tags);
                const reveal =
                  i === 0 ? 1 : Math.min(1, Math.max(0, phase - i + 1));

                return (
                  <li
                    key={step.numero}
                    className="process-stack-card relative pin:absolute pin:inset-0"
                    style={
                      {
                        zIndex: i + 1,
                        "--stack-opacity":
                          i === 0 ? 1 : Math.min(1, reveal / 0.08),
                        "--stack-y": `${i === 0 ? 0 : (1 - reveal) * 420 + i * 14}px`,
                      } as CSSProperties
                    }
                  >
                    <article className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_18px_45px_rgba(15,76,92,0.10)] lg:flex pin:h-[var(--card-h)]">
                      <div className="flex items-center bg-brand-cream-3 px-6 py-5 lg:w-32 lg:shrink-0 lg:justify-center lg:px-8 lg:py-10">
                        <span className="flex size-12 items-center justify-center rounded-full bg-brand-primary text-base font-bold text-white shadow-[0px_10px_7.5px_rgba(144,138,129,0.25)]">
                          {step.numero}
                        </span>
                      </div>

                      <div
                        data-step-body
                        className={cn(
                          "grid flex-1 content-center gap-8 p-7 md:p-10 lg:px-12 lg:py-10",
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
                              <div className="flex flex-wrap items-center gap-2">
                                {step.tagsTitulo ? (
                                  <p className="w-full text-xs font-medium text-brand-slate">
                                    {step.tagsTitulo}
                                  </p>
                                ) : null}
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
