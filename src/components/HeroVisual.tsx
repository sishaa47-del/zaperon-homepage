import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Flag } from "./Flag";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { keepTabVisible, onTabKeyDown } from "../hooks/tabKeys";
import { simulator, shows, type Outcome, type CheckState } from "../content/homepage";

/**
 * Interactive access simulator (Illustrative UI, fictional data).
 * One person, one resource; switching the device changes the checks, the
 * decision and what the person can do with the data. Auto-plays through the
 * device tabs every 4s while in view, until the visitor picks a tab.
 */

const SCENARIOS = simulator.scenarios.filter(shows);
const ACTIONS = ["open", "download", "paste"] as const;

const OUTCOME_TONE: Record<Outcome, "ok" | "deny" | "warn"> = { allowed: "ok", blocked: "deny", view: "warn" };
const OUTCOME_ICON: Record<Outcome, "check" | "x" | "eye"> = { allowed: "check", blocked: "x", view: "eye" };
const CHECK_SR: Record<CheckState, string> = { pass: "passed", fail: "failed", warn: "noted" };

export function HeroVisual() {
  const [idx, setIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });
  const reduced = usePrefersReducedMotion();

  const claim = SCENARIOS[idx];
  const s = claim.value;

  useEffect(() => {
    if (!autoplay || reduced || !inView) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % SCENARIOS.length), simulator.autoplayMs);
    return () => window.clearTimeout(t);
  }, [autoplay, reduced, inView, idx]);

  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => keepTabVisible(tabsRef.current, idx, !reduced), [idx, reduced]);

  const choose = (i: number) => {
    setAutoplay(false);
    setIdx(i);
  };

  return (
    <div className="hv" ref={ref}>
      <div className="hv__tabs" ref={tabsRef} role="tablist" aria-label="Device used for this access request">
        {SCENARIOS.map(({ value: sc }, i) => (
          <button
            key={sc.id}
            id={`hv-tab-${sc.id}`}
            role="tab"
            type="button"
            aria-selected={i === idx}
            aria-controls="hv-panel"
            tabIndex={i === idx ? 0 : -1}
            className="hv__tab"
            data-interaction={`hero-simulator-tab-${sc.id}`}
            onClick={() => choose(i)}
            onKeyDown={(e) => onTabKeyDown(e, i, SCENARIOS.length, choose)}
          >
            <Icon name={sc.id === "unknown" ? "alert" : "laptop"} size={15} />
            {sc.tab}
          </button>
        ))}
      </div>

      <div className="hv__window" id="hv-panel" role="tabpanel" aria-labelledby={`hv-tab-${s.id}`}>
        <div className="hv__bar">
          <span className="hv__bar-title">
            <span className="hv__dot" aria-hidden="true" /> {simulator.resource}
          </span>
          <span className="illustrative">{simulator.label}</span>
        </div>

        <div className="hv__body" key={s.id}>
          <div className="hv__row hv__row--subjects">
            <div className="hv__card">
              <span className="hv__label">Person</span>
              <div className="hv__subject">
                <span className="hv__avatar" aria-hidden="true">
                  {simulator.person.initials}
                </span>
                <div>
                  <strong>{simulator.person.name}</strong>
                  <span>{simulator.person.role}</span>
                </div>
              </div>
            </div>
            <div className="hv__card">
              <span className="hv__label">Device</span>
              <div className="hv__device">
                <Icon name={s.id === "unknown" ? "alert" : "laptop"} size={18} />
                <div>
                  <strong>{s.device.name}</strong>
                </div>
                <span className={`chip chip--${s.device.tone} hv__trust`}>{s.device.status}</span>
              </div>
            </div>
          </div>

          <ol className="hv__checks" aria-label="Checks">
            {s.checks.map((c, i) => (
              <li key={c.label} className={`hv__check is-${c.state}`} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="hv__check-icon" aria-hidden="true">
                  <Icon name={c.state === "pass" ? "check" : c.state === "fail" ? "x" : "alert"} size={13} strokeWidth={2.5} />
                </span>
                <span>{c.label}</span>
                <span className="sr-only">, {CHECK_SR[c.state]}</span>
              </li>
            ))}
          </ol>

          <div className="hv__row hv__row--decision">
            <div className="hv__policy is-on">
              <span className="hv__label">Policy evaluated</span>
              <code>
                {s.policy.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </code>
            </div>
            <div className={`hv__decision is-on tone-${s.decision.tone}`}>
              <span className="hv__label">Decision</span>
              <strong>
                {s.decision.label}
                <Flag claim={claim} />
              </strong>
            </div>
          </div>

          <ul className="hv__actions is-on" aria-label={`What ${simulator.person.name} can do`}>
            {ACTIONS.map((a) => {
              const o = s.actions[a];
              return (
                <li key={a}>
                  <span>{simulator.actionLabels[a]}</span>
                  <span className={`chip chip--${OUTCOME_TONE[o]}`}>
                    <Icon name={OUTCOME_ICON[o]} size={12} strokeWidth={2.5} />
                    {simulator.outcomeLabels[o]}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="sr-only" aria-live="polite">
          {`${s.tab}: ${s.decision.label}. ${ACTIONS.map((a) => `${simulator.actionLabels[a]}: ${simulator.outcomeLabels[s.actions[a]]}`).join(". ")}.`}
        </p>
      </div>
    </div>
  );
}
