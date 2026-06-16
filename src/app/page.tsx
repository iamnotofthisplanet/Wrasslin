import Link from "next/link";
import { ArrowRight, Flame, MapPin, TrendingUp } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { RegionExplorer } from "@/components/home/RegionExplorer";
import { PromotionCard } from "@/components/PromotionCard";
import { EventCard, NewsCard, StorylineCard, WrestlerCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import {
  featuredPromotions,
  upcomingEvents,
  hottestStorylines,
  trendingWrestlers,
  allNewsSorted,
} from "@/data";

export default function HomePage() {
  const featured = featuredPromotions();
  const upcoming = upcomingEvents().slice(0, 6);
  const storylines = hottestStorylines().slice(0, 4);
  const rising = trendingWrestlers().slice(0, 6);
  const latest = allNewsSorted().slice(0, 4);

  return (
    <>
      <Hero />

      {/* Featured promotions */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Marquee Promotions"
            title={<>The Heavy Hitters</>}
            action={{ label: "All promotions", href: "/promotions" }}
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <PromotionCard promotion={p} featured />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Discover by region */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="In Your Area & Beyond"
            title={
              <span className="inline-flex items-center gap-3">
                <MapPin className="h-9 w-9 text-crimson" /> Discover by Region
              </span>
            }
            accent="var(--color-electric)"
          />
          <p className="mt-3 max-w-2xl text-ash">
            From the rust belt to the West Coast to across the pond — find the promotions running shows near you.
          </p>
        </Reveal>
        <Reveal className="mt-8">
          <RegionExplorer />
        </Reveal>
      </section>

      {/* Upcoming shows */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Don't Miss Out"
            title="Upcoming Shows"
            action={{ label: "Full calendar", href: "/events" }}
            accent="var(--color-gold)"
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal key={e.id} delay={i * 60}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hottest storylines */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-crimson/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Follow The Drama"
              title={
                <span className="inline-flex items-center gap-3">
                  <Flame className="h-9 w-9 text-crimson" /> Hottest Storylines
                </span>
              }
            />
            <p className="mt-3 max-w-2xl text-ash">
              No more piecing it together from a dozen sources. Every rivalry, every chapter, tracked in one place.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {storylines.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <StorylineCard storyline={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* On the rise */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Trending Now"
            title={
              <span className="inline-flex items-center gap-3">
                <TrendingUp className="h-9 w-9 text-mint" /> On The Rise
              </span>
            }
            accent="var(--color-mint)"
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {rising.map((w, i) => (
            <Reveal key={w.id} delay={i * 50}>
              <WrestlerCard wrestler={w} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="The Wire" title="Latest News" action={{ label: "All news", href: "/news" }} />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((n, i) => (
            <Reveal key={n.id} delay={i * 60}>
              <NewsCard article={n} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface to-ink-2 p-8 text-center sm:p-14">
            <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
            <div className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-crimson/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 -z-10 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
            <h2 className="headline mx-auto max-w-3xl text-4xl text-bone sm:text-5xl md:text-6xl">
              Built for the fans who <span className="text-gradient-fire">never miss a show.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-ash">
              Follow your favorite promotions, track storylines, grab tickets, and join the conversation. This is your
              ringside seat to the entire indie scene.
            </p>
            <Link
              href="/promotions"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-[0_10px_40px_-12px_var(--color-crimson)] transition-transform hover:scale-[1.03]"
            >
              Start Exploring
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
