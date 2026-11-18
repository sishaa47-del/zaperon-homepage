import { CLAIMS, type ClaimId } from "../data/claims";
import type { Claim } from "../content/homepage";

type Props = { id: ClaimId; claim?: never } | { claim: Claim<unknown>; id?: never };

/**
 * Validation marker. Invisible unless the page is in review mode (?review=1).
 * Pass a legacy claim id, or a content claim (renders only for needs-validation).
 */
export function Flag(props: Props) {
  let title: string;
  if (props.claim) {
    if (props.claim.status !== "needs-validation") return null;
    title = props.claim.validate ?? "Needs validation";
  } else {
    const c = CLAIMS[props.id];
    title = `${c.label}: ${c.note}`;
  }
  return (
    <span className="flag" title={title} aria-hidden="true">
      ⚑ Validate
    </span>
  );
}
