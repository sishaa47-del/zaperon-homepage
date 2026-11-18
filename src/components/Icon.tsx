import type { SVGProps } from "react";

/** Small stroke icon set (24px grid, 1.75 stroke). Decorative by default. */
const PATHS = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c.9-3.6 3.9-5.6 7.5-5.6s6.6 2 7.5 5.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 19.5c.8-3.1 3.2-4.8 6.2-4.8s5.4 1.7 6.2 4.8" />
      <path d="M15.5 5.6a3.2 3.2 0 010 5.8M17.6 14.9c1.9.6 3.2 2.1 3.6 4.6" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
      <path d="M11 18h2" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="5" width="15" height="10.5" rx="1.6" />
      <path d="M2.5 19h19" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8.5-8.5M16 7l2.5 2.5M14 9l1.8 1.8" />
    </>
  ),
  fingerprint: (
    <path d="M7.5 19.5c1-1.8 1.5-4 1.5-6.5a3 3 0 016 0c0 1.2-.1 2.3-.3 3.4M12 13c0 3-.7 5.6-2 7.6M17.6 18.2c.6-1.6.9-3.3.9-5.2a6.5 6.5 0 00-12.3-2.9M4.5 15.5c.3-.8.5-1.6.5-2.5M12 2.5A10.5 10.5 0 0122.5 13c0 1-.1 1.9-.3 2.8" />
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>
  ),
  chat: <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4 3.5V16H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 9.5h8M8 12.5h5" />,
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="16" height="6.5" rx="1.6" />
      <path d="M8 7.25h.01M8 16.75h.01" />
    </>
  ),
  app: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.5L2.8 19.5h18.4z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2" />
      <path d="M9 4.5V3h6v1.5M8.5 12.5l2.3 2.3 4.7-4.6" />
    </>
  ),
  bank: <path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18" />,
  factory: <path d="M3 20.5V10l5 3V10l5 3V6.5h4l1 4.5h3v9.5zM7 17h2M12 17h2M17 17h1" />,
  landmark: (
    <path d="M12 3.5l8.5 4v2h-17v-2zM5.5 9.5v8M10 9.5v8M14 9.5v8M18.5 9.5v8M3 20.5h18" />
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.3a4.3 4.3 0 017.5 2.5C19.5 15.4 12 20 12 20zM8 12h2l1.2-2 1.6 4 1.2-2h2" />
  ),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  plug: <path d="M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 01-11 0zM12 17v4" />,
  layers: <path d="M12 3.5l9 4.8-9 4.8-9-4.8zM3 12.3l9 4.8 9-4.8M3 16.2L12 21l9-4.8" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  refresh: <path d="M20 11a8 8 0 00-14.3-4.6L4 8M4 4v4h4M4 13a8 8 0 0014.3 4.6L20 16M20 20v-4h-4" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5v6M8 7.6v.01M11.5 16.5v-6M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6v3.5" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10 9.3v5.4l4.6-2.7z" />
    </>
  ),
  minus: <path d="M5 12h14" />,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  size = 20,
  label,
  ...rest
}: { name: IconName; size?: number; label?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
