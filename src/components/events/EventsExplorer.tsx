"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { WrestlingEvent, Region } from "@/lib/types";
import { EventCard } from "@/components/cards";
import { SpotlightGroup } from "@/components/fx/Spotlight";
import { regions } from "@/data";
import { cn, isUpcoming } from "@/lib/utils";

type TimeFilter = "upcoming" | "past" | "all";

export function EventsExplorer({ events }: { events: WrestlingEvent[] }) {
  const [time, setTime] = useState<TimeFilter>("upcoming");
  const [region, setRegion] = useState<Region | "All">("All");

  const filtered = useMemo(() => {
    let list = events.filter((e) => {
      const t =
        time === "all" ? true : time === "upcoming" ? isUpcoming(e.date) : !isUpcoming(e.date);
      const r = region === "All" || e.region === region;
      return t && r;
    });
    list = [...list].sort((a, b) =>
      time === "past" ? +new Date(b.date) - +new Date(a.date) : +new Date(a.date) - +new Date(b.date),
    );
    return list;
  }, [events, time, region]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex w-full max-w-sm rounded-full border border-line bg-surface/60 p-1 text-sm font-bold uppercase tracking-wider">
          {(["upcoming", "past", "all"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={cn(
                "relative flex-1 rounded-full px-4 py-2 transition-colors",
                time === t ? "text-white" : "text-ash-dim hover:text-ash",
              )}
            >
              {time === t && (
                <motion.span layoutId="events-time" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-crimson to-crimson-deep" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              {t}
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {(["All", ...regions] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                region === r ? "border-white/30 bg-white/10 text-bone" : "border-line text-ash hover:text-bone",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 text-sm text-ash">
        <span className="font-bold text-bone">{filtered.length}</span> {filtered.length === 1 ? "show" : "shows"}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-20 text-center text-ash">
          No shows match these filters.
        </div>
      ) : (
        <SpotlightGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((e, i) => (
              <motion.div
                key={e.id}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.05 }}
              >
                <EventCard event={e} />
              </motion.div>
            ))}
          </AnimatePresence>
        </SpotlightGroup>
      )}
    </div>
  );
}
