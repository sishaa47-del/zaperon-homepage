import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/useInView";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Fades content up once as it scrolls into view.
 * Content is visible by default; only elements that start below the fold get
 * the .is-entering animation class when they enter. Reduced motion: no class, no animation.
 */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || typeof IntersectionObserver === "undefined") return;
    // Already on screen at load: leave it alone so nothing flashes.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setEntering(true);
          io.disconnect();
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${entering ? "is-entering" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
