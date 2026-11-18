import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { LINKS, type Intent } from "../context";

const COPY: Record<Intent, { title: string; sub: string; submit: string }> = {
  demo: {
    title: "Book a demo",
    sub: "In 30 minutes, we'll show how Zaperon handles a trusted login, an unknown laptop and an AI prompt, using your apps as the example.",
    submit: "Request demo",
  },
  sales: {
    title: "Contact sales",
    sub: "Tell us about your users, devices and apps and we'll route you to the right team.",
    submit: "Contact sales",
  },
};

/**
 * Lead form shown in a native <dialog>.
 * TODO(integration): replace the mailto hand-off with the CRM/marketing-automation
 * endpoint (and consent capture) before launch.
 */
export function RequestForm({
  intent,
  onClose,
}: {
  intent: Intent | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (intent && !d.open) {
      setSent(false);
      setErrors({});
      d.showModal();
    } else if (!intent && d.open) {
      d.close();
    }
  }, [intent]);

  if (!intent) return <dialog ref={ref} className="rf" onClose={onClose} />;

  const copy = COPY[intent];
  const title = copy.title;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: Record<string, string> = {};
    if (!v("name")) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) errs.email = "Please enter a valid work email.";
    if (!v("company")) errs.company = "Please enter your company.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = e.currentTarget.querySelector<HTMLInputElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    const body = [
      `Request: ${title}`,
      `Name: ${v("name")}`,
      `Work email: ${v("email")}`,
      `Company: ${v("company")}`,
      `Company size: ${v("size")}`,
      `Region: ${v("country")}`,
      "",
      v("message"),
    ].join("\n");
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <dialog
      ref={ref}
      className="rf"
      aria-labelledby="rf-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="rf__inner">
        <button type="button" className="rf__close" aria-label="Close" onClick={onClose}>
          <Icon name="x" size={20} />
        </button>
        {sent ? (
          <div className="rf__done">
            <span className="rf__done-icon">
              <Icon name="check" size={26} strokeWidth={2.5} />
            </span>
            <h2 id="rf-title">Almost there</h2>
            <p>
              Your email app should open with your request to <strong>{LINKS.email}</strong>. Send it and the Zaperon team
              will reply. If nothing opened, email us directly.
            </p>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="rf-title">
              {title}
            </h2>
            <p className="rf__sub">{copy.sub}</p>
            <form onSubmit={submit} noValidate data-interaction={`form-${intent}`}>
              <div className="rf__row">
                <Field name="name" label="Full name" autoComplete="name" error={errors.name} />
                <Field name="email" label="Work email" type="email" autoComplete="email" error={errors.email} />
              </div>
              <div className="rf__row">
                <Field name="company" label="Company" autoComplete="organization" error={errors.company} />
                <label className="rf__field">
                  <span>Company size</span>
                  <select name="size" defaultValue="100 to 500">
                    <option>Under 100</option>
                    <option>100 to 500</option>
                    <option>500 to 2,000</option>
                    <option>2,000+</option>
                  </select>
                </label>
              </div>
              <label className="rf__field">
                <span>Region</span>
                <select name="country" defaultValue="">
                  <option value="" disabled>
                    Select a region
                  </option>
                  <option>India</option>
                  <option>United States</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="rf__field">
                <span>What would you like to secure? (optional)</span>
                <textarea name="message" rows={3} placeholder="For example: 400 users, 120 contractors on personal laptops, VPN to two data centres" />
              </label>
              <button type="submit" className="btn btn--accent btn--lg rf__submit" data-interaction={`form-${intent}-submit`}>
                {copy.submit} <Icon name="arrowRight" size={18} />
              </button>
              <p className="rf__fine">
                Submitting opens an email to {LINKS.email}. See our{" "}
                <a href={LINKS.privacy} target="_blank" rel="noopener">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className={`rf__field ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
      />
      {error && (
        <small id={`${name}-err`} role="alert">
          {error}
        </small>
      )}
    </label>
  );
}
