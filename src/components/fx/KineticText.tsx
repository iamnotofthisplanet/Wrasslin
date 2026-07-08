"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Masked stagger reveal — words (or characters) rise out of clipped slots
 * like a title card. The signature type treatment of the site.
 */
export function KineticText({
  text,
  as: Tag = "span",
  className,
  innerClassName,
  mode = "word",
  delay = 0,
  stagger = 0.045,
  duration = 0.85,
  once = true,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  /** Applied to each animated unit — put background-clip gradients HERE,
   *  they cannot paint through the inline-block mask wrappers. */
  innerClassName?: string;
  mode?: "word" | "char";
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  const reduced = useReducedMotion();

  const units = mode === "char" ? text.split("") : text.split(/(\s+)/);

  if (reduced) {
    return (
      <Tag ref={ref} className={className}>
        <span className={innerClassName}>{text}</span>
      </Tag>
    );
  }

  let animIndex = 0;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {units.map((u, i) => {
        if (/^\s+$/.test(u)) return <span key={i}>{u}</span>;
        const idx = animIndex++;
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden pb-[0.09em] -mb-[0.09em] align-bottom"
          >
            <motion.span
              /* plain join — twMerge would dedupe custom text-* utilities
                 like text-gradient-fire vs text-glow as "conflicting" colors */
              className={`inline-block will-change-transform ${innerClassName ?? ""}`}
              initial={{ y: "112%", rotate: 5 }}
              animate={inView ? { y: 0, rotate: 0 } : undefined}
              transition={{
                delay: delay + idx * stagger,
                duration,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {u === " " ? " " : u}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}

/** Simple blur/slide-in for supporting copy under kinetic headings. */
export function FadeIn({
  children,
  delay = 0,
  y = 22,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-50px" }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
