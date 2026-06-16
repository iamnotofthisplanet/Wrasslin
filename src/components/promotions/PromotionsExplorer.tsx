"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import type { Promotion, Region } from "@/lib/types";
import { PromotionCard } from "@/components/PromotionCard";
import { regions } from "@/data";
import { cn, slugify } from "@/lib/utils";

type SortKey = "followers" | "rating" | "founded" | "az";

const sortLabels: Record<SortKey, string> = {
  followers: "Most Followed",
  rating: "Top Rated",
  founded: "Newest",
  az: "A–Z",
};

export function PromotionsExplorer({
  promotions,
  initialRegion,
}: {
  promotions: Promotion[];
  initialRegion?: string;
}) {
  const matchedRegion = regions.find((r) => slugify(r) === initialRegion);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "All">(matchedRegion ?? "All");
  const [sort, setSort] = useState<SortKey>("followers");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = promotions.filter((p) => {
      const matchesRegion = region === "All" || p.region === region;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        p.vibe.some((v) => v.toLowerCase().includes(q));
      return matchesRegion && matchesQuery;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating;
        case "founded":
          return b.founded - a.founded;
        case "az":
          return a.name.localeCompare(b.name);
        default:
          return b.followers - a.followers;
      }
    });
    return list;
  }, [promotions, query, region, sort]);

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-[68px] z-30 -mx-4 mb-8 border-y border-line bg-ink/80 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-surface/60 px-3">
              <Search className="h-4 w-4 text-ash-dim" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search promotions, cities, styles…"
                className="w-full bg-transparent py-2.5 text-sm text-bone outline-none placeholder:text-ash-dim"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-ash-dim hover:text-bone">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-3 py-1">
              <SlidersHorizontal className="h-4 w-4 text-ash-dim" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer bg-transparent py-1.5 text-sm font-semibold text-bone outline-none"
              >
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <option key={k} value={k} className="bg-ink-2">
                    {sortLabels[k]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
            {(["All", ...regions] as const).map((r) => {
              const active = region === r;
              return (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={cn(
                    "relative shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                    active ? "border-transparent text-white" : "border-line text-ash hover:text-bone",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="promo-region-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-crimson to-crimson-deep"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-5 text-sm text-ash">
        Showing <span className="font-bold text-bone">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "promotion" : "promotions"}
        {region !== "All" && (
          <>
            {" "}
            in <span className="font-bold text-bone">{region}</span>
          </>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-20 text-center">
          <p className="text-ash">No promotions match your search.</p>
          <button
            onClick={() => {
              setQuery("");
              setRegion("All");
            }}
            className="mt-3 text-sm font-semibold text-crimson hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PromotionCard key={p.id} promotion={p} />
          ))}
        </div>
      )}
    </div>
  );
}
