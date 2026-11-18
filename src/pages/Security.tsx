import { Icon } from "../components/Icon";
import { Shell } from "../components/Shell";
import { LINKS } from "../context";

/**
 * /security/: placeholder for the "Security and compliance details" link in the final CTA.
 * noindex until the content (SOC 2 report type, hosting, data handling) is confirmed. See VALIDATION.md.
 */
export function SecurityPage() {
  return (
    <Shell>
      <section className="section subpage-hero on-dark" aria-labelledby="sec-title">
        <div className="container">
          <p className="eyebrow">Security and compliance</p>
          <h1 id="sec-title">Security and compliance details</h1>
          <p className="subpage-hero__lead">
            This page is being prepared. For security questionnaires and audit reports, contact the Zaperon team.
          </p>
          <a className="btn btn--accent btn--lg" href={`mailto:${LINKS.email}`} data-cta="security-contact">
            Email {LINKS.email} <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </section>
    </Shell>
  );
}
