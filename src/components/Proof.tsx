import { proofBar } from "../content/homepage";

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul className="logos__row" aria-hidden={ariaHidden || undefined}>
      {proofBar.logos.map((l) => (
        <li key={l.name}>
          <img src={l.src} alt={ariaHidden ? "" : l.name} decoding="async" height="40" width="120" />
        </li>
      ))}
    </ul>
  );
}

/** Section 2: logo proof bar. The label is styled text, not a heading. */
export function Proof() {
  return (
    <section className="proof section--tight" aria-label={proofBar.label}>
      <div className="container">
        <p className="proof__label">{proofBar.label}</p>
      </div>
      <div className="logos">
        <div className="logos__track">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
      <div className="container">
        <p className="proof__trust">{proofBar.trustLine}</p>
      </div>
    </section>
  );
}
