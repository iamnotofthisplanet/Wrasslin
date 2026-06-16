"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Compass, Sparkles, Ticket } from "lucide-react";
import { promotions, totalStats } from "@/data";
import { PromoEmblem } from "@/components/visuals";
import { compactNumber } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Hero() {
  const stats = totalStats();
  const marquee = [...promotions, ...promotions];

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />

      {/* drifting emblem marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 flex -rotate-6 opacity-25">
        <div className="flex w-max animate-marquee gap-6">
          {marquee.map((p, i) => (
            <PromoEmblem key={i} shortName={p.shortName} primary={p.primary} secondary={p.secondary} className="h-28 w-28 shrink-0" />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-60 -z-10 flex -rotate-6 opacity-15">
        <div className="flex w-max animate-marquee-rev gap-6">
          {marquee.reverse().map((p, i) => (
            <PromoEmblem key={i} shortName={p.shortName} primary={p.secondary} secondary={p.primary} className="h-24 w-24 shrink-0" />
          ))}
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.div variants={item} className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ash backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          The Indie Wrestling Hub
        </motion.div>

        <motion.h1 variants={item} className="headline mt-6 text-[clamp(2.75rem,11vw,8rem)] text-bone">
          Every Promotion.
          <br />
          <span className="text-gradient-fire text-glow">One Hub.</span>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ash">
          Discover independent wrestling promotions in your area and beyond. Rosters, shows, videos, storylines,
          tickets, merch, and a community that lives for it — all in one place, finally.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/promotions"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-[0_10px_40px_-12px_var(--color-crimson)] transition-transform hover:scale-[1.03]"
          >
            <Compass className="h-5 w-5" />
            Explore Promotions
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-3.5 text-base font-bold uppercase tracking-wide text-bone backdrop-blur transition-colors hover:border-white/30"
          >
            <Ticket className="h-5 w-5" />
            Upcoming Shows
          </Link>
        </motion.div>

        <motion.div variants={item} className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: `${stats.promotions}`, l: "Promotions" },
            { v: `${stats.wrestlers}`, l: "Wrestlers" },
            { v: `${stats.titles}`, l: "Championships" },
            { v: compactNumber(stats.followers), l: "Fans" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl text-bone">{s.v}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-ash-dim">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
