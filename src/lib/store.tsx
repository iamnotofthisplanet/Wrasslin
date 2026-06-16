"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Comment } from "./types";

interface StoreState {
  hydrated: boolean;
  follows: string[];
  isFollowing: (promotionId: string) => boolean;
  toggleFollow: (promotionId: string) => void;
  userComments: Comment[];
  addComment: (promotionId: string, author: string, body: string) => void;
  likedComments: Record<string, boolean>;
  toggleLike: (commentId: string) => void;
  isLiked: (commentId: string) => boolean;
  displayName: string;
  setDisplayName: (name: string) => void;
}

const StoreContext = createContext<StoreState | null>(null);

const LS_KEY = "wrasslin.v1";

interface Persisted {
  follows: string[];
  userComments: Comment[];
  likedComments: Record<string, boolean>;
  displayName: string;
}

function loadPersisted(): Persisted {
  if (typeof window === "undefined") return { follows: [], userComments: [], likedComments: {}, displayName: "" };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { follows: [], userComments: [], likedComments: {}, displayName: "" };
    const parsed = JSON.parse(raw);
    return {
      follows: parsed.follows ?? [],
      userComments: parsed.userComments ?? [],
      likedComments: parsed.likedComments ?? {},
      displayName: parsed.displayName ?? "",
    };
  } catch {
    return { follows: [], userComments: [], likedComments: {}, displayName: "" };
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [follows, setFollows] = useState<string[]>([]);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const [displayName, setDisplayNameState] = useState("");

  // Hydrate once from localStorage on mount. Reading localStorage during
  // render would break SSR, so this synchronous setState-in-effect is the
  // intended one-time hydration pattern.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const p = loadPersisted();
    setFollows(p.follows);
    setUserComments(p.userComments);
    setLikedComments(p.likedComments);
    setDisplayNameState(p.displayName);
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    const data: Persisted = { follows, userComments, likedComments, displayName };
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [hydrated, follows, userComments, likedComments, displayName]);

  const isFollowing = (promotionId: string) => follows.includes(promotionId);

  const toggleFollow = (promotionId: string) =>
    setFollows((prev) => (prev.includes(promotionId) ? prev.filter((id) => id !== promotionId) : [...prev, promotionId]));

  const addComment = (promotionId: string, author: string, body: string) => {
    const comment: Comment = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      promotionId,
      author: author.trim() || "Guest",
      avatarSeed: author.trim() || `guest${Date.now()}`,
      body: body.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setUserComments((prev) => [comment, ...prev]);
  };

  const toggleLike = (commentId: string) =>
    setLikedComments((prev) => {
      const next = { ...prev };
      if (next[commentId]) delete next[commentId];
      else next[commentId] = true;
      return next;
    });

  const isLiked = (commentId: string) => !!likedComments[commentId];

  const setDisplayName = (name: string) => setDisplayNameState(name);

  const value: StoreState = {
    hydrated,
    follows,
    isFollowing,
    toggleFollow,
    userComments,
    addComment,
    likedComments,
    toggleLike,
    isLiked,
    displayName,
    setDisplayName,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
