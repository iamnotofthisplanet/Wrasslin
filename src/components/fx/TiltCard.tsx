"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * 3D perspective tilt + moving glare. Wrap any card (server children welcome).
 * Automatically inert on touch devices and for reduced-motion users.
 */
export function TiltCard({
  children,
  className,
  max = 8,
  glare = true,
  scale = 1.015,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const rx = useSpring(useMotionValue(0), { stiffness: 240, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 240, damping: 20 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(farthest-corner at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 62%)`;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setActive(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  function onMove(e: React.PointerEvent) {
    if (!active) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max);
    ry.set(px * max);
    gx.set((px + 0.5) * 100);
    gy.set((py + 0.5) * 100);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={active ? { scale } : undefined}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [div:hover>&]:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
