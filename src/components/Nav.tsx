import { useEffect, useRef, useState } from "react";
import { announcement, useCases } from "../content/homepage";
import { Icon, type IconName } from "./Icon";
import { LINKS, useSite } from "../context";
import { homeHref } from "../paths";
import { Flag } from "./Flag";
import "../styles/nav.css";

type MenuItem = { label: string; desc?: string; href: string; icon?: IconName; external?: boolean };
type Menu = { id: string; label: string; items: MenuItem[]; feature?: { kicker: string; title: string; href: string; cta: string } };

const MENUS: Menu[] = [
  {
    id: "platform",
    label: "Platform",
    items: [
      { label: "Identity & passwordless", desc: "SSO, MFA and phishing-resistant login", href: "#who-passwordless", icon: "fingerprint" },
      { label: "Zero Trust Access", desc: "Per-app access that replaces the VPN", href: "#who-apps", icon: "route" },
      { label: "Data protection", desc: "Endpoint, web and email DLP", href: "#data-exits", icon: "file" },
      { label: "Web & SaaS security", desc: "Web filtering and Shadow IT control", href: "#what-data-gets-out", icon: "globe" },
      { label: "AI governance", desc: "Shadow AI discovery and prompt protection", href: "#ai-governance", icon: "chat" },
    ],
    feature: { kicker: "How it works", title: "Three questions. One connected decision.", href: "#how-it-works", cta: "See the flow" },
  },
  {
    id: "solutions",
    label: "Solutions",
    items: useCases.cases.map((c) => ({ label: c.title.replace(/\.$/, ""), href: `#uc-${c.id}`, icon: c.icon as IconName })),
    feature: { kicker: "All solutions", title: "Explore every Zaperon use case", href: LINKS.solutions, cta: "View solutions" },
  },
  {
    // Industry pages are not live on zaperon.com yet; these point to the solutions hub (see VALIDATION.md).
    id: "industries",
    label: "Industries",
    items: [
      { label: "Banking & NBFCs", desc: "Branch users and field agents", href: LINKS.solutions, icon: "bank", external: true },
      { label: "Manufacturing", desc: "Designs, source code and supplier access", href: LINKS.solutions, icon: "factory", external: true },
      { label: "Public sector", desc: "Distributed staff and citizen data", href: LINKS.solutions, icon: "landmark", external: true },
      { label: "Healthcare", desc: "Patient data across shared devices", href: LINKS.solutions, icon: "heart", external: true },
      { label: "IT & ITeS", desc: "Offshore teams and client environments", href: LINKS.solutions, icon: "code", external: true },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      { label: "Blog", href: LINKS.blog, icon: "file", external: true },
      { label: "Resources library", href: LINKS.resources, icon: "layers", external: true },
      { label: "Documentation", href: LINKS.docs, icon: "code", external: true },
      { label: "AI governance datasheet", href: LINKS.aiDatasheet, icon: "chat", external: true },
    ],
    feature: {
      kicker: "Case study",
      title: "Why a ₹1,000 crore manufacturer chose Zaperon to secure its data",
      href: LINKS.mfgCaseStudy,
      cta: "Read the case study",
    },
  },
  {
    id: "company",
    label: "Company",
    items: [
      { label: "Partners", href: LINKS.partners, icon: "users", external: true },
      { label: "Contact us", href: LINKS.contact, icon: "mail", external: true },
      { label: "Seed funding news", href: LINKS.seedNews, icon: "chat", external: true },
    ],
  },
];

