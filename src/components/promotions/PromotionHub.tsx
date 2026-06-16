"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  LayoutGrid,
  Users,
  CalendarDays,
  Play,
  Flame,
  Newspaper,
  ShoppingBag,
  MessageSquare,
  Mail,
  MapPin,
  ArrowRight,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import type {
  Promotion,
  Wrestler,
  WrestlingEvent,
  Video,
  NewsArticle,
  Storyline,
  MerchItem,
  Championship,
  Comment,
} from "@/lib/types";
import { WrestlerCard, EventCard, NewsCard, TitleCard } from "@/components/cards";
import { VideoCard } from "@/components/VideoCard";
import { MerchCard } from "@/components/MerchCard";
import { CommentSection } from "@/components/CommentSection";
import { SocialLinks } from "@/components/SocialLinks";
import { Badge } from "@/components/ui";
import { getWrestler } from "@/data";
import { cn, formatDateLong, isUpcoming } from "@/lib/utils";

interface HubData {
  promotion: Promotion;
  roster: Wrestler[];
  titles: Championship[];
  events: WrestlingEvent[];
  videos: Video[];
  news: NewsArticle[];
  storylines: Storyline[];
  merch: MerchItem[];
  comments: Comment[];
}

type TabId = "overview" | "roster" | "events" | "videos" | "storylines" | "news" | "merch" | "comments" | "contact";

