# Zaperon homepage redesign

A responsive homepage built around one positioning line:

> **Zero trust for every user, on every device, including the ones you don't manage.**

The source for the content is the messaging research doc ("Zaperon Homepage Messaging Rework", Nov 18 2026). Testimonials, customer logos, contact details and links were checked against zaperon.com.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run lint     # oxlint
```

## Live site (GitHub Pages)

Every push to `main` builds the site and publishes it with `.github/workflows/pages.yml`. The build sets `BASE_PATH=/<repo-name>/`, so the homepage, `/india/` and `/security/` all work under `https://<username>.github.io/<repo-name>/`. One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

Stack: Vite + React 19 + TypeScript and plain CSS (design tokens in `src/index.css`). No UI framework.

## Brand system (taken from zaperon.com's own tokens)

| Role | Token | Value |
|---|---|---|
| Brand primary (CTAs, links) | blue-500 / hover blue-600 | `#003fb9` / `#003194` |
| CTA + announcement gradient | blue-500 → violet | `#003fb9 → #6943ff` |
| Headings / ink | dark-blue-500 | `#0b3558` |
| Hero and dark bands | blue-900 | `#000c24` |
| Accent on dark | cyan, dark-blue-100 | `#6fe5ff`, `#b6d9f6` |
| Allowed / blocked / limited | green-500, red-500, yellow-700 | `#127d1d`, `#d9292b`, `#9c6008` |
| Text greys, canvas | grayscale-800/700, grayscale-50 | `#404040`, `#616161`, `#f5f5f5` |
| Radii | 4 / 8 / 16 / 999 | |
| Type | Poppins (all text); **DM Serif Display italic** on the key phrase of the hero, AI and final-CTA headlines (`.serif`) | |

Brand terms follow zaperon.com: "Zero Trust Access" for the pillar, "Zero Trust access" in running text, and "Shadow AI" / "Shadow IT". The one exception is the hero headline, which keeps the brief's wording.

## Page structure (`src/App.tsx`, v7)

All copy lives in `src/content/homepage.ts` and is final (no review flags in v7).

| # | Section | Component | Interaction |
|---|---|---|---|
| 0 | Announcement bar | `Nav.tsx` (`AnnouncementBar`) | Dismiss |
| 1 | Hero + access simulator | `Hero.tsx`, `HeroVisual.tsx`, `VideoModal.tsx` | Device tabs (arrow keys), native "See details", video modal |
| 2 | Proof bar | `Proof.tsx` | Logo marquee (pauses on hover, static under reduced motion) |
| 3 | Why now | `WhyNow.tsx` | Static stats with source links |
| 4 | AI & agent security | `AIGovernance.tsx` | Two-tab demo: employee prompt (account toggle, typing) and agent action |
| 5 | One platform (workday strip) | `Workday.tsx` | Without / With toggle, progress bar |
| 6 | Four modules | `Pillars.tsx` (`Platform`) | Tabs on desktop, accordion on mobile |
| 7 | What changes for your team | `Outcomes.tsx` | Hidden metric slots |
| 8 | Integration and deployment | `Integration.tsx`, `Logo.tsx` | Timeline and hub lines draw in once |
| 9 | FAQ | `Closing.tsx` | Accordion, FAQPage JSON-LD |
| 10 | Final CTA | `Closing.tsx` | |
| 11 | Footer | `Footer.tsx` | |

Extra pages: `/india/` and `/security/` (noindex placeholder, no longer linked). All pages share `components/Shell.tsx`.

**Prerendered.** `npm run build` also builds `src/entry-server.tsx` and runs `scripts/prerender.mjs`, which writes each page's HTML into `dist/`. The client hydrates it. Without JavaScript every section, FAQ answer, demo panel and module card is readable.

Reduced motion: no typing, line-draw or bar animation; demos show their final state. Controls carry `data-interaction`; CTAs carry `data-cta`.

## Content guardrails applied

- Testimonials are copied word for word from zaperon.com. No statistics were invented.
- All product visuals are labelled **Illustrative UI**. The people and data in them are fictional.
- No named competitor comparisons; the table compares tool categories.
- Customer logos and the Zaperon logo load from Zaperon's own CDN.
