"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { NewsArticle } from "@/lib/types";
import { Badge } from "@/components/ui";
import { FadeIn } from "@/components/fx/KineticText";
import { getPromotion } from "@/data";
import { cn, formatDateLong } from "@/lib/utils";

const TAGS: (NewsArticle["tag"] | "All")[] = ["All", "Breaking", "Results", "Signing", "Feature", "Rumor", "Injury"];

const newsTone: Record<NewsArticle["tag"], "crimson" | "gold" | "mint" | "electric" | "neutral"> = {
  Breaking: "crimson",
  Results: "mint",
  Signing: "gold",
  Injury: "crimson",
  Feature: "electric",
  Rumor: "neutral",
};

export function NewsFeed({ articles }: { articles: NewsArticle[] }) {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("All");

  const filtered = useMemo(() => {
    const list = tag === "All" ? articles : articles.filter((a) => a.tag === tag);
    return [...list].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  }, [articles, tag]);

  return (
    <div>
      <div className="no-scrollbar sticky top-[68px] z-30 -mx-4 mb-8 flex gap-2 overflow-x-auto border-b border-line bg-ink/85 px-4 py-3 backdrop-blur">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
              tag === t ? "border-crimson/50 bg-crimson/15 text-crimson-glow" : "border-line text-ash hover:text-bone",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-3xl space-y-12">
        {filtered.map((article) => {
          const promo = getPromotion(article.promotionId);
          return (
            <FadeIn key={article.id} className="border-b border-line pb-12 last:border-0">
            <article id={article.id} className="scroll-mt-28">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge tone={newsTone[article.tag]}>{article.tag}</Badge>
                {promo && (
                  <Link href={`/promotions/${promo.slug}`} className="text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80" style={{ color: promo.primary }}>
                    {promo.name}
                  </Link>
                )}
              </div>
              <h2 className="font-display text-3xl leading-tight text-bone sm:text-4xl">{article.title}</h2>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ash-dim">
                <span className="text-ash">By {article.author}</span>
                <span>·</span>
                <span>{formatDateLong(article.publishedAt)}</span>
                <span>·</span>
                <span>{article.readMinutes} min read</span>
              </div>
              <div className="mt-5 space-y-4">
                {article.body.map((para, i) => (
                  <p key={i} className={cn("text-pretty leading-relaxed text-ash", i === 0 && "text-lg text-bone/90")}>
                    {para}
                  </p>
                ))}
              </div>
            </article>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
