import type { ReactNode } from "react";
import { AnnouncementBar, Nav } from "./Nav";
import { Footer } from "./Footer";
import "../styles/sections.css";

/** Shared page frame for the homepage, /india/ and /security/. */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AnnouncementBar />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
