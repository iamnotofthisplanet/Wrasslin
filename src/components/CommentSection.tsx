"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, MessageSquare, Send, Sparkles } from "lucide-react";
import type { Comment } from "@/lib/types";
import { useStore } from "@/lib/store";
import { cn, relativeTime } from "@/lib/utils";
import { CommentAvatar } from "@/components/visuals";

export function CommentSection({
  promotionId,
  seedComments,
  accent,
}: {
  promotionId: string;
  seedComments: Comment[];
  accent: string;
}) {
  const { userComments, addComment, toggleLike, isLiked, hydrated, displayName, setDisplayName } = useStore();
  const [body, setBody] = useState("");
  const [sort, setSort] = useState<"new" | "top">("new");
  const [nameInput, setNameInput] = useState("");

  const allComments = useMemo(() => {
    const mine = hydrated ? userComments.filter((c) => c.promotionId === promotionId) : [];
    const merged = [...mine, ...seedComments];
    if (sort === "top") {
      return [...merged].sort((a, b) => likeCount(b) - likeCount(a));
    }
    return [...merged].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userComments, seedComments, promotionId, sort, hydrated]);

  function likeCount(c: Comment) {
    return c.likes + (hydrated && isLiked(c.id) ? 1 : 0);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    const name = (displayName || nameInput).trim() || "Guest";
    if (nameInput.trim() && !displayName) setDisplayName(nameInput.trim());
    addComment(promotionId, name, body);
    setBody("");
  }

  const total = allComments.length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" style={{ color: accent }} />
          <h3 className="font-display text-2xl text-bone">
            Fan Wire <span className="text-ash-dim">({total})</span>
          </h3>
        </div>
        <div className="flex rounded-full border border-line bg-surface/60 p-0.5 text-xs font-bold uppercase tracking-wider">
          {(["new", "top"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={cn(
                "rounded-full px-3 py-1.5 transition-colors",
                sort === s ? "bg-white/10 text-bone" : "text-ash-dim hover:text-ash",
              )}
            >
              {s === "new" ? "Newest" : "Top"}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-line card-grad p-4">
        {!displayName && (
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name (optional)"
            maxLength={24}
            className="mb-3 w-full rounded-lg border border-line bg-ink/60 px-3 py-2 text-sm text-bone outline-none placeholder:text-ash-dim focus:border-white/30"
          />
        )}
        <div className="flex gap-3">
          <CommentAvatar seed={displayName || nameInput || "you"} className="mt-0.5 hidden h-9 w-9 shrink-0 sm:flex" />
          <div className="flex-1">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Join the conversation — what did you think of the show?"
              rows={3}
              maxLength={500}
              className="w-full resize-none rounded-lg border border-line bg-ink/60 px-3 py-2.5 text-sm text-bone outline-none placeholder:text-ash-dim focus:border-white/30"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-ash-dim">{500 - body.length} characters left</span>
              <button
                type="submit"
                disabled={!body.trim()}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white transition-opacity disabled:opacity-40"
                style={{ background: `linear-gradient(100deg, ${accent}, var(--color-crimson-deep))` }}
              >
                <Send className="h-3.5 w-3.5" /> Post
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {allComments.map((c) => {
            const liked = hydrated && isLiked(c.id);
            const isMine = c.id.startsWith("user-");
            return (
              <motion.div
                key={c.id}
                layout
                initial={isMine ? { opacity: 0, y: -8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 rounded-2xl border border-line bg-surface/40 p-4"
              >
                <CommentAvatar seed={c.avatarSeed} className="h-9 w-9 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-bone">{c.author}</span>
                    {isMine && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-mint">
                        <Sparkles className="h-2.5 w-2.5" /> You
                      </span>
                    )}
                    <span className="text-xs text-ash-dim">· {relativeTime(c.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ash">{c.body}</p>
                  <button
                    onClick={() => toggleLike(c.id)}
                    className={cn(
                      "mt-2 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors",
                      liked ? "text-crimson-glow" : "text-ash-dim hover:text-ash",
                    )}
                  >
                    <Heart className={cn("h-3.5 w-3.5", liked && "fill-crimson-glow")} />
                    {likeCount(c)}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
