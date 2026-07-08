"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline gradient progress bar pinned above the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[95] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--color-gold), var(--color-crimson), var(--color-electric))",
        boxShadow: "0 0 14px rgba(255,45,70,0.55)",
      }}
    />
  );
}
