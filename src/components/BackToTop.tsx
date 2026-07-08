"use client";

import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/fx/Magnetic";

export function BackToTop() {
  return (
    <Magnetic strength={0.45}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        data-cursor="TOP"
        className="group grid h-14 w-14 place-items-center rounded-full border border-line bg-surface/70 text-ash backdrop-blur transition-colors hover:border-crimson/60 hover:text-bone"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
      </button>
    </Magnetic>
  );
}
