import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { useInView, useMounted, usePrefersReducedMotion } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { aiSecurity as A } from "../content/homepage";

const D = A.demo;
type Account = "company" | "personal";
const ACCOUNTS: Account[] = ["company", "personal"];
const TABS = ["prompt", "agent"] as const;
type Tab = (typeof TABS)[number];

/**
 * Plays a short sequence once per `run` while `active` and in view.
 * Starts (and, under reduced motion or interruption, ends) in the final state,
 * so prerendered HTML and no-JS visitors see the complete demo.
 */
function useSequence(total: number, stepMs: number, active: boolean, run: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(total);
  const played = useRef(-1);

  useEffect(() => {
    if (!active || !inView || reduced || played.current === run) return;
    played.current = run;
    let i = 0;
    setN(0);
    const t = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= total) window.clearInterval(t);
    }, stepMs);
    return () => {
      window.clearInterval(t);
      setN(total);
    };
  }, [active, inView, reduced, run, total, stepMs]);

  return { ref, n, done: n >= total };
}

function PromptDemo({ active }: { active: boolean }) {
  const p = D.prompt;
  const [account, setAccount] = useState<Account>("personal");
  const [run, setRun] = useState(0);
  // Typing: 2 characters per tick; then one tick per detected item, then the result.
  const typeTicks = Math.ceil(p.text.length / 2);
  const total = typeTicks + p.chips.length + 1;
  const { ref, n, done } = useSequence(total, 26, active, run);
  const typed = Math.min(n * 2, p.text.length);
  const found = Math.max(0, Math.min(p.chips.length, n - typeTicks));
  const blocked = account === "personal";

  const choose = (i: number) => {
    setAccount(ACCOUNTS[i]);
    setRun((r) => r + 1);
  };

  return (
    <div className="aid__pane" ref={ref}>
      <div className="aid__switch" role="radiogroup" aria-label="AI account type">
        {ACCOUNTS.map((a, i) => (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={account === a}
            tabIndex={account === a ? 0 : -1}
            data-interaction={`ai-demo-account-${a}`}
            onClick={() => choose(i)}
            onKeyDown={(e) => onTabKeyDown(e, i, ACCOUNTS.length, choose)}
          >
            {p.toggle[a]}
          </button>
        ))}
      </div>
      <div className="aid__card">
        <span className="aid__who">
          <Icon name="chat" size={15} /> {p.app} · {p.toggle[account]}
        </span>
        <p className="aid__prompt">
          {p.text.slice(0, typed)}
          {typed < p.text.length && <span className="aid__caret" aria-hidden="true" />}
        </p>
      </div>
      <div className={`aid__gate ${done ? (blocked ? "is-blocked" : "is-redacted") : ""}`}>
        <span className="aid__gate-title">
          <Icon name="layers" size={15} /> {p.gateway}
        </span>
        <ul className="aid__chips" aria-label="Detected">
          {p.chips.map((c, i) => (
            <li key={c} className={`chip ${i < found ? "chip--deny is-lit" : "aid__chip-off"}`}>
              {c}
            </li>
          ))}
        </ul>
        <div aria-live="polite" className="aid__result">
          {done && (
            <>
              <span className={`chip ${blocked ? "chip--deny" : "chip--warn"} aid__decision`}>
                <Icon name={blocked ? "x" : "eye"} size={12} strokeWidth={2.5} />
                {blocked ? D_BLOCK : D_REDACT}
              </span>
              {blocked && <p>{p.result}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
// Decision words come from the decision line (Allow · Redact · Block · Ask a human · Audit).
const D_REDACT = A.decisions[1];
const D_BLOCK = A.decisions[2];

function AgentDemo({ active }: { active: boolean }) {
  const g = D.agent;
  const [run, setRun] = useState(0);
  const { ref, n, done } = useSequence(g.steps.length + 1, 650, active, run);
  return (
    <div className="aid__pane" ref={ref}>
      <div className="aid__card">
        <span className="aid__who">
          <Icon name="plug" size={15} /> {g.app}
        </span>
        <p className="aid__prompt">{g.request}</p>
      </div>
      <ol className="aid__steps">
        {g.steps.map((s, i) => (
          <li key={s} className={i < n ? "is-lit" : ""}>
            <span className="aid__step-n" aria-hidden="true">
              {i < n ? <Icon name={i === g.steps.length - 1 ? "users" : "check"} size={13} strokeWidth={2.5} /> : i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <div aria-live="polite" className="aid__result aid__result--wait">
        {done && (
          <p>
            <span className="hv__spinner" aria-hidden="true" /> {g.result}
          </p>
        )}
      </div>
      {done && (
        <button type="button" className="aid__replay" data-interaction="ai-demo-agent-replay" onClick={() => setRun((r) => r + 1)}>
          <Icon name="refresh" size={14} /> Replay
        </button>
      )}
    </div>
  );
}

function Demo() {
  const [tab, setTab] = useState<Tab>("prompt");
  const mounted = useMounted();
  const choose = (i: number) => setTab(TABS[i]);
  return (
    <div className="aid">
      <div className="aid__bar">
        <div className="aid__tabs" role="tablist" aria-label="AI security demo">
          {TABS.map((t, i) => (
            <button
              key={t}
              id={`aid-tab-${t}`}
              type="button"
              role="tab"
              aria-selected={tab === t}
              aria-controls={`aid-panel-${t}`}
              tabIndex={tab === t ? 0 : -1}
              data-interaction={`ai-demo-tab-${t}`}
              onClick={() => choose(i)}
              onKeyDown={(e) => onTabKeyDown(e, i, TABS.length, choose)}
            >
              {D.tabs[t]}
            </button>
          ))}
        </div>
        <span className="illustrative">{D.label}</span>
      </div>
      {/* Before hydration (and without JavaScript) both panels show. */}
      <div id="aid-panel-prompt" role="tabpanel" aria-labelledby="aid-tab-prompt" hidden={mounted && tab !== "prompt"}>
        <PromptDemo active={tab === "prompt"} />
      </div>
      <div id="aid-panel-agent" role="tabpanel" aria-labelledby="aid-tab-agent" hidden={mounted && tab !== "agent"}>
        <AgentDemo active={tab === "agent"} />
      </div>
    </div>
  );
}

/** Section 4: AI & agent security. */
export function AIGovernance() {
  const c = A.columns;
  return (
    <section className="section ai on-dark" id="ai-security" aria-labelledby="ai-title">
      <span id="ai-governance" className="anchor-alias" aria-hidden="true" />
      <div className="container ai7">
        <Reveal className="ai7__copy">
          <p className="eyebrow eyebrow--dark">{A.eyebrow}</p>
          <h2 id="ai-title">{A.h2}</h2>
          <p className="ai__lead">{A.intro}</p>
        </Reveal>

        <div className="ai7__demo">
          <Demo />
        </div>

        <div className="ai7__rows">
          <table className="ai7__table">
            <thead>
              <tr>
                <th scope="col">{c.problem}</th>
                <th scope="col">{c.does}</th>
                <th scope="col">{c.outcome}</th>
              </tr>
            </thead>
            <tbody>
              {A.rows.map((r) => (
                <tr key={r.problem}>
                  <th scope="row" data-label={c.problem}>
                    {r.problem}
                  </th>
                  <td data-label={c.does}>{r.does}</td>
                  <td data-label={c.outcome}>
                    <Icon name="check" size={14} strokeWidth={2.5} />
                    {r.outcome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="ai7__decision">
            {A.decisionLead}{" "}
            <strong>
              {A.decisions.map((d, i) => (
                <span key={d}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  {d}
                </span>
              ))}
            </strong>
          </p>
          <div className="ai7__links">
            <a className="btn btn--light" href={A.button.href} target="_blank" rel="noopener" data-cta="ai-security">
              {A.button.label} <Icon name="arrowRight" size={18} />
            </a>
            <a className="ai7__text-link" href={A.gatewayLink.href} target="_blank" rel="noopener" data-interaction="ai-gateway-blog">
              {A.gatewayLink.text} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
