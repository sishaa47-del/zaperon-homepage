import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { howItWorks as H } from "../content/homepage";
import "../styles/how.css";

const LAST = H.steps.length - 1;

/** A connector whose stroke draws in when `on` (horizontal on desktop, vertical when stacked). */
function Wire({ on, className = "" }: { on: boolean; className?: string }) {
  return (
    <span className={`wire ${on ? "is-on" : ""} ${className}`} aria-hidden="true">
      <svg>
        <line className="wire__h" x1="0" y1="50%" x2="100%" y2="50%" pathLength={1} />
        <line className="wire__v" x1="50%" y1="0" x2="50%" y2="100%" pathLength={1} />
      </svg>
    </span>
  );
}

export function HowItWorks() {
  const [rawStage, setStage] = useState(0);
  const [picked, setPicked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  // Reduced motion: show the final, fully connected state unless the visitor picks a step.
  const stage = reduced && !picked ? LAST : rawStage;
  const step = H.steps[stage];

  // Scroll-linked: as the diagram moves up the viewport, steps activate one by one.
  useEffect(() => {
    if (picked || reduced) return;
    let last = -1;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / Math.max(r.height * 0.75, 1);
      const s = Math.max(0, Math.min(LAST, Math.floor(p * H.steps.length)));
      if (s !== last) {
        last = s;
        setStage(s);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [picked, reduced]);

  // Gentle auto-advance while the section is in view and the visitor hasn't picked a step.
  useEffect(() => {
    if (picked || reduced || !inView) return;
    const t = window.setTimeout(() => setStage((s) => (s + 1) % H.steps.length), 3600);
    return () => window.clearTimeout(t);
  }, [rawStage, picked, reduced, inView]);

  const pick = (i: number) => {
    setPicked(true);
    setStage(i);
  };

  const d = H.diagram;
  return (
    <section className="section how" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{H.eyebrow}</p>
          <h2 id="how-title">{H.h2}</h2>
        </Reveal>

        <div className="how__layout" ref={ref}>
          <div className="how__steps" role="tablist" aria-label={H.h2} aria-orientation="vertical">
            {H.steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                id={`how-tab-${i}`}
                aria-selected={i === stage}
                aria-controls="how-panel"
                tabIndex={i === stage ? 0 : -1}
                className={`how__step ${i < stage ? "is-done" : ""}`}
                data-interaction={`how-step-${i + 1}`}
                onClick={() => pick(i)}
                onKeyDown={(e) => onTabKeyDown(e, i, H.steps.length, pick)}
              >
                <span className="how__step-n" aria-hidden="true">
                  {i < stage ? <Icon name="check" size={14} strokeWidth={2.5} /> : i + 1}
                </span>
                <span className="how__step-body">
                  <span className="how__step-title">{s.title}</span>
                  <span className="how__step-text">{s.body}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="how__diagram" id="how-panel" role="tabpanel" aria-labelledby={`how-tab-${stage}`}>
            <div className="arch" data-stage={stage}>
              <div className="arch__col arch__col--in">
                <div className={`arch__node is-lit ${stage === 0 ? "is-focus" : ""}`}>
                  <span className="arch__icon">
                    <Icon name="user" size={20} />
                  </span>
                  <span>
                    <strong>{d.user.label}</strong>
                    <small>{d.user.sub}</small>
                  </span>
                </div>
                <Wire on={stage >= 1} className="wire--stack" />
                <div className={`arch__node ${stage >= 1 ? "is-lit" : ""} ${stage === 1 ? "is-focus" : ""}`}>
                  <span className="arch__icon">
                    <Icon name="laptop" size={20} />
                  </span>
                  <span>
                    <strong>{d.device.label}</strong>
                    <small>{d.device.sub}</small>
                  </span>
                </div>
              </div>

              <Wire on={stage >= 1} className="wire--main" />

              <div className={`arch__engine ${stage >= 2 ? "is-lit is-focus" : ""}`}>
                <strong>{d.decision.label}</strong>
                <ul>
                  {d.decision.inputs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>

              <Wire on={stage >= 2} className="wire--main wire--late" />

              <ul className="arch__col arch__col--out">
                {d.outputs.map((t, i) => (
                  <li
                    key={t.label}
                    className={`arch__target ${stage >= 2 ? "is-lit" : ""}`}
                    style={{ transitionDelay: stage >= 2 ? `${250 + i * 60}ms` : "0ms" }}
                  >
                    <Icon name={t.icon as IconName} size={17} />
                    <span>
                      <strong>{t.label}</strong>
                      <small>{t.sub}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="how__checks">
              <span className="how__checks-label" aria-live="polite">
                {stage + 1} · {step.title}
              </span>
              <ul key={stage}>
                {step.chips.map((c) => (
                  <li key={c} className={`chip ${stage === LAST ? "chip--accent" : "chip--ok"}`}>
                    {stage !== LAST && <Icon name="check" size={12} strokeWidth={2.5} />}
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className={`how__result ${stage === LAST ? "is-on" : ""}`}>
          <span className="how__result-pills" aria-hidden="true">
            <span className="chip chip--ok">
              <Icon name="check" size={12} strokeWidth={2.5} />
            </span>
            <span className="chip chip--warn">
              <Icon name="alert" size={12} strokeWidth={2.5} />
            </span>
            <span className="chip chip--deny">
              <Icon name="x" size={12} strokeWidth={2.5} />
            </span>
          </span>
          {H.result}
        </p>
      </div>
    </section>
  );
}
