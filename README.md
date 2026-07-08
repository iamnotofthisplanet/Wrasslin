# WRASSLIN — The Indie Wrestling Hub

> Every promotion. One hub. Built for the pro wrestling fan who never misses a show.

WRASSLIN is the home base for independent wrestling. Discover regional promotions
in your area and beyond, then dive into a complete hub for each one — roster, events,
videos, news, storylines, merch, tickets, socials, and a fan comment section — without
ever having to piece the information together yourself.

![Built with Next.js](https://img.shields.io/badge/Next.js-16-black) ![React 19](https://img.shields.io/badge/React-19-blue) ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8)

---

## ✦ Features

- **Discover by region** — an interactive explorer to find promotions running shows
  near you (Northeast, Southeast, Midwest, Southwest, West Coast, Pacific NW, UK & Europe).
- **The promotion hub** — a tabbed home for every promotion:
  - **Overview** — bio, current champions, roster spotlight, next show, top storyline, socials
  - **Roster** — full roster with face/heel/tweener filters, momentum meters, and titles
  - **Events** — upcoming shows and recent results, with full match cards and ticket links
  - **Videos** — a library of full matches, highlights, promos and vlogs with a cinematic lightbox
  - **Storylines** — every rivalry tracked chapter-by-chapter on a timeline
  - **News** — promotion-specific breaking news, results, signings and features
  - **Shop** — official merch with an add-to-bag micro-interaction
  - **Fan Wire** — a live fan comment section (post, like, sort by new/top)
  - **Contact** — bookings email, home venue, and every social link
- **Wrestler profiles** — records, win rates, finishers, styles, championships, bios and storylines.
- **Global pages** — a filterable/sortable promotions directory, a full events calendar with a
  featured "next big show" banner, and a site-wide news feed.
- **Follow & personalize** — follow promotions to build a personalized feed on the **Following**
  page. Follows, comments and likes persist locally (no account required).
- **Command-palette search** (`⌘K` / `Ctrl+K`) across promotions, wrestlers, events and news.
- **A motion system built like a product team shipped it:**
  - Lenis-powered inertial smooth scrolling, a hairline scroll-progress bar, and route transitions
  - A one-time branded preloader and a custom cursor (dot + difference-blend ring with contextual
    labels like PLAY / ENTER — fine pointers only)
  - A scroll-pinned horizontal **showcase rail** for marquee promotions with a live progress readout
  - Kinetic masked-type reveals, animated stat counters, scroll-linked hero parallax with a canvas
    **ember particle field**, and velocity-skewed marquee ticker bands
  - 3D tilt + glare cards, cursor-tracking spotlight borders, sheen sweeps, magnetic CTAs,
    live rolling **countdown timers** to bell time, and champion conic auras
  - Every effect degrades gracefully: reduced-motion users get a full static experience, and
    touch devices skip pointer-only effects
- **Insane design** — a bold, dark, electric "fight-poster" aesthetic with the Anton/Oswald/Inter
  type system, film grain, aurora ambience, and giant outlined display type.
- **Generative brand art** — every promotion emblem, wrestler portrait, and event poster is a
  deterministic, self-contained SVG (container-query scaled). No external image assets required.

## ✦ Tech Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, RSC, SSG)                   |
| Language       | TypeScript (strict)                                 |
| Styling        | Tailwind CSS v4 with a custom design-token theme    |
| Animation      | Motion (Framer Motion) + Lenis smooth scroll        |
| Graphics       | Generative SVG + hand-rolled canvas particle field  |
| Icons          | lucide-react + custom inline brand glyphs           |
| State          | React Context + `localStorage` (follows / comments) |

## ✦ Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (all promotion & wrestler pages pre-render)
npm run start    # serve the production build
npm run lint     # eslint
```

## ✦ Project Structure

```
src/
├── app/                       # App Router pages
│   ├── page.tsx               # Home / Discover
│   ├── promotions/            # Directory + [slug] hub
│   ├── wrestlers/[id]/        # Wrestler profiles
│   ├── events/ · news/        # Global calendar + news feed
│   └── following/             # Personalized feed (client)
├── components/                # UI: cards, hub, navbar, visuals, comments…
├── data/                      # Seed content + query helpers
└── lib/                       # types, utils, client store
```

## ✦ A Note on the Data

All promotions, wrestlers, events, and storylines are **original and fictional** — crafted to
showcase the platform. The architecture (`src/data` + typed query helpers) is built so a real
CMS or API can be dropped in behind the same interface.

---

Made for the marks, by the marks. ✦
