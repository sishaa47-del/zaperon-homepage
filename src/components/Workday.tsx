import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { workday as W } from "../content/homepage";

type Mode = "without" | "with";
const MODES: Mode[] = ["without", "with"];

/** Section 5: one compact row of six workday steps with a Without / With toggle. */
export function Workday() {
  const [mode, setMode] = useState<Mode>("with");
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { threshold: 0.5 });
  const reduced = usePrefersReducedMotion();
  // The bar is drawn in the static HTML; it replays when the strip comes into view or "With" is chosen.
  const [drawn, setDrawn] = useState(true);
  const [run, setRun] = useState(0);
  const played = useRef(-1);

  useEffect(() => {
    if (mode !== "with" || !inView || reduced || played.current === run) return;
    played.current = run;
    setDrawn(false);
    const t = window.setTimeout(() => setDrawn(true), 60);
    return () => {
      window.clearTimeout(t);
      setDrawn(true);
    };
  }, [mode, inView, reduced, run]);

  const choose = (i: number) => {
    if (MODES[i] === "with" && mode !== "with") setRun((r) => r + 1);
    setMode(MODES[i]);
  };

  return (
    <section className="section wd" id={W.id} aria-labelledby="wd-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="wd-title">{W.h2}</h2>
          <p>{W.intro}</p>
        </Reveal>

        <div className="wd__switch" role="radiogroup" aria-label="Compare a workday">
          {MODES.map((m, i) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              tabIndex={mode === m ? 0 : -1}
              data-interaction={`workday-${m}`}
              onClick={() => choose(i)}
              onKeyDown={(e) => onTabKeyDown(e, i, MODES.length, choose)}
            >
              {W.toggle[m]}
            </button>
          ))}
        </div>

        <ol ref={ref} className={`wd__strip is-${mode} ${drawn ? "is-drawn" : ""}`} aria-live="polite">
          <span className="wd__bar" aria-hidden="true" />
          {W.steps.map((s, i) => (
            <li key={s.step} className="wd__step" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="wd__dot" aria-hidden="true">
                <Icon name={mode === "with" ? "check" : "minus"} size={12} strokeWidth={2.5} />
              </span>
              <strong>{s.step}</strong>
              <span className="wd__text">{mode === "with" ? s.with : s.without}</span>
            </li>
          ))}
        </ol>

        <p className="wd__line">
          {W.lineLead}{" "}
          {W.questions.map((q, i) => (
            <span key={q}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <strong>{q}</strong>
            </span>
          ))}{" "}
          {W.lineTail}
        </p>
      </div>
    </section>
  );
}
