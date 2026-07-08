"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function parts(to: string) {
  const diff = Math.max(0, new Date(to).getTime() - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    live: diff <= 0,
  };
}

/** Live ticking countdown with rolling digits — bell time is coming. */
export function Countdown({ to, className }: { to: string; className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState(() => parts(to));

  // Hydration guard + wall-clock sync — intentional setState in effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    setT(parts(to));
    const id = setInterval(() => setT(parts(to)), 1000);
    return () => clearInterval(id);
  }, [to]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    return (
      <div className={cn("flex items-end gap-3", className)} aria-hidden>
        {["Days", "Hrs", "Min", "Sec"].map((l) => (
          <Cell key={l} value="--" label={l} />
        ))}
      </div>
    );
  }

  if (t.live) {
    return (
      <div className={cn("inline-flex items-center gap-2 rounded-full border border-crimson/50 bg-crimson/15 px-4 py-2", className)}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson" />
        </span>
        <span className="font-display text-xl uppercase tracking-wide text-crimson-glow">Bell Time — It&apos;s Live</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-end gap-3", className)} role="timer" aria-label="Countdown to bell time">
      <Cell value={String(t.days).padStart(2, "0")} label="Days" />
      <Colon />
      <Cell value={String(t.hours).padStart(2, "0")} label="Hrs" />
      <Colon />
      <Cell value={String(t.minutes).padStart(2, "0")} label="Min" />
      <Colon />
      <Cell value={String(t.seconds).padStart(2, "0")} label="Sec" hot />
    </div>
  );
}

function Colon() {
  return <span className="animate-pulse-glow pb-5 font-display text-2xl text-ash-dim">:</span>;
}

function Cell({ value, label, hot }: { value: string; label: string; hot?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <div className="text-center">
      <div
        className={cn(
          "relative min-w-[3.4rem] overflow-hidden rounded-xl border px-2 py-2 backdrop-blur",
          hot ? "border-crimson/40 bg-crimson/10" : "border-white/12 bg-black/45",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={reduced ? false : { y: "0.85em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: "-0.85em", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn("block font-display text-3xl tabular-nums leading-none", hot ? "text-crimson-glow" : "text-bone")}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-ash-dim">{label}</div>
    </div>
  );
}
