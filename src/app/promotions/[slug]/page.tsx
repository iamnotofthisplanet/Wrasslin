import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Trophy, Users, Star } from "lucide-react";
import {
  promotions,
  getPromotionBySlug,
  rosterOf,
  titlesOf,
  eventsOf,
  videosOf,
  newsOf,
  storylinesOf,
  merchOf,
  commentsOf,
} from "@/data";
import { PromoEmblem } from "@/components/visuals";
import { FollowButton } from "@/components/FollowButton";
import { SocialLinks } from "@/components/SocialLinks";
import { RatingStars } from "@/components/ui";
import { PromotionHub } from "@/components/promotions/PromotionHub";
import { TiltCard } from "@/components/fx/TiltCard";
import { KineticText, FadeIn } from "@/components/fx/KineticText";
import { compactNumber } from "@/lib/utils";

export function generateStaticParams() {
  return promotions.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const promotion = getPromotionBySlug(slug);
  if (!promotion) return { title: "Promotion Not Found" };
  return {
    title: promotion.name,
    description: promotion.hook,
  };
}

export default async function PromotionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const promotion = getPromotionBySlug(slug);
  if (!promotion) notFound();

  const roster = rosterOf(promotion.id);
  const titles = titlesOf(promotion.id);
  const events = eventsOf(promotion.id);

  const stats = [
    { icon: Users, label: "Roster", value: `${roster.length}` },
    { icon: Trophy, label: "Titles", value: `${titles.length}` },
    { icon: CalendarDays, label: "Events", value: `${events.length}` },
    { icon: Star, label: "Founded", value: `${promotion.founded}` },
  ];

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden pt-20">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ background: `radial-gradient(80% 80% at 20% 0%, ${promotion.primary}, transparent 60%), radial-gradient(60% 60% at 100% 0%, ${promotion.secondary}, transparent 55%)` }}
        />
        <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" />

        <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            <TiltCard max={12} scale={1.04} className="shrink-0">
              <div className="relative">
                <div className="aura-conic absolute -inset-8 rounded-full opacity-60" aria-hidden />
                <PromoEmblem
                  shortName={promotion.shortName}
                  primary={promotion.primary}
                  secondary={promotion.secondary}
                  className="relative h-28 w-28 glow-soft sm:h-36 sm:w-36"
                  rounded="rounded-3xl"
                />
              </div>
            </TiltCard>
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ash">
                  <MapPin className="h-3 w-3" /> {promotion.city}, {promotion.state}
                </span>
                <span className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ash">
                  {promotion.region}
                </span>
                {promotion.established && (
                  <span className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-black" style={{ backgroundColor: promotion.secondary }}>
                    ★ Marquee Promotion
                  </span>
                )}
              </div>
              <h1 className="headline text-4xl text-bone sm:text-5xl md:text-6xl">
                <KineticText text={promotion.name} stagger={0.05} />
              </h1>
              <FadeIn delay={0.35} y={14}>
                <p className="mt-2 text-lg italic text-ash">“{promotion.tagline}”</p>
              </FadeIn>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                <FollowButton promotionId={promotion.id} baseFollowers={promotion.followers} accent={promotion.primary} size="lg" />
                <RatingStars rating={promotion.rating} className="text-base" />
                <SocialLinks social={promotion.social} />
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-line card-grad px-4 py-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ backgroundColor: `${promotion.primary}1f`, color: promotion.primary }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl leading-none text-bone">{s.value}</div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ash-dim">{s.label}</div>
                  </div>
                </div>
              );
            })}
            <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-line card-grad px-4 py-3 sm:col-span-4 lg:hidden">
              <div className="text-sm text-ash">
                <span className="font-bold text-bone">{compactNumber(promotion.followers)}</span> fans following on WRASSLIN
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromotionHub
        promotion={promotion}
        roster={roster}
        titles={titles}
        events={events}
        videos={videosOf(promotion.id)}
        news={newsOf(promotion.id)}
        storylines={storylinesOf(promotion.id)}
        merch={merchOf(promotion.id)}
        comments={commentsOf(promotion.id)}
      />
    </>
  );
}
