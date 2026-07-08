import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Promotion } from "@/lib/types";
import { PromoEmblem } from "@/components/visuals";
import { RatingStars, Tag } from "@/components/ui";
import { compactNumber } from "@/lib/utils";

export function PromotionCard({ promotion, featured = false }: { promotion: Promotion; featured?: boolean }) {
  return (
    <Link
      href={`/promotions/${promotion.slug}`}
      data-sheen
      data-spot
      data-cursor="ENTER"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line card-grad transition-all duration-300 hover:-translate-y-1"
      style={{ ["--p" as string]: promotion.primary }}
    >
      {/* glow border on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-inset transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${promotion.primary}66, 0 24px 60px -28px ${promotion.primary}` }}
      />

      <div className="relative">
        <PromoEmblem
          shortName={promotion.shortName}
          primary={promotion.primary}
          secondary={promotion.secondary}
          rounded="rounded-none"
          className={featured ? "h-48" : "h-36"}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Tag color="#ffffff" className="bg-black/40 backdrop-blur">
            <MapPin className="h-3 w-3" /> {promotion.region}
          </Tag>
          {promotion.established && (
            <Tag color={promotion.secondary} className="backdrop-blur">
              ★ Marquee
            </Tag>
          )}
        </div>
        <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight text-bone transition-colors group-hover:text-white">
              {promotion.name}
            </h3>
            <p className="mt-0.5 text-sm italic text-ash-dim">“{promotion.tagline}”</p>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ash">{promotion.hook}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {promotion.vibe.slice(0, 3).map((v) => (
            <span key={v} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ash">
              {v}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-1.5 text-sm text-ash">
            <MapPin className="h-3.5 w-3.5 text-ash-dim" />
            {promotion.city}, {promotion.state}
          </div>
          <RatingStars rating={promotion.rating} />
        </div>
        <div className="mt-2 text-xs text-ash-dim">
          <span className="font-bold text-bone">{compactNumber(promotion.followers)}</span> followers
        </div>
      </div>
    </Link>
  );
}
