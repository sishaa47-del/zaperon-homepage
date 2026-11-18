import { Icon, type IconName } from "./Icon";
import { Reveal } from "./Reveal";
import { problem } from "../content/homepage";

export function Problem() {
  return (
    <section className="section problem" id="problem" aria-labelledby="problem-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{problem.eyebrow}</p>
          <h2 id="problem-title">{problem.h2}</h2>
          <p>{problem.intro}</p>
        </Reveal>
        <ol className="problem__grid">
          {problem.cards.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} className="problem__card">
              {/* Focusable so keyboard users get the same hover treatment. */}
              <div className="problem__inner" tabIndex={0} aria-labelledby={`problem-card-${i}`} data-interaction={`problem-card-${i + 1}-focus`}>
                <span className="problem__num" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="problem__icon" aria-hidden="true">
                  <Icon name={p.icon as IconName} size={24} />
                </span>
                <h3 id={`problem-card-${i}`}>{p.title}</h3>
                <p>{p.body}</p>
                <span className="problem__tag">{p.tags}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
