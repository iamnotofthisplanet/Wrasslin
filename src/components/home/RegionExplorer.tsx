"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, ArrowUpRight, Users } from "lucide-react";
import { promotions, regions } from "@/data";
import { PromoEmblem } from "@/components/visuals";
import { compactNumber } from "@/lib/utils";
import type { Region } from "@/lib/types";

export function RegionExplorer() {
  const [active, setActive] = useState<Region>("Northeast");
  const inRegion = promotions.filter((p) => p.region === active);

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Region list */}
      <div className="flex flex-col gap-1.5">
        {regions.map((r) => {
          const count = promotions.filter((p) => p.region === r).length;
          const isActive = r === active;
          return (
            <button
              key={r}
              onClick={() => setActive(r)}
              className={`group relative flex items-center justify-between overflow-hidden rounded-xl border px-4 py-3 text-left transition-all ${
                isActive ? "border-crimson/50 bg-crimson/10" : "border-line bg-surface/40 hover:border-white/20"
              }`}
            >
              {isActive && (
                <motion.span layoutId="region-active" className="absolute left-0 top-0 h-full w-1 bg-crimson" />
              )}
              <span className="flex items-center gap-2.5">
                <MapPin className={`h-4 w-4 ${isActive ? "text-crimson" : "text-ash-dim"}`} />
                <span className={`text-sm font-semibold ${isActive ? "text-bone" : "text-ash"}`}>{r}</span>
              </span>
              <span className={`text-xs font-bold tabular-nums ${isActive ? "text-crimson-glow" : "text-ash-dim"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Promotions in region */}
      <div className="rounded-2xl border border-line card-grad p-5">
        <div className="mb-4 flex items-center gap-2 text-sm text-ash">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-crimson" />
          {inRegion.length} {inRegion.length === 1 ? "promotion" : "promotions"} in{" "}
          <span className="font-bold text-bone">{active}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {inRegion.map((p) => (
              <Link
                key={p.id}
                href={`/promotions/${p.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-line bg-ink/40 p-3 transition-colors hover:border-white/25"
              >
                <PromoEmblem shortName={p.shortName} primary={p.primary} secondary={p.secondary} className="h-14 w-14 shrink-0" rounded="rounded-lg" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-base text-bone">{p.name}</div>
                  <div className="truncate text-xs text-ash-dim">
                    {p.city}, {p.state}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-ash">
                    <Users className="h-3 w-3" /> {compactNumber(p.followers)}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ash-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
