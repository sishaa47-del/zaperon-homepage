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

## Page structure (`src/App.tsx`, v4)

All copy lives in `src/content/homepage.ts`. Each claim has a status: `confirmed` renders, `needs-validation` renders with a `// VALIDATE:` note and is listed in `VALIDATION.md`, `hold` does not render.

| # | Section | Component | Interaction |
|---|---|---|---|
| 1 | Announcement bar, nav | `Nav.tsx` | Dropdowns, mobile drawer |
| 2 | Hero + access simulator | `Hero.tsx`, `HeroVisual.tsx`, `VideoModal.tsx` | Scenario tabs (arrow keys), auto-play until clicked, video modal |
| 3 | Proof bar | `Proof.tsx` | Logo marquee |
| 4 | Problem | `Problem.tsx` | Hover and focus cards |
| 5 | How it works | `HowItWorks.tsx` | Three steps that follow scroll, drawn wires |
| 6 | Difference + demo strip | `Difference.tsx` | "Change one condition" toggle |
| 7 | Pillar 1, Who gets in | `Pillars.tsx` | Tab explorer |
| 8 | Pillar 2, What data gets out | `Pillars.tsx` | Tab explorer, channel states |
| 9 | AI spotlight | `AIGovernance.tsx` | Prompt demo, account switch |
| 10 | Comparison | `Differentiation.tsx` | Rows reveal in turn |
| 11 | Use cases | `UseCases.tsx` | Tile tablist with detail panel |
| 12 | Customer proof | `CustomerProof.tsx` | |
| 13 | Integrations | `Closing.tsx` | |
| 14 | Deployment | `Closing.tsx` | Progress line fills step by step |
| 15 | FAQ | `Closing.tsx` | Accordion, one open at a time, FAQPage JSON-LD |
| 16 | Final CTA | `Closing.tsx` | |
| 17 | Footer | `Footer.tsx` | |

Extra pages: `/india/` (`src/pages/India.tsx`) and `/security/` (`src/pages/Security.tsx`, noindex placeholder). All pages share `components/Shell.tsx`.

Reduced motion: no auto-play or typing; every demo shows its final state. Controls carry `data-interaction`; CTAs carry `data-cta` (hero-primary, hero-video, mid-page-demo, final-primary, final-security).

## Claims review mode

Add `?review=1` to the URL. Every claim that Zaperon needs to confirm shows a yellow **⚑ Validate** flag, and a panel lists all of them. The full list is in `VALIDATION.md`. Older items still in `src/data/claims.ts`:

- SOC 2 report type
- No separate MDM required
- Extent of AI prompt inspection and enforcement
- Regulatory wording (DPDP / RBI / CERT-In: "helps you prepare for", never "compliant")
- Assessment offer and timeline (new proposal)
- One policy engine across access, web, data and AI (vendor claim)
- ~40% cost reduction (customer-stated, n=1)
- Login destination (no public admin-console URL found; it currently points to the docs)

## Content guardrails applied

- Testimonials are copied word for word from zaperon.com. No statistics were invented.
- All product visuals are labelled **Illustrative UI**. The people and data in them are fictional.
- No named competitor comparisons; the table compares tool categories.
- Customer logos and the Zaperon logo load from Zaperon's own CDN.
