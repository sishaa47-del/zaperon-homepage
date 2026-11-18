import { useEffect, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { useMounted } from "../hooks/useInView";
import { onTabKeyDown } from "../hooks/tabKeys";
import { modules as M } from "../content/homepage";
import "../styles/capabilities.css";

const DESKTOP = "(min-width: 900px)";

/**
 * Section 6: four modules. Desktop: a tab explorer (module list with group labels,
 * live preview card). Mobile: the same markup as an accordion.
 * Before hydration and without JavaScript every module's card is shown.
 */
export function Platform() {
  const mounted = useMounted();
  const [desktop, setDesktop] = useState(false);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const tabs = mounted && desktop;
  const shown = (i: number) => !mounted || (tabs ? i === idx : i === open);

  return (
    <section className="section mods" id={M.id} aria-labelledby="mods-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{M.eyebrow}</p>
          <h2 id="mods-title">{M.h2}</h2>
        </Reveal>

        <div className={`mods__grid ${tabs ? "is-tabs" : "is-accordion"}`}>
          <div className="mods__list" role={tabs ? "tablist" : undefined} aria-label={tabs ? M.h2 : undefined} aria-orientation={tabs ? "vertical" : undefined}>
            {M.items.map((m, i) => (
              <button
                key={m.id}
                id={`mod-tab-${m.id}`}
                type="button"
                className="mods__tab"
                style={{ order: i * 2 }}
                data-interaction={`module-${m.id}`}
                aria-controls={`mod-panel-${m.id}`}
                {...(tabs
                  ? {
                      role: "tab",
                      "aria-selected": i === idx,
                      tabIndex: i === idx ? 0 : -1,
                      onClick: () => setIdx(i),
                      onKeyDown: (e) => onTabKeyDown(e, i, M.items.length, setIdx),
                    }
                  : { "aria-expanded": shown(i), onClick: () => setOpen(open === i ? null : i) })}
              >
                <span className="mods__icon" aria-hidden="true">
                  <Icon name={m.icon as IconName} size={19} />
                </span>
                <span className="mods__names">
                  <span className="mods__group">{m.group}</span>
                  <span className="mods__name">{m.name}</span>
                </span>
                <Icon name="chevronDown" size={18} className="mods__chev" />
              </button>
            ))}
          </div>

          {M.items.map((m, i) => (
            <div
              key={m.id}
              id={`mod-panel-${m.id}`}
              className="mods__panel"
              style={{ order: i * 2 + 1 }}
              role={tabs ? "tabpanel" : "region"}
              aria-labelledby={`mod-tab-${m.id}`}
              hidden={!shown(i)}
            >
              <p className="mods__panel-group">{m.group}</p>
              <h3>{m.name}</h3>
              <p className="mods__promise">{m.promise}</p>
              <p className="mods__includes-label">{M.includesLabel}</p>
              <ul className="mods__chips">
                {m.includes.map((c) => (
                  <li key={c} className="chip chip--accent">
                    {c}
                  </li>
                ))}
              </ul>
              <a className="link-arrow" href={m.href} target="_blank" rel="noopener" data-interaction={`module-${m.id}-learn-more`}>
                {M.learnMore}
                <span className="sr-only"> about {m.name}</span> <Icon name="arrowRight" size={16} />
              </a>
            </div>
          ))}
        </div>

        <p className="mods__footnote">{M.footnote}</p>
      </div>
    </section>
  );
}
