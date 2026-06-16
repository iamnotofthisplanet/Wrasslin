import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- Tag / Badge ---------------- */
export function Tag({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        className,
      )}
      style={
        color
          ? { borderColor: `${color}55`, color, backgroundColor: `${color}14` }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "crimson" | "gold" | "mint" | "electric";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-white/8 text-ash border-line",
    crimson: "bg-crimson/15 text-crimson-glow border-crimson/40",
    gold: "bg-gold/15 text-gold border-gold/40",
    mint: "bg-mint/15 text-mint border-mint/40",
    electric: "bg-electric/15 text-electric-glow border-electric/40",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider", tones[tone], className)}>
      {children}
    </span>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
  accent = "var(--color-crimson)",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  action?: { label: string; href: string };
  className?: string;
  accent?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2">
            <span className="h-3 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-ash">{eyebrow}</span>
          </div>
        )}
        <h2 className="headline text-3xl text-bone sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ash transition-colors hover:text-bone"
        >
          {action.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  );
}

/* ---------------- Stat ---------------- */
export function StatBlock({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div>
      <div className="font-display text-3xl leading-none sm:text-4xl" style={accent ? { color: accent } : undefined}>
        {value}
      </div>
      <div className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-ash-dim">{label}</div>
    </div>
  );
}

/* ---------------- Momentum bar ---------------- */
export function MomentumBar({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, ((value + 100) / 200) * 100));
  const hot = value >= 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: hot
              ? "linear-gradient(90deg, var(--color-gold), var(--color-crimson))"
              : "linear-gradient(90deg, #3b3b46, #6f6f7e)",
          }}
        />
      </div>
      <span className={cn("text-xs font-bold tabular-nums", hot ? "text-crimson-glow" : "text-ash-dim")}>
        {value > 0 ? "+" : ""}
        {value}
      </span>
    </div>
  );
}

/* ---------------- Rating stars ---------------- */
export function RatingStars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-3.5 w-3.5", i < Math.round(rating) ? "fill-gold text-gold" : "text-ash-dim/40")}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-gold">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ---------------- Alignment chip ---------------- */
export function AlignmentChip({ alignment }: { alignment: "face" | "heel" | "tweener" }) {
  const map = {
    face: { label: "Face", cls: "bg-blue-500/15 text-blue-400 border-blue-500/40" },
    heel: { label: "Heel", cls: "bg-red-500/15 text-red-400 border-red-500/40" },
    tweener: { label: "Tweener", cls: "bg-purple-500/15 text-purple-400 border-purple-500/40" },
  } as const;
  const m = map[alignment];
  return <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", m.cls)}>{m.label}</span>;
}
