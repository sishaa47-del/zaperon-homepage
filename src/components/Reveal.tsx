import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** Fades content up once when it first scrolls into view. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { threshold: 0.12, once: true, rootMargin: "0px 0px -40px 0px" });
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
