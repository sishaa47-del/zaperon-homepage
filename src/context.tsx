import { createContext, useContext } from "react";

export type Intent = "demo" | "sales";

export type SiteContextValue = {
  openForm: (intent: Intent) => void;
};

export const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteContext.Provider>");
  return ctx;
}

export const LINKS = {
  contact: "https://www.zaperon.com/contact",
  platform: "https://www.zaperon.com/platform",
  solutions: "https://www.zaperon.com/solutions",
  blog: "https://www.zaperon.com/blog",
  resources: "https://www.zaperon.com/resources",
  docs: "https://docs.zaperon.com/",
  partners: "https://www.zaperon.com/partners",
  aiDatasheet: "https://www.zaperon.com/resources/zaperon-ai-governance",
  mfgCaseStudy: "https://www.zaperon.com/resources/why-a-1000-crore-manufacturing-firm-chose-zaperon-to-secure-its-data",
  complianceVideo: "https://www.zaperon.com/resources/simplify-cybersecurity-compliance-with-zaperon",
  seedNews:
    "https://www.zaperon.com/blog/zaperon-raises-750k-in-seed-funding-to-advance-its-unified-cybersecurity-platform-for-the-agentic-ai-era",
  privacy: "https://www.zaperon.com/privacy-policy",
  terms: "https://www.zaperon.com/terms-conditions",
  linkedin: "https://www.linkedin.com/company/securewithzaperon/",
  youtube: "https://www.youtube.com/@zaperon",
  email: "sales@zaperon.com",
  useCases: "https://www.zaperon.com/use-cases/",
  // TODO(validate): no public admin-console URL found; confirm the Login destination.
  login: "https://docs.zaperon.com/",
  logo: "https://cdn.prod.website-files.com/6ad59f6192ec57f75a664d87/6aedf80541d2ce0b814b1beb_zaperon-logo.svg",
} as const;
