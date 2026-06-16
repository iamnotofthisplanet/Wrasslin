"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Check, Star, Sparkles } from "lucide-react";
import type { MerchItem } from "@/lib/types";
import { PosterArt } from "@/components/visuals";
import { Badge } from "@/components/ui";
import { formatPrice } from "@/lib/utils";

export function MerchCard({ item }: { item: MerchItem }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="relative aspect-square">
        <PosterArt seed={item.id + item.name} accent={item.accent} rounded="rounded-none" className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 grid place-items-center">
          <MerchGlyph type={item.type} />
        </div>
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {item.bestSeller && <Badge tone="gold"><Star className="h-3 w-3 fill-current" /> Best Seller</Badge>}
          {item.limited && <Badge tone="crimson"><Sparkles className="h-3 w-3" /> Limited</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ash-dim">{item.type}</span>
        <h4 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-bone">{item.name}</h4>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl text-bone">{formatPrice(item.priceCents)}</span>
          <button
            onClick={() => setAdded((a) => !a)}
            className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            style={{ backgroundColor: added ? "var(--color-mint)" : item.accent }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="added" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} className="inline-flex items-center gap-1.5 text-black">
                  <Check className="h-3.5 w-3.5" /> Added
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} className="inline-flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}

function MerchGlyph({ type }: { type: MerchItem["type"] }) {
  const label: Record<MerchItem["type"], string> = {
    Tee: "TEE",
    Hoodie: "HOODIE",
    Hat: "CAP",
    Poster: "PRINT",
    Accessory: "GEAR",
    Vinyl: "VINYL",
  };
  return (
    <span className="select-none font-display text-3xl text-white/25">{label[type]}</span>
  );
}
