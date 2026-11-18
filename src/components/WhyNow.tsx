import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { whyNow as W } from "../content/homepage";

/** Section 3: what's still here, what's arriving, and three sourced stats (static numbers). */
export function WhyNow() {
  return (
    <section className="section why" id="why-now" aria-labelledby="why-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{W.eyebrow}</p>
          <h2 id="why-title">{W.h2}</h2>
          <p>{W.intro}</p>
        </Reveal>

        <div className="why__cols">
          {W.columns.map((c) => (
            <Reveal key={c.id} className={`why__col why__col--${c.id}`}>
              <h3>{c.title}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>
                    <Icon name={c.id === "arriving" ? "alert" : "minus"} size={16} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <ul className="why__stats">
          {W.stats.map((s) => (
            <li key={s.value} className="why__stat">
              <strong>{s.value}</strong>
              <p>{s.text}</p>
              <p className="why__source">
                {W.sourceLabel}{" "}
                <a href={s.source.href} target="_blank" rel="noopener" data-interaction="why-now-source">
                  <cite>{s.source.name}</cite>
                </a>
              </p>
            </li>
          ))}
        </ul>
        <p className="why__closing">{W.closing}</p>
      </div>
    </section>
  );
}
