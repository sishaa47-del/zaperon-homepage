import { useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { useMounted } from "../hooks/useInView";
import { faq, faqJsonLd, finalCta as F } from "../content/homepage";

/* ---------- 9. FAQ ---------- */
export function FAQ() {
  const mounted = useMounted();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__inner">
        <Reveal className="section-head">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title">{faq.h2}</h2>
        </Reveal>
        <div className="faq__list">
          {faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    data-interaction={`faq-toggle-${i + 1}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {it.q}
                    <Icon name="chevronDown" size={20} />
                  </button>
                </h3>
                {/* Every answer is in the static HTML; after hydration only the open one shows. */}
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" hidden={mounted && !isOpen}>
                  <p>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
}

/* ---------- 10. Final CTA ---------- */
export function FinalCTA() {
  return (
    <section className="final-band on-dark" id="get-started" aria-labelledby="final-title">
      <div className="container final-band__inner">
        <Reveal>
          <h2 id="final-title">{F.h2}</h2>
          <p className="final-band__line">{F.body}</p>
          <div className="final__ctas">
            <a className="btn btn--accent btn--lg" href={F.primary.href} data-cta="final-primary">
              {F.primary.label} <Icon name="arrowRight" size={18} />
            </a>
            <a className="final-band__link" href={F.secondary.href} target="_blank" rel="noopener" data-cta="final-compliance">
              {F.secondary.label} <Icon name="arrowRight" size={16} />
            </a>
          </div>
          <p className="final-band__trust">{F.trustLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
