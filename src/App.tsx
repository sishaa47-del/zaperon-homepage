import { Shell } from "./components/Shell";
import { Hero } from "./components/Hero";
import { Proof } from "./components/Proof";
import { Problem } from "./components/Problem";
import { HowItWorks } from "./components/HowItWorks";
import { Difference } from "./components/Difference";
import { PillarAccess, PillarData } from "./components/Pillars";
import { AIGovernance } from "./components/AIGovernance";
import { Differentiation } from "./components/Differentiation";
import { UseCases } from "./components/UseCases";
import { CustomerProof } from "./components/CustomerProof";
import { Deployment, FAQ, FinalCTA, Integrations } from "./components/Closing";
import { faq, seo } from "./content/homepage";

/** SoftwareApplication structured data. FAQPage is rendered by <FAQ /> from the visible items. */
const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zaperon",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Windows, macOS, Linux, iOS, Android",
  url: "https://www.zaperon.com/",
  description: seo.appDescription,
};

export default function App() {
  // The "What is Zaperon?" answer is needs-validation; keep the description in step with what renders.
  const ld = faq.items[0].status === "hold" ? { ...appLd, description: seo.description } : appLd;
  return (
    <Shell>
      <Hero />
      <Proof />
      <Problem />
      <HowItWorks />
      <Difference />
      <PillarAccess />
      <PillarData />
      <AIGovernance />
      <Differentiation />
      <UseCases />
      <CustomerProof />
      <Integrations />
      <Deployment />
      <FAQ />
      <FinalCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </Shell>
  );
}
