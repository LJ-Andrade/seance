"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

type HeroMotionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "onPointerMove" | "onPointerLeave" | "onPointerOut"
>;

const MAX_PAN_PX = 10;
const MAX_ROTATION_DEG = 0.85;

/**
 * Exposes horizontal pointer position as CSS variables for a subtle hero-image
 * parallax. The section content remains server-rendered children.
 */
export function HeroMotion({ children, ...props }: HeroMotionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const updateMotion = useCallback((panX: number, rotationY: number) => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      sectionRef.current?.style.setProperty("--hero-pan-x", `${panX}px`);
      sectionRef.current?.style.setProperty(
        "--hero-rotation-y",
        `${rotationY}deg`,
      );
      animationFrameRef.current = null;
    });
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = Math.max(
      -1,
      Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
    );

    updateMotion(
      normalizedX * MAX_PAN_PX,
      normalizedX * MAX_ROTATION_DEG,
    );
  };

  const handlePointerLeave = () => updateMotion(0, 0);

  const handlePointerOut = (event: ReactPointerEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;

    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      updateMotion(0, 0);
    }
  };

  useEffect(() => {
    const resetOutsideSection = (event: globalThis.PointerEvent) => {
      const bounds = sectionRef.current?.getBoundingClientRect();

      if (
        bounds &&
        (event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom)
      ) {
        updateMotion(0, 0);
      }
    };

    window.addEventListener("pointermove", resetOutsideSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", resetOutsideSection);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateMotion]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerOut={handlePointerOut}
      {...props}
    >
      {children}
    </section>
  );
}
