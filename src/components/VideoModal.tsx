import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { LINKS } from "../context";
import { hero } from "../content/homepage";

/**
 * Accessible video modal (native <dialog>: focus trap, Esc to close).
 * Everything inside (title and player) mounts only while open, so nothing loads or duplicates up front.
 */
export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const url = hero.videoEmbedUrl;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="video-modal"
      aria-labelledby="video-modal-title"
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Content mounts only while open, so the closed dialog adds no duplicate "Watch" text to the page. */}
      {open && (
      <div className="video-modal__inner">
        <div className="video-modal__head">
          <p className="video-modal__title" id="video-modal-title">
            {hero.videoCta}
          </p>
          <button type="button" className="video-modal__close" aria-label="Close video" onClick={onClose} data-interaction="hero-video-close">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="video-modal__frame">
          {url ? (
            <iframe
              src={`${url}${url.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
              title={hero.videoCta}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              loading="lazy"
            />
          ) : (
            <div className="video-modal__slot">
              <a href={LINKS.youtube} target="_blank" rel="noopener" data-interaction="hero-video-channel">
                <Icon name="play" size={40} />
                <span>Watch on YouTube</span>
              </a>
            </div>
          )}
        </div>
      </div>
      )}
    </dialog>
  );
}
