import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { useAutoCycle, usePrefersReducedMotion } from "../hooks/useInView";
import { keepTabVisible, onTabKeyDown } from "../hooks/tabKeys";
import { simulator, type ChipState, type Outcome } from "../content/homepage";

/**
 * Interactive access simulator (Illustrative UI, fictional data).
 * One person, one resource. Each device tab updates the chips, the decision,
 * the reason line and the three action rows. Auto-plays through the tabs while in view,
 * pauses on hover or focus, and stops once the visitor picks a tab.
 * Desktop opens on "Company laptop", mobile on "Failing checks" (set after mount,
 * so the prerendered HTML and the first client render match).
 */

const SCENARIOS = simulator.scenarios;
const ACTIONS = ["open", "usb", "paste"] as const;

const OUTCOME_TONE: Record<Outcome, "ok" | "deny"> = { allowed: "ok", blocked: "deny" };
const OUTCOME_ICON: Record<Outcome, "check" | "x"> = { allowed: "check", blocked: "x" };
const STATE_ICON: Record<ChipState, "check" | "x" | "alert" | "minus"> = { pass: "check", fail: "x", unknown: "alert", skip: "minus" };
const STATE_SYMBOL: Record<ChipState, string> = { pass: "✓", fail: "✗", unknown: "?", skip: "" };
const STATE_SR: Record<ChipState, string> = { pass: "passed", fail: "failed", unknown: "unverified", skip: "not checked" };

export function HeroVisual() {
  const [idx, setIdx] = useState(simulator.defaultTab.desktop);
  const reduced = usePrefersReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const picked = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const advance = useCallback(() => setIdx((i) => (i + 1) % SCENARIOS.length), []);
  const auto = useAutoCycle(rootRef, advance, { ms: 4000, step: idx });

  useEffect(() => {
    if (!picked.current && window.matchMedia("(max-width: 767px)").matches) setIdx(simulator.defaultTab.mobile);
  }, []);
  useEffect(() => keepTabVisible(tabsRef.current, idx, !reduced), [idx, reduced]);

  const choose = (i: number) => {
    picked.current = true;
    auto.stop();
    setIdx(i);
  };
  const s = SCENARIOS[idx];

  return (
    <div className="hv" ref={rootRef}>
      <div className="hv__tabs" ref={tabsRef} role="tablist" aria-label="Device used for this access request">
        {SCENARIOS.map((sc, i) => (
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
            <Icon name={sc.icon} size={15} />
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
          <div className="hv__who">
            <span className="hv__avatar" aria-hidden="true">
              {simulator.person.initials}
            </span>
            <span>
              <strong>{simulator.person.name}</strong>
              <span>{simulator.person.role}</span>
            </span>
            <ul className="hv__chips" aria-label="Checks summary">
              {s.chips.map((c) => (
                <li key={c.label} className={`hv__chip is-${c.state}`}>
                  {c.text ?? `${c.label} ${STATE_SYMBOL[c.state]}`}
                  <span className="sr-only">, {STATE_SR[c.state]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`hv__verdict tone-${s.decision.tone}`}>
            <span className={`hv__badge chip chip--${s.decision.tone}`}>
              <Icon name={s.decision.tone === "ok" ? "check" : "x"} size={13} strokeWidth={2.5} />
              {s.decision.label}
            </span>
            <p className="hv__reason">{s.reason}</p>
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

          {/* Native disclosure: works by keyboard and without JavaScript. */}
          <details className="hv__details">
            <summary data-interaction="hero-simulator-details">
              <span className="hv__details-show">{simulator.detailsLabels.show}</span>
              <span className="hv__details-hide">{simulator.detailsLabels.hide}</span>
              <Icon name="chevronDown" size={16} />
            </summary>
            <div className="hv__details-body">
              <ol className="hv__checks" aria-label={simulator.detailsLabels.checks}>
                {s.checks.map((c) => (
                  <li key={c.label} className={`hv__check is-${c.state}`}>
                    <span className="hv__check-icon" aria-hidden="true">
                      <Icon name={STATE_ICON[c.state]} size={13} strokeWidth={2.5} />
                    </span>
                    <span>{c.label}</span>
                    <span className="sr-only">, {STATE_SR[c.state]}</span>
                  </li>
                ))}
              </ol>
              <div className="hv__policy is-on">
                <span className="hv__label">{simulator.detailsLabels.policy}</span>
                <code>
                  {s.policy.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </code>
              </div>
            </div>
          </details>
        </div>

        <p className="sr-only" aria-live="polite">
          {`${s.tab}: ${s.decision.label}. ${s.reason}`}
        </p>
      </div>
    </div>
  );
}
