import { promotions } from "./promotions";
import { wrestlers } from "./wrestlers";
import { championships } from "./championships";
import { events } from "./events";
import { videos } from "./videos";
import { news } from "./news";
import { storylines } from "./storylines";
import { merch } from "./merch";
import { seedComments } from "./comments";
import type { Promotion, Region } from "@/lib/types";
import { isUpcoming } from "@/lib/utils";

export { promotions, wrestlers, championships, events, videos, news, storylines, merch, seedComments };

/* ---------------- Lookups ---------------- */
export const getPromotion = (id: string) => promotions.find((p) => p.id === id);
export const getPromotionBySlug = (slug: string) => promotions.find((p) => p.slug === slug);
export const getWrestler = (id: string) => wrestlers.find((w) => w.id === id);
export const getChampionship = (id: string) => championships.find((c) => c.id === id);

/* ---------------- By promotion ---------------- */
export const rosterOf = (promotionId: string) => wrestlers.filter((w) => w.promotionId === promotionId);
export const titlesOf = (promotionId: string) => championships.filter((c) => c.promotionId === promotionId);
export const eventsOf = (promotionId: string) => events.filter((e) => e.promotionId === promotionId);
export const videosOf = (promotionId: string) => videos.filter((v) => v.promotionId === promotionId);
export const newsOf = (promotionId: string) => news.filter((n) => n.promotionId === promotionId);
export const storylinesOf = (promotionId: string) => storylines.filter((s) => s.promotionId === promotionId);
export const merchOf = (promotionId: string) => merch.filter((m) => m.promotionId === promotionId);
export const commentsOf = (promotionId: string) => seedComments.filter((c) => c.promotionId === promotionId);

/* ---------------- Global feeds ---------------- */
export const upcomingEvents = () =>
  [...events]
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));

export const allNewsSorted = () =>
  [...news].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

export const allVideosSorted = () =>
  [...videos].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

export const hottestStorylines = () =>
  [...storylines].sort((a, b) => b.heat - a.heat);

export const trendingWrestlers = () =>
  [...wrestlers].sort((a, b) => b.stats.momentum - a.stats.momentum);

export const featuredPromotions = () => promotions.filter((p) => p.established);

export const regions: Region[] = [
  "Northeast",
  "Southeast",
  "Midwest",
  "Southwest",
  "West Coast",
  "Pacific NW",
  "UK & Europe",
];

export const promotionsByRegion = (region: Region) => promotions.filter((p) => p.region === region);

export interface SearchResult {
  type: "promotion" | "wrestler" | "event" | "news";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  accent: string;
}

export function search(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];

  for (const p of promotions) {
    if (
      p.name.toLowerCase().includes(q) ||
      p.shortName.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.vibe.some((v) => v.toLowerCase().includes(q))
    ) {
      results.push({ type: "promotion", id: p.id, title: p.name, subtitle: `${p.city}, ${p.state} · ${p.region}`, href: `/promotions/${p.slug}`, accent: p.primary });
    }
  }
  for (const w of wrestlers) {
    if (w.name.toLowerCase().includes(q) || (w.nickname?.toLowerCase().includes(q) ?? false)) {
      const promo = getPromotion(w.promotionId);
      results.push({ type: "wrestler", id: w.id, title: w.nickname ? `${w.name} "${w.nickname}"` : w.name, subtitle: `${promo?.shortName ?? ""} · ${w.alignment}`, href: `/wrestlers/${w.id}`, accent: w.accent });
    }
  }
  for (const e of events) {
    if (e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q)) {
      results.push({ type: "event", id: e.id, title: e.title, subtitle: `${e.venue} · ${e.city}`, href: `/events`, accent: e.posterAccent });
    }
  }
  for (const n of news) {
    if (n.title.toLowerCase().includes(q)) {
      const promo = getPromotion(n.promotionId);
      results.push({ type: "news", id: n.id, title: n.title, subtitle: `${promo?.shortName ?? ""} · ${n.tag}`, href: `/news`, accent: promo?.primary ?? "#fff" });
    }
  }
  return results.slice(0, 12);
}

export function totalStats() {
  return {
    promotions: promotions.length,
    wrestlers: wrestlers.length,
    events: events.length,
    titles: championships.length,
    followers: promotions.reduce((sum, p) => sum + p.followers, 0),
  };
}

export type { Promotion };
