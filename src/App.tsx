import { Shell } from "./components/Shell";
import { Hero } from "./components/Hero";
import { Proof } from "./components/Proof";
import { WhyNow } from "./components/WhyNow";
import { AIGovernance } from "./components/AIGovernance";
import { Workday } from "./components/Workday";
import { Platform } from "./components/Pillars";
import { Outcomes } from "./components/Outcomes";
import { Integration } from "./components/Integration";
import { FAQ, FinalCTA } from "./components/Closing";
import { seo } from "./content/homepage";
import "./styles/v7.css";

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

/** v7: announcement and footer (in Shell) plus ten homepage sections. */
export default function App() {
  return (
    <Shell>
      <Hero />
      <Proof />
      <WhyNow />
      <AIGovernance />
      <Workday />
      <Platform />
      <Outcomes />
      <Integration />
      <FAQ />
      <FinalCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
    </Shell>
  );
}