export function PromotionHub(data: HubData) {
  const { promotion } = data;
  const [tab, setTab] = useState<TabId>("overview");

  const tabs: { id: TabId; label: string; icon: typeof Users; count?: number }[] = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "roster", label: "Roster", icon: Users, count: data.roster.length },
    { id: "events", label: "Events", icon: CalendarDays, count: data.events.length },
    { id: "videos", label: "Videos", icon: Play, count: data.videos.length },
    { id: "storylines", label: "Storylines", icon: Flame, count: data.storylines.length },
    { id: "news", label: "News", icon: Newspaper, count: data.news.length },
    { id: "merch", label: "Shop", icon: ShoppingBag, count: data.merch.length },
    { id: "comments", label: "Fan Wire", icon: MessageSquare, count: data.comments.length },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div className="sticky top-[64px] z-30 -mx-4 border-b border-line bg-ink/85 backdrop-blur sm:top-[68px]">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 px-3.5 py-4 text-sm font-semibold transition-colors",
                  active ? "text-bone" : "text-ash-dim hover:text-ash",
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {t.count !== undefined && (
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums", active ? "bg-crimson/20 text-crimson-glow" : "bg-white/5 text-ash-dim")}>
                    {t.count}
                  </span>
                )}
                {active && (
                  <motion.span
                    layoutId="hub-tab"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full"
                    style={{ backgroundColor: promotion.primary }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "overview" && <Overview data={data} onJump={setTab} />}
            {tab === "roster" && <Roster roster={data.roster} />}
            {tab === "events" && <Events events={data.events} />}
            {tab === "videos" && <Videos videos={data.videos} />}
            {tab === "storylines" && <Storylines storylines={data.storylines} />}
            {tab === "news" && <NewsTab news={data.news} />}
            {tab === "merch" && <Merch merch={data.merch} promotion={promotion} />}
            {tab === "comments" && (
              <CommentSection promotionId={promotion.id} seedComments={data.comments} accent={promotion.primary} />
            )}
            {tab === "contact" && <Contact promotion={promotion} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Sub-tabs ---------------- */

function TabHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-3xl text-bone sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-ash">{subtitle}</p>}
    </div>
  );
}

function Overview({ data, onJump }: { data: HubData; onJump: (t: TabId) => void }) {
  const { promotion } = data;
  const nextEvent = data.events.filter((e) => isUpcoming(e.date)).sort((a, b) => +new Date(a.date) - +new Date(b.date))[0];
  const topStory = [...data.storylines].sort((a, b) => b.heat - a.heat)[0];
  const featuredRoster = [...data.roster].sort((a, b) => b.stats.momentum - a.stats.momentum).slice(0, 4);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-10">
        <div>
          <TabHeading title="About the Promotion" />
          <div className="space-y-4">
            {promotion.about.map((para, i) => (
              <p key={i} className="text-pretty leading-relaxed text-ash">
                {para}
              </p>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {promotion.vibe.map((v) => (
              <span key={v} className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs font-semibold text-ash">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Champions */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl text-bone">Current Champions</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.titles.map((t) => (
              <TitleCard key={t.id} championship={t} />
            ))}
          </div>
        </div>

        {/* Featured roster */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl text-bone">Roster Spotlight</h3>
            <button onClick={() => onJump("roster")} className="inline-flex items-center gap-1 text-sm font-semibold text-ash hover:text-bone">
              Full roster <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {featuredRoster.map((w) => (
              <WrestlerCard key={w.id} wrestler={w} />
            ))}
          </div>
        </div>
      </div>

      {/* Side rail */}
      <div className="space-y-6">
        {nextEvent && (
          <div className="rounded-2xl border border-line card-grad p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ash-dim">
              <CalendarDays className="h-4 w-4 text-gold" /> Next Show
            </div>
            <h3 className="font-display text-2xl text-bone">{nextEvent.title}</h3>
            <p className="mt-1 text-sm text-ash">{formatDateLong(nextEvent.date)}</p>
            <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm text-ash-dim">
              <MapPin className="h-3.5 w-3.5" /> {nextEvent.venue}
            </p>
            {nextEvent.ticketUrl && (
              <a
                href={nextEvent.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white"
                style={{ background: `linear-gradient(100deg, ${promotion.primary}, var(--color-crimson-deep))` }}
              >
                <Ticket className="h-4 w-4" /> Get Tickets
              </a>
            )}
            <button onClick={() => onJump("events")} className="mt-2 w-full rounded-full border border-line py-2 text-xs font-semibold text-ash hover:text-bone">
              View full card
            </button>
          </div>
        )}

        {topStory && (
          <button onClick={() => onJump("storylines")} className="block w-full rounded-2xl border border-line card-grad p-5 text-left transition-colors hover:border-white/20">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ash-dim">
              <Flame className="h-4 w-4 text-crimson" /> Top Storyline
            </div>
            <h3 className="font-display text-xl text-bone">{topStory.title}</h3>
            <p className="mt-1.5 line-clamp-3 text-sm text-ash">{topStory.logline}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-gradient-to-r from-gold to-crimson" style={{ width: `${topStory.heat}%` }} />
            </div>
          </button>
        )}

        <div className="rounded-2xl border border-line card-grad p-5">
          <h3 className="mb-3 font-display text-xl text-bone">Follow & Connect</h3>
          <SocialLinks social={promotion.social} variant="labeled" />
        </div>
      </div>
    </div>
  );
}

function Roster({ roster }: { roster: Wrestler[] }) {
  const [filter, setFilter] = useState<"all" | "face" | "heel" | "tweener">("all");
  const filtered = filter === "all" ? roster : roster.filter((w) => w.alignment === filter);
  const champs = roster.filter((w) => (w.titles?.length ?? 0) > 0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <TabHeading title="The Roster" subtitle={`${roster.length} competitors · ${champs.length} champions`} />
        <div className="flex rounded-full border border-line bg-surface/60 p-0.5 text-xs font-bold uppercase tracking-wider">
          {(["all", "face", "heel", "tweener"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn("rounded-full px-3 py-1.5 transition-colors", filter === f ? "bg-white/10 text-bone" : "text-ash-dim hover:text-ash")}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((w) => (
          <WrestlerCard key={w.id} wrestler={w} />
        ))}
      </div>
    </div>
  );
}

function Events({ events }: { events: WrestlingEvent[] }) {
  const upcoming = events.filter((e) => isUpcoming(e.date)).sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const past = events.filter((e) => !isUpcoming(e.date)).sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <div className="space-y-10">
      <div>
        <TabHeading title="Upcoming Shows" />
        {upcoming.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} showPromo={false} />
            ))}
          </div>
        ) : (
          <p className="text-ash">No shows announced yet — follow to get notified.</p>
        )}
      </div>
      {past.length > 0 && (
        <div>
          <TabHeading title="Recent Results" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.id} event={e} showPromo={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Videos({ videos }: { videos: Video[] }) {
  return (
    <div>
      <TabHeading title="Video Library" subtitle="Full matches, highlights, promos and more." />
      <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}

function Storylines({ storylines }: { storylines: Storyline[] }) {
  return (
    <div>
      <TabHeading title="Storylines" subtitle="Every rivalry, tracked chapter by chapter." />
      <div className="space-y-6">
        {[...storylines]
          .sort((a, b) => b.heat - a.heat)
          .map((s) => (
            <StorylineDetail key={s.id} storyline={s} />
          ))}
      </div>
    </div>
  );
}

function StorylineDetail({ storyline }: { storyline: Storyline }) {
  const heroes = storyline.protagonists.map(getWrestler).filter(Boolean) as Wrestler[];
  const villains = storyline.antagonists.map(getWrestler).filter(Boolean) as Wrestler[];

  return (
    <div className="overflow-hidden rounded-2xl border border-line card-grad p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge tone={storyline.status === "Hot" ? "crimson" : storyline.status === "Building" ? "gold" : "neutral"}>
            {storyline.status === "Hot" && <Flame className="h-3 w-3" />}
            {storyline.status}
          </Badge>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ash">
            <Flame className="h-3.5 w-3.5 text-crimson" /> Heat {storyline.heat}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-bone">{heroes.map((h) => h.name).join(" & ")}</span>
          <span className="font-display text-ash-dim">VS</span>
          <span className="font-semibold text-bone">{villains.map((v) => v.name).join(" & ")}</span>
        </div>
      </div>

      <h3 className="mt-3 font-display text-2xl text-bone sm:text-3xl">{storyline.title}</h3>
      <p className="mt-2 max-w-3xl leading-relaxed text-ash">{storyline.logline}</p>

      {/* timeline */}
      <ol className="mt-6 space-y-4 border-l border-line pl-5">
        {storyline.chapters.map((c, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[1.42rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-crimson" />
            <div className="text-xs font-bold uppercase tracking-wider text-ash-dim">
              {new Date(c.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
            <div className="mt-0.5 font-semibold text-bone">{c.title}</div>
            <p className="mt-0.5 text-sm text-ash">{c.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function NewsTab({ news }: { news: NewsArticle[] }) {
  return (
    <div>
      <TabHeading title="Promotion News" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[...news]
          .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
          .map((n) => (
            <NewsCard key={n.id} article={n} />
          ))}
      </div>
    </div>
  );
}

function Merch({ merch, promotion }: { merch: MerchItem[]; promotion: Promotion }) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <TabHeading title="Official Store" subtitle="Support the promotion. Rep your favorites." />
        <span className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ash">
          Ships from {promotion.city}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {merch.map((m) => (
          <MerchCard key={m.id} item={m} />
        ))}
      </div>
    </div>
  );
}

function Contact({ promotion }: { promotion: Promotion }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <TabHeading title="Get In Touch" />
        <div className="space-y-4">
          <div className="rounded-2xl border border-line card-grad p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-ash-dim">Bookings & Enquiries</div>
            <a href={`mailto:${promotion.contactEmail}`} className="mt-1 block font-display text-xl text-bone hover:text-crimson">
              {promotion.contactEmail}
            </a>
          </div>
          <div className="rounded-2xl border border-line card-grad p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-ash-dim">Home Venue</div>
            <div className="mt-1 inline-flex items-center gap-2 font-display text-xl text-bone">
              <MapPin className="h-5 w-5 text-crimson" /> {promotion.homeVenue}
            </div>
            <div className="mt-0.5 text-sm text-ash">
              {promotion.city}, {promotion.state} · {promotion.region}
            </div>
          </div>
          <div className="rounded-2xl border border-line card-grad p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-ash-dim">Established</div>
            <div className="mt-1 font-display text-xl text-bone">{promotion.founded}</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-display text-2xl text-bone">Follow Everywhere</h3>
        <SocialLinks social={promotion.social} variant="labeled" />
        <Link
          href="/promotions"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ash hover:text-bone"
        >
          <ArrowRight className="h-4 w-4" /> Discover more promotions
        </Link>
      </div>
    </div>
  );
}
