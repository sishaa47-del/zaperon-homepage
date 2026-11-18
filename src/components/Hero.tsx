import { useState } from "react";
import { Icon } from "./Icon";
import { HeroVisual } from "./HeroVisual";
import { VideoModal } from "./VideoModal";
import { useSite } from "../context";
import { hero } from "../content/homepage";
import "../styles/hero.css";

export function Hero() {
  const { openForm } = useSite();
  const [video, setVideo] = useState(false);
  return (
    <section className="hero on-dark" id="top" aria-labelledby="hero-title">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">
            {hero.h1Lead} <span className="serif hero__mark">{hero.h1Accent}</span>
          </h1>
          <p className="hero__lead">{hero.subhead}</p>
          <div className="hero__ctas">
            <button type="button" className="btn btn--accent btn--lg" data-cta="hero-primary" onClick={() => openForm("demo")}>
              {hero.primaryCta} <Icon name="arrowRight" size={18} />
            </button>
            <button
              type="button"
              className="btn btn--ghost-dark btn--lg"
              data-cta="hero-video"
              aria-haspopup="dialog"
              onClick={() => setVideo(true)}
            >
              <Icon name="play" size={18} /> {hero.videoCta}
            </button>
          </div>
          <p className="hero__audience">{hero.audience}</p>
        </div>
        <div className="hero__visual">
          <HeroVisual />
        </div>
      </div>
      <VideoModal open={video} onClose={() => setVideo(false)} />
    </section>
  );
}
