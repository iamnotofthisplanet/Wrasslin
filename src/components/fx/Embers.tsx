"use client";

import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  phase: number;
  speed: number;
  alpha: number;
}

/**
 * Canvas ember field — sparks drifting up from the arena floor.
 * Pauses when offscreen / hidden; disabled for reduced motion.
 */
export function Embers({ className, count = 64 }: { className?: string; count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const embers: Ember[] = [];

    const spawn = (e?: Ember, initial = false): Ember => {
      const ember: Ember = e ?? ({} as Ember);
      ember.x = Math.random() * w;
      ember.y = initial ? Math.random() * h : h + 10;
      ember.vx = (Math.random() - 0.5) * 0.25;
      ember.vy = -(0.25 + Math.random() * 0.6);
      ember.r = 0.6 + Math.random() * 1.9;
      ember.hue = [8, 18, 32, 44][Math.floor(Math.random() * 4)];
      ember.phase = Math.random() * Math.PI * 2;
      ember.speed = 0.5 + Math.random() * 1.6;
      ember.alpha = 0.35 + Math.random() * 0.5;
      return ember;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    for (let i = 0; i < count; i++) embers.push(spawn(undefined, true));

    let t = 0;
    const tick = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const e of embers) {
        e.x += e.vx + Math.sin(t * e.speed + e.phase) * 0.18;
        e.y += e.vy;
        if (e.y < -12 || e.x < -12 || e.x > w + 12) spawn(e);
        const flicker = 0.55 + 0.45 * Math.sin(t * 3 * e.speed + e.phase);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${e.hue}, 95%, ${58 + e.hue / 4}%, ${e.alpha * flicker})`;
        ctx.shadowColor = `hsla(${e.hue}, 95%, 60%, 0.9)`;
        ctx.shadowBlur = 7;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0.02,
    });
    io.observe(canvas);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
