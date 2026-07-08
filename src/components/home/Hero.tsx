"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Compass, Sparkles, Ticket } from "lucide-react";
import { promotions, totalStats } from "@/data";
import { PromoEmblem } from "@/components/visuals";
import { Embers } from "@/components/fx/Embers";
import { Magnetic } from "@/components/fx/Magnetic";
import { KineticText } from "@/components/fx/KineticText";
import { AnimatedCounter } from "@/components/fx/AnimatedCounter";
import { compactNumber } from "@/lib/utils";

export function Hero() {
  const stats = totalStats();
  const reduced = useReducedMotion();

  /* Scroll-linked exit: the hero sinks and dims as you leave it */
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 640], [0, -110]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);
  const bgY = useTransform(scrollY, [0, 640], [0, 120]);
  const cueOpacity = useTransform(scrollY, [0, 140], [1, 0]);

  /* Mouse parallax: layers drift against the cursor at different depths */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const layerFar = { x: useTransform(smx, (v) => v * -18), y: useTransform(smy, (v) => v * -12) };
  const layerMid = { x: useTransform(smx, (v) => v * -34), y: useTransform(smy, (v) => v * -22) };
  const layerNear = { x: useTransform(smx, (v) => v * 22), y: useTransform(smy, (v) => v * 14) };

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const { innerWidth, innerHeight } = window;
    mx.set(e.clientX / innerWidth - 0.5);
    my.set(e.clientY / innerHeight - 0.5);
  }

  const rowA = [...promotions, ...promotions];
  const rowB = [...promotions].reverse().concat([...promotions].reverse());
  const watermark = Array.from({ length: 8 });

  return (
    <section
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-32 pt-32 sm:pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />

      {/* Giant outlined watermark ticker */}
      <motion.div style={reduced ? undefined : { y: bgY }} className="pointer-events-none absolute inset-x-0 top-[16%] -z-10 select-none" aria-hidden>
        <motion.div style={layerFar} className="flex w-max animate-marquee gap-12 opacity-[0.14]">
          {watermark.map((_, i) => (
            <span key={i} className="text-stroke-faint font-display text-[22vw] leading-none sm:text-[15vw]">
              WRASSLIN ✦
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Drifting emblem marquees at two depths */}
      <motion.div style={layerMid} className="pointer-events-none absolute inset-x-0 top-24 -z-10 -rotate-6 opacity-25" aria-hidden>
        <div className="flex w-max animate-marquee gap-6">
          {rowA.map((p, i) => (
            <PromoEmblem key={i} shortName={p.shortName} primary={p.primary} secondary={p.secondary} className="h-28 w-28 shrink-0" />
          ))}
        </div>
      </motion.div>
      <motion.div style={layerNear} className="pointer-events-none absolute inset-x-0 bottom-16 -z-10 -rotate-6 opacity-[0.14]" aria-hidden>
        <div className="flex w-max animate-marquee-rev gap-6">
          {rowB.map((p, i) => (
            <PromoEmblem key={i} shortName={p.shortName} primary={p.secondary} secondary={p.primary} className="h-24 w-24 shrink-0" />
          ))}
        </div>
      </motion.div>

      {/* Ember field */}
      <Embers className="pointer-events-none absolute inset-0 -z-[5] h-full w-full" />

      {/* Spotlight cone from above */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-[6] h-[80vh] w-[110vw] -translate-x-1/2"
        style={{ background: "radial-gradient(52% 62% at 50% 0%, rgba(255,255,255,0.07), transparent 70%)" }}
        aria-hidden
      />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-ash backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          The Indie Wrestling Hub
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson" />
          </span>
        </motion.div>

        <h1 className="headline mt-7 text-[clamp(2.9rem,11.5vw,9rem)] text-bone">
          <KineticText text="EVERY PROMOTION." mode="char" stagger={0.028} delay={0.25} as="span" className="block" />
          <KineticText
            text="ONE HUB."
            mode="word"
            stagger={0.14}
            delay={0.8}
            as="span"
            className="block pb-2"
            innerClassName="text-gradient-fire text-glow"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ash"
        >
          Discover independent wrestling promotions in your area and beyond. Rosters, shows, videos, storylines,
          tickets, merch, and a community that lives for it — all in one place, finally.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Link
              href="/promotions"
              data-cursor="GO"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-[0_10px_50px_-10px_var(--color-crimson)] transition-shadow hover:shadow-[0_14px_70px_-8px_var(--color-crimson)]"
            >
              <Compass className="h-5 w-5" />
              Explore Promotions
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link
              href="/events"
              data-cursor="GO"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-8 py-4 text-base font-bold uppercase tracking-wide text-bone backdrop-blur transition-colors hover:border-white/30"
            >
              <Ticket className="h-5 w-5" />
              Upcoming Shows
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {[
            { to: stats.promotions, l: "Promotions", f: (n: number) => `${Math.round(n)}` },
            { to: stats.wrestlers, l: "Wrestlers", f: (n: number) => `${Math.round(n)}` },
            { to: stats.titles, l: "Championships", f: (n: number) => `${Math.round(n)}` },
            { to: stats.followers, l: "Fans", f: (n: number) => compactNumber(Math.round(n)) },
          ].map((s) => (
            <div key={s.l}>
              <AnimatedCounter to={s.to} format={s.f} className="font-display text-4xl text-bone sm:text-5xl" />
              <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-ash-dim">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={reduced ? undefined : { opacity: cueOpacity }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
        aria-hidden
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ash-dim">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 h-full animate-[scroll-cue_2.2s_var(--ease-out-expo)_infinite] bg-gradient-to-b from-transparent via-crimson to-crimson" />
        </span>
      </motion.div>
    </section>
  );
}
