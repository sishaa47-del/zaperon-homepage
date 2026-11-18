import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { Flag } from "./Flag";
import { OutcomePill } from "./Pills";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { demoStrip, difference as D, shows } from "../content/homepage";
import "../styles/difference.css";

type Device = "company" | "personal";
const DEVICES: Device[] = ["company", "personal"];

/** "Change one condition" panel: one device toggle drives access rules and data rules together. */
function ConditionPanel() {
  const panel = D.panel.value;
  const [device, setDevice] = useState<Device>("company");
  const [auto, setAuto] = useState(true);
  const [pulse, setPulse] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const reduced = usePrefersReducedMotion();

  const flip = (d: Device) => {
    setDevice(d);
    setPulse((p) => p + 1);
  };

  useEffect(() => {
    if (!auto || reduced || !inView) return;
    const t = window.setTimeout(() => flip(device === "company" ? "personal" : "company"), 4000);
    return () => window.clearTimeout(t);
  }, [auto, reduced, inView, device]);

  const choose = (i: number) => {
    setAuto(false);
    if (DEVICES[i] !== device) flip(DEVICES[i]);
  };

  const card = (c: typeof panel.access, kind: "access" | "data") => (
    <div className={`cond__card cond__card--${kind}`}>
      <h3 className="cond__title">{c.title}</h3>
      <ul key={device}>
        {c.rows.map((r) => (
          <li key={r.label}>
            <span>{r.label}</span>
            <OutcomePill outcome={r[device]} label={D.pillLabels[r[device]]} />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="cond" ref={ref}>
      <div className="cond__top">
        <div className="cond__toggle" role="radiogroup" aria-label="Device condition">
          {DEVICES.map((d, i) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={device === d}
              tabIndex={device === d ? 0 : -1}
              data-interaction={`difference-toggle-${d}`}
              onClick={() => choose(i)}
              onKeyDown={(e) => onTabKeyDown(e, i, DEVICES.length, choose)}
            >
              <Icon name="laptop" size={15} />
              {panel.toggle[d]}
            </button>
          ))}
        </div>
        <span className="illustrative">{panel.label}</span>
      </div>

      <div className="cond__wire" aria-hidden="true">
        <span key={pulse} className={pulse && !reduced ? "is-pulse" : ""} />
      </div>

      <div className="cond__cards" aria-live="polite">
        {card(panel.access, "access")}
        {card(panel.data, "data")}
      </div>

      <p className="cond__caption">
        {panel.caption}
        <Flag claim={D.panel} />
      </p>
    </div>
  );
}

function DemoStrip() {
  const tone = { ok: "ok", deny: "deny", warn: "warn", neutral: "accent" } as const;
  return (
    // RECORDING SLOT: replace this strip with the 90-second product recording when it is ready.
    <div className="demo-strip" data-slot="demo-recording">
      <ol className="demo-strip__list">
        {demoStrip.cards.filter(shows).map((c, i) => (
          <Reveal as="li" key={c.value.scenario} delay={i * 80} className="demo-card">
            <div className="demo-card__head">
              <span className="demo-card__n">{i + 1}</span>
              <span className="illustrative">{demoStrip.label}</span>
            </div>
            <p className="demo-card__scenario">
              {c.value.scenario}
              <Flag claim={c} />
            </p>
            <ul className="demo-card__signals">
              {c.value.signals.map((s) => (
                <li key={s.label} className={`chip chip--${tone[s.tone]}`}>
                  {s.tone === "ok" && <Icon name="check" size={12} strokeWidth={2.5} />}
                  {s.tone === "deny" && <Icon name="x" size={12} strokeWidth={2.5} />}
                  {s.tone === "warn" && <Icon name="eye" size={12} strokeWidth={2.5} />}
                  {s.label}
                  {s.tone === "ok" && <span className="sr-only">: passed</span>}
                  {s.tone === "deny" && s.label !== "Blocked" && <span className="sr-only">: failed</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Difference() {
  return (
    <section className="section diff2" id="why-its-different" aria-labelledby="diff2-title">
      <div className="container">
        <div className="diff2__grid">
          <Reveal className="diff2__copy">
            <p className="eyebrow">{D.eyebrow}</p>
            <h2 id="diff2-title">{D.h2}</h2>
            <p className="diff2__intro">{D.intro}</p>
            <ul className="diff2__points">
              {D.points.filter(shows).map((p) => (
                <li key={p.value.title}>
                  <span className="diff2__tick" aria-hidden="true">
                    <Icon name="check" size={14} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3>
                      {p.value.title}
                      <Flag claim={p} />
                    </h3>
                    <p>{p.value.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          {shows(D.panel) && (
            <Reveal className="diff2__panel" delay={100}>
              <ConditionPanel />
            </Reveal>
          )}
        </div>
        <DemoStrip />
      </div>
    </section>
  );
}
