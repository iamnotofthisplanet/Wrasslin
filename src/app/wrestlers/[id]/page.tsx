import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Swords, Quote, Calendar, Ruler, Crown } from "lucide-react";
import {
  wrestlers,
  getWrestler,
  getPromotion,
  getChampionship,
  storylines as allStorylines,
} from "@/data";
import { WrestlerAvatar } from "@/components/visuals";
import { AlignmentChip, Badge, MomentumBar } from "@/components/ui";
import { StorylineCard } from "@/components/cards";
import { SocialLinks } from "@/components/SocialLinks";
import { TiltCard } from "@/components/fx/TiltCard";
import { KineticText, FadeIn } from "@/components/fx/KineticText";

export function generateStaticParams() {
  return wrestlers.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const w = getWrestler(id);
  if (!w) return { title: "Wrestler Not Found" };
  return { title: w.nickname ? `${w.name} "${w.nickname}"` : w.name, description: w.bio };
}

export default async function WrestlerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const wrestler = getWrestler(id);
  if (!wrestler) notFound();

  const promotion = getPromotion(wrestler.promotionId);
  const titles = (wrestler.titles ?? []).map(getChampionship).filter(Boolean);
  const involvedStorylines = allStorylines.filter(
    (s) => s.protagonists.includes(wrestler.id) || s.antagonists.includes(wrestler.id),
  );
  const total = wrestler.stats.wins + wrestler.stats.losses + wrestler.stats.draws;
  const winRate = total ? Math.round((wrestler.stats.wins / total) * 100) : 0;

  return (
    <>
      <section className="relative overflow-hidden pt-24">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{ background: `radial-gradient(70% 70% at 25% 0%, ${wrestler.accent}, transparent 60%)` }}
        />
        <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" />

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {promotion && (
            <Link href={`/promotions/${promotion.slug}`} className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ash transition-colors hover:text-bone">
              <ArrowLeft className="h-4 w-4" /> Back to {promotion.shortName} roster
            </Link>
          )}

          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            {/* Portrait */}
            <div>
              <TiltCard max={7} scale={1.01} className="group">
                <div className="relative">
                  {titles.length > 0 && <div className="aura-conic absolute -inset-10 rounded-full opacity-70" aria-hidden />}
                  <div data-sheen className="relative overflow-hidden rounded-3xl border border-line glow-soft">
                    <WrestlerAvatar
                      name={wrestler.name}
                      accent={wrestler.accent}
                      alignment={wrestler.alignment}
                      rounded="rounded-none"
                      className="aspect-[4/5] w-full"
                      showBadge
                    />
                  </div>
                </div>
              </TiltCard>
              {wrestler.social && wrestler.social.length > 0 && (
                <div className="mt-4">
                  <SocialLinks social={wrestler.social} />
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <AlignmentChip alignment={wrestler.alignment} />
                {promotion && (
                  <Link href={`/promotions/${promotion.slug}`} className="text-xs font-bold uppercase tracking-wider" style={{ color: promotion.primary }}>
                    {promotion.name}
                  </Link>
                )}
              </div>

              {wrestler.nickname && (
                <FadeIn delay={0.1} y={12}>
                  <p className="mt-3 font-display text-2xl" style={{ color: wrestler.accent }}>
                    “{wrestler.nickname}”
                  </p>
                </FadeIn>
              )}
              <h1 className="headline text-5xl text-bone sm:text-6xl md:text-7xl">
                <KineticText text={wrestler.name} stagger={0.06} delay={0.15} />
              </h1>

              <FadeIn delay={0.4} y={12}>
                <p className="mt-3 inline-flex items-center gap-1.5 text-ash">
                  <MapPin className="h-4 w-4 text-ash-dim" /> {wrestler.hometown}
                </p>
              </FadeIn>

              {wrestler.catchphrase && (
                <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-line bg-surface/60 px-4 py-3">
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <span className="font-display text-lg text-bone">{wrestler.catchphrase}</span>
                </div>
              )}

              {/* Titles */}
              {titles.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {titles.map((t) => t && (
                    <span key={t.id} className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-sm font-bold text-gold">
                      <Crown className="h-4 w-4" /> {t.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Stat grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatTile label="Record" value={`${wrestler.stats.wins}-${wrestler.stats.losses}-${wrestler.stats.draws}`} />
                <StatTile label="Win Rate" value={`${winRate}%`} />
                <StatTile label="Debut" value={`${wrestler.debutYear}`} icon={<Calendar className="h-4 w-4" />} />
                <StatTile label="Height" value={wrestler.height} icon={<Ruler className="h-4 w-4" />} />
              </div>

              <div className="mt-3 rounded-2xl border border-line card-grad p-4">
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ash-dim">
                  <span>Momentum / Heat</span>
                  <span className="text-ash">Weight: {wrestler.weight}</span>
                </div>
                <MomentumBar value={wrestler.stats.momentum} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-3xl text-bone">Biography</h2>
            <p className="mt-4 text-lg leading-relaxed text-ash">{wrestler.bio}</p>

            <div className="mt-8">
              <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ash-dim">
                <Swords className="h-4 w-4 text-crimson" /> Finisher
              </div>
              <div className="rounded-2xl border border-line card-grad p-5">
                <div className="font-display text-2xl text-bone">{wrestler.finisher}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-sm font-bold uppercase tracking-wider text-ash-dim">In-Ring Style</div>
              <div className="flex flex-wrap gap-2">
                {wrestler.style.map((s) => (
                  <Badge key={s} tone="neutral">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-3xl text-bone">Active Storylines</h2>
            {involvedStorylines.length ? (
              <div className="space-y-5">
                {involvedStorylines.map((s) => (
                  <StorylineCard key={s.id} storyline={s} />
                ))}
              </div>
            ) : (
              <p className="text-ash">No active storylines right now.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function StatTile({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line card-grad p-4">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ash-dim">
        {icon}
        {label}
      </div>
      <div className="font-display text-2xl text-bone">{value}</div>
    </div>
  );
}
