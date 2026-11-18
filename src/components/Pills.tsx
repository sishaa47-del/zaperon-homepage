import { Icon } from "./Icon";

export type Outcome = "allowed" | "blocked" | "view" | "warn";

const TONE: Record<Outcome, string> = { allowed: "ok", blocked: "deny", view: "warn", warn: "warn" };
const ICON = { allowed: "check", blocked: "x", view: "eye", warn: "alert" } as const;

/** Outcome pill: colour plus icon plus text, never colour alone. */
export function OutcomePill({ outcome, label }: { outcome: Outcome; label: string }) {
  return (
    <span className={`chip chip--${TONE[outcome]}`}>
      <Icon name={ICON[outcome]} size={12} strokeWidth={2.5} />
      {label}
    </span>
  );
}
