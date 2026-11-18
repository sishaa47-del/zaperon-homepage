import { Icon, type IconName } from "./Icon";

/**
 * Integration marks for the hub. Brand marks are simplified inline SVG;
 * everything else uses the icon set. Always decorative: each node has a text label.
 */
export function Logo({ name, size = 22 }: { name: string; size?: number }) {
  const common = { width: size, height: size, "aria-hidden": true, focusable: false } as const;
  switch (name) {
    case "microsoft":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
          <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
          <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
          <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
        </svg>
      );
    case "google":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
          <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
          <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path
            fill="#181717"
            d="M12 .3a12 12 0 00-3.8 23.4c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.82.57A12 12 0 0012 .3"
          />
        </svg>
      );
    case "sap":
      return (
        <svg viewBox="0 0 48 24" width={size * 2} height={size} aria-hidden="true" focusable="false">
          <path fill="#0A6ED1" d="M0 0h48L24 24H0z" />
          <text x="4" y="16.5" fill="#fff" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12">
            SAP
          </text>
        </svg>
      );
    default: {
      const map: Record<string, IconName> = { ad: "users", ldap: "database" };
      return <Icon name={map[name] ?? (name as IconName)} size={size} />;
    }
  }
}
