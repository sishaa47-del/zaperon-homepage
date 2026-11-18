import { useState } from "react";
import { CLAIMS } from "../data/claims";
import { reviewRegister } from "../content/homepage";

/** Floating list of claims awaiting validation. Only rendered with ?review=1. */
export function ReviewPanel() {
  const [open, setOpen] = useState(true);
  return (
    <aside className="review" aria-label="Claims awaiting validation">
      <button type="button" className="review__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        ⚑ {Object.keys(CLAIMS).length + reviewRegister.length} claims to validate
      </button>
      {open && (
        <ol>
          {Object.entries(CLAIMS).map(([id, c]) => (
            <li key={id}>
              <strong>{c.label}</strong>
              <span>{c.note}</span>
            </li>
          ))}
          {reviewRegister.map((note) => (
            <li key={note}>
              <strong>v4 copy</strong>
              <span>{note}</span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
