import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Flag } from "./Flag";
import { customerProof as P, shows } from "../content/homepage";

/** Section 12: one case study card plus two stacked quote cards. */
export function CustomerProof() {
  const cs = P.caseStudy;
  return (
    <section className="section cproof" id="customers" aria-labelledby="cproof-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{P.eyebrow}</p>
          <h2 id="cproof-title">{P.h2}</h2>
        </Reveal>
        <div className="cproof__grid">
          <Reveal as="article" className="cproof__case on-dark">
            <span className="cproof__label">
              <Icon name="factory" size={18} /> {cs.label}
            </span>
            <p className="cproof__metric">
              <strong>{cs.number}</strong>
              <span>{cs.unit}</span>
            </p>
            <p className="cproof__body">{cs.body}</p>
            {/* HOLD: two outcome metric slots, rendered only once metrics are approved. */}
            {cs.metrics.length > 0 && (
              <ul className="cproof__metrics">
                {cs.metrics.map((m) => (
                  <li key={m.label}>
                    <strong>{m.value}</strong>
                    {m.label}
                  </li>
                ))}
              </ul>
            )}
            <a className="cproof__link" href={cs.href} target="_blank" rel="noopener" data-interaction="proof-case-study">
              {cs.link} <Icon name="arrowRight" size={16} />
            </a>
          </Reveal>
          <div className="cproof__quotes">
            {P.quotes.filter(shows).map((q, i) => (
              <Reveal as="figure" key={q.value.attribution} delay={(i + 1) * 90} className="quote">
                <blockquote>
                  <p>
                    “{q.value.quote}”
                    <Flag claim={q} />
                  </p>
                </blockquote>
                <figcaption>{q.value.attribution}</figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
