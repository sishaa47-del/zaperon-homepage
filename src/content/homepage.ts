/**
 * Zaperon homepage copy (v4 messaging). Single source of truth for all
 * visible homepage text.
 *
 * Claim status
 *   confirmed         render.
 *   needs-validation  render, marked `// VALIDATE:` and listed in VALIDATION.md.
 *                     In review mode (?review=1) these show a ⚑ marker.
 *   hold              do not render. Kept here, commented, with the reason.
 *
 * Copy rules: no em dashes, en dashes, "--" or "~" in visible text, alt text
 * or aria labels. Never name competitors. Mockups use fictional, globally
 * neutral sample data and stay labelled "Illustrative UI".
 */

import { LINKS } from "../context";

export type ClaimStatus = "confirmed" | "needs-validation" | "hold";

export type Claim<T = string> = {
  status: ClaimStatus;
  value: T;
  /** What has to be confirmed. Required for needs-validation and hold. */
  validate?: string;
};

const ok = <T,>(value: T): Claim<T> => ({ status: "confirmed", value });
const check = <T,>(value: T, validate: string): Claim<T> => ({ status: "needs-validation", value, validate });

/** True when a claim may be rendered. */
export const shows = (c: Claim<unknown>) => c.status !== "hold";

/* ------------------------------------------------------------------ */
/* 1. Announcement bar                                                 */
/* ------------------------------------------------------------------ */
export const announcement = {
  lead: "New:",
  text: "see how Zaperon keeps sensitive data out of AI tools.",
  linkText: "Read the AI governance datasheet",
  href: LINKS.aiDatasheet,
};

/* ------------------------------------------------------------------ */
/* 2. Hero                                                             */
/* ------------------------------------------------------------------ */
export const hero = {
  eyebrow: "IDENTITY-CENTRIC ZERO-TRUST ACCESS & DATA PROTECTION",
  h1Lead: "Zero trust that controls",
  h1Accent: "who gets in, and what data gets out.",
  subhead:
    "Zaperon verifies the person and their device, then uses that same trust to decide what they can open, and what they can share, upload or paste into AI tools.",
  audience: "For security and IT leaders protecting people, devices, applications and sensitive data.",
  primaryCta: "Book a demo",
  videoCta: "Watch the 2-minute overview",
  /**
   * VALIDATE: product overview video URL. None supplied or verified yet.
   * While null, the modal shows an empty, labelled video slot.
   * Use an embeddable URL, e.g. https://www.youtube-nocookie.com/embed/<id>.
   */
  videoEmbedUrl: check<string | null>(null, "Overview video: supply the embeddable URL for the 2-minute product video."),
};

export type DeviceId = "company" | "personal" | "unknown";
export type Outcome = "allowed" | "blocked" | "view";
export type CheckState = "pass" | "fail" | "warn";

export type SimulatorScenario = {
  id: DeviceId;
  tab: string;
  device: { name: string; status: string; tone: "ok" | "warn" | "deny" };
  checks: { label: string; state: CheckState }[];
  policy: string[];
  decision: { label: string; tone: "ok" | "warn" | "deny" };
  actions: Record<"open" | "download" | "paste", Outcome>;
};

