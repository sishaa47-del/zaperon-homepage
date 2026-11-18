import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { Flag } from "./Flag";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { aiSpotlight as A, shows } from "../content/homepage";

type Account = "personal" | "company";
type Stage = "typing" | "inspecting" | "detecting" | "verdict";
const ACCOUNTS: Account[] = ["company", "personal"];
const demo = A.demo;

/**
 * Illustrative prompt-inspection demo (fictional data). Types a prompt,
 * highlights detected items one by one, then shows the verdict for the
 * selected account. Loops personal / company until the visitor picks one.
 */
function PromptDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [account, setAccount] = useState<Account>("personal");
  const [auto, setAuto] = useState(true);
  const [run, setRun] = useState(0);
  const [raw, setRaw] = useState<{ typed: number; stage: Stage; found: number }>({ typed: 0, stage: "typing", found: 0 });
  // Reduced motion: no typing, show the final state.
  const st = reduced ? { typed: demo.prompt.length, stage: "verdict" as Stage, found: demo.detections.length } : raw;

  useEffect(() => {
    if (!inView || reduced) return;
    const timers: number[] = [];
    let i = 0;
    const typer = window.setInterval(() => {
      i += 2;
      setRaw({ typed: Math.min(i, demo.prompt.length), stage: "typing", found: 0 });
      if (i >= demo.prompt.length) {
        window.clearInterval(typer);
        setRaw((r) => ({ ...r, stage: "inspecting" }));
        demo.detections.forEach((_, k) => {
          timers.push(window.setTimeout(() => setRaw((r) => ({ ...r, stage: "detecting", found: k + 1 })), 500 + k * 300));
        });
        timers.push(window.setTimeout(() => setRaw((r) => ({ ...r, stage: "verdict" })), 500 + demo.detections.length * 300 + 250));
      }
    }, 26);
    return () => {
      window.clearInterval(typer);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [inView, reduced, run]);

  // Loop: after each verdict, switch account and replay, until the visitor takes over.
  useEffect(() => {
    if (!auto || reduced || !inView || st.stage !== "verdict") return;
    const t = window.setTimeout(() => {
      setAccount((a) => (a === "personal" ? "company" : "personal"));
      setRun((r) => r + 1);
    }, 3200);
    return () => window.clearTimeout(t);
  }, [auto, reduced, inView, st.stage]);

  const choose = (i: number) => {
    setAuto(false);
    setAccount(ACCOUNTS[i]);
    setRun((r) => r + 1);
  };

  const blocked = account === "personal";
  return (
    <div className="pd" ref={ref}>
      <div className="pd__switch" role="radiogroup" aria-label="AI account type">
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
            {demo.toggle[a]}
          </button>
        ))}
      </div>
      <div className="pd__bar">
        <span>
          <Icon name="chat" size={15} /> {demo.app}
        </span>
        <span className="illustrative">{demo.label}</span>
      </div>
      <div className="pd__body">
        <div className="pd__input">
          <span className="pd__who">{demo.toggle[account]}</span>
          <p>
            {demo.prompt.slice(0, st.typed)}
            {st.stage === "typing" && <span className="pd__caret" aria-hidden="true" />}
          </p>
        </div>

        <div className={`pd__gate is-${st.stage} ${st.stage === "verdict" ? (blocked ? "is-blocked" : "is-allowed") : ""}`}>
          <span className="pd__gate-title">
            <Icon name="layers" size={15} /> {demo.gateway}
          </span>
          {st.stage === "typing" && <span className="pd__gate-msg">{demo.waiting}</span>}
          {st.stage === "inspecting" && (
            <span className="pd__gate-msg">
              <span className="hv__spinner" aria-hidden="true" /> {demo.inspecting}
            </span>
          )}
          {st.found > 0 && (
            <ul className="pd__findings" aria-label="Detected">
              {demo.detections.slice(0, st.found).map((d) => (
                <li key={d} className="chip chip--deny">
                  {d}
                </li>
              ))}
            </ul>
          )}
          <div aria-live="polite">
            {st.stage === "verdict" && (
              <>
                <p className={`pd__verdict ${blocked ? "" : "pd__verdict--ok"}`}>
                  <Icon name={blocked ? "x" : "check"} size={16} strokeWidth={2.5} />
                  {blocked ? demo.personalVerdict : demo.companyVerdict.value}
                  {!blocked && <Flag claim={demo.companyVerdict} />}
                </p>
                <p className="pd__policy">{demo.policy}</p>
              </>
            )}
          </div>
        </div>
        {st.stage === "verdict" && !reduced && (
          <button type="button" className="pd__replay" data-interaction="ai-demo-replay" onClick={() => setRun((r) => r + 1)}>
            <Icon name="refresh" size={14} /> Replay
          </button>
        )}
      </div>
    </div>
  );
}

export function AIGovernance() {
  return (
    <section className="section ai on-dark" id="ai-governance" aria-labelledby="ai-title">
      <div className="container ai__inner">
        <Reveal className="ai__copy">
          <p className="eyebrow eyebrow--dark">{A.eyebrow}</p>
          <h2 id="ai-title">
            {A.h2Lead} <span className="serif">{A.h2Accent}</span> {A.h2Tail}
          </h2>
          <p className="ai__lead">{A.body}</p>
          <ul className="ai__pillars">
            {A.points.filter(shows).map((p) => (
              <li key={p.value.title}>
                <Icon name={p.value.icon as IconName} size={20} />
                <span>
                  <strong>
                    {p.value.title}
                    <Flag claim={p} />
                  </strong>
                  {p.value.body}
                </span>
              </li>
            ))}
          </ul>
          <a className="btn btn--light" href={A.button.href} target="_blank" rel="noopener" data-cta="ai-governance">
            {A.button.label} <Icon name="arrowRight" size={18} />
          </a>
          <p className="ai__agents">
            <a href={A.agentsLink.href} target="_blank" rel="noopener" data-interaction="ai-agents-blog">
              {A.agentsLink.text}
            </a>
          </p>
        </Reveal>
        <Reveal className="ai__demo" delay={100}>
          <PromptDemo />
        </Reveal>
      </div>
    </section>
  );
}
