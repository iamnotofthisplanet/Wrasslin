"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X, Eye, ExternalLink } from "lucide-react";
import type { Video } from "@/lib/types";
import { PosterArt } from "@/components/visuals";
import { Badge } from "@/components/ui";
import { getPromotion } from "@/data";
import { compactNumber, formatDate, formatDuration } from "@/lib/utils";

export function VideoCard({ video }: { video: Video }) {
  const [open, setOpen] = useState(false);
  const promo = getPromotion(video.promotionId);
  const channel = promo?.social.find((s) => s.platform === "youtube");

  return (
    <>
      <button onClick={() => setOpen(true)} className="group block w-full text-left">
        <div className="relative aspect-video overflow-hidden rounded-xl border border-line">
          <PosterArt seed={video.id + video.title} accent={video.accent} rounded="rounded-none" className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-crimson">
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </span>
          </div>
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-bold tabular-nums text-white">
            {formatDuration(video.durationSec)}
          </span>
          <span className="absolute left-2 top-2">
            <Badge tone="neutral" className="bg-black/50 backdrop-blur">{video.category}</Badge>
          </span>
        </div>
        <h4 className="mt-2.5 line-clamp-2 text-sm font-semibold leading-snug text-bone transition-colors group-hover:text-white">
          {video.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-xs text-ash-dim">
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" /> {compactNumber(video.views)}
          </span>
          <span>·</span>
          <span>{formatDate(video.publishedAt)}</span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-ink-2"
            >
              <div className="relative aspect-video">
                <PosterArt seed={video.id + video.title} accent={video.accent} rounded="rounded-none" className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-crimson/90 text-white shadow-[0_0_40px_-4px_var(--color-crimson)]"
                  >
                    <Play className="h-9 w-9 translate-x-1 fill-current" />
                  </motion.span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-black"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-sm font-bold tabular-nums text-white">
                  {formatDuration(video.durationSec)}
                </span>
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Badge tone="crimson">{video.category}</Badge>
                  {promo && <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promo.primary }}>{promo.name}</span>}
                </div>
                <h3 className="font-display text-2xl leading-tight text-bone">{video.title}</h3>
                <div className="mt-2 flex items-center gap-3 text-sm text-ash">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-4 w-4" /> {compactNumber(video.views)} views
                  </span>
                  <span>·</span>
                  <span>{formatDate(video.publishedAt, { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                {channel && (
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-bold text-bone transition-colors hover:bg-white/20"
                  >
                    <ExternalLink className="h-4 w-4" /> Watch on {promo?.shortName} YouTube
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
