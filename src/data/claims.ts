/**
 * Claims register. Every claim that needs Zaperon's confirmation before
 * publication has an id here. <Flag id="..."/> renders a marker beside the
 * claim that is only visible in review mode (append ?review=1 to the URL).
 * Mirrors §7 of the messaging research doc.
 */
export const CLAIMS = {
  soc2: {
    label: "SOC 2 report type",
    note: "Site footer shows a SOC 2 badge. Confirm Type I vs Type II and the audit period before publishing.",
  },
  mdm: {
    label: "No separate MDM required",
    note: "Inferred from help docs (device registration, Device Compliance Report). Confirm with product before stating or implying it.",
  },
  aiInspection: {
    label: "Extent of AI prompt inspection",
    note: "Vendor-claimed (AI Gateway, inline inspection). Confirm which AI tools, which data types, and block vs. redact vs. warn behaviour.",
  },
  compliance: {
    label: "Regulatory wording",
    note: "Use 'helps you prepare for' / 'controls mapped to'. Confirm the DPDP/RBI/CERT-In control mapping exists before saying 'mapped to'.",
  },
  assessment: {
    label: "Assessment offer and timeline",
    note: "New proposal from the messaging rework. Zaperon must agree the offer, scope, who delivers it and any timeline.",
  },
  unifiedPolicy: {
    label: "One policy engine across access, web, data and AI",
    note: "Vendor claim (homepage, platform page, G2 description). Confirm a single policy can span all four enforcement points.",
  },
  kpfs: {
    label: "~40% lower IT security cost",
    note: "Customer-stated by KPFS Head-IT (n=1). Keep 'nearly 40%' wording and attribution; don't generalise.",
  },
  login: {
    label: "Login URL",
    note: "No public admin-console URL found. Confirm the Login destination.",
  },
} as const;

export type ClaimId = keyof typeof CLAIMS;
