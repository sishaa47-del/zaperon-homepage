import { Icon } from "../components/Icon";
import { Shell } from "../components/Shell";
import { LINKS } from "../context";

/**
 * /india/: the India trust and compliance content that left the homepage in v4.
 * "Built and supported in India" is removed (v4 brief). Compliance wording stays "helps you prepare for".
 */
const POINTS = [
  { title: "DPDP security safeguards", body: "Access, device and data controls that support the reasonable security safeguards the DPDP Rules require." },
  { title: "RBI requirements", body: "MFA and least-privilege access for branch users, field agents and third parties." },
  { title: "CERT-In expectations", body: "Centralized access logs and policy records to support incident reporting and review." },
  { title: "Indian customer proof", body: "BFSI, manufacturing and public-sector customers including MS Fincap, KPFS and Gwalior Smart City." },
];

function IndiaBody() {
  return (
    <>
      <section className="section subpage-hero on-dark" aria-labelledby="india-title">
        <div className="container">
          <p className="eyebrow">Zaperon in India</p>
          <h1 id="india-title">Built for India's regulated businesses.</h1>
          <p className="subpage-hero__lead">
            Show auditors who accessed which data, from which device, under which policy, with security safeguards that help
            you prepare for DPDP, RBI and CERT-In expectations.
          </p>
          <a className="btn btn--accent btn--lg" data-cta="india-demo" href={LINKS.contact}>
            Book a demo <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </section>

      <section className="section" aria-labelledby="india-points">
        <div className="container subpage-grid">
          <div>
            <h2 id="india-points">What Zaperon helps you show</h2>
            <ul className="reg__points subpage-points">
              {POINTS.map((p) => (
                <li key={p.title}>
                  <Icon name="check" size={16} strokeWidth={2.25} />
                  <span>
                    <strong>{p.title}</strong>
                    {p.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="quote">
            <blockquote>
              <p>
                “With Zaperon, we achieved RBI compliance by securing our internal applications and servers using ZTNA and
                MFA for our branch users and field agents.”
              </p>
            </blockquote>
            <figcaption>AVP-IT, MS Fincap</figcaption>
          </figure>
        </div>
        <div className="container">
          <p className="reg__disclaimer">
            Zaperon helps you prepare for these requirements. It does not by itself make you compliant or certified.
          </p>
        </div>
      </section>
    </>
  );
}

export function IndiaPage() {
  return (
    <Shell>
      <IndiaBody />
    </Shell>
  );
}
