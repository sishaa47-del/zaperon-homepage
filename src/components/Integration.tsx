import { useRef } from "react";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { useDrawOnView } from "../hooks/useInView";
import { deploy as D, type HubNode } from "../content/homepage";

function Node({ n, side }: { n: HubNode; side: "in" | "out" }) {
  return (
    <li className={`hub__node hub__node--${side}`}>
      <span className="hub__logo">
        <Logo name={n.logo} size={20} />
      </span>
      <span>{n.label}</span>
    </li>
  );
}

/** Section 8: four-phase deployment timeline plus the integration hub. Lines draw in once. */
export function Integration() {
  const tlRef = useRef<HTMLOListElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const tlDrawn = useDrawOnView(tlRef);
  const hubDrawn = useDrawOnView(hubRef);
  const h = D.hub;
  return (
    <section className="section ig" id={D.id} aria-labelledby="ig-title">
      <span id="integrations" className="anchor-alias" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-head">
          <h2 id="ig-title">{D.h2}</h2>
          <p>{D.intro}</p>
        </Reveal>

        <div className="ig__grid">
          <div className="ig__deploy">
            <ol ref={tlRef} className={`tl ${tlDrawn ? "is-drawn" : ""}`}>
              {D.phases.map((p, i) => (
                <li key={p.title} style={{ transitionDelay: `${i * 160}ms` }}>
                  <span className="tl__n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>
                    <strong>{p.title}</strong> {p.body}
                  </span>
                </li>
              ))}
            </ol>
            <p className="ig__proof">{D.proof}</p>
          </div>

          <div ref={hubRef} className={`hub ${hubDrawn ? "is-drawn" : ""}`} role="group" aria-label={h.label}>
            <div className="hub__col">
              <p className="hub__title">{h.directoryTitle}</p>
              <ul>
                {h.directory.map((n) => (
                  <Node key={n.label} n={n} side="in" />
                ))}
              </ul>
            </div>
            <div className="hub__center">
              <span className="hub__z" aria-hidden="true">
                Z
              </span>
              <strong>{h.center.name}</strong>
              <small>{h.center.sub}</small>
            </div>
            <div className="hub__col">
              <p className="hub__title">{h.appsTitle}</p>
              <ul>
                {h.apps.map((n) => (
                  <Node key={n.label} n={n} side="out" />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
