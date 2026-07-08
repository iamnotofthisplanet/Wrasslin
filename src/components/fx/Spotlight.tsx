"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * One delegated pointer listener per grid: feeds --mx/--my CSS vars to any
 * descendant with [data-spot], powering the cursor-following border glow
 * without a React re-render or per-card listener.
 */
export function SpotlightGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const target = (e.target as Element).closest?.("[data-spot]") as HTMLElement | null;
    if (!target) return;
    const r = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${e.clientX - r.left}px`);
    target.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div className={cn(className)} onPointerMove={onMove}>
      {children}
    </div>
  );
}
