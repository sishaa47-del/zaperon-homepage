# Homepage v4: validation register

Every item here is a `needs-validation` or `hold` claim in [`src/content/homepage.ts`](src/content/homepage.ts), or a page change that needs a decision. `needs-validation` items render and show a ⚑ marker in review mode (`?review=1`). `hold` items do not render.

Status: all 17 sections done, plus the `/india/` and `/security/` pages.

## Needs validation (rendered)

| # | Section | Claim | What to confirm |
|---|---|---|---|
| 1 | 2 Hero | "Watch the 2-minute overview" video | Supply the embeddable URL of the 2-minute product video. The modal shows an empty video slot until then (`hero.videoEmbedUrl`). |
| 2 | 2 Hero simulator | Personal laptop: `Allowed · view only`, download blocked | Data rules can use device conditions (view only on a registered personal device). |
| 3 | 3 Proof bar | `Trusted in regulated industries · Guided deployment with a dedicated team` | Support model: guided deployment with a dedicated team. |
| 4 | 6 Difference | "A stolen password isn't enough on its own." | Device binding (registered device with a Zaperon-issued certificate) is required for all users. |
| 5 | 6 Difference | "Access and data rules can use the same conditions." | Data rules can use the same user, group and device conditions as access rules. |
| 6 | 6 Difference | "Change one condition" panel (whole panel) | One device condition changes both access rules (Finance app) and data rules (download, share) as shown. |
| 7 | 6 Demo strip | Card 4: Alex on a personal laptop, design file, View only | View only for a design file on a personal laptop. |
| 8 | 8 Pillar 2 | "Same file, different permissions" | Share for a finance lead on a company laptop; view only, no download, for a contractor on a personal laptop. |
| 9 | 8 Pillar 2 | "Recognises sensitive content" | Detection method and supported file types. |
| 10 | 8 Pillar 2 | "Safe use of AI" | Supported AI tool list (ChatGPT, Gemini), Copilot, browser vs desktop app coverage. |
| 11 | 9 AI spotlight | "Keep work in company accounts" | On supported tools, company accounts allowed and personal ones blocked. |
| 12 | 9 AI spotlight demo | Company account verdict `Allowed · logged` | Whether sensitive fields are redacted. If confirmed, change to `Allowed · sensitive fields redacted`. |
| 13 | 10 Comparison | Row 2: "Data rules can use the same user, group and device conditions as access rules" | Same as item 5. |
| 14 | 12 Proof | Shortened KPFS quote (cost sentence removed) | Customer approval for the shortened wording. |
| 15 | 14 Deployment | Step 4 "Monitor first, then warn, then block" | Data rules support staged monitor, warn and block modes. |
| 16 | 14 Deployment | "Every deployment is guided by a dedicated Zaperon team." | Support model for every customer. |
| 17 | 15 FAQ | "What is Zaperon?" (also the SoftwareApplication JSON-LD description) | Copilot support. |
| 18 | 15 FAQ | "How is Zaperon different from traditional SSE?" | Data rules use the same conditions as access rules. |
| 19 | 15 FAQ | "What does the app see on a personal device?" | Exactly what the app collects on a personal device. |
| 20 | 15 FAQ | "What about data already stored in our SaaS apps?" | Scope is data in motion only. |
| 21 | 15 FAQ | "Is Zaperon SOC 2 compliant?" "Yes." | Type I or Type II, and the report date. |
| 22 | 17 Footer | SOC 2 badge | Type I or Type II, and the audit period. |

## Hold (not rendered)

| # | Item | Reason |
|---|---|---|
| H1 | "~40% lower IT security costs" card | Removed from the homepage by the v4 brief. |
| H2 | "One policy" / "single policy engine" / "Unified policy engine" wording | Removed by the v4 brief. The diagram's centre node is now "Zaperon decision". |
| H3 | Claims that Zaperon controls AI agents | Removed by the v4 brief. Agents appear only as a link to the blog post. |
| H4 | FAQ "Do we need to replace our identity provider?" | Entra ID and Okta coexistence not confirmed. |
| H5 | FAQ "Can we send events to our SIEM?" | SIEM export not confirmed. |
| H6 | FAQ "Where is our data hosted?" | Hosting regions not confirmed. |
| H7 | Case study outcome metrics (two slots) | Metrics pending from the customer. The slots render once `customerProof.caseStudy.metrics` has entries. |
| H8 | Readiness assessment offer ("Get your assessment") | Offer not confirmed. Removed from the homepage, the request form and the region logic. |

FAQPage JSON-LD only includes the 8 rendered questions.

## Removed or moved

