import { useEffect, useState, type RefObject } from "react";

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
