"use client";

import { motion } from "motion/react";
import { Bell, BellRing, Check, Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn, compactNumber } from "@/lib/utils";

export function FollowButton({
  promotionId,
  baseFollowers,
  accent,
  size = "md",
  showCount = true,
}: {
  promotionId: string;
  baseFollowers: number;
  accent?: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}) {
  const { isFollowing, toggleFollow, hydrated } = useStore();
  const following = hydrated && isFollowing(promotionId);
  const count = baseFollowers + (following ? 1 : 0);

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
  };

  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => toggleFollow(promotionId)}
        className={cn(
          "inline-flex items-center rounded-full font-bold uppercase tracking-wide transition-colors",
          sizes[size],
          following
            ? "border border-line bg-surface text-bone hover:border-crimson/50"
            : "text-white shadow-lg",
        )}
        style={
          following
            ? undefined
            : { background: `linear-gradient(100deg, ${accent ?? "var(--color-crimson)"}, var(--color-crimson-deep))` }
        }
        aria-pressed={following}
      >
        {following ? (
          <>
            <Check className="h-4 w-4" /> Following
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" /> Follow
          </>
        )}
      </motion.button>
      {showCount && (
        <div className="flex items-center gap-1.5 text-sm text-ash">
          {following ? <BellRing className="h-4 w-4 text-gold" /> : <Bell className="h-4 w-4" />}
          <span className="font-bold tabular-nums text-bone">{compactNumber(count)}</span>
          <span className="hidden sm:inline">followers</span>
        </div>
      )}
    </div>
  );
}
