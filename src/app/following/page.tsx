"use client";

import Link from "next/link";
import { Compass, Heart, CalendarDays, Newspaper } from "lucide-react";
import { useStore } from "@/lib/store";
import { promotions, events, news } from "@/data";
import { PromotionCard } from "@/components/PromotionCard";
import { EventCard, NewsCard } from "@/components/cards";
import { isUpcoming } from "@/lib/utils";

export default function FollowingPage() {
  const { follows, hydrated } = useStore();

  const followed = promotions.filter((p) => follows.includes(p.id));
  const feedEvents = events
    .filter((e) => follows.includes(e.promotionId) && isUpcoming(e.date))
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, 6);
  const feedNews = news
    .filter((n) => follows.includes(n.promotionId))
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 4);

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-3 w-1.5 rounded-full bg-crimson" />
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-ash">Your Hub</span>
      </div>
      <h1 className="headline text-5xl text-bone sm:text-6xl">
        Following <Heart className="ml-1 inline h-10 w-10 fill-crimson text-crimson" />
      </h1>

      {!hydrated ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-80 rounded-3xl border border-line shimmer" />
          ))}
        </div>
      ) : followed.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-line py-20 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-crimson/10 text-crimson">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="mt-5 font-display text-2xl text-bone">You&apos;re not following anyone yet</h2>
          <p className="mx-auto mt-2 max-w-md text-ash">
            Follow your favorite promotions to build a personalized feed of upcoming shows, breaking news, and storylines.
          </p>
          <Link
            href="/promotions"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            <Compass className="h-4 w-4" /> Discover Promotions
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          <div>
            <p className="mb-5 text-ash">
              You follow <span className="font-bold text-bone">{followed.length}</span>{" "}
              {followed.length === 1 ? "promotion" : "promotions"}.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {followed.map((p) => (
                <PromotionCard key={p.id} promotion={p} />
              ))}
            </div>
          </div>

          {feedEvents.length > 0 && (
            <div>
              <h2 className="mb-5 inline-flex items-center gap-2 font-display text-3xl text-bone">
                <CalendarDays className="h-7 w-7 text-gold" /> Shows From Your Promotions
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {feedEvents.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </div>
          )}

          {feedNews.length > 0 && (
            <div>
              <h2 className="mb-5 inline-flex items-center gap-2 font-display text-3xl text-bone">
                <Newspaper className="h-7 w-7 text-electric" /> Latest From Your Promotions
              </h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {feedNews.map((n) => (
                  <NewsCard key={n.id} article={n} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
