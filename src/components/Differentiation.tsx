import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Flag } from "./Flag";
import { useSite } from "../context";
import { comparison as C, shows } from "../content/homepage";

/** Section 10: workflow comparison. Rows reveal one by one; hovering a row highlights both cells. */
export function Differentiation() {
  const { openForm } = useSite();
  return (
    <section className="section diff" id="why-zaperon" aria-labelledby="diff-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{C.eyebrow}</p>
          <h2 id="diff-title">{C.h2}</h2>
        </Reveal>

        <div className="diff__table diff__table--2" role="table" aria-label={C.h2}>
          <div className="diff__head" role="row">
            <span role="columnheader">{C.columns.fragmented}</span>
            <span role="columnheader" className="diff__head-z">
              {C.columns.zaperon}
            </span>
          </div>
          {C.rows.filter(shows).map((r, i) => (
            <Reveal key={r.value.zaperon} delay={i * 120} className="diff__row-wrap">
              <div className="diff__row" role="row" data-interaction={`comparison-row-${i + 1}`}>
                <span className="diff__stack" role="cell">
                  <span className="diff__mobile-label">{C.columns.fragmented}</span>
                  <span className="diff__x" aria-hidden="true">
                    <Icon name="x" size={13} strokeWidth={2.5} />
                  </span>
                  <span>{r.value.fragmented}</span>
                </span>
                <span className="diff__z" role="cell">
                  <span className="diff__mobile-label">{C.columns.zaperon}</span>
                  <span className="diff__check" aria-hidden="true">
                    <Icon name="check" size={14} strokeWidth={2.5} />
                  </span>
                  <span>
                    {r.value.zaperon}
                    <Flag claim={r} />
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="diff__note">{C.disclaimer}</p>

        <Reveal className="diff__cta">
          <p>{C.cta.lead}</p>
          <button type="button" className="btn btn--accent" data-cta="mid-page-demo" onClick={() => openForm("demo")}>
            {C.cta.button} <Icon name="arrowRight" size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
