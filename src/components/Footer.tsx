import Link from "next/link";
import { Logo } from "@/components/Logo";
import { regions } from "@/data";
import { slugify } from "@/lib/utils";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Discover", href: "/" },
      { label: "All Promotions", href: "/promotions" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Latest News", href: "/news" },
      { label: "Following", href: "/following" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
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

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">
            The hub built for the pro wrestling fan. Discover indie promotions in your area and beyond — rosters,
            shows, storylines, merch, and a community that lives for it.
          </p>
        </div>

        <div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ash-dim">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ash transition-colors hover:text-bone">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
