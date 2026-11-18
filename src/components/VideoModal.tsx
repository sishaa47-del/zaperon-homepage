import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import { Flag } from "./Flag";
import { hero } from "../content/homepage";

/**
 * Accessible video modal (native <dialog>: focus trap, Esc to close).
 * The player iframe is only mounted while open, so nothing loads up front.
 */
export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const url = hero.videoEmbedUrl.value;

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
      <div className="video-modal__inner">
        <div className="video-modal__head">
          <p className="video-modal__title" id="video-modal-title">
            {hero.videoCta}
            <Flag claim={hero.videoEmbedUrl} />
          </p>
          <button type="button" className="video-modal__close" aria-label="Close video" onClick={onClose} data-interaction="hero-video-close">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="video-modal__frame">
          {open && url ? (
            <iframe
              src={`${url}${url.includes("?") ? "&" : "?"}autoplay=1&rel=0`}
              title={hero.videoCta}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              loading="lazy"
            />
          ) : (
            <div className="video-modal__slot" aria-hidden="true">
              <Icon name="play" size={40} />
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
