"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Signature cursor: a crimson dot + trailing difference-blend ring.
 * Desktop fine-pointers only; the ring grows over interactive targets and
 * can display a label from the nearest [data-cursor] ancestor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoverKind, setHoverKind] = useState<"none" | "link">("none");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("cursor-fx");
      return;
    }
    document.documentElement.classList.add("cursor-fx");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      const labelled = el?.closest?.("[data-cursor]") as HTMLElement | null;
      const interactive = el?.closest?.(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor]",
      );
      setLabel(labelled?.dataset.cursor ?? "");
      setHoverKind(interactive ? "link" : "none");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-fx");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringScale = (label ? 2.6 : hoverKind === "link" ? 1.7 : 1) * (pressed ? 0.82 : 1);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={`cursor-ring ${label ? "has-label" : ""}`}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: ringScale }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span>{label}</span>
      </motion.div>
    </>
  );
}
