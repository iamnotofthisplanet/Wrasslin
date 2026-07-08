"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import type { Promotion } from "@/lib/types";
import { PromoEmblem, PosterArt } from "@/components/visuals";
import { PromotionCard } from "@/components/PromotionCard";
import { TiltCard } from "@/components/fx/TiltCard";
import { AnimatedCounter } from "@/components/fx/AnimatedCounter";
import { compactNumber } from "@/lib/utils";

const SLIDE_W = 64; // vw
const GAP = 4; // vw
const PAD = 6; // vw

/**
 * Scroll-pinned horizontal rail: the page locks and the marquee promotions
 * glide past like arena jumbotron cards. Grid fallback on touch/small/reduced.
 */
export function ShowcaseRail({ promotions }: { promotions: Promotion[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const n = promotions.length;
  const trackW = n * SLIDE_W + (n - 1) * GAP + PAD * 2;
  const shift = Math.max(0, trackW - 100);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const x = useTransform(progress, [0, 1], ["0vw", `-${shift}vw`]);
  const counter = useTransform(progress, (p) =>
    String(Math.min(n, Math.floor(p * n) + 1)).padStart(2, "0"),
  );

  /* Fallback grid — mobile & reduced motion */
  const grid = (
    <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 sm:px-6">
      {promotions.map((p) => (
        <PromotionCard key={p.id} promotion={p} featured />
      ))}
    </div>
  );

  if (reduced) return grid;

  return (
    <>
      <div className="lg:hidden">{grid}</div>

      <div ref={wrapRef} className="relative hidden lg:block" style={{ height: `${n * 85}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Track */}
          <motion.div style={{ x }} className="flex w-max items-stretch" aria-label="Marquee promotions showcase">
            <div style={{ width: `${PAD}vw` }} className="shrink-0" />
            {promotions.map((p, i) => (
              <div key={p.id} className="shrink-0" style={{ width: `${SLIDE_W}vw`, marginRight: i === n - 1 ? 0 : `${GAP}vw` }}>
                <Slide promotion={p} index={i} />
              </div>
            ))}
            <div style={{ width: `${PAD}vw` }} className="shrink-0" />
          </motion.div>

          {/* Progress rail */}
          <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto flex w-full max-w-7xl items-center gap-5 px-6">
            <div className="flex items-baseline gap-1 font-display text-xl text-bone">
              <motion.span>{counter}</motion.span>
              <span className="text-ash-dim">/ {String(n).padStart(2, "0")}</span>
            </div>
            <div className="h-px flex-1 overflow-visible bg-white/10">
              <motion.div
                style={{ scaleX: progress }}
                className="h-[3px] w-full origin-left -translate-y-[1px] rounded-full bg-gradient-to-r from-gold via-crimson to-electric shadow-[0_0_12px_rgba(255,45,70,0.6)]"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-ash-dim">Keep Scrolling</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Slide({ promotion: p, index }: { promotion: Promotion; index: number }) {
  return (
    <TiltCard max={4} scale={1.005} className="group h-[66vh]">
      <Link
        href={`/promotions/${p.slug}`}
        data-cursor="ENTER"
        data-sheen
        className="relative flex h-full overflow-hidden rounded-[2rem] border border-line transition-colors duration-300"
        style={{ background: `linear-gradient(120deg, ${p.primary}26 0%, var(--color-ink-2) 55%)` }}
      >
        {/* backdrop art */}
        <PosterArt seed={p.id + p.name} accent={p.primary} rounded="rounded-none" className="absolute inset-0 h-full w-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />

        {/* giant index */}
        <span className="text-stroke-faint pointer-events-none absolute -right-2 -top-8 select-none font-display text-[13rem] leading-none opacity-70">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 flex w-full items-center gap-10 p-12">
          {/* Info */}
          <div className="max-w-xl flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-bone backdrop-blur">
                <MapPin className="h-3 w-3" style={{ color: p.primary }} /> {p.city}, {p.state}
              </span>
              <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black" style={{ backgroundColor: p.secondary }}>
                ★ Marquee
              </span>
            </div>

            <h3 className="headline mt-5 text-6xl text-bone xl:text-7xl">{p.name}</h3>
            <p className="mt-3 text-lg italic text-ash">“{p.tagline}”</p>
            <p className="mt-4 max-w-md leading-relaxed text-ash">{p.hook}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.vibe.slice(0, 4).map((v) => (
                <span key={v} className="rounded-full bg-white/6 px-3 py-1.5 text-xs font-semibold text-ash ring-1 ring-white/10">
                  {v}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <AnimatedCounter to={p.followers} format={(v) => compactNumber(Math.round(v))} className="font-display text-4xl text-bone" />
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ash-dim">Followers</div>
              </div>
              <div>
                <div className="flex items-center gap-1 font-display text-4xl text-gold">
                  {p.rating.toFixed(1)} <Star className="h-5 w-5 fill-gold" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ash-dim">Fan Rating</div>
              </div>
              <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-bone backdrop-blur transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-crimson group-hover:to-crimson-deep">
                Enter the Hub <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>

          {/* Emblem */}
          <div className="relative hidden shrink-0 xl:block">
            <div className="aura-conic absolute -inset-14 rounded-full opacity-70" aria-hidden />
            <PromoEmblem shortName={p.shortName} primary={p.primary} secondary={p.secondary} className="relative h-64 w-64 animate-float rounded-[2rem] glow-soft" rounded="rounded-[2rem]" />
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