export const simulator = {
  label: "Illustrative UI",
  resource: "Access request · Code repository",
  person: { initials: "AM", name: "Alex Morgan", role: "Engineer" },
  actionLabels: {
    open: "Open repository",
    download: "Download source file",
    paste: "Paste code into personal AI account",
  },
  outcomeLabels: { allowed: "Allowed", blocked: "Blocked", view: "View only" } satisfies Record<Outcome, string>,
  autoplayMs: 4000,
  scenarios: [
    ok<SimulatorScenario>({
      id: "company",
      tab: "Company laptop",
      device: { name: "Company laptop", status: "Registered", tone: "ok" },
      checks: [
        { label: "Passwordless sign-in approved", state: "pass" },
        { label: "Registered device", state: "pass" },
        { label: "OS up to date", state: "pass" },
        { label: "Disk encrypted", state: "pass" },
      ],
      policy: ["user = Alex", "device = company, registered", "resource = code repository", "data = source code"],
      decision: { label: "Allowed", tone: "ok" },
      actions: { open: "allowed", download: "allowed", paste: "blocked" },
    }),
    // VALIDATE: data rules that use device conditions (view only on a personal device).
    check<SimulatorScenario>(
      {
        id: "personal",
        tab: "Personal laptop",
        device: { name: "Personal laptop", status: "Registered", tone: "warn" },
        checks: [
          { label: "Passwordless sign-in approved", state: "pass" },
          { label: "Registered personal device", state: "pass" },
          { label: "OS up to date", state: "pass" },
        ],
        policy: ["user = Alex", "device = personal, registered", "resource = code repository", "data = source code"],
        decision: { label: "Allowed · view only", tone: "warn" },
        actions: { open: "allowed", download: "blocked", paste: "blocked" },
      },
      "Hero simulator, personal laptop: data rules can use device conditions (download blocked, view only on a registered personal device).",
    ),
    ok<SimulatorScenario>({
      id: "unknown",
      tab: "Unknown device",
      device: { name: "Unknown device", status: "Not registered", tone: "deny" },
      checks: [
        { label: "Password entered", state: "warn" },
        { label: "Device not registered", state: "fail" },
      ],
      policy: ["user = Alex", "device = not registered", "resource = code repository", "data = source code"],
      decision: { label: "Blocked", tone: "deny" },
      actions: { open: "blocked", download: "blocked", paste: "blocked" },
    }),
  ],
};

/* ------------------------------------------------------------------ */
/* 3. Proof bar                                                        */
/* ------------------------------------------------------------------ */
const CDN = "https://cdn.prod.website-files.com/6ad59f6192ec57f75a664d87/";

export const proofBar = {
  label: "Trusted by Global Enterprises",
  // VALIDATE: support model (guided deployment, dedicated team).
  trustLine: check(
    "Trusted in regulated industries · Guided deployment with a dedicated team",
    "Proof bar and final CTA trust line: confirm the support model (guided deployment with a dedicated team).",
  ),
  /** Customer logos as published on zaperon.com (verified Nov 2026). */
  logos: [
    { name: "KPFS", src: `${CDN}6ae1e6439b8bd9d13979f965_ic-logo-8.webp` },
    { name: "MS Fincap", src: `${CDN}6ae1e641599f4fae9a313dc6_ic-logo-3.webp` },
    { name: "SBI Operations Support", src: `${CDN}6ae1e64298e71c40326bd2bf_ic-logo-4.webp` },
    { name: "FlexiLoans", src: `${CDN}6ae1e643909c278b237016fb_ic-logo-6.webp` },
    { name: "STL Fasteners", src: `${CDN}6ae1e6422420a0150538c23c_ic-logo-1.webp` },
    { name: "NSDC", src: `${CDN}6ae1e64136e3df31bb0b21a6_ic-logo-2.webp` },
    { name: "Gwalior Smart City", src: `${CDN}6ae1e64598e71c40326bd4c9_ic-logo-9.webp` },
    { name: "HRS Navigation", src: `${CDN}6ae1e6448cbffdd6981af906_ic-logo-5.webp` },
    { name: "DMW", src: `${CDN}6ae1e6442420a0150538c379_ic-logo-10.webp` },
    { name: "TraqCheck", src: `${CDN}6ae1e64441f1caec1231392b_ic-logo-11.webp` },
  ],
};

