import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/** True while (or once, when `once`) the element intersects the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.2, once = false, rootMargin = "0px" }: { threshold?: number; once?: boolean; rootMargin?: string } = {},
) {
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, once, rootMargin]);

  return inView;
}

export function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Lets nav links like `#uc-vpn` select a tab inside an interactive section.
 * Calls `onMatch(id)` for hashes that start with `prefix`.
 */
export function useHashSelect(prefix: string, ids: readonly string[], onMatch: (id: string) => void) {
  useEffect(() => {
    const check = () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith(prefix)) {
        const id = hash.slice(prefix.length);
        if (ids.includes(id)) onMatch(id);
      }
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [prefix, ids, onMatch]);
}

/**
 * False on the prerendered HTML and the first client render, true after hydration.
 * Interactive widgets show all their content until mounted, so the page reads fine without JavaScript.
 */
const noopSubscribe = () => () => {};
export function useMounted() {
  // Server snapshot (prerender and hydration) is false; the client snapshot after hydration is true.
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/**
 * For draw-in effects: true in the static HTML; if the element starts below the fold,
 * flips to false after mount and back to true once it scrolls into view. Reduced motion: always true.
 */
export function useDrawOnView<T extends Element>(ref: RefObject<T | null>, threshold = 0.3) {
  const reduced = usePrefersReducedMotion();
  const [drawn, setDrawn] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setDrawn(false);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      setDrawn(true);
    };
  }, [ref, reduced, threshold]);
  return drawn;
}
