"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts from 0 to `to` when scrolled into view. */
export function AnimatedCounter({
  to,
  format = (n) => Math.round(n).toString(),
  duration = 1.8,
  className,
}: {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [text, setText] = useState(format(0));

  // Drives text from the animation library's clock — intentional sync.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setText(format(to));
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(format(v)),
      onComplete: () => setText(format(to)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, to, duration]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}
