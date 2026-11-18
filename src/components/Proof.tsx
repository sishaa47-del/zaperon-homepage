import { Flag } from "./Flag";
import { proofBar, shows } from "../content/homepage";

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="logos__row" aria-hidden={ariaHidden || undefined}>
      {proofBar.logos.map((l) => (
        <li key={l.name}>
          <img src={l.src} alt={ariaHidden ? "" : l.name} loading="lazy" decoding="async" height="40" width="120" />
        </li>
      ))}
    </ul>
  );
}

/** Section 3: logo proof bar. Testimonials now live in the Proof section further down. */
export function Proof() {
  return (
    <section className="proof section--tight" aria-labelledby="proof-title">
      <div className="container">
        <h2 id="proof-title" className="proof__label">
          {proofBar.label}
        </h2>
      </div>
      <div className="logos" role="region" aria-label="Customer logos">
        <div className="logos__track">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
      {shows(proofBar.trustLine) && (
        <div className="container">
          <p className="proof__trust">
            {proofBar.trustLine.value}
            <Flag claim={proofBar.trustLine} />
          </p>
        </div>
      )}
    </section>
  );
}
