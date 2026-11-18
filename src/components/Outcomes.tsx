import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { outcomes as O } from "../content/homepage";

/** Section 7: four outcome cards, each with a proof point, then the mid-page CTA. */
export function Outcomes() {
  return (
    <section className="section oc" id={O.id} aria-labelledby="oc-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="oc-title">{O.h2}</h2>
        </Reveal>
        <ul className="oc__grid">
          {O.cards.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 2) * 80} className="oc__card">
              <span className="oc__icon" aria-hidden="true">
                <Icon name={c.icon as IconName} size={20} />
              </span>
              <h3>{c.title}</h3>
              <p className="oc__line">{c.line}</p>
              {/* Metric slot for a future approved number. Empty and hidden until then. */}
              <div className="oc__metric" data-slot="metric" hidden>
                {c.metric && (
                  <>
                    <strong>{c.metric.value}</strong> {c.metric.label}
                  </>
                )}
              </div>
              {(c.quote || c.link) && (
                <div className="oc__proof">
                  {c.quote && (
                    <figure className="oc__quote">
                      <blockquote>
                        <p>“{c.quote.text}”</p>
                      </blockquote>
                      <figcaption>{c.quote.attribution}</figcaption>
                    </figure>
                  )}
                  {c.link && (
                    <a className="oc__link" href={c.link.href} target="_blank" rel="noopener" data-interaction={`outcome-${c.id}-link`}>
                      {c.link.label}
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </ul>
        <div className="oc__cta">
          <p>{O.cta.lead}</p>
          <a className="btn btn--accent" href={O.cta.href} data-cta="mid-page-demo">
            {O.cta.label} <Icon name="arrowRight" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
