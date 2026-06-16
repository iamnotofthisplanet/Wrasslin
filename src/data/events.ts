import type { WrestlingEvent } from "@/lib/types";

export const events: WrestlingEvent[] = [
  /* ---------------- Steel City Pro ---------------- */
  {
    id: "scp-e1", promotionId: "scp", title: "Foundry Fights: Night 47",
    date: "2026-06-26T19:30:00", venue: "The Foundry Hall", city: "Pittsburgh, PA", region: "Northeast",
    posterAccent: "#E0383B", ticketUrl: "https://tickets.example.com/scp47", priceFromCents: 2500, attendanceCap: 900,
    description: "The third Friday brawl returns. Mad Dog defends the gold against the man who put him through a table last month.",
    card: [
      { id: "scp-e1-m1", type: "Title Match", sides: ["Mad Dog Kowalski (c)", "Silas Crowe"], titleOnTheLine: "SCP World Championship", stipulation: "No Disqualification", isMain: true },
      { id: "scp-e1-m2", type: "Title Match", sides: ["Penny Dunlap (c)", "Briar Vance"], titleOnTheLine: "SCP Women's Championship" },
      { id: "scp-e1-m3", type: "Singles", sides: ["Tommy Two-Tone", "The Foreman"], stipulation: "If Tommy loses, he works a month of clean-up duty" },
      { id: "scp-e1-m4", type: "Battle Royal", sides: ["10-Man Foundry Rumble"], stipulation: "Winner picks any title shot" },
    ],
  },
  {
    id: "scp-e2", promotionId: "scp", title: "Steel Resolve",
    date: "2026-08-21T19:30:00", venue: "The Foundry Hall", city: "Pittsburgh, PA", region: "Northeast",
    posterAccent: "#9aa3ad", ticketUrl: "https://tickets.example.com/scp-resolve", priceFromCents: 3000, attendanceCap: 900,
    description: "SCP's summer spectacular. The biggest grudges in the Steel City get settled under one roof.",
    card: [
      { id: "scp-e2-m1", type: "Steel Cage", sides: ["Mad Dog Kowalski", "The Foreman"], stipulation: "Career vs. Title Shot", isMain: true },
      { id: "scp-e2-m2", type: "Title Match", sides: ["Silas Crowe (c)", "Tommy Two-Tone"], titleOnTheLine: "SCP Foundry Hardcore Title" },
    ],
  },

  /* ---------------- Lucha Vanguardia ---------------- */
  {
    id: "lv-e1", promotionId: "lv", title: "Noche de Vuelo",
    date: "2026-06-20T20:00:00", venue: "Teatro Aurora", city: "San Antonio, TX", region: "Southwest",
    posterAccent: "#FF3D7F", ticketUrl: "https://tickets.example.com/lv-vuelo", priceFromCents: 2800, attendanceCap: 1200,
    description: "A night of flight. Relámpago Jr. risks the mask of the Mundial against the shadow that's been hunting him.",
    card: [
      { id: "lv-e1-m1", type: "Title Match", sides: ["Relámpago Jr. (c)", "La Sombra Roja"], titleOnTheLine: "Campeonato Mundial Vanguardia", stipulation: "Lucha de Apuestas — Title vs. Mask", isMain: true },
      { id: "lv-e1-m2", type: "Title Match", sides: ["Mariposa de Acero (c)", "La Sombra Roja"], titleOnTheLine: "Campeonato Femenil Vanguardia" },
      { id: "lv-e1-m3", type: "Trios", sides: ["El Coyote, Niño Cometa & a Mystery Partner", "Brujo Gris & Los Discípulos"] },
    ],
  },
  {
    id: "lv-e2", promotionId: "lv", title: "Máscaras y Gloria",
    date: "2026-07-18T20:00:00", venue: "Teatro Aurora", city: "San Antonio, TX", region: "Southwest",
    posterAccent: "#FFC93C", ticketUrl: "https://tickets.example.com/lv-gloria", priceFromCents: 3200, attendanceCap: 1200,
    description: "The anniversary show. Tradition, masks, and the highest stakes in lucha libre.",
    card: [
      { id: "lv-e2-m1", type: "Singles", sides: ["Niño Cometa", "Relámpago Jr."], stipulation: "Prodigy vs. Idol — non-title dream match", isMain: true },
      { id: "lv-e2-m2", type: "Singles", sides: ["El Coyote", "Brujo Gris"], stipulation: "Lucha de Apuestas — Hair vs. Hair" },
    ],
  },

  /* ---------------- Cascadia Pro ---------------- */
  {
    id: "cxp-e1", promotionId: "cxp", title: "Cold Front IX",
    date: "2026-07-03T19:00:00", venue: "The Evergreen Annex", city: "Portland, OR", region: "Pacific NW",
    posterAccent: "#2CD4A8", ticketUrl: "https://tickets.example.com/cxp9", priceFromCents: 3500, attendanceCap: 500,
    description: "Cascadia's flagship. Soren Vance's record-setting reign meets its stiffest test yet.",
    card: [
      { id: "cxp-e1-m1", type: "Title Match", sides: ["Soren Vance (c)", "Kenji Arashi"], titleOnTheLine: "Cascadia World Championship", stipulation: "60-Minute Iron Man", isMain: true },
      { id: "cxp-e1-m2", type: "Title Match", sides: ["Dahlia Frost (c)", "June Hollow"], titleOnTheLine: "Cascadia Women's Championship", stipulation: "Submission Only" },
      { id: "cxp-e1-m3", type: "Singles", sides: ["The Professor", "Wolfgang Pike"], stipulation: "Loser leaves the main event scene" },
    ],
  },
  {
    id: "cxp-e2", promotionId: "cxp", title: "Strong Style Showcase",
    date: "2026-05-15T19:00:00", venue: "The Evergreen Annex", city: "Portland, OR", region: "Pacific NW",
    posterAccent: "#3B82F6", priceFromCents: 3000, attendanceCap: 500,
    description: "A past classic — the night Kenji Arashi earned his title shot in a 30-minute war.",
    card: [
      { id: "cxp-e2-m1", type: "Singles", sides: ["Kenji Arashi", "Soren Vance"], stipulation: "Non-title — winner earns Cold Front main event", isMain: true },
    ],
  },

  /* ---------------- Neon Coast ---------------- */
  {
    id: "ncw-e1", promotionId: "ncw", title: "Sunset Slam",
    date: "2026-06-27T20:30:00", venue: "The Electric Pier Ballroom", city: "Tampa, FL", region: "Southeast",
    posterAccent: "#FF2D9B", ticketUrl: "https://tickets.example.com/ncw-slam", priceFromCents: 2200, attendanceCap: 1500,
    description: "Wrestling's biggest beach party. Glitter cannons, a live house band, and Dexter Diamond defending the gold.",
    card: [
      { id: "ncw-e1-m1", type: "Title Match", sides: ["Dexter Diamond (c)", "Tyson Reign"], titleOnTheLine: "Neon Coast World Championship", isMain: true },
      { id: "ncw-e1-m2", type: "Title Match", sides: ["Roxy Voltage (c)", "Sirena Tide"], titleOnTheLine: "Neon Coast Women's Championship" },
      { id: "ncw-e1-m3", type: "Singles", sides: ["Captain Cabana", "DJ Blast"], stipulation: "Beach Brawl — falls count anywhere on the pier" },
    ],
  },
  {
    id: "ncw-e2", promotionId: "ncw", title: "Neon Nights",
    date: "2026-08-08T20:30:00", venue: "The Electric Pier Ballroom", city: "Tampa, FL", region: "Southeast",
    posterAccent: "#21D4FD", ticketUrl: "https://tickets.example.com/ncw-nights", priceFromCents: 2400, attendanceCap: 1500,
    description: "The afterparty everyone's been waiting for. Bring sunglasses. Indoors.",
    card: [
      { id: "ncw-e2-m1", type: "Ladder", sides: ["Dexter Diamond", "Tyson Reign", "Captain Cabana", "Sirena Tide"], stipulation: "Neon Briefcase Ladder Match", isMain: true },
    ],
  },

  /* ---------------- Crossroads ---------------- */
  {
    id: "ccw-e1", promotionId: "ccw", title: "King of the Crossroads 2026",
    date: "2026-07-11T18:00:00", venue: "Memorial Armory", city: "Kansas City, MO", region: "Midwest",
    posterAccent: "#C8A14B", ticketUrl: "https://tickets.example.com/ccw-king", priceFromCents: 4000, attendanceCap: 2000,
    description: "The crown jewel of the Midwest indies. One night, eight men, a single-elimination tournament that makes legends.",
    card: [
      { id: "ccw-e1-m1", type: "Title Match", sides: ["Boone Calloway (c)", "Tournament Winner"], titleOnTheLine: "CCW World Heavyweight Championship", stipulation: "Champion defends against the King", isMain: true },
      { id: "ccw-e1-m2", type: "Singles", sides: ["Royce Dillinger", "Jesse Crane"], stipulation: "Quarterfinal — King of the Crossroads" },
      { id: "ccw-e1-m3", type: "Singles", sides: ["Cyrus Bishop", "Hank Morrow"], stipulation: "Quarterfinal — King of the Crossroads" },
    ],
  },
  {
    id: "ccw-e2", promotionId: "ccw", title: "Crossroads Clash",
    date: "2026-05-30T18:00:00", venue: "Memorial Armory", city: "Kansas City, MO", region: "Midwest",
    posterAccent: "#B23A48", priceFromCents: 3000, attendanceCap: 2000,
    description: "A past chapter — the night the Bishop's congregation first laid hands on the King.",
    card: [
      { id: "ccw-e2-m1", type: "Singles", sides: ["Boone Calloway (c)", "Cyrus Bishop"], titleOnTheLine: "CCW World Heavyweight Championship", isMain: true },
    ],
  },

  /* ---------------- Sunset Strip ---------------- */
  {
    id: "ssw-e1", promotionId: "ssw", title: "Premiere Night",
    date: "2026-06-19T20:00:00", venue: "The Marquee Theater", city: "Los Angeles, CA", region: "West Coast",
    posterAccent: "#FF6B35", ticketUrl: "https://tickets.example.com/ssw-premiere", priceFromCents: 4500, attendanceCap: 1100,
    description: "Roll out the red carpet. Sunset Strip's monthly blockbuster, shot like a feature film.",
    card: [
      { id: "ssw-e1-m1", type: "Title Match", sides: ["Sterling Knight (c)", "Johnny Matinee"], titleOnTheLine: "Sunset Strip World Championship", stipulation: "30-Minute Time Limit", isMain: true },
      { id: "ssw-e1-m2", type: "Title Match", sides: ["Vivienne Velvet (c)", "Lola Nova"], titleOnTheLine: "Sunset Strip Women's Championship" },
      { id: "ssw-e1-m3", type: "Singles", sides: ["Rio Vega", "Maxx Cinema"], stipulation: "Stunt Spectacular — anything goes" },
    ],
  },
  {
    id: "ssw-e2", promotionId: "ssw", title: "Cinema Royale",
    date: "2026-07-25T20:00:00", venue: "The Marquee Theater", city: "Los Angeles, CA", region: "West Coast",
    posterAccent: "#7C5CFF", ticketUrl: "https://tickets.example.com/ssw-royale", priceFromCents: 5000, attendanceCap: 1100,
    description: "The mid-year extravaganza. Sterling Knight wants a sequel nobody asked for.",
    card: [
      { id: "ssw-e2-m1", type: "Ladder", sides: ["Johnny Matinee", "Rio Vega", "Maxx Cinema", "Lola Nova"], stipulation: "Marquee Ladder Match for a guaranteed title shot", isMain: true },
    ],
  },

  /* ---------------- Albion Rope ---------------- */
  {
    id: "arw-e1", promotionId: "arw", title: "Rounds & Glory",
    date: "2026-07-04T19:00:00", venue: "The Coronet", city: "Manchester, UK", region: "UK & Europe",
    posterAccent: "#C9A24B", ticketUrl: "https://tickets.example.com/arw-rounds", priceFromCents: 2600, attendanceCap: 800,
    description: "Proper graps under classic rounds rules. The Gentleman Grappler faces the aristocrat who's bought everyone but him.",
    card: [
      { id: "arw-e1-m1", type: "Title Match", sides: ["Bartholomew Quill (c)", "Reginald Thorne"], titleOnTheLine: "Albion World of Sport Championship", stipulation: "Best 2-of-3 Falls, Rounds Rules", isMain: true },
      { id: "arw-e1-m2", type: "Title Match", sides: ["Maddie Sharpe (c)", "Florence Webb"], titleOnTheLine: "Albion Women's Championship" },
      { id: "arw-e1-m3", type: "Singles", sides: ["Gentleman Jack Hargreaves", "Sid Brennan"], stipulation: "Grudge match — no count-outs" },
    ],
  },
  {
    id: "arw-e2", promotionId: "arw", title: "The Coronet Classic",
    date: "2026-08-15T19:00:00", venue: "The Coronet", city: "Manchester, UK", region: "UK & Europe",
    posterAccent: "#2E4A8B", ticketUrl: "https://tickets.example.com/arw-classic", priceFromCents: 2800, attendanceCap: 800,
    description: "Albion's most prestigious night. The finest grapplers in Europe, one classic tournament.",
    card: [
      { id: "arw-e2-m1", type: "Singles", sides: ["Bartholomew Quill", "Gentleman Jack Hargreaves"], stipulation: "Coronet Classic Final — a battle of best friends", isMain: true },
    ],
  },
];
