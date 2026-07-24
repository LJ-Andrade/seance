"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Defaults to a plain `div`. */
  as?: ElementType;
  /**
   * Entrance direction offset. `up` (default) slides the content up into place;
   * `none` fades in without translation.
   */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Stagger delay in milliseconds, useful for sequencing sibling items. */
  delay?: number;
  /** Fraction of the element that must be visible before it animates in. */
  threshold?: number;
  /** Animate only the first time it enters the viewport (default) or every time. */
  once?: boolean;
  className?: string;
};

const OFFSET: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "0, 1.25rem",
  down: "0, -1.25rem",
  left: "1.25rem, 0",
  right: "-1.25rem, 0",
  none: "0, 0",
};

/**
 * SEO-safe scroll reveal. `children` are passed through untouched, so when a
 * Server Component renders <Reveal>…</Reveal> the actual content is still part
 * of the server HTML (crawlers and no-JS users see it). This client wrapper only
 * toggles a `data-visible` attribute via IntersectionObserver; the transition
 * itself lives in CSS and is disabled under `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  as: Tag = "div",
  from = "up",
  delay = 0,
  threshold = 0.15,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If the browser can't observe intersections, just show the content.
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal
      data-visible={visible ? "true" : "false"}
      style={{
        "--reveal-offset": OFFSET[from],
        "--reveal-delay": `${delay}ms`,
      } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
