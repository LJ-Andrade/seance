"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ChromeTiltProps = Omit<
  ComponentPropsWithoutRef<"article">,
  "onPointerMove" | "onPointerLeave" | "onPointerOut"
>;

const MAX_ROTATE_X_DEG = 4;
const MAX_ROTATE_Y_DEG = 5;

/** Pointer-driven 3D card tilt. */
export function ChromeTilt({ children, ...props }: ChromeTiltProps) {
  const cardRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isTiltingRef = useRef(false);

  const updateTilt = useCallback(
    (rotateX: number, rotateY: number, isActive: boolean) => {
      isTiltingRef.current = isActive;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;

        if (card) {
          card.style.setProperty("--card-rotate-x", `${rotateX}deg`);
          card.style.setProperty("--card-rotate-y", `${rotateY}deg`);

          if (isActive) {
            card.dataset.tilting = "true";
          } else {
            delete card.dataset.tilting;
          }
        }

        animationFrameRef.current = null;
      });
    },
    [],
  );

  const resetTilt = useCallback(() => updateTilt(0, 0, false), [updateTilt]);

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
    const normalizedY = Math.max(
      -1,
      Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
    );

    updateTilt(
      -normalizedY * MAX_ROTATE_X_DEG,
      normalizedX * MAX_ROTATE_Y_DEG,
      true,
    );
  };

  const handlePointerOut = (event: ReactPointerEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;

    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      resetTilt();
    }
  };

  useEffect(() => {
    const resetOutsideCard = (event: globalThis.PointerEvent) => {
      const bounds = cardRef.current?.getBoundingClientRect();

      if (
        isTiltingRef.current &&
        bounds &&
        (event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom)
      ) {
        resetTilt();
      }
    };

    window.addEventListener("pointermove", resetOutsideCard, { passive: true });

    return () => {
      window.removeEventListener("pointermove", resetOutsideCard);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resetTilt]);

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerOut={handlePointerOut}
      {...props}
    >
      {children}
    </article>
  );
}