| What | Where it went |
|---|---|
| SOC 2 in the hero highlights | Moves to the footer badge and the FAQ (sections 15 and 17). |
| Hero four-item checklist | Replaced by the audience line. |
| "Explore Platform" hero button | Replaced by "Watch the 2-minute overview". |
| Testimonial cards under the logos | Move to the Proof section (12). The "~40%" card is deleted. MS Fincap quote moves to the India page. |
| Region-specific proof label (India / US) | Replaced by the single label "Trusted by Global Enterprises". |
| AI agents mention in the announcement bar | Removed. |
| "Example policy" banner (contractor / CRM) | Replaced by the Difference section (6) and its demo strip. |
| Platform: 5 capability tabs, "lean security team" headline, "Extension" badge | Replaced by Pillar 1 (Who gets in) and Pillar 2 (What data gets out). The component `Capabilities.tsx` is deleted. Web filtering and cloud app discovery now sit in the "Also included" line. |
| How it works step 4 "Enforce everywhere" and "Risk" input | Reduced to three questions plus a result line. |
| AI section "Platform extension" eyebrow, PAN and loan-account sample data | Replaced by "Safe use of AI" and globally neutral sample data. |
| Industries tabs | Removed from the homepage. zaperon.com has no industry pages yet, so the nav and footer Industries links point to the solutions hub. **Decide:** build industry pages or drop the menu. |
| Trust & compliance (India / US switch) | India content moved to `/india/` (H1, four points, the MS Fincap quote word for word, and the "helps you prepare" disclaimer). "Built and supported in India" removed. The US variant is dropped. The visitor-region guess and stored region are gone; the page is a single `en` locale. |
| "RBI compliance outcome" metric card | Removed. The MS Fincap quote itself appears only on `/india/`. **Confirm** the quote is fine there, since it says "achieved RBI compliance". |
| Backed by (investors) | Removed. There is no About page to move it to; the seed funding news link stays in the nav and footer. |
| Map / Pilot / Agree, Customer outcomes cards | Removed. `Outcomes.tsx`, `Industries.tsx` and `Regional.tsx` are deleted. |
| Request form | Assessment intent and region pre-selection removed. Size options read "100 to 500". The demo line now matches the final CTA line. |
| Navbar Platform links (`#cap-*`) | Now point to the pillar tabs (`#who-passwordless`, `#who-apps`, `#data-exits`), Pillar 2 and the AI spotlight. Labels are revised with the footer (17). |

## Mockup labels I chose (not in the brief)

Illustrative UI only, fictional data. Change any of these in `src/content/homepage.ts` or `src/components/Pillars.tsx`.

| Where | Labels |
|---|---|
| Hero simulator | "Person", "Device", "Checks", "Policy evaluated", "Decision", device status chips "Registered" / "Not registered" |
| How it works diagram | Node subtitles "Phishing-resistant sign-in", "Registered · encrypted · up to date"; decision inputs "Person · Device · Data" |
| Pillar 1 previews | Apps "CRM · SaaS", "Code repository · On-premise", "Build server · Server"; directory chip "Synced" |
| Pillar 2 previews | File names `Q3_report.xlsx`, `account_review.docx`, `design_v4.fig`; people Sam Rivera, Chris Taylor; channel states "Allow / Warn / Block" |
| AI demo | App name "AI chatbot", "Waiting for prompt", "Inspecting prompt", "Replay" |

## Carried over

| Item | Note |
|---|---|
| Navbar "Login" link | Points to docs.zaperon.com. No public admin-console URL confirmed. |
| Hero video | Still needs the embed URL (item 1). |

## New pages and links

| Item | Note |
|---|---|
| `/india/` | Built with Vite multi-page (`india/index.html`, `src/india.tsx`). Indexable, own title, description and canonical. |
| `/security/` | Placeholder for "Security and compliance details", marked `noindex`. The holding line ("This page is being prepared...") and the email button are mine. **Supply** the real content. |
| Use-case links | Each use case links to its zaperon.com page: VPN to replace-legacy-vpn, BYOD to secure-byod-access, source code and designs to prevent-data-leakage, AI to monitor-ai-interactions, account takeover to prevent-account-takeover, auditors to ensure-regulatory-compliance. **Check** the source code and AI mappings are the pages you want. |
| Section anchors on subpages | Nav and footer anchors get a "/" prefix off the homepage, so `/#ai-governance` works from `/india/`. |

## Symbols removed (your follow-up instruction)

I read "em dashes, ~ or any AI related symbols" as: em dashes, en dashes, "--", "~", arrows (→), ellipses (…) and the sparkle icon. All are gone from visible text, alt text, aria labels and the HTML head. Sparkle icons are now a speech-bubble icon; arrow characters in mockups are now words ("to", commas). The arrow icons on buttons and links are SVG icons, not text, and stay. Tell me if you also want those gone.
