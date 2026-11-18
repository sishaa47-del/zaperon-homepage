/**
 * Zaperon homepage copy (v7). Single source of truth for all visible homepage text.
 *
 * Copy is final: do not paraphrase, shorten, add claims or add numbers.
 * Rules: US English. No em dashes, en dashes, "--" or "~" in visible text, alt text,
 * meta or JSON-LD. Never name competitors. No pricing or cost-saving claims.
 * Every statistic shows its source and links to the original report.
 * Mockups use fictional data and stay labelled "Illustrative UI".
 */

import { LINKS } from "../context";

/* ------------------------------------------------------------------ */
/* 0. Announcement bar                                                 */
/* ------------------------------------------------------------------ */
export const announcement = {
  lead: "News:",
  text: "Zaperon raises $750K in seed funding.",
  linkText: "Read more →",
  href: LINKS.seedNews,
};

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */
export const hero = {
  eyebrow: "IDENTITY-CENTRIC ACCESS, DATA & AI PROTECTION",
  h1Lead: "Zero trust that controls",
  h1Accent: "who gets in, and what data gets out.",
  subhead:
    "Zaperon verifies the person and their device, then applies that trust to every step of work: the apps they open, the sites they visit, the files they share, and the AI tools and agents that act on their behalf.",
  audience: "For security and IT leaders protecting people, devices, applications, data and AI.",
  primaryCta: { label: "Book a demo", href: LINKS.contact },
  videoCta: "Watch the 2-minute overview",
  /** The overview video used on zaperon.com (YouTube ZKsMy-srPf0). */
  videoEmbedUrl: "https://www.youtube-nocookie.com/embed/ZKsMy-srPf0" as string | null,
  /** No-JavaScript fallback for the video button. */
  videoWatchUrl: "https://www.youtube.com/watch?v=ZKsMy-srPf0",
};

export type ChipState = "pass" | "fail" | "unknown" | "skip";
export type Outcome = "allowed" | "blocked";
export type Tone = "ok" | "deny";

export type SimulatorScenario = {
  id: "company" | "failing" | "unknown";
  tab: string;
  icon: "laptop" | "alert";
  chips: { label: string; state: ChipState; text?: string }[];
  decision: { label: string; tone: Tone };
  reason: string;
  actions: Record<"open" | "usb" | "paste", Outcome>;
  /** "See details": checks list and policy box. */
  checks: { label: string; state: ChipState }[];
  policy: string[];
};

