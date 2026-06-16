import type { Championship } from "@/lib/types";

export const championships: Championship[] = [
  // Steel City Pro
  { id: "scp-world", promotionId: "scp", name: "SCP World Championship", holderId: "scp-mad-dog", since: "2025-09-19", division: "World", defenses: 6, prestige: 88 },
  { id: "scp-women", promotionId: "scp", name: "SCP Women's Championship", holderId: "scp-penny", since: "2026-01-16", division: "Women's", defenses: 3, prestige: 80 },
  { id: "scp-hardcore", promotionId: "scp", name: "SCP Foundry Hardcore Title", holderId: "scp-reaper", since: "2025-11-21", division: "Hardcore", defenses: 4, prestige: 70 },

  // Lucha Vanguardia
  { id: "lv-world", promotionId: "lv", name: "Campeonato Mundial Vanguardia", holderId: "lv-relampago", since: "2025-06-13", division: "World", defenses: 9, prestige: 92 },
  { id: "lv-femenil", promotionId: "lv", name: "Campeonato Femenil Vanguardia", holderId: "lv-mariposa", since: "2025-10-10", division: "Women's", defenses: 5, prestige: 82 },

  // Cascadia Pro
  { id: "cxp-world", promotionId: "cxp", name: "Cascadia World Championship", holderId: "cxp-soren", since: "2024-12-07", division: "World", defenses: 11, prestige: 90 },
  { id: "cxp-women", promotionId: "cxp", name: "Cascadia Women's Championship", holderId: "cxp-dahlia", since: "2025-08-22", division: "Women's", defenses: 6, prestige: 81 },
  { id: "cxp-junior", promotionId: "cxp", name: "Cascadia Junior Heavyweight Title", holderId: "cxp-kenji", since: "2026-02-13", division: "Junior", defenses: 2, prestige: 74 },

  // Neon Coast
  { id: "ncw-world", promotionId: "ncw", name: "Neon Coast World Championship", holderId: "ncw-dexter", since: "2025-07-25", division: "World", defenses: 7, prestige: 85 },
  { id: "ncw-women", promotionId: "ncw", name: "Neon Coast Women's Championship", holderId: "ncw-roxy", since: "2025-12-12", division: "Women's", defenses: 4, prestige: 78 },

  // Crossroads
  { id: "ccw-world", promotionId: "ccw", name: "CCW World Heavyweight Championship", holderId: "ccw-boone", since: "2025-05-30", division: "World", defenses: 8, prestige: 91 },
  { id: "ccw-women", promotionId: "ccw", name: "CCW Women's Championship", holderId: "ccw-della", since: "2025-09-05", division: "Women's", defenses: 6, prestige: 83 },
  { id: "ccw-junior", promotionId: "ccw", name: "CCW Junior Heavyweight Title", holderId: "ccw-prodigal", since: "2026-03-20", division: "Junior", defenses: 1, prestige: 72 },

  // Sunset Strip
  { id: "ssw-world", promotionId: "ssw", name: "Sunset Strip World Championship", holderId: "ssw-sterling", since: "2025-08-15", division: "World", defenses: 7, prestige: 86 },
  { id: "ssw-women", promotionId: "ssw", name: "Sunset Strip Women's Championship", holderId: "ssw-vivienne", since: "2025-10-31", division: "Women's", defenses: 5, prestige: 80 },

  // Albion Rope
  { id: "arw-world", promotionId: "arw", name: "Albion World of Sport Championship", holderId: "arw-barty", since: "2025-04-19", division: "World", defenses: 10, prestige: 93 },
  { id: "arw-women", promotionId: "arw", name: "Albion Women's Championship", holderId: "arw-maddie", since: "2025-11-07", division: "Women's", defenses: 4, prestige: 81 },
  { id: "arw-junior", promotionId: "arw", name: "Albion Junior Championship", holderId: "arw-florence", since: "2026-02-28", division: "Junior", defenses: 2, prestige: 75 },
];
