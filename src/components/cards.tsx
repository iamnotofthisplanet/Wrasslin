import Link from "next/link";
import { MapPin, Clock, Ticket, Flame, Trophy, ChevronRight, Crown } from "lucide-react";
import type { WrestlingEvent, NewsArticle, Wrestler, Storyline, Championship } from "@/lib/types";
import { PosterArt, WrestlerAvatar } from "@/components/visuals";
import { AlignmentChip, Badge, MomentumBar, Tag } from "@/components/ui";
import { getPromotion, getWrestler } from "@/data";
import { cn, daysUntil, formatDate, formatPrice, formatTime, isUpcoming, relativeTime } from "@/lib/utils";

/* ---------------- Event ---------------- */
export function EventCard({ event, showPromo = true }: { event: WrestlingEvent; showPromo?: boolean }) {
  const promo = getPromotion(event.promotionId);
  const main = event.card.find((m) => m.isMain) ?? event.card[0];
  const upcoming = isUpcoming(event.date);
  const days = daysUntil(event.date);

  return (
    <div
      data-sheen
      data-spot
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line card-grad transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="relative h-32">
        <PosterArt seed={event.id + event.title} accent={event.posterAccent} rounded="rounded-none" className="h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        {/* date chip */}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl border border-white/15 bg-black/50 px-3 py-1.5 backdrop-blur">
          <span className="font-display text-2xl leading-none text-white">{new Date(event.date).getDate()}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ash">
            {formatDate(event.date, { month: "short" })}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
          {upcoming ? (
            days <= 14 ? (
              <Badge tone="crimson">{days <= 0 ? "Tonight" : `In ${days} days`}</Badge>
            ) : (
              <Badge tone="gold">Upcoming</Badge>
            )
          ) : (
            <Badge tone="neutral">Past Event</Badge>
          )}
          {event.soldOut && <Badge tone="crimson">Sold Out</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {showPromo && promo && (
          <Link href={`/promotions/${promo.slug}`} className="mb-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ash transition-colors hover:text-bone" style={{ color: promo.primary }}>
            {promo.shortName}
          </Link>
        )}
        <h3 className="font-display text-2xl leading-tight text-bone">{event.title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ash">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ash-dim" /> {event.venue}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-ash-dim" /> {formatTime(event.date)}
          </span>
        </div>

        {main && (
          <div className="mt-4 rounded-xl border border-line bg-ink/40 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ash-dim">
              <Flame className="h-3 w-3 text-crimson" /> Main Event
            </div>
            <div className="text-sm font-semibold text-bone">{main.sides.join("  vs  ")}</div>
            {main.titleOnTheLine && <div className="mt-1 text-xs text-gold">🏆 {main.titleOnTheLine}</div>}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-5">
          {event.priceFromCents ? (
            <div className="text-sm text-ash">
              from <span className="font-bold text-bone">{formatPrice(event.priceFromCents)}</span>
            </div>
          ) : (
            <span className="text-sm text-ash-dim">—</span>
          )}
          {upcoming && event.ticketUrl ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-bone transition-colors hover:bg-white/20"
            >
              <Ticket className="h-3.5 w-3.5" /> Tickets
            </a>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider text-ash-dim">
              {event.card.length} matches
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- News ---------------- */
const newsTone: Record<NewsArticle["tag"], "crimson" | "gold" | "mint" | "electric" | "neutral"> = {
  Breaking: "crimson",
  Results: "mint",
  Signing: "gold",
  Injury: "crimson",
  Feature: "electric",
  Rumor: "neutral",
};

export function NewsCard({ article, compact = false }: { article: NewsArticle; compact?: boolean }) {
  const promo = getPromotion(article.promotionId);
  return (
    <Link
      href={`/news#${article.id}`}
      data-spot
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line card-grad p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className="flex items-center gap-2">
        <Badge tone={newsTone[article.tag]}>{article.tag}</Badge>
        {promo && <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promo.primary }}>{promo.shortName}</span>}
      </div>
      <h3 className={cn("font-display leading-tight text-bone transition-colors group-hover:text-white", compact ? "text-lg" : "text-xl")}>
        {article.title}
      </h3>
      {!compact && <p className="line-clamp-2 text-sm leading-relaxed text-ash">{article.excerpt}</p>}
      <div className="mt-auto flex items-center gap-2 pt-1 text-xs text-ash-dim">
        <span>{article.author}</span>
        <span>·</span>
        <span>{relativeTime(article.publishedAt)}</span>
        <span>·</span>
        <span>{article.readMinutes} min read</span>
      </div>
    </Link>
  );
}

/* ---------------- Wrestler ---------------- */
export function WrestlerCard({ wrestler }: { wrestler: Wrestler }) {
  const titleCount = wrestler.titles?.length ?? 0;
  return (
    <Link
      href={`/wrestlers/${wrestler.id}`}
      data-sheen
      data-spot
      data-cursor="VIEW"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
    >
      <div className="relative aspect-[4/5]">
        <WrestlerAvatar
          name={wrestler.name}
          accent={wrestler.accent}
          alignment={wrestler.alignment}
          rounded="rounded-none"
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        {titleCount > 0 && (
          <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-gold/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            <Crown className="h-3 w-3" /> Champ
          </div>
        )}
        <div className="absolute left-2 top-2">
          <AlignmentChip alignment={wrestler.alignment} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        {wrestler.nickname && (
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: wrestler.accent }}>
            “{wrestler.nickname}”
          </span>
        )}
        <h3 className="font-display text-lg leading-tight text-bone">{wrestler.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-ash-dim">{wrestler.finisher}</p>
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-ash-dim">
            <span>Momentum</span>
            <span className="tabular-nums text-ash">
              {wrestler.stats.wins}-{wrestler.stats.losses}
            </span>
          </div>
          <MomentumBar value={wrestler.stats.momentum} />
        </div>
      </div>
    </Link>
  );
}

/* ---------------- Storyline ---------------- */
const statusTone: Record<Storyline["status"], "crimson" | "gold" | "neutral"> = {
  Hot: "crimson",
  Building: "gold",
  Concluded: "neutral",
};

export function StorylineCard({ storyline }: { storyline: Storyline }) {
  const promo = getPromotion(storyline.promotionId);
  const heroes = storyline.protagonists.map(getWrestler).filter(Boolean) as Wrestler[];
  const villains = storyline.antagonists.map(getWrestler).filter(Boolean) as Wrestler[];

  return (
    <div data-spot className="group relative overflow-hidden rounded-2xl border border-line card-grad p-5 transition-all duration-300 hover:border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge tone={statusTone[storyline.status]}>
            {storyline.status === "Hot" && <Flame className="h-3 w-3" />}
            {storyline.status}
          </Badge>
          {promo && <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promo.primary }}>{promo.shortName}</span>}
        </div>
        <div className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-crimson" />
          <span className="text-xs font-bold text-bone">{storyline.heat}</span>
        </div>
      </div>

      <h3 className="mt-3 font-display text-2xl leading-tight text-bone">{storyline.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ash">{storyline.logline}</p>

      <div className="mt-4 flex items-center gap-3">
        <FactionStack wrestlers={heroes} />
        <span className="font-display text-sm text-ash-dim">VS</span>
        <FactionStack wrestlers={villains} />
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-ash-dim">
          {storyline.chapters.length} chapters <ChevronRight className="h-3 w-3" />
        </span>
      </div>

      {/* heat bar */}
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-crimson"
          style={{ width: `${storyline.heat}%` }}
        />
      </div>
    </div>
  );
}

function FactionStack({ wrestlers }: { wrestlers: Wrestler[] }) {
  return (
    <div className="flex items-center">
      {wrestlers.slice(0, 3).map((w, i) => (
        <div key={w.id} className={cn("h-9 w-9 overflow-hidden rounded-full ring-2 ring-surface", i > 0 && "-ml-3")} title={w.name}>
          <WrestlerAvatar name={w.name} accent={w.accent} alignment={w.alignment} rounded="rounded-full" className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}

/* ---------------- Championship ---------------- */
export function TitleCard({ championship }: { championship: Championship }) {
  const holder = getWrestler(championship.holderId);
  const reignDays = daysUntil(championship.since) * -1;

  return (
    <Link
      href={holder ? `/wrestlers/${holder.id}` : "#"}
      data-sheen
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-line card-grad p-4 transition-all duration-300 hover:border-gold/40"
    >
      <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-gold/30 to-gold-deep/20 ring-1 ring-gold/30">
        <Trophy className="h-7 w-7 text-gold gold-glow" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Tag color="#ffc24b">{championship.division}</Tag>
        </div>
        <h4 className="mt-1.5 truncate font-display text-lg leading-tight text-bone">{championship.name}</h4>
        {holder && (
          <p className="mt-0.5 truncate text-sm text-ash">
            <Crown className="mr-1 inline h-3.5 w-3.5 text-gold" />
            {holder.name} · <span className="text-ash-dim">{reignDays} day reign</span>
          </p>
        )}
      </div>
    </Link>
  );
}