function MenuLink({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  return (
    <a
      className="menu-link"
      href={homeHref(item.href)}
      onClick={onNavigate}
      {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
    >
      {item.icon && (
        <span className="menu-link__icon">
          <Icon name={item.icon} size={18} />
        </span>
      )}
      <span>
        <span className="menu-link__label">{item.label}</span>
        {item.desc && <span className="menu-link__desc">{item.desc}</span>}
      </span>
    </a>
  );
}

export function Nav() {
  const { openForm } = useSite();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop menus on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock page scroll behind the mobile drawer
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1080px)");
    const onChange = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeAll = () => {
    setOpen(null);
    setMobileOpen(false);
  };

  const hoverOpen = (id: string) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(id), 60);
  };
  const hoverClose = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(null), 180);
  };

  return (
    <header ref={navRef} className={`site-nav ${scrolled ? "is-scrolled" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
      <div className="container site-nav__inner">
        <a href={homeHref("#top")} className="site-nav__logo" aria-label="Zaperon home" onClick={closeAll}>
          <img src={LINKS.logo} alt="Zaperon" width="132" height="28" />
        </a>

        <nav aria-label="Primary" className="site-nav__primary">
          <ul className="site-nav__menus">
            {MENUS.map((m) => (
              <li key={m.id} onMouseEnter={() => hoverOpen(m.id)} onMouseLeave={hoverClose}>
                <button
                  type="button"
                  className="site-nav__trigger"
                  aria-expanded={open === m.id}
                  aria-controls={`menu-${m.id}`}
                  onClick={() => setOpen(open === m.id ? null : m.id)}
                >
                  {m.label}
                  <Icon name="chevronDown" size={15} />
                </button>
                <div
                  id={`menu-${m.id}`}
                  className={`dropdown ${m.feature ? "dropdown--wide" : ""}`}
                  data-open={open === m.id}
                  hidden={open !== m.id}
                >
                  <ul className="dropdown__list">
                    {m.items.map((it) => (
                      <li key={it.label}>
                        <MenuLink item={it} onNavigate={closeAll} />
                      </li>
                    ))}
                  </ul>
                  {m.feature && (
                    <a
                      className="dropdown__feature"
                      href={homeHref(m.feature.href)}
                      onClick={closeAll}
                      {...(m.feature.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      <span className="dropdown__kicker">{m.feature.kicker}</span>
                      <span className="dropdown__title">{m.feature.title}</span>
                      <span className="link-arrow">
                        {m.feature.cta} <Icon name="arrowRight" size={16} />
                      </span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-nav__actions">
          <a className="site-nav__text-link" href={LINKS.login} target="_blank" rel="noopener" data-interaction="nav-login">
            Login
            <Flag id="login" />
          </a>
          <button type="button" className="site-nav__text-link" data-interaction="nav-contact-sales" onClick={() => openForm("sales")}>
            Contact sales
          </button>
          <button type="button" className="btn btn--accent btn--sm" data-cta="nav-demo" onClick={() => openForm("demo")}>
            Book a demo
          </button>
        </div>

        <button
          type="button"
          className="site-nav__burger"
          data-interaction="nav-mobile-toggle"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => {
            // The drawer is fixed; start it right below the nav wherever the nav currently sits.
            setMenuTop(navRef.current?.getBoundingClientRect().bottom ?? 0);
            setMobileOpen((v) => !v);
          }}
        >
          <Icon name={mobileOpen ? "x" : "menu"} size={22} />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!mobileOpen} style={{ top: menuTop }}>
        <nav aria-label="Mobile" className="container">
          <ul>
            {MENUS.map((m) => (
              <li key={m.id} className="mobile-menu__group">
                <button
                  type="button"
                  className="mobile-menu__trigger"
                  aria-expanded={mobileSection === m.id}
                  onClick={() => setMobileSection(mobileSection === m.id ? null : m.id)}
                >
                  {m.label}
                  <Icon name="chevronDown" size={18} />
                </button>
                <ul hidden={mobileSection !== m.id} className="mobile-menu__list">
                  {m.items.map((it) => (
                    <li key={it.label}>
                      <MenuLink item={it} onNavigate={closeAll} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__actions">
            <button
              type="button"
              className="btn btn--accent btn--lg"
              data-cta="nav-demo-mobile"
              onClick={() => {
                closeAll();
                openForm("demo");
              }}
            >
              Book a demo
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--lg"
              onClick={() => {
                closeAll();
                openForm("sales");
              }}
            >
              Contact sales
            </button>
            <a className="mobile-menu__login" href={LINKS.login} target="_blank" rel="noopener">
              Login
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function AnnouncementBar() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <div className="announce" role="region" aria-label="Announcement">
      <div className="container announce__inner">
        <p>
          <strong>{announcement.lead}</strong> {announcement.text}{" "}
          <a href={announcement.href} target="_blank" rel="noopener" data-interaction="announcement-link">
            {announcement.linkText} <Icon name="arrowRight" size={14} />
          </a>
        </p>
        <button type="button" className="announce__close" aria-label="Dismiss announcement" onClick={() => setHidden(true)}>
          <Icon name="x" size={16} />
        </button>
      </div>
    </div>
  );
}
