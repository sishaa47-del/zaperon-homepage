/** Site root. "/" locally; "/<repo>/" on GitHub Pages (set by BASE_PATH at build time). */
export const BASE = import.meta.env.BASE_URL;

/** Path to a page on this site, e.g. sitePath("/india/"). Leaves full URLs and mailto links alone. */
export function sitePath(path: string) {
  return path.startsWith("/") ? `${BASE}${path.slice(1)}` : path;
}

/** True on the homepage. Section anchors need the homepage path on the India and security pages. */
export function isHome() {
  if (typeof window === "undefined") return true;
  const p = window.location.pathname;
  return p === BASE || p === `${BASE}index.html`;
}

/** Homepage anchor that also works from a subpage; also resolves site paths. */
export function homeHref(href: string) {
  if (href.startsWith("#")) return isHome() ? href : `${BASE}${href}`;
  return sitePath(href);
}
