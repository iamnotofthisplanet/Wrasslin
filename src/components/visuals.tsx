import { cn, hashString, initials } from "@/lib/utils";
import type { Alignment } from "@/lib/types";

/* ============================================================
   Generative brand art — no external images required.
   ============================================================ */

function darken(hex: string, amount = 0.5): string {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.slice(0, 2), 16) * amount);
  const g = Math.round(parseInt(h.slice(2, 4), 16) * amount);
  const b = Math.round(parseInt(h.slice(4, 6), 16) * amount);
  return `rgb(${r}, ${g}, ${b})`;
}

/** A bold championship-plate style emblem for a promotion. */
export function PromoEmblem({
  shortName,
  primary,
  secondary,
  className,
  rounded = "rounded-2xl",
}: {
  shortName: string;
  primary: string;
  secondary: string;
  className?: string;
  rounded?: string;
}) {
  const seed = hashString(shortName + primary);
  const angle = seed % 360;
  const uid = `${shortName}-${(seed % 9999).toString(36)}`;

  return (
    <div className={cn("relative overflow-hidden", rounded, className)} aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${angle % 45}, 0.5, 0.5)`}>
            <stop offset="0%" stopColor={primary} />
            <stop offset="100%" stopColor={darken(primary, 0.35)} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.35" r="0.8">
            <stop offset="0%" stopColor={secondary} stopOpacity="0.55" />
            <stop offset="60%" stopColor={secondary} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#bg-${uid})`} />
        <rect width="100" height="100" fill={`url(#glow-${uid})`} />
        {/* diagonal slashes */}
        <g opacity="0.18" stroke={secondary} strokeWidth="2.5">
          <line x1={-10 + (seed % 20)} y1="-10" x2="60" y2="120" />
          <line x1={10 + (seed % 20)} y1="-10" x2="80" y2="120" />
          <line x1={30 + (seed % 20)} y1="-10" x2="100" y2="120" />
        </g>
        {/* corner star */}
        <path
          d="M50 14 l4.5 9.5 10.5 1.4 -7.6 7.2 1.9 10.4 -9.3 -5 -9.3 5 1.9 -10.4 -7.6 -7.2 10.5 -1.4z"
          fill={secondary}
          opacity="0.9"
          transform="scale(0.42) translate(68 6)"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[clamp(0.9rem,4vw,2.4rem)] leading-none tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {shortName}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
    </div>
  );
}

const alignmentRing: Record<Alignment, string> = {
  face: "#3b82f6",
  heel: "#ef4444",
  tweener: "#a855f7",
};

const alignmentLabel: Record<Alignment, string> = {
  face: "FACE",
  heel: "HEEL",
  tweener: "TWEENER",
};

/** A trading-card style portrait tile for a wrestler. */
export function WrestlerAvatar({
  name,
  accent,
  alignment,
  className,
  showBadge = false,
  rounded = "rounded-2xl",
}: {
  name: string;
  accent: string;
  alignment: Alignment;
  className?: string;
  showBadge?: boolean;
  rounded?: string;
}) {
  const seed = hashString(name + accent);
  const uid = `${(seed % 99999).toString(36)}`;
  const ring = alignmentRing[alignment];

  return (
    <div className={cn("relative overflow-hidden", rounded, className)} aria-hidden>
      <svg viewBox="0 0 100 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`wa-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
            <stop offset="55%" stopColor={darken(accent, 0.4)} />
            <stop offset="100%" stopColor="#0c0c10" />
          </linearGradient>
          <pattern id={`dots-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#ffffff" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="100" height="120" fill={`url(#wa-${uid})`} />
        <rect width="100" height="120" fill={`url(#dots-${uid})`} />
        {/* abstract shoulders/silhouette */}
        <path d="M50 44 a16 16 0 1 1 0.1 0z" fill="#000" opacity="0.22" />
        <path d="M16 120 C16 92 32 78 50 78 C68 78 84 92 84 120 Z" fill="#000" opacity="0.22" />
        <circle cx="50" cy="40" r="15.5" fill="none" stroke={ring} strokeWidth="2" opacity="0.85" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-[clamp(1rem,5vw,2.6rem)] leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          {initials(name)}
        </span>
      </div>
      {showBadge && (
        <span
          className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider"
          style={{ backgroundColor: ring, color: "#fff" }}
        >
          {alignmentLabel[alignment]}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/** A cinematic, abstract poster artwork used for events and videos. */
export function PosterArt({
  seed,
  accent,
  className,
  rounded = "rounded-xl",
}: {
  seed: string;
  accent: string;
  className?: string;
  rounded?: string;
}) {
  const h = hashString(seed);
  const uid = `${(h % 99999).toString(36)}`;
  const cx = 20 + (h % 60);
  const cy = 20 + ((h >> 3) % 50);

  return (
    <div className={cn("relative overflow-hidden", rounded, className)} aria-hidden>
      <svg viewBox="0 0 160 100" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`pa-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={darken(accent, 0.55)} />
            <stop offset="100%" stopColor="#08080b" />
          </linearGradient>
          <radialGradient id={`pr-${uid}`} cx={`${cx}%`} cy={`${cy}%`} r="0.7">
            <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="160" height="100" fill={`url(#pa-${uid})`} />
        <rect width="160" height="100" fill={`url(#pr-${uid})`} />
        <g opacity="0.16" stroke="#fff" strokeWidth="0.6" fill="none">
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={i} x1={i * 26 - 20 + (h % 14)} y1="-10" x2={i * 26 + 30} y2="110" />
          ))}
        </g>
        <circle cx={cx * 1.6} cy={cy} r="1.6" fill="#fff" opacity="0.5" />
      </svg>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/** Small commenter avatar (deterministic gradient blob). */
export function CommentAvatar({ seed, className }: { seed: string; className?: string }) {
  const h = hashString(seed);
  const hue = h % 360;
  return (
    <div
      className={cn("grid place-items-center rounded-full text-[11px] font-bold text-white ring-1 ring-white/15", className)}
      style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 50%), hsl(${(hue + 50) % 360} 70% 40%))` }}
      aria-hidden
    >
      {initials(seed)}
    </div>
  );
}
