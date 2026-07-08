"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition: fade on the shell, rise on the inner wrapper.
 * The transform is stripped once settled so position: sticky children
 * (hub tabs, filter bars) get the viewport back as their containing block.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      <motion.div
        ref={inner}
        initial={{ y: 26 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => {
          inner.current?.style.removeProperty("transform");
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
