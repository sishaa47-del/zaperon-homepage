import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { Flag } from "./Flag";
import { useSite } from "../context";
import { sitePath } from "../paths";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { deployment as D, faq, finalCta as F, integrations as I, shows } from "../content/homepage";

/* ---------- 13. Integrations ---------- */
export function Integrations() {
  return (
    <section className="section integ" id="integrations" aria-labelledby="integ-title">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="eyebrow">{I.eyebrow}</p>
          <h2 id="integ-title">{I.h2}</h2>
          <p>{I.subhead}</p>
        </Reveal>
        <div className="integ__hub">
          <ul className="integ__grid">
            {I.tiles.map((it, i) => (
              <Reveal as="li" key={it.name} delay={i * 50} className="integ__tile">
                <span className="integ__mono" aria-hidden="true">
                  {it.icon ? <Icon name={it.icon as IconName} size={20} /> : it.mono}
                </span>
                <span>
                  <strong>{it.name}</strong>
                  <small>{it.kind}</small>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 14. Deployment ---------- */
export function Deployment() {
  const steps = D.steps.filter(shows);
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { threshold: 0.4, once: true });
  const reduced = usePrefersReducedMotion();
  const [raw, setRaw] = useState(0);
  // Reduced motion: progress line is full straight away.
  const filled = reduced ? steps.length : raw;

  useEffect(() => {
    if (!inView || reduced || raw >= steps.length) return;
    const t = window.setTimeout(() => setRaw((n) => n + 1), raw === 0 ? 200 : 450);
    return () => window.clearTimeout(t);
  }, [inView, reduced, raw, steps.length]);

  return (
    <section className="final deploy" id="deployment" aria-labelledby="deploy-title">
      <div className="container">
        <Reveal className="final__card on-dark deploy__card">
          <h2 id="deploy-title">{D.h2}</h2>
          <ol
            ref={ref}
            className="deploy__steps"
            style={{ "--deploy-fill": steps.length > 1 ? Math.max(filled - 1, 0) / (steps.length - 1) : 0 } as CSSProperties}
          >
            {steps.map((s, i) => (
              <li key={s.value.title} className={i < filled ? "is-on" : ""}>
                <span className="final__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <strong>
                    {s.value.title}
                    <Flag claim={s} />
                  </strong>
                  {s.value.body}
                </span>
              </li>
            ))}
          </ol>
          {shows(D.guided) && (
            <p className="deploy__guided">
              <Icon name="users" size={18} /> {D.guided.value}
              <Flag claim={D.guided} />
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 15. FAQ ---------- */
export function FAQ() {
  const items = faq.items.filter(shows);
  const [open, setOpen] = useState<number | null>(0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.value.q,
      acceptedAnswer: { "@type": "Answer", text: it.value.a },
    })),
  };
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__inner">
        <Reveal className="section-head">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 id="faq-title">{faq.h2}</h2>
        </Reveal>
        <div className="faq__list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.value.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    data-interaction={`faq-toggle-${i + 1}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {it.value.q}
                    <Icon name="chevronDown" size={20} />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" hidden={!isOpen}>
                  <p>
                    {it.value.a}
                    <Flag claim={it} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

/* ---------- 16. Final CTA ---------- */
export function FinalCTA() {
  const { openForm } = useSite();
  return (
    <section className="final-band on-dark" id="get-started" aria-labelledby="final-title">
      <div className="container final-band__inner">
        <Reveal>
          <h2 id="final-title">{F.h2}</h2>
          <p className="final-band__line">{F.line}</p>
          <div className="final__ctas">
            <button type="button" className="btn btn--accent btn--lg" data-cta="final-primary" onClick={() => openForm("demo")}>
              {F.primary} <Icon name="arrowRight" size={18} />
            </button>
            <a className="final-band__link" href={sitePath(F.secondary.href)} data-cta="final-security">
              {F.secondary.label} <Icon name="arrowRight" size={16} />
            </a>
          </div>
          {shows(F.trustLine) && (
            <p className="final-band__trust">
              {F.trustLine.value}
              <Flag claim={F.trustLine} />
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
