import Link from "next/link";
import { Logo } from "@/components/Logo";
import { BackToTop } from "@/components/BackToTop";
import { regions } from "@/data";
import { slugify } from "@/lib/utils";

const exploreLinks = [
  { label: "Discover", href: "/" },
  { label: "All Promotions", href: "/promotions" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Latest News", href: "/news" },
  { label: "Following", href: "/following" },
];

const WORDMARK = "WRASSLIN".split("");

export function Footer() {
  return (
    <footer className="relative mt-28 overflow-hidden border-t border-line">
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-line bg-ink-2 py-4">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center gap-8">
              {["Independent Wrestling", "Every Territory", "One Hub", "Follow The Indies", "Support Local Wrestling", "Built For Fans"].map(
                (t, i) => (
                  <span key={i} className="flex items-center gap-8 font-display text-xl uppercase tracking-wide text-ash-dim">
                    {t}
                    <span className="text-crimson">✦</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            The hub built for the pro wrestling fan. Discover indie promotions in your area and beyond — rosters,
            shows, storylines, merch, and a community that lives for it.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ash-dim">Explore</h4>
          <ul className="space-y-2">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-sweep text-sm text-ash transition-colors hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ash-dim">By Region</h4>
              <div className="flex flex-wrap gap-2">
                {regions.map((r) => (
                  <Link
                    key={r}
                    href={`/promotions?region=${slugify(r)}`}
                    className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs font-semibold text-ash transition-colors hover:border-white/25 hover:text-bone"
                  >
                    {r}
                  </Link>
                ))}
              </div>
            </div>
            <BackToTop />
          </div>
        </div>
      </div>

      {/* Giant interactive wordmark */}
      <div className="relative mx-auto max-w-7xl select-none px-4 sm:px-6" aria-hidden>
        <div className="flex justify-between leading-none">
          {WORDMARK.map((l, i) => (
            <span
              key={i}
              className="text-stroke-faint font-display text-[clamp(3.2rem,11.5vw,10.5rem)] transition-all duration-300 hover:-translate-y-2 hover:text-crimson"
              style={{ WebkitTextStrokeColor: undefined }}
            >
              {l}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-ash-dim sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} WRASSLIN — A fan-built indie wrestling hub. All promotions fictional.</p>
          <p>Made for the marks, by the marks. ✦</p>
        </div>
      </div>
    </footer>
  );
}
