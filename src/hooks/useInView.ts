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

/**
 * Auto-advances a tabbed demo every `ms` while it is in view.
 * Pauses on hover and keyboard focus inside `ref`; `stop()` ends it for good (call on any user choice).
 * Never runs under reduced motion or when `enabled` is false.
 */
export function useAutoCycle<T extends HTMLElement>(
  ref: RefObject<T | null>,
  advance: () => void,
  { ms, enabled = true, step }: { ms: number; enabled?: boolean; step: unknown },
) {
  const inView = useInView(ref, { threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setPaused(true);
    const off = () => setPaused(false);
    const focusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) setPaused(false);
    };
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerleave", off);
    el.addEventListener("focusin", on);
    el.addEventListener("focusout", focusOut);
    return () => {
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("focusin", on);
      el.removeEventListener("focusout", focusOut);
    };
  }, [ref]);

  useEffect(() => {
    if (!enabled || stopped || paused || reduced || !inView) return;
    const t = window.setTimeout(advance, ms);
    return () => window.clearTimeout(t);
    // `step` restarts the timer after every change, manual or automatic.
  }, [enabled, stopped, paused, reduced, inView, ms, step, advance]);

  return { stop: () => setStopped(true), running: enabled && !stopped && !reduced };
}
