"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed angled ticker of giant display type. The track skews with
 * scroll velocity, so the page feels physically connected to your hand.
 */
export function MarqueeBand({
  items,
  angle = -2,
  reverse = false,
  tone = "ink",
  className,
}: {
  items: string[];
  angle?: number;
  reverse?: boolean;
  tone?: "ink" | "crimson";
  className?: string;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-1800, 1800], [-8, 8]), {
    stiffness: 220,
    damping: 28,
  });

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className={cn("relative select-none overflow-hidden py-10 sm:py-14", className)} aria-hidden>
      <div
        className={cn(
          "border-y",
          tone === "crimson"
            ? "border-crimson/30 bg-gradient-to-r from-crimson-deep/25 via-crimson/15 to-crimson-deep/25"
            : "border-line bg-ink-2/80",
        )}
        style={{ transform: `rotate(${angle}deg) scale(1.12)` }}
      >
        <motion.div
          style={{ skewX: skew }}
          className={cn("flex w-max items-center gap-10 whitespace-nowrap py-5", reverse ? "animate-marquee-rev" : "animate-marquee-fast")}
        >
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span
                className={cn(
                  "font-display text-4xl uppercase leading-none sm:text-6xl",
                  i % 2 === 0 ? "text-bone" : "text-stroke-faint",
                )}
              >
                {t}
              </span>
              <span className={cn("text-2xl sm:text-3xl", tone === "crimson" ? "text-gold" : "text-crimson")}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
