import Link from "next/link";
import { ArrowRight, Flame, MapPin, TrendingUp } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { RegionExplorer } from "@/components/home/RegionExplorer";
import { ShowcaseRail } from "@/components/home/ShowcaseRail";
import { EventCard, NewsCard, StorylineCard, WrestlerCard } from "@/components/cards";
import { SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { MarqueeBand } from "@/components/fx/MarqueeBand";
import { SpotlightGroup } from "@/components/fx/Spotlight";
import { ParallaxY } from "@/components/fx/Parallax";
import { Magnetic } from "@/components/fx/Magnetic";
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

      <MarqueeBand
        items={["Live This Week", "Get Your Tickets", "Support Local Wrestling", "Every Territory"]}
        className="-mt-6"
      />

      {/* Marquee promotions — pinned horizontal showcase */}
      <section className="pt-16">
        <Reveal className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Marquee Promotions"
            index="01"
            title="The Heavy Hitters"
            action={{ label: "All promotions", href: "/promotions" }}
          />
        </Reveal>
        <div className="mt-10">
          <ShowcaseRail promotions={featured} />
        </div>
      </section>

      {/* Discover by region */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="In Your Area & Beyond"
            index="02"
            icon={<MapPin className="h-9 w-9 text-crimson" />}
            title="Discover by Region"
            accent="var(--color-electric)"
          />
          <p className="mt-4 max-w-2xl text-ash">
            From the rust belt to the West Coast to across the pond — find the promotions running shows near you.
          </p>
        </Reveal>
        <Reveal className="mt-8" delay={100}>
          <RegionExplorer />
        </Reveal>
      </section>

      {/* Upcoming shows */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Don't Miss Out"
            index="03"
            title="Upcoming Shows"
            action={{ label: "Full calendar", href: "/events" }}
            accent="var(--color-gold)"
          />
        </Reveal>
        <SpotlightGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 90}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </SpotlightGroup>
      </section>

      <MarqueeBand
        items={["Title vs Mask", "The Reaper Comes", "Class War", "60-Minute Iron Man"]}
        tone="crimson"
        angle={2}
        reverse
      />

      {/* Hottest storylines */}
      <section className="relative overflow-hidden py-20">
        <ParallaxY speed={0.5} className="pointer-events-none absolute -right-40 top-0 -z-10">
          <div className="h-[34rem] w-[34rem] rounded-full bg-crimson/10 blur-3xl" />
        </ParallaxY>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Follow The Drama"
              index="04"
              icon={<Flame className="h-9 w-9 text-crimson" />}
              title="Hottest Storylines"
            />
            <p className="mt-4 max-w-2xl text-ash">
              No more piecing it together from a dozen sources. Every rivalry, every chapter, tracked in one place.
            </p>
          </Reveal>
          <SpotlightGroup className="mt-10 grid gap-5 md:grid-cols-2">
            {storylines.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 100}>
                <StorylineCard storyline={s} />
              </Reveal>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* On the rise */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Trending Now"
            index="05"
            icon={<TrendingUp className="h-9 w-9 text-mint" />}
            title="On The Rise"
            accent="var(--color-mint)"
          />
        </Reveal>
        <SpotlightGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {rising.map((w, i) => (
            <Reveal key={w.id} delay={i * 60}>
              <WrestlerCard wrestler={w} />
            </Reveal>
          ))}
        </SpotlightGroup>
      </section>

      {/* Latest news */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="The Wire" index="06" title="Latest News" action={{ label: "All news", href: "/news" }} />
        </Reveal>
        <SpotlightGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((n, i) => (
            <Reveal key={n.id} delay={i * 70}>
              <NewsCard article={n} />
            </Reveal>
          ))}
        </SpotlightGroup>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-surface to-ink-2 p-8 text-center sm:p-16" data-sheen>
            <div className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
            <ParallaxY speed={-0.35} className="absolute -right-16 -top-16 -z-10">
              <div className="h-72 w-72 rounded-full bg-crimson/20 blur-3xl" />
            </ParallaxY>
            <ParallaxY speed={0.35} className="absolute -bottom-16 -left-16 -z-10">
              <div className="h-72 w-72 rounded-full bg-electric/20 blur-3xl" />
            </ParallaxY>
            <h2 className="headline mx-auto max-w-3xl text-4xl text-bone sm:text-6xl">
              Built for the fans who <span className="text-gradient-fire">never miss a show.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ash">
              Follow your favorite promotions, track storylines, grab tickets, and join the conversation. This is your
              ringside seat to the entire indie scene.
            </p>
            <Magnetic className="mt-9 inline-block">
              <Link
                href="/promotions"
                data-cursor="GO"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-9 py-4.5 text-base font-bold uppercase tracking-wide text-white shadow-[0_10px_50px_-10px_var(--color-crimson)] transition-shadow hover:shadow-[0_16px_70px_-8px_var(--color-crimson)]"
              >
                Start Exploring
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
