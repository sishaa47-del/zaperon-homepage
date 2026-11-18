import { useState } from "react";
import { Icon } from "./Icon";
import { HeroVisual } from "./HeroVisual";
import { VideoModal } from "./VideoModal";
import { hero } from "../content/homepage";
import "../styles/hero.css";

export function Hero() {
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
            <a className="btn btn--accent btn--lg" href={hero.primaryCta.href} data-cta="hero-primary">
              {hero.primaryCta.label} <Icon name="arrowRight" size={18} />
            </a>
            {/* The one video link in the hero. Without JavaScript it opens the video on YouTube. */}
            <a
              className="btn btn--ghost-dark btn--lg"
              href={hero.videoWatchUrl}
              data-cta="hero-video"
              aria-haspopup="dialog"
              onClick={(e) => {
                e.preventDefault();
                setVideo(true);
              }}
            >
              <Icon name="play" size={18} /> {hero.videoCta}
            </a>
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
