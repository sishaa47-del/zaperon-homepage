import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { Flag } from "./Flag";
import { OutcomePill, type Outcome } from "./Pills";
import { useHashSelect, useInView, usePrefersReducedMotion } from "../hooks/useInView";
import { keepTabVisible, onTabKeyDown } from "../hooks/tabKeys";
import { pillarAccess, pillarData, shows, type Claim, type PillarTab } from "../content/homepage";
import "../styles/capabilities.css";

/* ---------- Shared tab explorer ---------- */
type ExplorerProps = {
  pillar: { id: string; eyebrow: string; h2: string; tabs: Claim<PillarTab>[] };
  prefix: string;
  previews: Record<string, ReactNode>;
  mirrored?: boolean;
  footnote?: string;
};

function Explorer({ pillar, prefix, previews, mirrored = false, footnote }: ExplorerProps) {
  const tabs = useMemo(() => pillar.tabs.filter(shows), [pillar.tabs]);
  const ids = useMemo(() => tabs.map((t) => t.value.id), [tabs]);
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  const reduced = usePrefersReducedMotion();

  const onMatch = useCallback(
    (id: string) => {
      setAuto(false);
      setIdx(ids.indexOf(id));
    },
    [ids],
  );
  useHashSelect(prefix, ids, onMatch);

  useEffect(() => {
    if (!auto || reduced || !inView) return;
    const t = window.setTimeout(() => setIdx((i) => (i + 1) % tabs.length), 5000);
    return () => window.clearTimeout(t);
  }, [auto, reduced, inView, idx, tabs.length]);

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => keepTabVisible(listRef.current, idx, !reduced), [idx, reduced]);

  const choose = (i: number) => {
    setAuto(false);
    setIdx(i);
  };
  const tab = tabs[idx];
  const t = tab.value;
  const panelId = `${pillar.id}-panel`;

  return (
    <section className={`section px ${mirrored ? "px--mirror" : ""}`} id={pillar.id} aria-labelledby={`${pillar.id}-title`}>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{pillar.eyebrow}</p>
          <h2 id={`${pillar.id}-title`}>{pillar.h2}</h2>
        </Reveal>

        <div className="px__layout" ref={ref} onPointerDown={() => setAuto(false)}>
          <div className="px__list" ref={listRef} role="tablist" aria-label={pillar.h2} aria-orientation="vertical">
            {tabs.map(({ value: c }, i) => (
              <button
                key={c.id}
                id={`${prefix}${c.id}`}
                role="tab"
                type="button"
                aria-selected={i === idx}
                aria-controls={panelId}
                tabIndex={i === idx ? 0 : -1}
                className="px__tab"
                data-interaction={`${pillar.id}-tab-${c.id}`}
                onClick={() => choose(i)}
                onKeyDown={(e) => onTabKeyDown(e, i, tabs.length, choose)}
              >
                <span className="px__icon" aria-hidden="true">
                  <Icon name={c.icon as IconName} size={19} />
                </span>
                <span className="px__tab-title">{c.title}</span>
              </button>
            ))}
          </div>

          <div className="px__panel" id={panelId} role="tabpanel" aria-labelledby={`${prefix}${t.id}`}>
            <div className="px__panel-head" aria-live="polite">
              <h3>
                {t.title}
                <Flag claim={tab} />
              </h3>
              <p>{t.body}</p>
            </div>
            <div className="px__preview" key={t.id}>
              {previews[t.id]}
              <span className="illustrative px__illus">Illustrative UI</span>
            </div>
          </div>
        </div>
        {footnote && <p className="px__footnote">{footnote}</p>}
      </div>
    </section>
  );
}

/* ---------- Mini UI helpers (fictional data) ---------- */
function Row({ left, sub, right, icon }: { left: ReactNode; sub?: string; right: ReactNode; icon?: IconName }) {
  return (
    <li className="mini__row">
      <span className="mini__left">
        {icon && <Icon name={icon} size={16} className="mini__row-icon" />}
        <span>
          {left}
          {sub && <small>{sub}</small>}
        </span>
      </span>
      {right}
    </li>
  );
}

/* Pillar 1 previews */
const SignIn = (
  <div className="mini mini--signin">
    <div className="mini__signin-card">
      <span className="mini__app-badge">
        <Icon name="app" size={18} />
      </span>
      <strong>Sign in to your CRM</strong>
      <span className="mini__muted">No password field. Approve on your registered phone.</span>
      <div className="mini__pair">
        <span>
          <Icon name="laptop" size={16} /> This computer
        </span>
        <span className="mini__pair-line" aria-hidden="true" />
        <span>
          <Icon name="phone" size={16} /> Zaperon Verify
        </span>
      </div>
      <OutcomePill outcome="allowed" label="Approved · phishing-resistant" />
    </div>
  </div>
);

const Devices = (
  <div className="mini">
    <ul className="mini__list">
      <Row icon="laptop" left="Company laptop" right={<OutcomePill outcome="allowed" label="Registered" />} />
      <Row icon="laptop" left="Personal laptop" right={<OutcomePill outcome="allowed" label="Registered" />} />
      <Row icon="alert" left="Unknown laptop" right={<OutcomePill outcome="blocked" label="Blocked" />} />
    </ul>
  </div>
);

