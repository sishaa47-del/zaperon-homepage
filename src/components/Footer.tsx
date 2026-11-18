import { Icon } from "./Icon";
import { LINKS } from "../context";
import { homeHref } from "../paths";
import { footer, solutions } from "../content/homepage";

type L = { label: string; href: string };
const COLS: { title: string; links: L[] }[] = [
  { title: "Platform", links: footer.platform },
  { title: "Solutions", links: solutions.map((c) => ({ label: c.label, href: c.href })) },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: LINKS.blog },
      { label: "Resources library", href: LINKS.resources },
      { label: "Documentation", href: LINKS.docs },
      { label: "AI governance datasheet", href: LINKS.aiDatasheet },
      { label: "Manufacturing case study", href: LINKS.mfgCaseStudy },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Partners", href: LINKS.partners },
      { label: "Contact", href: LINKS.contact },
      { label: "Seed funding news", href: LINKS.seedNews },
    ],
  },
];

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src={LINKS.logo} alt="Zaperon" width="132" height="28" loading="lazy" />
            <p>{footer.tagline}</p>
            <div className="footer__social">
              <a href={LINKS.linkedin} target="_blank" rel="noopener" aria-label="Zaperon on LinkedIn">
                <Icon name="linkedin" size={20} />
              </a>
              <a href={LINKS.youtube} target="_blank" rel="noopener" aria-label="Zaperon on YouTube">
                <Icon name="youtube" size={20} />
              </a>
            </div>
          </div>
          <nav className="footer__cols" aria-label="Footer">
            {COLS.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={homeHref(l.href)} {...ext(l.href)} data-interaction={`footer-${c.title.toLowerCase()}-link`}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__contact">
          <address>
            <strong>United States</strong>
            131 Continental Dr, Suite 305, Newark, Delaware 19713, USA
            <a href="tel:+12026005234">+1 202 600 5234</a>
          </address>
          <address>
            <strong>India</strong>
            N-222, Greater Kailash 1, Delhi 110048, India
            <a href="tel:+918800170387">+91 88001 70387</a>
          </address>
          <address>
            <strong>Sales</strong>
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          </address>
        </div>

        <div className="footer__legal">
          <ul className="footer__bottom">
            <li className="footer__soc">
              <Icon name="clipboard" size={16} /> {footer.soc2}
            </li>
            <li>
              <a href={footer.compliance.href} target="_blank" rel="noopener" data-interaction="footer-compliance">
                {footer.compliance.label}
              </a>
            </li>
            <li>
              <a href={footer.privacy.href} target="_blank" rel="noopener" data-interaction="footer-privacy">
                {footer.privacy.label}
              </a>
            </li>
            {footer.entities.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
