"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, Menu, X, Command } from "lucide-react";
import { search as runSearch, type SearchResult } from "@/data";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const NAV = [
  { label: "Discover", href: "/" },
  { label: "Promotions", href: "/promotions" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Following", href: "/following" },
];

const typeLabel: Record<SearchResult["type"], string> = {
  promotion: "Promotion",
  wrestler: "Wrestler",
  event: "Event",
  news: "News",
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays when the route changes (sync with the router).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-line py-2.5" : "border-b border-transparent py-4",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active ? "text-bone" : "text-ash hover:text-bone",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/8"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-2 pl-3 pr-2 text-sm text-ash transition-colors hover:border-white/25 hover:text-bone"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden items-center gap-0.5 rounded border border-line bg-ink px-1.5 py-0.5 text-[10px] text-ash-dim sm:flex">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-bone lg:hidden"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mx-auto mt-2 grid max-w-7xl gap-1 px-4 pb-4 sm:px-6">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-line bg-surface/60 px-4 py-3 text-base font-semibold text-bone"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <SearchPanel onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = query ? runSearch(query) : [];

  // Mounted fresh on each open, so we only need to focus — no state reset.
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-5 w-5 text-ash" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search promotions, wrestlers, events…"
                className="w-full bg-transparent py-4 text-base text-bone outline-none placeholder:text-ash-dim"
              />
              <button onClick={onClose} className="rounded-md border border-line px-2 py-1 text-xs text-ash-dim">
                ESC
              </button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {query && results.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-ash-dim">
                  No results for “{query}”. Try a promotion, city, or wrestler name.
                </div>
              )}
              {!query && (
                <div className="px-4 py-10 text-center text-sm text-ash-dim">
                  Start typing to search the entire hub.
                </div>
              )}
              {results.map((r) => (
                <Link
                  key={r.type + r.id}
                  href={r.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                >
                  <span className="h-8 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: r.accent }} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-bone">{r.title}</div>
                    <div className="truncate text-xs text-ash-dim">{r.subtitle}</div>
                  </div>
                  <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ash-dim">
                    {typeLabel[r.type]}
                  </span>
                </Link>
              ))}
            </div>
    </motion.div>
  );
}
