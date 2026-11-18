import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SiteContext, type Intent } from "../context";
import { AnnouncementBar, Nav } from "./Nav";
import { Footer } from "./Footer";
import { RequestForm } from "./RequestForm";
import { ReviewPanel } from "./ReviewPanel";
import "../styles/sections.css";

function isReviewMode() {
  try {
    return new URLSearchParams(window.location.search).has("review");
  } catch {
    return false;
  }
}

/** Shared page frame for the homepage, /india/ and /security/. */
export function Shell({ children }: { children: ReactNode }) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [review] = useState(isReviewMode);

  useEffect(() => {
    document.documentElement.classList.toggle("review-mode", review);
  }, [review]);

  const ctx = useMemo(() => ({ openForm: setIntent }), []);

  return (
    <SiteContext.Provider value={ctx}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <RequestForm intent={intent} onClose={() => setIntent(null)} />
      {review && <ReviewPanel />}
    </SiteContext.Provider>
  );
}
