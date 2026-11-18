# Zaperon homepage: open items (v7)

v7 copy is final and shipped as supplied. The review-flag system (`?review=1`, ⚑ markers, review panel) has been removed entirely. This file lists only decisions and deviations that still need an owner.

## Deviations from the v7 brief

| Item | What the brief said | What shipped | Why |
|---|---|---|---|
| Use-case links | `https://www.zaperon.com/use-cases/...` (Replace Legacy VPN card, final CTA compliance link) | `https://www.zaperon.com/solutions/...` (same slugs) | Every `/use-cases/` URL returns 404. zaperon.com moved them to `/solutions/`. |
| Checklist: zero matches for "Validate" | Zero matches | One match: the Pilot phase copy, "Validate access and data policies..." | That word is part of the final copy, not a flag. |
| Checklist: zero "--" | Zero matches | Zero in visible text, alt, aria, meta and JSON-LD | "--" still appears in CSS class names (`btn--accent`) and React's prerender comment markers, which are code, not content. |
| AI demo, company workspace | Only the personal-account result is specified | Company workspace shows the "Redact" decision chip; personal shows "Block" plus the specified result line | Uses only words from the decision line, so no new copy was added. |
| "Book a demo" | Link to `/contact` | All demo and contact-sales CTAs now link to `/contact` | The old in-page form dialog (mailto hand-off, "30 minutes" copy) was removed. |

## Open decisions

| Item | Decide |
|---|---|
| Login link | Points to `https://docs.zaperon.com/`. No public console URL was found. Supply the real sign-in URL. |
| `/security/` page | Placeholder (noindex). Nothing links to it any more; the security and compliance link goes to the regulatory compliance solution page. Fill it with real content or delete it. |
| Outcome metric slots | Four hidden, empty slots (`outcomes.cards[].metric`). They render nothing until numbers are approved. |
| Nav dropdowns without JavaScript | They stay closed. All of their destinations are also in the footer. |
| `/india/` | The MS Fincap quote and compliance wording still need customer and legal sign-off. |

## Removed in v7

These sections are gone from the markup, not hidden: the problem and how-it-works section, The same trust (Difference panel) and comparison table, the customer proof section (its quotes moved into the outcome cards), the platform pillars and integration tiles (replaced by the four modules and the integration hub), the separate deployment section and its use-case chips, the footer Industries column, the request form dialog, and the review panel, flags and claim register.
