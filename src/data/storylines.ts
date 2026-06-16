import type { Storyline } from "@/lib/types";

export const storylines: Storyline[] = [
  // Steel City Pro
  {
    id: "scp-s1", promotionId: "scp", title: "The Reaper Comes for the King",
    logline: "Silas Crowe has terrorized the Foundry for a year. Now he wants the one thing he can't intimidate: Mad Dog's World Title.",
    status: "Hot", heat: 94, startedAt: "2026-02-20",
    protagonists: ["scp-mad-dog"], antagonists: ["scp-reaper"],
    chapters: [
      { title: "The Ambush", date: "2026-02-20", summary: "Crowe attacks Mad Dog after his title defense, chokeslamming him onto the ring steps." },
      { title: "A Year of Terror", date: "2026-04-17", summary: "Crowe runs through the hardcore division, claiming the Foundry Title and calling out the champion weekly." },
      { title: "Through the Table", date: "2026-06-13", summary: "The contract signing erupts. Mad Dog goes through a table; the No-DQ main event is set." },
    ],
  },
  // Lucha Vanguardia
  {
    id: "lv-s1", promotionId: "lv", title: "The Mask Collector",
    logline: "La Sombra Roja keeps her conquests behind glass. Relámpago's golden mask is the trophy she's hunted for two years.",
    status: "Hot", heat: 97, startedAt: "2025-11-01",
    protagonists: ["lv-relampago"], antagonists: ["lv-sombra"],
    chapters: [
      { title: "Two Masks, One Case", date: "2025-11-01", summary: "Roja unmasks her second victim and vows the golden mask will complete her collection." },
      { title: "The Shadow Strikes", date: "2026-03-14", summary: "Roja attacks Relámpago during his celebration, stealing the Mundial Title belt as a taunt." },
      { title: "Apuesta Accepted", date: "2026-06-11", summary: "Relámpago signs the Lucha de Apuestas: Title vs. Mask at Noche de Vuelo." },
    ],
  },
  {
    id: "lv-s2", promotionId: "lv", title: "Torch of the Cometa",
    logline: "An 18-year-old prodigy and the idol who mentors him are on a collision course neither truly wants.",
    status: "Building", heat: 78, startedAt: "2026-04-22",
    protagonists: ["lv-cometa"], antagonists: ["lv-relampago"],
    chapters: [
      { title: "The Debut", date: "2026-04-22", summary: "Niño Cometa debuts to a thunderous ovation, with Relámpago watching proudly from the ramp." },
      { title: "Respect, Then Rivalry", date: "2026-05-30", summary: "A tag miscommunication plants the first seed of doubt between mentor and student." },
    ],
  },
  // Cascadia Pro
  {
    id: "cxp-s1", promotionId: "cxp", title: "The Hour",
    logline: "Soren Vance's historic reign meets the only man who's ever pushed him the distance — for a full 60 minutes.",
    status: "Hot", heat: 89, startedAt: "2026-05-15",
    protagonists: ["cxp-soren"], antagonists: ["cxp-kenji"],
    chapters: [
      { title: "The Draw", date: "2026-05-15", summary: "Vance and Arashi go to a 30-minute time-limit draw; Vance demands a rematch with no escape." },
      { title: "Sixty Minutes Signed", date: "2026-05-29", summary: "The Iron Man stipulation is made official for Cold Front IX." },
    ],
  },
  // Neon Coast
  {
    id: "ncw-s1", promotionId: "ncw", title: "Glitter vs. Gloom",
    logline: "Tyson Reign thinks the Neon Coast party is beneath him. Dexter Diamond is happy to prove the people disagree.",
    status: "Hot", heat: 85, startedAt: "2026-04-11",
    protagonists: ["ncw-dexter"], antagonists: ["ncw-apex"],
    chapters: [
      { title: "Above It All", date: "2026-04-11", summary: "Reign debuts a new attitude, refusing to enter the ring until the 'tacky' lights are dimmed." },
      { title: "The Band Incident", date: "2026-06-12", summary: "Reign destroys the house band's gear, turning the entire Electric Pier against him." },
    ],
  },
  // Crossroads
  {
    id: "ccw-s1", promotionId: "ccw", title: "The Congregation",
    logline: "Cyrus Bishop is building a following from the disillusioned — and he's convinced the Crossroads crown is his destiny.",
    status: "Building", heat: 82, startedAt: "2026-03-08",
    protagonists: ["ccw-boone"], antagonists: ["ccw-bishop"],
    chapters: [
      { title: "First Sermon", date: "2026-03-08", summary: "Bishop recruits two jobbers into his flock and lays out his claim to Boone's throne." },
      { title: "Laying Hands on the King", date: "2026-05-30", summary: "The congregation interferes in Boone's title defense, costing him nothing but sending a message." },
    ],
  },
  {
    id: "ccw-s2", promotionId: "ccw", title: "The Prodigal's Crown",
    logline: "Hometown hero Jesse Crane wants to win the King of the Crossroads — but the Outlaw is in his bracket.",
    status: "Building", heat: 74, startedAt: "2026-05-10",
    protagonists: ["ccw-prodigal"], antagonists: ["ccw-outlaw"],
    chapters: [
      { title: "Homecoming Gold", date: "2026-03-20", summary: "Crane wins the Junior Title in front of his hometown crowd." },
      { title: "The Outlaw's Warning", date: "2026-05-10", summary: "Dillinger jumps Crane in the parking lot, promising to 'rob the kid of his fairy tale.'" },
    ],
  },
  // Sunset Strip
  {
    id: "ssw-s1", promotionId: "ssw", title: "The Leading Man's Last Act",
    logline: "Sterling Knight has cast himself as the hero of every story. Johnny Matinee is about to rewrite the ending.",
    status: "Hot", heat: 88, startedAt: "2026-01-30",
    protagonists: ["ssw-johnny"], antagonists: ["ssw-sterling"],
    chapters: [
      { title: "Always the Extra", date: "2026-01-30", summary: "Knight costs Matinee a title shot for the third time, calling him 'a career supporting actor.'" },
      { title: "The Crowd Decides", date: "2026-06-06", summary: "A fan vote forces the title match; the Marquee will be firmly behind Matinee." },
    ],
  },
  {
    id: "ssw-s2", promotionId: "ssw", title: "A Star Is Born",
    logline: "Vivienne Velvet refuses to share the spotlight. Lola Nova is about to take it anyway.",
    status: "Building", heat: 76, startedAt: "2026-04-04",
    protagonists: ["ssw-lola"], antagonists: ["ssw-vivienne"],
    chapters: [
      { title: "The Understudy", date: "2026-04-04", summary: "Velvet mocks Nova as a 'flash in the pan' during a backstage confrontation." },
      { title: "Contract Signed", date: "2026-06-07", summary: "Nova signs for the Women's Title at Premiere Night, ripping up Velvet's script." },
    ],
  },
  // Albion Rope
  {
    id: "arw-s1", promotionId: "arw", title: "Class War",
    logline: "The honest grappler against the aristocrat who's bought everyone but him. Some debts can only be settled in the ring.",
    status: "Hot", heat: 90, startedAt: "2026-02-14",
    protagonists: ["arw-barty"], antagonists: ["arw-thorne"],
    chapters: [
      { title: "Bought and Paid For", date: "2026-02-14", summary: "Thorne bribes a referee to fast-count Quill in a non-title loss." },
      { title: "No Favours", date: "2026-06-09", summary: "Quill demands a 2-of-3 falls match with no corner men, removing every advantage Thorne's money can buy." },
    ],
  },
];