export const simulator = {
  label: "Illustrative UI",
  resource: "Access request · Code repository",
  person: { initials: "AM", name: "Alex Morgan", role: "Engineer" },
  actionLabels: {
    open: "Open repository",
    usb: "Copy source file to USB",
    paste: "Paste code into personal AI account",
  },
  outcomeLabels: { allowed: "Allowed", blocked: "Blocked" } satisfies Record<Outcome, string>,
  detailsLabels: { show: "See details", hide: "Hide details", checks: "Checks", policy: "Policy evaluated" },
  /** Index of the default tab: desktop and mobile. */
  defaultTab: { desktop: 0, mobile: 1 },
  scenarios: [
    {
      id: "company",
      tab: "Company laptop",
      icon: "laptop",
      chips: [
        { label: "Person", state: "pass" },
        { label: "Device", state: "pass" },
        { label: "Posture", state: "pass" },
      ],
      decision: { label: "Allowed", tone: "ok" },
      reason: "Registered company laptop. All checks passed.",
      actions: { open: "allowed", usb: "blocked", paste: "blocked" },
      checks: [
        { label: "Passwordless sign-in approved", state: "pass" },
        { label: "Authorized device", state: "pass" },
        { label: "OS", state: "pass" },
        { label: "Antivirus", state: "pass" },
        { label: "Disk encryption", state: "pass" },
        { label: "Device lock", state: "pass" },
      ],
      policy: ["user = Alex Morgan", "device = company laptop, authorized", "resource = code repository", "data = source code"],
    },
    {
      id: "failing",
      tab: "Failing checks",
      icon: "laptop",
      chips: [
        { label: "Person", state: "pass" },
        { label: "Device", state: "pass" },
        { label: "Posture", state: "fail" },
      ],
      decision: { label: "Blocked until fixed", tone: "deny" },
      reason: "Disk encryption is off. Access resumes once it's back on.",
      actions: { open: "blocked", usb: "blocked", paste: "blocked" },
      checks: [
        { label: "Passwordless sign-in approved", state: "pass" },
        { label: "Authorized device", state: "pass" },
        { label: "OS", state: "pass" },
        { label: "Antivirus", state: "pass" },
        { label: "Disk encryption", state: "fail" },
        { label: "Device lock", state: "pass" },
      ],
      policy: ["user = Alex Morgan", "device = company laptop, authorized", "posture = disk encryption off", "resource = code repository"],
    },
    {
      id: "unknown",
      tab: "Unknown device",
      icon: "alert",
      chips: [
        { label: "Person", state: "unknown" },
        { label: "Device", state: "fail" },
        { label: "Posture", state: "skip", text: "Posture not checked" },
      ],
      decision: { label: "Blocked", tone: "deny" },
      reason: "Device not registered. A password alone isn't enough.",
      actions: { open: "blocked", usb: "blocked", paste: "blocked" },
      checks: [
        { label: "Passwordless sign-in approved", state: "unknown" },
        { label: "Authorized device", state: "fail" },
        { label: "OS", state: "skip" },
        { label: "Antivirus", state: "skip" },
        { label: "Disk encryption", state: "skip" },
        { label: "Device lock", state: "skip" },
      ],
      policy: ["user = unverified", "device = not registered", "resource = code repository", "data = source code"],
    },
  ] as SimulatorScenario[],
};

/* ------------------------------------------------------------------ */
/* 2. Proof bar                                                        */
/* ------------------------------------------------------------------ */
const CDN = "https://cdn.prod.website-files.com/6ad59f6192ec57f75a664d87/";

export const trustLine = "Trusted in regulated industries · Phased rollout without disrupting users";