/* ------------------------------------------------------------------ */
/* 4. The problem                                                      */
/* ------------------------------------------------------------------ */
export const problem = {
  eyebrow: "The problem",
  h2: "A valid login doesn't guarantee safe access. And it says nothing about what happens next.",
  intro:
    "Passwords get phished. Contractors sign in from laptops IT has never seen. And once someone is in, a file upload, an email or an AI prompt can carry company data out in seconds. Most security stacks split these checks across separate tools. Risk lives in the gaps between them.",
  cards: [
    { icon: "key", title: "Right password, wrong person.", body: "Stolen credentials still open doors.", tags: "Phished passwords · reused credentials" },
    { icon: "laptop", title: "Right person, untrusted device.", body: "Personal and contractor laptops sit outside IT's view.", tags: "Contractors · BYOD · field staff" },
    { icon: "file", title: "Right person, wrong destination.", body: "Files, uploads and prompts leave quietly.", tags: "Personal email · cloud drives · AI tools" },
  ] as const,
};

/* ------------------------------------------------------------------ */
/* 5. How it works                                                     */
/* ------------------------------------------------------------------ */
export const howItWorks = {
  eyebrow: "How it works",
  h2: "Three questions. One connected decision.",
  steps: [
    {
      title: "Who is it?",
      body: "Passwordless, phishing-resistant sign-in, tied to the person's registered device.",
      chips: ["No password to steal", "Device-bound sign-in", "Phishing-resistant"],
    },
    {
      title: "Which device?",
      body: "Is it registered, and does it meet your standards for encryption, updates and antivirus? Checked before access is granted.",
      chips: ["Registered", "Encrypted", "Up to date"],
    },
    {
      title: "What data?",
      body: "The answers to the first two shape what that person can open, download, share, upload or paste into AI.",
      chips: ["Open", "Download", "Share", "Upload", "AI prompt"],
    },
  ],
  result: "Allow, warn or block, based on the person, the device and the data.",
  diagram: {
    user: { label: "User", sub: "Phishing-resistant sign-in" },
    device: { label: "Device", sub: "Registered · encrypted · up to date" },
    decision: { label: "Zaperon decision", inputs: ["Person", "Device", "Data"] },
    outputs: [
      { icon: "app", label: "Applications", sub: "SaaS & on-premise sign-in" },
      { icon: "server", label: "Private apps", sub: "Per-app zero trust access" },
      { icon: "globe", label: "Web & SaaS", sub: "Browsing & Shadow IT" },
      { icon: "database", label: "Data", sub: "Endpoint, web & email" },
      { icon: "chat", label: "AI", sub: "Tools and prompts" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* 6. The difference                                                   */
/* ------------------------------------------------------------------ */
export type Pill = "allowed" | "blocked" | "view";

export const difference = {
  eyebrow: "WHY IT'S DIFFERENT",
  h2: "The same trust, from login to every file",
  intro:
    "In most organisations, sign-in, device checks and data protection run in separate systems, each with its own rules. Zaperon verifies the person and the device itself, so the same user and device information can shape what that person can do with your data.",
  points: [
    // VALIDATE: device binding required for all users.
    check(
      {
        title: "A stolen password isn't enough on its own.",
        body: "Signing in to protected apps requires the person's registered device, which holds a Zaperon-issued certificate.",
      },
      "Difference, point 1: device binding (registered device with a Zaperon-issued certificate) is required for all users.",
    ),
    // VALIDATE: access and data rules share conditions.
    check(
      {
        title: "Access and data rules can use the same conditions.",
        body: "The user, group and device status that decide app access can also decide data actions, such as view-only on a personal laptop.",
      },
      "Difference, point 2: data rules can use the same user, group and device conditions as access rules.",
    ),
    ok({ title: "Every decision leaves evidence.", body: "Who, which device, what data and where, in one record." }),
  ],
  // VALIDATE: whole "change one condition" panel.
  panel: check(
    {
      label: "Illustrative UI",
      toggle: { company: "Device: Company laptop", personal: "Device: Personal laptop" },
      access: {
        title: "Access rules",
        rows: [
          { label: "CRM", company: "allowed", personal: "allowed" },
          { label: "Code repository", company: "allowed", personal: "allowed" },
          { label: "Finance app", company: "allowed", personal: "blocked" },
        ] as { label: string; company: Pill; personal: Pill }[],
      },
      data: {
        title: "Data rules",
        rows: [
          { label: "Download files", company: "allowed", personal: "view" },
          { label: "Share externally", company: "allowed", personal: "blocked" },
          { label: "Upload to personal drive", company: "blocked", personal: "blocked" },
        ] as { label: string; company: Pill; personal: Pill }[],
      },
      caption: "One condition changed. Access and data rules both responded.",
    },
    "Difference panel: one device condition changes both access rules (Finance app) and data rules (download, share) as shown.",
  ),
  pillLabels: { allowed: "Allowed", blocked: "Blocked", view: "View only" } satisfies Record<Pill, string>,
};

export type DemoSignal = { label: string; tone: "ok" | "deny" | "warn" | "neutral" };

export const demoStrip = {
  label: "Illustrative",
  cards: [
    ok({
      scenario: "Alex opens the code repository from a registered laptop",
      signals: [
        { label: "Person", tone: "ok" },
        { label: "Device", tone: "ok" },
        { label: "Allowed", tone: "ok" },
      ] as DemoSignal[],
    }),
    ok({
      scenario: "Someone uses Alex's password on an unknown laptop",
      signals: [
        { label: "Device", tone: "deny" },
        { label: "Blocked", tone: "deny" },
      ] as DemoSignal[],
    }),
    ok({
      scenario: "Alex, on a trusted laptop, uploads a source file to a personal cloud drive",
      signals: [
        { label: "Person", tone: "ok" },
        { label: "Device", tone: "ok" },
        { label: "Data", tone: "deny" },
        { label: "Blocked", tone: "deny" },
      ] as DemoSignal[],
    }),
    // VALIDATE: view only on a personal device.
    check(
      {
        scenario: "Alex, on a personal laptop, opens a design file",
        signals: [
          { label: "Person", tone: "ok" },
          { label: "Device: personal", tone: "neutral" },
          { label: "View only", tone: "warn" },
        ] as DemoSignal[],
      },
      "Demo strip card 4: view only for a design file on a personal laptop.",
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* 7 + 8. Pillars                                                      */
/* ------------------------------------------------------------------ */
export type PillarTab = { id: string; icon: string; title: string; body: string };

export const pillarAccess = {
  id: "who-gets-in",
  eyebrow: "WHO GETS IN",
  h2: "The right person, on a trusted device",
  tabs: [
    ok<PillarTab>({
      id: "passwordless",
      icon: "fingerprint",
      title: "Passwordless and phishing-resistant",
      body: "Sign-in uses a certificate on the person's registered device instead of a password, so a phished password alone can't open protected apps.",
    }),
    ok<PillarTab>({
      id: "devices",
      icon: "laptop",
      title: "Personal and contractor devices, on your terms",
      body: "Devices are registered and checked against your standards before access. Devices that aren't registered don't get in.",
    }),
    ok<PillarTab>({
      id: "apps",
      icon: "route",
      title: "Specific apps, not the whole network",
      body: "Reach SaaS, cloud and on-premise apps, servers and network devices without a traditional VPN.",
    }),
    ok<PillarTab>({
      id: "directory",
      icon: "users",
      title: "Works with your directory",
      body: "Users and groups sync from Active Directory, LDAP or Google Workspace.",
    }),
  ],
};

export const pillarData = {
  id: "what-data-gets-out",
  eyebrow: "WHAT DATA GETS OUT",
  h2: "Data loss prevention that knows who, which device and what",
  tabs: [
    // VALIDATE: per-user, per-device file permissions.
    check<PillarTab>(
      {
        id: "permissions",
        icon: "file",
        title: "Same file, different permissions",
        body: "A finance lead on a company laptop can share a report. A contractor on a personal laptop can view it, but not download it.",
      },
      "Pillar 2, same file different permissions: share for a finance lead on a company laptop, view only for a contractor on a personal laptop.",
    ),
    ok<PillarTab>({
      id: "exits",
      icon: "layers",
      title: "The common exits, controlled",
      body: "Web uploads, email attachments, USB drives, printing, copy-paste and screenshots. Allow, warn or block each one.",
    }),
    // VALIDATE: detection method and file types.
    check<PillarTab>(
      {
        id: "detection",
        icon: "eye",
        title: "Recognises sensitive content",
        body: "Detects the data types you choose, such as personal data, financial records and source code, in files and in text sent to AI tools.",
      },
      "Pillar 2, sensitive content: detection method and supported file types.",
    ),
    // VALIDATE: AI tool list, Copilot, browser vs desktop apps.
    check<PillarTab>(
      {
        id: "ai",
        icon: "chat",
        title: "Safe use of AI",
        body: "See which AI tools people use. On supported tools such as ChatGPT and Gemini, allow company accounts only and inspect prompts and file uploads before they're sent.",
      },
      "Pillar 2, safe use of AI: supported AI tool list, Copilot, and browser vs desktop app coverage.",
    ),
    ok<PillarTab>({
      id: "record",
      icon: "clipboard",
      title: "A record of each decision",
      body: "Who, which device, what data and where, ready for investigations and audits.",
    }),
  ],
  alsoIncluded: "Also included: Web filtering and threat protection, and discovery of the cloud apps your teams use.",
};

/* ------------------------------------------------------------------ */
/* 9. AI spotlight                                                     */
/* ------------------------------------------------------------------ */
export const aiSpotlight = {
  eyebrow: "SAFE USE OF AI",
  h2Lead: "Adopt AI",
  h2Accent: "without losing control",
  h2Tail: "of your data.",
  body: "Employees are adopting AI tools faster than security teams can review them. Zaperon shows which AI tools are in use, keeps work in company accounts on supported tools, and inspects prompts and uploads before sensitive data leaves.",
  points: [
    ok({ icon: "eye", title: "Discover AI use", body: "See which AI tools are in use, and by whom." }),
    ok({ icon: "file", title: "Inspect prompts and uploads", body: "Check for sensitive data before it reaches an external model." }),
    // VALIDATE: company-account enforcement on supported tools.
    check(
      { icon: "lock", title: "Keep work in company accounts", body: "On supported tools, allow company accounts and block personal ones." },
      "AI spotlight: on supported tools, allow company accounts and block personal ones.",
    ),
  ],
  button: { label: "See AI governance", href: LINKS.aiDatasheet },
  agentsLink: {
    text: "AI agents need identity and limits too. Read how Zaperon approaches securing AI agents.",
    href: "https://www.zaperon.com/blog/securing-the-agentic-enterprise-why-ai-needs-identity-authorization-and-runtime-controls",
  },
  demo: {
    label: "Illustrative UI",
    app: "AI chatbot",
    gateway: "Zaperon AI gateway",
    waiting: "Waiting for prompt",
    inspecting: "Inspecting prompt",
    prompt: "Summarise churn risk for these accounts: Jordan Lee, jordan.lee@acme-example.com, account 4471-2290",
    detections: ["Customer name", "Email address", "Account number"],
    toggle: { company: "Company account", personal: "Personal account" },
    personalVerdict: "Prompt blocked before it reached the external model",
    /**
     * Company account verdict. "Allowed · sensitive fields redacted" only once
     * redaction is confirmed; until then "Allowed · logged".
     */
    companyVerdict: check(
      "Allowed · logged",
      "AI spotlight demo, company account: confirm whether sensitive fields are redacted. If yes, change the verdict to \"Allowed · sensitive fields redacted\".",
    ),
    policy: "Policy: customer data to personal AI accounts · all users",
  },
};

/* ------------------------------------------------------------------ */
/* 10. Comparison                                                      */
/* ------------------------------------------------------------------ */
export const comparison = {
  eyebrow: "WHY ZAPERON",
  h2: "Connected decisions, not connected tools",
  columns: { fragmented: "The fragmented way", zaperon: "With Zaperon" },
  rows: [
    ok({ fragmented: "Sign-in, device checks and data rules set up in separate systems", zaperon: "Identity and device verification built in" }),
    // VALIDATE: data rules share access-rule conditions.
    check(
      {
        fragmented: "Access rules and data rules managed apart, each with its own context",
        zaperon: "Data rules can use the same user, group and device conditions as access rules",
      },
      "Comparison row 2: data rules can use the same user, group and device conditions as access rules.",
    ),
    ok({ fragmented: "Different tools watch different data channels", zaperon: "One view of activity across the channels Zaperon protects" }),
    ok({ fragmented: "Audit evidence spread across consoles", zaperon: "One record of who did what, from which device" }),
  ],
  disclaimer: "Comparison describes common approaches, not specific vendors.",
  cta: { lead: "See it on your own apps", button: "Book a demo" },
};

/* ------------------------------------------------------------------ */
/* 11. Where teams start                                               */
/* ------------------------------------------------------------------ */
const UC = "https://www.zaperon.com/use-cases/";
export const useCases = {
  eyebrow: "WHERE TEAMS START",
  h2: "Start where the risk is highest",
  capsLabel: "Capabilities used",
  cases: [
    { id: "vpn", icon: "route", title: "Replace VPN access.", line: "Give people specific apps instead of the whole network.", href: `${UC}replace-legacy-vpn`, caps: ["Zero trust access", "Passwordless login", "Device checks"] },
    { id: "byod", icon: "laptop", title: "Secure contractors and personal laptops.", line: "Access on your terms, from devices you've verified.", href: `${UC}secure-byod-access`, caps: ["Device checks", "Zero trust access", "Data loss prevention"] },
    { id: "data", icon: "code", title: "Protect source code and designs.", line: "Control where your most valuable files can go.", href: `${UC}prevent-data-leakage`, caps: ["Data loss prevention", "Device checks"] },
    { id: "ai", icon: "chat", title: "Adopt AI without leaking data.", line: "Let teams use AI while sensitive data stays inside.", href: `${UC}monitor-ai-interactions`, caps: ["AI governance", "Data loss prevention"] },
    { id: "ato", icon: "key", title: "Stop account takeover.", line: "Make stolen passwords useless on their own.", href: `${UC}prevent-account-takeover`, caps: ["Passwordless login", "Device checks"] },
    { id: "audit", icon: "clipboard", title: "Show auditors who accessed what.", line: "One record across access and data.", href: `${UC}ensure-regulatory-compliance`, caps: ["Zero trust access", "Data loss prevention"] },
  ],
};

/* ------------------------------------------------------------------ */
/* 12. Proof                                                           */
/* ------------------------------------------------------------------ */
export const customerProof = {
  eyebrow: "CUSTOMER PROOF",
  h2: "Proof from teams running Zaperon",
  caseStudy: {
    label: "Auto components manufacturer",
    number: "1,000",
    unit: "users protected",
    body: "Product designs and source code protected across laptops, email, web and collaboration tools.",
    link: "Read the case study",
    href: LINKS.mfgCaseStudy,
    // HOLD: two outcome metric slots. Outcome metrics pending from the customer.
    metrics: [] as { value: string; label: string }[],
  },
  quotes: [
    ok({
      quote:
        "Even with a basic Microsoft 365 license, we eliminated passwords and applied conditional access using Zaperon Zero Trust platform. Our email access on mobile phones is also now fully secured.",
      attribution: "CISO, Tier-1 auto components manufacturer",
    }),
    // VALIDATE: approval for the shortened KPFS quote.
    check(
      {
        quote:
          "The single console of Zaperon's SSE platform has given us complete visibility and control over access to our IT infrastructure across every user and device.",
        attribution: "Head of IT, KPFS",
      },
      "Proof, KPFS quote: customer approval for the shortened quote (cost sentence removed).",
    ),
  ],
};

/* ------------------------------------------------------------------ */
/* 13. Integrations                                                    */
/* ------------------------------------------------------------------ */
export const integrations = {
  eyebrow: "Integrations",
  h2: "Works with the tools you already run.",
  subhead: "Keep your directory and productivity suite. Zaperon adds passwordless login, device checks and data protection on top.",
  tiles: [
    { name: "Microsoft 365", kind: "Productivity & email", mono: "M365" },
    { name: "Google Workspace", kind: "Productivity & email", mono: "GW" },
    { name: "Active Directory", kind: "Directory sync", mono: "AD" },
    { name: "LDAP", kind: "Directory sync", mono: "LDAP" },
    { name: "SaaS applications", kind: "SSO & access", icon: "app" },
    { name: "On-premise applications", kind: "Private access", icon: "server" },
  ] as { name: string; kind: string; mono?: string; icon?: string }[],
};

/* ------------------------------------------------------------------ */
/* 14. Deployment                                                      */
/* ------------------------------------------------------------------ */
export const deployment = {
  h2: "Deploy in phases, with our team beside you",
  steps: [
    ok({ title: "Connect your directory.", body: "Sync users and groups from Active Directory, LDAP or Google Workspace." }),
    ok({ title: "Enrol devices.", body: "Company devices can be enrolled in advance. Personal devices register through the Zaperon app." }),
    ok({ title: "Start with your top priority.", body: "Replace VPN access, secure contractors, or protect a sensitive repository first." }),
    // VALIDATE: staged data rules (monitor, warn, block).
    check(
      { title: "Bring in data rules gradually.", body: "Monitor first, then warn, then block, so work isn't disrupted." },
      "Deployment step 4: data rules support monitor, then warn, then block.",
    ),
  ],
  // VALIDATE: dedicated deployment team.
  guided: check("Every deployment is guided by a dedicated Zaperon team.", "Deployment: every deployment is guided by a dedicated Zaperon team."),
  // HOLD: "Get Your Assessment" / readiness assessment offer. Offer not confirmed.
};

/* ------------------------------------------------------------------ */
/* 15. FAQ                                                             */
/* ------------------------------------------------------------------ */
export type FaqItem = { q: string; a: string };
export const faq = {
  eyebrow: "FAQ",
  h2: "Frequently asked questions",
  items: [
    // VALIDATE: Copilot.
    check<FaqItem>(
      {
        q: "What is Zaperon?",
        a: "Zaperon is an identity-centric security platform for zero trust access and data loss prevention. It verifies the person and their device, then uses that same trust to control which apps they can reach and what data can leave, including into AI tools like ChatGPT and Copilot.",
      },
      "FAQ, What is Zaperon: Copilot support.",
    ),
    // VALIDATE: SSE differentiation.
    check<FaqItem>(
      {
        q: "How is Zaperon different from traditional SSE?",
        a: "Many SSE tools enforce policy on network and web traffic and take identity and device context from separate products. Zaperon verifies the person and the device itself, and its data rules can use the same user and device conditions as its access rules.",
      },
      "FAQ, different from traditional SSE: data rules use the same user and device conditions as access rules.",
    ),
    // HOLD: until Entra ID and Okta coexistence is confirmed.
    { status: "hold", value: { q: "Do we need to replace our identity provider?", a: "" }, validate: "Entra ID and Okta coexistence not confirmed." } as Claim<FaqItem>,
    ok<FaqItem>({
      q: "Does it work on personal laptops?",
      a: "Yes. A personal device is registered, then checked against your standards before it can access anything. Devices that aren't registered are blocked.",
    }),
    // VALIDATE: what the app collects on personal devices.
    check<FaqItem>(
      {
        q: "What does the app see on a personal device?",
        a: "Device health signals such as encryption, OS version and antivirus status, plus the data actions your rules cover.",
      },
      "FAQ, personal device visibility: exactly what the Zaperon app collects on a personal device.",
    ),
    ok<FaqItem>({
      q: "Can Zaperon replace our VPN?",
      a: "Yes. People reach specific apps, servers and network devices instead of the whole network, and you can move one group of apps at a time.",
    }),
    ok<FaqItem>({
      q: "How does it handle AI tools?",
      a: "It shows which AI tools people use. On supported tools, it can limit use to company accounts and inspect prompts and file uploads for sensitive data. You choose whether to allow, warn or block.",
    }),
    // VALIDATE: data at rest in SaaS.
    check<FaqItem>(
      {
        q: "What about data already stored in our SaaS apps?",
        a: "Zaperon controls data as people move it: uploads, downloads, email, devices and AI prompts.",
      },
      "FAQ, data stored in SaaS apps: scope of data-in-motion controls.",
    ),
    // HOLD: SIEM export not confirmed.
    { status: "hold", value: { q: "Can we send events to our SIEM?", a: "" }, validate: "SIEM export not confirmed." } as Claim<FaqItem>,
    // VALIDATE: SOC 2 Type I or Type II, report date.
    check<FaqItem>({ q: "Is Zaperon SOC 2 compliant?", a: "Yes." }, "FAQ, SOC 2: Type I or Type II, and the report date."),
    // HOLD: data hosting location not confirmed.
    { status: "hold", value: { q: "Where is our data hosted?", a: "" }, validate: "Data hosting regions not confirmed." } as Claim<FaqItem>,
  ],
};

/* ------------------------------------------------------------------ */
/* 16. Final CTA                                                       */
/* ------------------------------------------------------------------ */
export const finalCta = {
  h2: "See who gets in and what gets out, in your own environment",
  line: "In 30 minutes, we'll show how Zaperon handles a trusted login, an unknown laptop and an AI prompt, using your apps as the example.",
  primary: "Book a demo",
  secondary: { label: "Security and compliance details", href: "/security/" },
  trustLine: proofBar.trustLine,
};

/* ------------------------------------------------------------------ */
/* 17. Footer                                                          */
/* ------------------------------------------------------------------ */
export const footer = {
  tagline: "Identity-centric zero trust access and data protection. Control who gets in, and what data gets out.",
  // VALIDATE: SOC 2 report type (Type I or Type II) and period.
  soc2: check("SOC 2", "Footer SOC 2 badge: confirm Type I vs Type II and the audit period."),
};

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */
export const seo = {
  title: "Zaperon | Zero Trust Access and Data Loss Prevention (SSE)",
  description:
    "Zaperon verifies every user and device, then controls what data can leave, including into AI tools. Zero trust access and DLP in one platform.",
  /** SoftwareApplication description = the "What is Zaperon?" answer. */
  appDescription: faq.items[0].value.a,
};

/* ------------------------------------------------------------------ */
/* Removed from the homepage in v4 (kept for reference)               */
/* ------------------------------------------------------------------ */
// HOLD: "~40% lower IT security costs" card. Removed from the homepage by the v4 brief.
// HOLD: SOC 2 in the hero trust list. Moved to the footer (and FAQ).
// HOLD: "Example policy" banner (contractor / CRM). Replaced by the Difference section.
// HOLD: Platform capability tabs incl. "Extension" badge on AI and "one policy engine". Replaced by the two pillars.
// HOLD: AI copy about controlling custom agents' access. The brief removes any claim that Zaperon controls AI agents.

/* ------------------------------------------------------------------ */
/* Review register                                                     */
/* ------------------------------------------------------------------ */
/** Every needs-validation claim above, for the ?review=1 panel. */
export const reviewRegister: string[] = [
  hero.videoEmbedUrl,
  ...simulator.scenarios,
  proofBar.trustLine,
  ...difference.points,
  difference.panel,
  ...demoStrip.cards,
  ...pillarData.tabs,
  ...aiSpotlight.points,
  aiSpotlight.demo.companyVerdict,
  ...comparison.rows,
  ...customerProof.quotes,
  ...deployment.steps,
  deployment.guided,
  ...faq.items,
  footer.soc2,
]
  .filter((c) => c.status === "needs-validation" && c.validate)
  .map((c) => c.validate!);