const Apps = (
  <div className="mini">
    <ul className="mini__list">
      <Row icon="app" left="CRM" sub="SaaS" right={<OutcomePill outcome="allowed" label="Allowed" />} />
      <Row icon="code" left="Code repository" sub="On-premise" right={<OutcomePill outcome="allowed" label="Allowed" />} />
      <Row icon="server" left="Build server" sub="Server" right={<OutcomePill outcome="allowed" label="Allowed" />} />
    </ul>
    <div className="mini__hidden" aria-hidden="true">
      <span />
      <span />
    </div>
  </div>
);

const Directory = (
  <div className="mini mini--sync">
    <div className="mini__sync">
      <span className="mini__app-badge">
        <Icon name="users" size={18} />
      </span>
      <div>
        <strong>Active Directory</strong>
        <small>Users and groups</small>
      </div>
      <span className="mini__pair-line" aria-hidden="true" />
      <span className="mini__app-badge mini__app-badge--z" aria-hidden="true">
        Z
      </span>
    </div>
    <OutcomePill outcome="allowed" label="Synced" />
  </div>
);

/* Pillar 2 previews */
function SameFile() {
  const people: { who: string; device: string; rows: [string, Outcome][] }[] = [
    { who: "Finance lead", device: "Company laptop", rows: [["View", "allowed"], ["Download", "allowed"], ["Share", "allowed"]] },
    { who: "Contractor", device: "Personal laptop", rows: [["View", "allowed"], ["Download", "blocked"], ["Share", "blocked"]] },
  ];
  const label = { allowed: "Allowed", blocked: "Blocked", view: "View only", warn: "Warn" };
  return (
    <div className="mini">
      <div className="mini__file">
        <Icon name="file" size={18} /> Q3_report.xlsx
      </div>
      <div className="mini__split">
        {people.map((p) => (
          <div key={p.who} className="mini__person">
            <strong>{p.who}</strong>
            <small>{p.device}</small>
            <ul>
              {p.rows.map(([a, o]) => (
                <li key={a}>
                  <span>{a}</span>
                  <OutcomePill outcome={o} label={label[o]} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

type ChannelState = "allowed" | "warn" | "blocked";
const NEXT: Record<ChannelState, ChannelState> = { allowed: "warn", warn: "blocked", blocked: "allowed" };
const CH_LABEL: Record<ChannelState, string> = { allowed: "Allow", warn: "Warn", blocked: "Block" };

function Channels() {
  const [state, setState] = useState<Record<string, ChannelState>>({
    "Web uploads": "warn",
    "Email attachments": "allowed",
    "USB drives": "blocked",
    Printing: "allowed",
    "Copy-paste": "warn",
    Screenshots: "blocked",
  });
  return (
    <div className="mini">
      <ul className="mini__list">
        {Object.entries(state).map(([ch, s]) => (
          <li key={ch} className="mini__row">
            <span className="mini__left">{ch}</span>
            <button
              type="button"
              className="mini__cycle"
              data-interaction="pillar-data-channel-cycle"
              aria-label={`${ch}: ${CH_LABEL[s]}. Change`}
              onClick={() => setState((m) => ({ ...m, [ch]: NEXT[s] }))}
            >
              <OutcomePill outcome={s} label={CH_LABEL[s]} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Detection = (
  <div className="mini mini--doc">
    <div className="mini__file">
      <Icon name="file" size={18} /> account_review.docx
    </div>
    <p>
      Customer: <mark data-type="Personal data">Jordan Lee, jordan.lee@acme-example.com</mark>
    </p>
    <p>
      Outstanding balance: <mark data-type="Financial records">48,200.00</mark>
    </p>
    <p>
      <mark data-type="Source code" className="mini__code">
        def churn_score(account):
      </mark>
    </p>
    <ul className="mini__found">
      <li className="chip chip--deny">Personal data</li>
      <li className="chip chip--deny">Financial records</li>
      <li className="chip chip--deny">Source code</li>
    </ul>
  </div>
);

const SafeAI = (
  <div className="mini">
    <ul className="mini__list">
      <Row icon="chat" left="ChatGPT" sub="Company account" right={<OutcomePill outcome="allowed" label="Allowed" />} />
      <Row icon="chat" left="ChatGPT" sub="Personal account" right={<OutcomePill outcome="blocked" label="Blocked" />} />
      <Row icon="chat" left="Gemini" sub="Company account" right={<OutcomePill outcome="allowed" label="Allowed" />} />
    </ul>
    <a className="mini__link" href="#ai-governance" data-interaction="pillar-data-ai-spotlight">
      Safe use of AI <Icon name="arrowDown" size={14} />
    </a>
  </div>
);

const LogPreview = (
  <div className="mini">
    <ul className="mini__list mini__log">
      <Row left="Sam Rivera · Company laptop" sub="design_v4.fig to personal cloud drive" right={<OutcomePill outcome="blocked" label="Blocked" />} />
      <Row left="Chris Taylor · Personal laptop" sub="Q3_report.xlsx, download" right={<OutcomePill outcome="blocked" label="Blocked" />} />
      <Row left="Alex Morgan · Company laptop" sub="Code repository, open" right={<OutcomePill outcome="allowed" label="Allowed" />} />
    </ul>
  </div>
);

export function PillarAccess() {
  return (
    <Explorer
      pillar={pillarAccess}
      prefix="who-"
      previews={{ passwordless: SignIn, devices: Devices, apps: Apps, directory: Directory }}
    />
  );
}

export function PillarData() {
  return (
    <Explorer
      pillar={pillarData}
      prefix="data-"
      mirrored
      footnote={pillarData.alsoIncluded}
      previews={{ permissions: <SameFile />, exits: <Channels />, detection: Detection, ai: SafeAI, record: LogPreview }}
    />
  );
}
