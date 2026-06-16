/* ============================================================
   WRASSLIN — Domain Types
   ============================================================ */

export type Alignment = "face" | "heel" | "tweener";

export type Region =
  | "Northeast"
  | "Southeast"
  | "Midwest"
  | "Southwest"
  | "West Coast"
  | "Pacific NW"
  | "UK & Europe";

export interface Social {
  platform: "instagram" | "twitter" | "youtube" | "tiktok" | "facebook" | "twitch" | "patreon" | "website";
  handle: string;
  url: string;
}

export interface Championship {
  id: string;
  promotionId: string;
  name: string;
  /** wrestler id of current holder */
  holderId: string;
  since: string; // ISO date won
  /** how the title is contested */
  division: "World" | "Tag Team" | "Women's" | "Junior" | "Hardcore" | "Trios";
  reignDays?: number;
  defenses?: number;
  prestige: number; // 1-100
}

export interface Wrestler {
  id: string;
  promotionId: string;
  name: string;
  nickname?: string;
  hometown: string;
  alignment: Alignment;
  /** signature finishing move */
  finisher: string;
  /** in-ring style tags */
  style: string[];
  debutYear: number;
  height: string;
  weight: string;
  bio: string;
  accent: string; // hex used for their avatar/branding
  stats: {
    wins: number;
    losses: number;
    draws: number;
    momentum: number; // -100..100 trending heat
  };
  /** championship ids currently held */
  titles?: string[];
  social?: Social[];
  /** signature catchphrase */
  catchphrase?: string;
}

export interface MatchCard {
  id: string;
  type: "Singles" | "Tag Team" | "Triple Threat" | "Ladder" | "Title Match" | "Battle Royal" | "Steel Cage" | "Trios";
  /** display strings for participants (supports teams) */
  sides: string[];
  stipulation?: string;
  titleOnTheLine?: string;
  isMain?: boolean;
}

export interface WrestlingEvent {
  id: string;
  promotionId: string;
  title: string;
  date: string; // ISO datetime
  venue: string;
  city: string;
  region: Region;
  posterAccent: string;
  description: string;
  card: MatchCard[];
  ticketUrl?: string;
  priceFromCents?: number;
  streamUrl?: string;
  soldOut?: boolean;
  attendanceCap?: number;
}

export interface Video {
  id: string;
  promotionId: string;
  title: string;
  youtubeId?: string;
  durationSec: number;
  views: number;
  publishedAt: string;
  category: "Full Match" | "Highlights" | "Promo" | "Vlog" | "Recap";
  accent: string;
}

export interface NewsArticle {
  id: string;
  promotionId: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  publishedAt: string;
  tag: "Breaking" | "Results" | "Signing" | "Injury" | "Feature" | "Rumor";
  readMinutes: number;
}

export interface StorylineChapter {
  title: string;
  date: string;
  summary: string;
}

export interface Storyline {
  id: string;
  promotionId: string;
  title: string;
  logline: string;
  status: "Hot" | "Building" | "Concluded";
  protagonists: string[]; // wrestler ids
  antagonists: string[]; // wrestler ids
  heat: number; // 1-100
  chapters: StorylineChapter[];
  startedAt: string;
}

export interface MerchItem {
  id: string;
  promotionId: string;
  name: string;
  type: "Tee" | "Hoodie" | "Hat" | "Poster" | "Accessory" | "Vinyl";
  priceCents: number;
  accent: string;
  wrestlerId?: string;
  bestSeller?: boolean;
  limited?: boolean;
}

export interface Comment {
  id: string;
  promotionId: string;
  author: string;
  avatarSeed: string;
  body: string;
  createdAt: string;
  likes: number;
  /** marks built-in seed comments */
  seed?: boolean;
}

export interface Promotion {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  region: Region;
  city: string;
  state: string;
  founded: number;
  about: string[];
  vibe: string[]; // descriptive tags: "Hardcore", "Lucha", "Technical"...
  primary: string; // hex brand color
  secondary: string; // hex accent
  followers: number;
  rating: number; // 1-5
  social: Social[];
  contactEmail: string;
  homeVenue: string;
  /** featured promo blurb on cards */
  hook: string;
  established?: boolean; // marquee promotion
}