export const proofBar = {
  label: "Trusted by Global Enterprises",
  trustLine,
  /** Customer logos as published on zaperon.com. */
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
/* 3. Why now                                                          */
/* ------------------------------------------------------------------ */
const DBIR = {
  name: "Verizon 2026 Data Breach Investigations Report",
  href: "https://www.verizon.com/business/resources/T26/reports/2026-dbir-data-breach-investigations-report.pdf",
};
const IBM = { name: "IBM Cost of a Data Breach Report 2026", href: "https://www.ibm.com/reports/data-breach" };

export const whyNow = {
  eyebrow: "WHY NOW",
  h2: "The risks you know are still here. AI just added new ones.",
  intro:
    "Work now happens everywhere: on home networks, personal devices, SaaS apps and AI tools. Years of adding a new tool for every new problem left disconnected silos, and the gaps between them are where attackers and unmanaged AI agents get through.",
  columns: [
    {
      id: "still",
      title: "Still here",
      items: [
        "Phished and stolen passwords",
        "Personal and unmanaged devices",
        "VPN-based access that can expose more of the network than users need",
        "Contractors and vendors with more access than they need",
        "Files leaving by email, USB and web uploads",
      ],
    },
    {
      id: "arriving",
      title: "Arriving now",
      items: [
        "Work data pasted into personal AI accounts",
        "AI tools and browser extensions nobody approved",
        "Unmanaged AI agents working around your controls",
        "Secrets and source code inside prompts",
        "Prompt injection that turns AI against its own users",
      ],
    },
  ],
  stats: [
    {
      value: "45%",
      text: "of employees now regularly use AI on their work devices, up from 15% a year earlier.",
      source: DBIR,
    },
    { value: "67%", text: "of users who access AI tools on company devices do so with non-corporate accounts.", source: DBIR },
    { value: "92%", text: "of organizations hit by an AI-related breach lacked proper AI access controls.", source: IBM },
  ],
  sourceLabel: "Source:",
  closing: "AI risk is an access and data problem. That's what Zaperon controls.",
};

/* ------------------------------------------------------------------ */
/* 4. AI & agent security                                              */
/* ------------------------------------------------------------------ */
export const aiSecurity = {
  eyebrow: "AI & AGENT SECURITY",
  h2: "Know who's using AI. Control what data it gets.",
  intro:
    "When an agent acts for a person, it doesn't always act with that person's permissions. The question is no longer only who has access. It's which person or agent is acting, under whose authority, and what it's allowed to touch. Zaperon makes the security decision before data is exposed or an action runs.",
  columns: { problem: "The problem", does: "What Zaperon does", outcome: "The outcome" },
  rows: [
    {
      problem: "You can't govern AI you can't see",
      does: "Discovers AI apps, copilots, browser extensions, agents, MCP servers and keys, and who uses them",
      outcome: "A live inventory of AI across the company",
    },
    {
      problem: "Work goes into personal AI accounts",
      does: "Allows corporate AI workspaces and blocks personal accounts, with rules based on the person, their role and their device",
      outcome: "AI use stays in accounts you control",
    },
    {
      problem: "Customer data, secrets and source code end up in prompts",
      does: "Inspects prompts, uploads and clipboard activity, detects secrets and prompt injection, then redacts or blocks sensitive data",
      outcome: "Sensitive data is stopped before it reaches a model",
    },
    {
      problem: "Agents act with whatever access they inherit",
      does: "Discovers agents and lets only admin-approved ones run. The Agentic AI Gateway gives each agent its own identity, narrows its permissions at every hop, and asks a person before high-risk actions",
      outcome: "Each agent touches only what its task needs",
    },
  ],
  decisionLead: "Every request ends in a clear decision:",
  decisions: ["Allow", "Redact", "Block", "Ask a human", "Audit"],
  button: { label: "See AI security", href: "https://www.zaperon.com/platform#pillar-aispm" },
  gatewayLink: {
    text: "See how the Agentic AI Gateway works",
    href: "https://www.zaperon.com/blog/securing-the-agentic-enterprise-why-ai-needs-identity-authorization-and-runtime-controls",
  },
  demo: {
    label: "Illustrative UI",
    tabs: { prompt: "Employee prompt", agent: "Agent action" },
    prompt: {
      toggle: { company: "Company workspace", personal: "Personal account" },
      app: "AI assistant",
      gateway: "Zaperon AI gateway",
      text: "Summarize churn risk for these accounts: Jordan Lee, jordan.lee@acme-example.com, account 4471-2290…",
      chips: ["Customer name", "Email address", "Account number"],
      result: "Prompt blocked before it reached the external model.",
    },
    agent: {
      app: "Agentic AI Gateway",
      request: "Support agent requests: export full customer table to an external tool.",
      steps: [
        "Agent identity verified",
        "Permission narrowed to this ticket's customer",
        "Export flagged as high risk",
        "Ask a human",
      ],
      result: "Waiting for approval.",
    },
  },
};

/* ------------------------------------------------------------------ */
/* 5. One platform (workday strip)                                     */
/* ------------------------------------------------------------------ */
export const workday = {
  id: "one-platform",
  h2: "One platform, from the first sign-in to the last AI action.",
  intro:
    "Most stacks check each step of work with a different tool, and the risk sits in the gaps. Zaperon applies identity and device context across access, data and AI security decisions.",
  toggle: { without: "Without Zaperon", with: "With Zaperon" },
  steps: [
    { step: "Sign in", without: "Password only", with: "Passwordless, from an authorized device" },
    { step: "Device", without: "Unknown laptop", with: "Checked continuously; access ends when risk changes" },
    { step: "Open apps", without: "Whole network through a VPN", with: "Only the apps their role needs" },
    { step: "Browse the web", without: "A separate web filter", with: "Web filtering and cloud app discovery" },
    { step: "Move files", without: "A separate DLP tool", with: "Email, uploads, USB and screen capture controlled" },
    { step: "Use AI and agents", without: "Unseen", with: "Prompts inspected, agents governed" },
  ],
  lineLead: "At every step Zaperon asks:",
  questions: ["Who is it?", "Which device?", "What data?"],
  lineTail: "Then it allows, warns or blocks.",
};

/* ------------------------------------------------------------------ */
/* 6. Four modules                                                     */
/* ------------------------------------------------------------------ */
export const modules = {
  id: "platform",
  eyebrow: "PLATFORM",
  h2: "Four modules. One platform.",
  includesLabel: "Includes",
  learnMore: "Learn more",
  items: [
    {
      id: "zero-trust-access",
      icon: "fingerprint",
      group: "Who gets in",
      name: "Zero Trust Access",
      promise:
        "No passwords to steal, no codes to type, no VPN. People reach only the apps and servers their role needs, from devices that pass your checks. Access ends as soon as risk changes.",
      includes: [
        "SSO",
        "MFA",
        "Passwordless sign-in",
        "ZTNA",
        "Device-bound certificates",
        "Continuous posture checks (OS, antivirus, disk encryption, device password)",
        "Contractor and BYOD access",
        "Server access (RDP, SSH)",
      ],
      href: "https://www.zaperon.com/platform#pillar-zero-trust-access",
    },
    {
      id: "data-security",
      icon: "file",
      group: "What data gets out",
      name: "Data Security",
      promise:
        "Keep drawings, designs, code and customer data inside. Control what leaves through email, web uploads, USB, Bluetooth, AirDrop and screen capture.",
      includes: ["Endpoint DLP", "Email DLP", "Upload and download monitoring", "Removable media and screen capture controls"],
      href: "https://www.zaperon.com/platform#pillar-data-security",
    },
    {
      id: "web-security",
      icon: "globe",
      group: "Where users go",
      name: "Web Security",
      promise:
        "Control the web and Shadow IT. See the cloud apps your teams use and block malicious or unsanctioned ones in real time.",
      includes: ["Secure web gateway", "CASB", "Cloud app discovery", "Web traffic monitoring"],
      href: "https://www.zaperon.com/platform#pillar-web-security",
    },
    {
      id: "ai-governance",
      icon: "chat",
      group: "How AI is accessed and governed",
      name: "AI Governance",
      promise:
        "Use AI and agents without leaking data. Discover AI use, control who can use which AI tools, and inspect what goes into them.",
      includes: [
        "Shadow AI discovery",
        "AI gateway",
        "AI access control",
        "Prompt, upload and clipboard inspection",
        "Prompt injection and secrets detection",
        "Agent governance",
      ],
      href: "https://www.zaperon.com/platform#pillar-aispm",
    },
  ],
  footnote: "All four run natively on one platform, with one console and consistent policies across users, devices and channels.",
};

/* ------------------------------------------------------------------ */
/* 7. What changes for your team                                       */
/* ------------------------------------------------------------------ */
export type OutcomeCard = {
  id: string;
  icon: string;
  title: string;
  line: string;
  link?: { label: string; href: string };
  quote?: { text: string; attribution: string };
  /** Future metric slot: rendered only once a number is approved. */
  metric?: { value: string; label: string } | null;
};

export const outcomes = {
  id: "outcomes",
  h2: "What changes for your team",
  cards: [
    {
      id: "vpn",
      icon: "route",
      title: "Replace legacy VPN access.",
      line: "People reach only the apps their role needs, from any location, without exposing your network to VPN vulnerabilities.",
      link: { label: "Replace Legacy VPN →", href: "https://www.zaperon.com/solutions/replace-legacy-vpn" },
      metric: null,
    },
    {
      id: "passwordless",
      icon: "fingerprint",
      title: "Passwordless sign-in.",
      line: "Removes the password attackers phish, and only authorized devices get in.",
      quote: {
        text: "Even with a basic Microsoft 365 license, we eliminated passwords and applied conditional access using Zaperon Zero Trust platform.",
        attribution: "CISO, Tier-1 auto components manufacturer",
      },
      metric: null,
    },
    {
      id: "designs",
      icon: "code",
      title: "Keep sensitive designs and source code protected.",
      line: "Drawings, designs and code stay protected across email, web uploads, endpoints, Teams and Meet.",
      quote: {
        text: "Zaperon helped us move from isolated DLP controls to a more unified data protection model aligned to how our teams actually work.",
        attribution: "CISO, leading auto-ancillary manufacturer, 1,000 users",
      },
      link: { label: "Read the case study →", href: LINKS.mfgCaseStudy },
      metric: null,
    },
    {
      id: "audits",
      icon: "clipboard",
      title: "Audits answered from one record.",
      line: "Blocked actions are recorded with supporting security evidence: who, which device, what and where. One dashboard turns it into security metrics you can report upward, and supports DPDP-related security and audit workflows.",
      quote: {
        text: "The single console of Zaperon's SSE platform has given us complete visibility and control over access to our IT infrastructure across every user and device.",
        attribution: "Head of IT, KPFS",
      },
      metric: null,
    },
  ] as OutcomeCard[],
  cta: { lead: "See it on your own apps", label: "Book a demo", href: LINKS.contact },
};

/* ------------------------------------------------------------------ */
/* 8. Integration and deployment                                       */
/* ------------------------------------------------------------------ */
export type HubNode = { label: string; logo: string };

export const deploy = {
  id: "deployment",
  h2: "Fits the identity and application stack you already run",
  intro:
    "Zaperon integrates with your existing directory and business applications, with no rip-and-replace. A structured four-phase approach takes you from mapping data flows to enterprise-wide enforcement.",
  phases: [
    { title: "Discover.", body: "Map how sensitive data moves across endpoints, email, web and collaboration tools." },
    { title: "Pilot.", body: "Validate access and data policies with a defined group before enforcement." },
    { title: "Roll out.", body: "Extend coverage across users, devices and locations with minimal disruption to work." },
    { title: "Optimize.", body: "Refine controls using audit trails and policy events from one console." },
  ],
  proof:
    "Deployed across 1,000 users and multiple locations for a leading auto-ancillary manufacturer, with Microsoft 365, GitHub and SAP integrated.",
  hub: {
    label: "Integration overview",
    directoryTitle: "Your directory",
    directory: [
      { label: "Active Directory", logo: "ad" },
      { label: "LDAP", logo: "ldap" },
      { label: "Google Workspace", logo: "google" },
    ] satisfies HubNode[],
    center: { name: "Zaperon", sub: "identity · device · data" },
    appsTitle: "Your apps",
    apps: [
      { label: "Microsoft 365", logo: "microsoft" },
      { label: "Google Workspace", logo: "google" },
      { label: "GitHub", logo: "github" },
      { label: "SAP", logo: "sap" },
      { label: "Cloud and on-premises apps", logo: "app" },
      { label: "Servers (RDP, SSH)", logo: "server" },
      { label: "Network devices (RADIUS)", logo: "route" },
      { label: "AI tools and models", logo: "chat" },
    ] satisfies HubNode[],
  },
};

/* ------------------------------------------------------------------ */
/* 9. FAQ                                                              */
/* ------------------------------------------------------------------ */
export type FaqItem = { q: string; a: string };
export const faq = {
  eyebrow: "FAQ",
  h2: "Frequently asked questions",
  items: [
    {
      q: "What is Zaperon?",
      a: "Zaperon is an identity-centric Security Service Edge (SSE) platform for zero trust access, data loss prevention, web security and AI security. It verifies the person and their device, then applies that trust to the apps they open, the sites they visit, the files they share, and the AI tools and agents they use.",
    },
    {
      q: "How is Zaperon different from traditional SSE?",
      a: "Zaperon includes its own identity layer (SSO, MFA and passwordless sign-in) and checks device posture itself. Its access, data and AI rules use that same identity and device context from one console, so you don't stitch together separate identity, DLP and AI security tools.",
    },
    {
      q: "Does it work on personal laptops?",
      a: "Yes. You decide which applications allow personal devices. Each personal laptop or phone runs the Zaperon client and is assigned to its user, and work data stays in a secure container, separate from personal data. Unassigned devices are blocked, even with valid credentials.",
    },
    {
      q: "Can Zaperon replace our VPN?",
      a: "Yes. Built-in ZTNA gives people secure access to the apps, servers and network devices they need from any location, without exposing your network to VPN vulnerabilities.",
    },
    {
      q: "Will this disrupt our users?",
      a: "Rollouts follow four phases: map data flows, pilot policies with one group, roll out, then refine. AI rules can log or warn before they block, so legitimate work keeps moving.",
    },
    {
      q: "How does it handle AI tools like ChatGPT, Gemini and Claude?",
      a: "Zaperon discovers which AI tools people use, including copilots, browser extensions and custom agents. It can allow company workspaces and block personal accounts, inspect prompts, uploads and clipboard activity for sensitive data, and log, warn, redact or block.",
    },
    {
      q: "Can Zaperon secure AI agents?",
      a: "Yes. Zaperon discovers AI agents on endpoints and lets only administrator-approved agents run. Its Agentic AI Gateway extends identity, authorization and runtime controls to agents: a unique identity for each agent, permissions that narrow as work passes between agents, checks on tool calls, and human approval for high-risk actions.",
    },
    {
      q: "Does Zaperon help with compliance?",
      a: "Zaperon's access controls, device checks, data protection and audit trails support DPDP-related security and audit workflows, and its logs help with investigations and compliance reporting. Zaperon is SOC 2 compliant; details are on our security and compliance page.",
    },
  ] satisfies FaqItem[],
};

/** FAQPage structured data, built from the same items the page shows. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
};

/* ------------------------------------------------------------------ */
/* 10. Final CTA                                                       */
/* ------------------------------------------------------------------ */
export const finalCta = {
  h2: "Put Zaperon to the test on your own apps and devices",
  body: "Bring your hardest scenario: a contractor's laptop, a sensitive repository, an AI agent your team wants to deploy. We'll show you how Zaperon handles it.",
  primary: { label: "Book a demo", href: LINKS.contact },
  secondary: { label: "Security and compliance details", href: LINKS.compliance },
  trustLine,
};

/* ------------------------------------------------------------------ */
/* Solutions (nav and footer links to the use-case pages)             */
/* ------------------------------------------------------------------ */
const UC = "https://www.zaperon.com/solutions/";
export const solutions = [
  { id: "vpn", icon: "route", label: "Replace VPN access", href: `${UC}replace-legacy-vpn` },
  { id: "byod", icon: "laptop", label: "Secure contractors and personal laptops", href: `${UC}secure-byod-access` },
  { id: "data", icon: "code", label: "Protect source code and designs", href: `${UC}prevent-data-leakage` },
  { id: "ai", icon: "chat", label: "Adopt AI without leaking data", href: `${UC}monitor-ai-interactions` },
  { id: "ato", icon: "key", label: "Stop account takeover", href: `${UC}prevent-account-takeover` },
  { id: "audit", icon: "clipboard", label: "Show auditors who accessed what", href: `${UC}ensure-regulatory-compliance` },
];

/* ------------------------------------------------------------------ */
/* 11. Footer                                                          */
/* ------------------------------------------------------------------ */
export const footer = {
  tagline:
    "Identity-centric SSE for access, data protection and AI governance. Control who gets in, and what data gets out.",
  platform: modules.items.map((m) => ({ label: m.name, href: m.href })),
  soc2: "SOC 2",
  compliance: { label: "Security and compliance details", href: LINKS.compliance },
  privacy: { label: "Privacy", href: LINKS.privacy },
  entities: ["Zaperon, Inc. (US)", "Finlock Technologies (India)"],
};

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */
export const seo = {
  title: "Zaperon | Zero Trust Access, DLP and AI Agent Security",
  description:
    "Zaperon verifies every user, device and AI agent, then controls what data leaves. Zero trust access, DLP and AI security in one platform.",
  /** SoftwareApplication description = the "What is Zaperon?" answer. */
  appDescription: faq.items[0].a,
};
