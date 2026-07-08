import type { Metadata } from "next";
import Link from "next/link";
import { Ticket, MapPin, Flame, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EventsExplorer } from "@/components/events/EventsExplorer";
import { Countdown } from "@/components/events/Countdown";
import { PosterArt } from "@/components/visuals";
import { Badge } from "@/components/ui";
import { events, upcomingEvents, getPromotion } from "@/data";
import { daysUntil, formatDateLong, formatPrice, formatTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Every upcoming indie wrestling show and recent result, all in one calendar.",
};

export default function EventsPage() {
  const next = upcomingEvents()[0];
  const promo = next ? getPromotion(next.promotionId) : undefined;
  const main = next?.card.find((m) => m.isMain) ?? next?.card[0];

  return (
    <>
      <PageHeader
        eyebrow="The Calendar"
        title={
          <>
            Upcoming <span className="text-gradient-fire">Shows</span>
          </>
        }
        description="From sold-out armories to intimate warehouse brawls — find your next live wrestling experience and lock in your tickets."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Featured next show */}
        {next && (
          <Link
            href={promo ? `/promotions/${promo.slug}` : "#"}
            data-sheen
            data-cursor="VIEW"
            className="group relative mb-12 block overflow-hidden rounded-3xl border border-line"
          >
            <PosterArt seed={next.id + next.title} accent={next.posterAccent} rounded="rounded-none" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
            <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge tone="crimson">
                    <Flame className="h-3 w-3" /> Next Big Show
                  </Badge>
                  {daysUntil(next.date) <= 14 && (
                    <Badge tone="gold">{daysUntil(next.date) <= 0 ? "Tonight" : `In ${daysUntil(next.date)} days`}</Badge>
                  )}
                  {promo && <span className="text-xs font-bold uppercase tracking-wider" style={{ color: promo.primary }}>{promo.name}</span>}
                </div>
                <h2 className="headline text-4xl text-bone sm:text-5xl md:text-6xl">{next.title}</h2>
                <p className="mt-3 max-w-xl text-ash">{next.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ash">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-ash-dim" /> {next.venue}, {next.city}
                  </span>
                  <span>{formatDateLong(next.date)} · {formatTime(next.date)}</span>
                </div>
                <Countdown to={next.date} className="mt-6" />
              </div>
              <div className="lg:text-right">
                {main && (
                  <div className="mb-4 rounded-2xl border border-line bg-ink/60 p-4 backdrop-blur">
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-ash-dim">Main Event</div>
                    <div className="font-display text-xl text-bone">{main.sides.join("  vs  ")}</div>
                    {main.titleOnTheLine && <div className="mt-1 text-sm text-gold">🏆 {main.titleOnTheLine}</div>}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  {next.priceFromCents && (
                    <span className="text-sm text-ash">
                      from <span className="font-display text-2xl text-bone">{formatPrice(next.priceFromCents)}</span>
                    </span>
                  )}
                  {next.ticketUrl && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-transform group-hover:scale-105">
                      <Ticket className="h-4 w-4" /> Get Tickets
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )}

        <EventsExplorer events={events} />
      </section>
    </>
  );
}
