"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "wrasslin.introSeen";
const LETTERS = "WRASSLIN".split("");

/**
 * One-time branded curtain (per session). Letters slam in, the slash sweeps,
 * the curtain lifts. Skipped entirely for return visits & reduced motion.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  // Syncs with sessionStorage/media-query before first paint — intentional.
  /* eslint-disable react-hooks/set-state-in-effect */
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(KEY)) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* private mode */
      }
    }, 1750);
    return () => clearTimeout(t);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <>
      <noscript>
        <style>{`#wr-preloader{display:none!important}`}</style>
      </noscript>
      <AnimatePresence>
        {show && (
          <motion.div
            id="wr-preloader"
            className="fixed inset-0 z-[100] grid place-items-center bg-ink"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden
          >
            <div className="relative overflow-hidden px-6 py-4">
              <div className="flex">
                {LETTERS.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "115%", rotate: 6, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.055, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-display text-[clamp(3rem,10vw,7rem)] leading-none ${i >= 6 ? "text-crimson" : "text-bone"}`}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.72, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="preloader-slash mt-3 h-1.5 origin-left rounded-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.4 }}
                className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.5em] text-ash-dim"
              >
                The Indie Wrestling Hub
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
