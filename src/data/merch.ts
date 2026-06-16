import type { MerchItem } from "@/lib/types";

export const merch: MerchItem[] = [
  // Steel City Pro
  { id: "scp-m1", promotionId: "scp", name: "Mad Dog 'This Is My Town' Tee", type: "Tee", priceCents: 2800, accent: "#E0383B", wrestlerId: "scp-mad-dog", bestSeller: true },
  { id: "scp-m2", promotionId: "scp", name: "Foundry Hall Steel Logo Hoodie", type: "Hoodie", priceCents: 5500, accent: "#9aa3ad" },
  { id: "scp-m3", promotionId: "scp", name: "Penny 'The Hammer' Snapback", type: "Hat", priceCents: 3000, accent: "#f0a500", wrestlerId: "scp-penny" },
  { id: "scp-m4", promotionId: "scp", name: "Rust Belt Reaper Chain Poster", type: "Poster", priceCents: 1800, accent: "#6b7280", wrestlerId: "scp-reaper", limited: true },

  // Lucha Vanguardia
  { id: "lv-m1", promotionId: "lv", name: "Relámpago Jr. Replica Mask (Gold)", type: "Accessory", priceCents: 4500, accent: "#FFC93C", wrestlerId: "lv-relampago", bestSeller: true, limited: true },
  { id: "lv-m2", promotionId: "lv", name: "Vuela o Muere Tee", type: "Tee", priceCents: 2900, accent: "#FF3D7F" },
  { id: "lv-m3", promotionId: "lv", name: "Niño Cometa 'A Volar' Hoodie", type: "Hoodie", priceCents: 5400, accent: "#38bdf8", wrestlerId: "lv-cometa", bestSeller: true },
  { id: "lv-m4", promotionId: "lv", name: "Mariposa de Acero Art Print", type: "Poster", priceCents: 2000, accent: "#f472b6", wrestlerId: "lv-mariposa" },

  // Cascadia Pro
  { id: "cxp-m1", promotionId: "cxp", name: "Cascadia 'Prove Me Wrong' Tee", type: "Tee", priceCents: 2800, accent: "#2CD4A8", wrestlerId: "cxp-soren", bestSeller: true },
  { id: "cxp-m2", promotionId: "cxp", name: "Evergreen Annex Pullover", type: "Hoodie", priceCents: 5800, accent: "#3B82F6" },
  { id: "cxp-m3", promotionId: "cxp", name: "Kenji Arashi 'Storm' Tee", type: "Tee", priceCents: 2800, accent: "#3B82F6", wrestlerId: "cxp-kenji" },

  // Neon Coast
  { id: "ncw-m1", promotionId: "ncw", name: "Dexter Diamond 'Shine Bright' Tee", type: "Tee", priceCents: 3000, accent: "#FF2D9B", wrestlerId: "ncw-dexter", bestSeller: true },
  { id: "ncw-m2", promotionId: "ncw", name: "Neon Coast Glow Bucket Hat", type: "Hat", priceCents: 3200, accent: "#21D4FD", limited: true },
  { id: "ncw-m3", promotionId: "ncw", name: "Electric Pier Party Hoodie", type: "Hoodie", priceCents: 5600, accent: "#FF2D9B" },
  { id: "ncw-m4", promotionId: "ncw", name: "Roxy Voltage 'Plug In' Tee", type: "Tee", priceCents: 3000, accent: "#21D4FD", wrestlerId: "ncw-roxy" },

  // Crossroads
  { id: "ccw-m1", promotionId: "ccw", name: "King of the Crossroads Event Tee", type: "Tee", priceCents: 3200, accent: "#C8A14B", bestSeller: true, limited: true },
  { id: "ccw-m2", promotionId: "ccw", name: "Boone Calloway 'Earn the Crown' Hoodie", type: "Hoodie", priceCents: 5500, accent: "#C8A14B", wrestlerId: "ccw-boone" },
  { id: "ccw-m3", promotionId: "ccw", name: "The Outlaw 'Rules Are For Losers' Tee", type: "Tee", priceCents: 2900, accent: "#991b1b", wrestlerId: "ccw-outlaw" },

  // Sunset Strip
  { id: "ssw-m1", promotionId: "ssw", name: "Sterling Knight 'Roll Camera' Tee", type: "Tee", priceCents: 3200, accent: "#FF6B35", wrestlerId: "ssw-sterling", bestSeller: true },
  { id: "ssw-m2", promotionId: "ssw", name: "Marquee Theater Vintage Poster", type: "Poster", priceCents: 2400, accent: "#7C5CFF", limited: true },
  { id: "ssw-m3", promotionId: "ssw", name: "Rio Vega 'No Doubles' Hoodie", type: "Hoodie", priceCents: 5900, accent: "#f97316", wrestlerId: "ssw-stuntman" },
  { id: "ssw-m4", promotionId: "ssw", name: "Sunset Strip Soundtrack Vinyl", type: "Vinyl", priceCents: 3500, accent: "#7C5CFF", limited: true },

  // Albion Rope
  { id: "arw-m1", promotionId: "arw", name: "Quill 'Proper Contest' Tee", type: "Tee", priceCents: 2600, accent: "#C9A24B", wrestlerId: "arw-barty", bestSeller: true },
  { id: "arw-m2", promotionId: "arw", name: "Albion Rope Rounds Rules Hoodie", type: "Hoodie", priceCents: 5200, accent: "#2E4A8B" },
  { id: "arw-m3", promotionId: "arw", name: "The Coronet Heritage Scarf", type: "Accessory", priceCents: 2800, accent: "#C9A24B", limited: true },
];
