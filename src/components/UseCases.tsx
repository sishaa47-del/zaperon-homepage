import { useCallback, useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { useHashSelect, useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { useCases as U } from "../content/homepage";

const IDS = U.cases.map((c) => c.id);

/** Section 11: selector plus detail panel. Gentle auto-advance until the visitor picks a case. */
export function UseCases() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const onMatch = useCallback((id: string) => {
    setAuto(false);
    setIdx(IDS.indexOf(id));
  }, []);
  useHashSelect("uc-", IDS, onMatch);

  useEffect(() => {
    if (!auto || reduced || !inView) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % IDS.length), 5000);
    return () => window.clearTimeout(t);
  }, [auto, reduced, inView, idx]);

  const choose = (i: number) => {
    setAuto(false);
    setIdx(i);
  };
  const uc = U.cases[idx];

  return (
    <section className="section usecases" id="use-cases" aria-labelledby="uc-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{U.eyebrow}</p>
          <h2 id="uc-title">{U.h2}</h2>
        </Reveal>

        <div className="uc" ref={ref} onPointerDown={() => setAuto(false)}>
          <div className="uc__grid" role="tablist" aria-label={U.h2}>
            {U.cases.map((c, i) => (
              <button
                key={c.id}
                id={`uc-${c.id}`}
                role="tab"
                type="button"
                aria-selected={i === idx}
                aria-controls="uc-panel"
                tabIndex={i === idx ? 0 : -1}
                className="uc__tile"
                data-interaction={`use-case-${c.id}`}
                onClick={() => choose(i)}
                onKeyDown={(e) => onTabKeyDown(e, i, U.cases.length, choose)}
              >
                <Icon name={c.icon as IconName} size={22} />
                <span className="uc__tile-title">{c.title}</span>
                <span className="uc__tile-sum">{c.line}</span>
              </button>
            ))}
          </div>

          <div className="uc__panel" id="uc-panel" role="tabpanel" aria-labelledby={`uc-${uc.id}`} key={uc.id} aria-live="polite">
            <span className="uc__panel-icon" aria-hidden="true">
              <Icon name={uc.icon as IconName} size={26} />
            </span>
            <h3>{uc.title}</h3>
            <p>{uc.line}</p>
            <span className="uc__label">{U.capsLabel}</span>
            <ul className="uc__caps">
              {uc.caps.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
            <a className="uc__link" href={uc.href} target="_blank" rel="noopener" data-interaction={`use-case-link-${uc.id}`}>
              {uc.title.replace(/\.$/, "")} <Icon name="arrowRight" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
