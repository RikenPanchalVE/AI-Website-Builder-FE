import React, { Suspense } from "react";
import ComponentRegistry from "./ComponentRegistry";

interface Section {
  id: string;
  component: string;
  props: Record<string, any>;
  order: number;
}

interface Page {
  slug: string;
  title: string;
  sections: Section[];
}

interface WebsiteData {
  name?: string;
  description?: string;
  logo?: string | null;
  pages: Page[];
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    background?: string;
    textColor?: string;
    mutedColor?: string;
    borderColor?: string;
    fontStyle?: string;
    fontFamily?: string;
  };
  navigation?: {
    items?: Array<{ label?: string; href?: string; page?: string; slug?: string }>;
  };
  footer?: {
    copyright?: string;
    links?: Array<{ label?: string; href?: string }>;
  };
}

interface SectionRendererProps {
  component: string;
  props: Record<string, any>;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  component,
  props,
}) => {
  const Component = ComponentRegistry[component];

  if (!Component) {
    return (
      <div className="p-4 bg-muted text-muted-foreground text-sm text-center">
        Component &quot;{component}&quot; not found
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

interface PageRendererProps {
  page: Page;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ page }) => {
  const sorted = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <div>
      {sorted.map((section) => (
        <SectionRenderer
          key={section.id}
          component={section.component}
          props={section.props}
        />
      ))}
    </div>
  );
};

interface WebsiteRendererProps {
  data: WebsiteData;
  currentPage?: string;
  onNavigatePage?: (slug: string) => void;
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;
  const value = Number.parseInt(full, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const getReadableTextColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#0a0a0a" : "#ffffff";
};

const hexWithAlpha = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const WebsiteRenderer: React.FC<WebsiteRendererProps> = ({
  data,
  currentPage = "home",
  onNavigatePage,
}) => {
  const page = data.pages.find((p) => p.slug === currentPage) || data.pages[0];
  const theme = data.theme;

  const primaryColor = theme?.primaryColor || "#1a1a1a";
  const secondaryColor = theme?.secondaryColor || "#c8ff00";
  const backgroundColor = theme?.backgroundColor || theme?.background || "#fafafa";
  const foregroundColor = theme?.foregroundColor || theme?.textColor || "#0a0a0a";
  const borderColor = theme?.borderColor || "#e0e0e0";
  const mutedColor = theme?.mutedColor || "#f0f0f0";
  const fontFamily = theme?.fontFamily || theme?.fontStyle || "Inter";

  const primaryForeground = getReadableTextColor(primaryColor);
  const secondaryForeground = getReadableTextColor(secondaryColor);
  const accentColor = (theme as any)?.accentColor || secondaryColor;
  const primarySoft = (theme as any)?.primarySoft || hexWithAlpha(primaryColor, 0.06);
  const secondarySoft = (theme as any)?.secondarySoft || hexWithAlpha(secondaryColor, 0.15);
  const surfaceStrong = (theme as any)?.surfaceStrong || hexWithAlpha(primaryColor, 0.12);
  const gradientFrom = (theme as any)?.gradientFrom || primaryColor;
  const gradientTo = (theme as any)?.gradientTo || secondaryColor;
  const ringGlow = (theme as any)?.ringGlow || hexWithAlpha(primaryColor, 0.2);

  const spacing = (theme as any)?.spacing || "normal";
  const shadow = (theme as any)?.shadow || "0 4px 6px -1px rgba(0,0,0,0.1)";
  const letterSpacing = (theme as any)?.letterSpacing || "normal";
  const borderWidth = (theme as any)?.borderWidth || "1px";
  const borderRadius = (theme as any)?.borderRadius || "8px";
  const buttonStyle = (theme as any)?.buttonStyle || "rounded";

  const themeStyle = {
    "--color-primary": primaryColor,
    "--color-primary-foreground": primaryForeground,
    "--color-secondary": secondaryColor,
    "--color-secondary-foreground": secondaryForeground,
    "--color-background": backgroundColor,
    "--color-foreground": foregroundColor,
    "--color-muted": mutedColor,
    "--color-muted-foreground": "#888888",
    "--color-border": borderColor,
    "--color-card": backgroundColor,
    "--color-card-foreground": foregroundColor,
    fontFamily: `${fontFamily}, Inter, system-ui, sans-serif`,
  } as React.CSSProperties;

  const previewOverrides = `
    /* ═══════════════════════════════════════════════════════════
       PREMIUM EDITORIAL DESIGN SYSTEM
       ═══════════════════════════════════════════════════════════ */

    .theme-preview {
      --theme-primary: ${primaryColor};
      --theme-primary-foreground: ${primaryForeground};
      --theme-secondary: ${secondaryColor};
      --theme-secondary-foreground: ${secondaryForeground};
      --theme-background: ${backgroundColor};
      --theme-foreground: ${foregroundColor};
      --theme-muted: ${mutedColor};
      --theme-border: ${borderColor};
      --theme-card: ${backgroundColor};
      --theme-accent: ${accentColor};
      --theme-primary-soft: ${primarySoft};
      --theme-secondary-soft: ${secondarySoft};
      --theme-surface-strong: ${surfaceStrong};
      --theme-gradient-from: ${gradientFrom};
      --theme-gradient-to: ${gradientTo};
      --theme-ring-glow: ${ringGlow};
      --c1: ${primaryColor};
      --ctx: ${foregroundColor};
      --ctx2: ${mutedColor};
      --bg: ${backgroundColor};
      --bgc: ${mutedColor};
      --bdr: ${borderColor};
      --bgd: ${mutedColor};
      --ds-spacing: ${spacing === "compact" ? "4rem" : spacing === "relaxed" ? "8rem" : "6rem"};
      --ds-shadow: ${shadow};
      --ds-letter-spacing: ${letterSpacing === "tight" ? "-0.04em" : letterSpacing === "wide" ? "0.06em" : "0"};
      --ds-border-width: ${borderWidth};
      --ds-radius: ${borderRadius};
      --ds-btn-radius: ${buttonStyle === "pill" ? "9999px" : buttonStyle === "sharp" ? "0px" : buttonStyle === "square" ? "2px" : borderRadius};

      background-color: var(--theme-background);
      color: var(--theme-foreground);
      font-family: ${fontFamily}, Inter, system-ui, -apple-system, sans-serif;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
      overflow-x: hidden;
    }
    .theme-preview *, .theme-preview *::before, .theme-preview *::after { box-sizing: border-box; }
    .theme-preview section { position: relative; }
    .theme-preview a[href] { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }

    /* ── Tailwind Color Mapping ──────────────────────────────── */
    .theme-preview .bg-primary { background-color: var(--theme-primary) !important; }
    .theme-preview .text-primary { color: var(--theme-primary) !important; }
    .theme-preview .border-primary { border-color: var(--theme-primary) !important; }
    .theme-preview .ring-primary { --tw-ring-color: var(--theme-primary) !important; }
    .theme-preview .text-primary-foreground { color: var(--theme-primary-foreground) !important; }
    .theme-preview .bg-primary-foreground { background-color: var(--theme-primary-foreground) !important; }
    .theme-preview .bg-secondary { background-color: var(--theme-secondary) !important; }
    .theme-preview .text-secondary { color: var(--theme-secondary) !important; }
    .theme-preview .bg-secondary-foreground { background-color: var(--theme-secondary-foreground) !important; }
    .theme-preview .text-secondary-foreground { color: var(--theme-secondary-foreground) !important; }
    .theme-preview .bg-primary\\/5, .theme-preview .bg-primary\\/10 { background-color: var(--theme-primary-soft) !important; }
    .theme-preview .bg-secondary\\/5, .theme-preview .bg-secondary\\/10 { background-color: var(--theme-secondary-soft) !important; }
    .theme-preview .bg-accent { background-color: var(--theme-accent) !important; }
    .theme-preview .text-accent { color: var(--theme-accent) !important; }
    .theme-preview .from-primary { --tw-gradient-from: var(--theme-gradient-from) !important; }
    .theme-preview .to-primary { --tw-gradient-to: var(--theme-gradient-to) !important; }
    .theme-preview .to-secondary { --tw-gradient-to: var(--theme-gradient-to) !important; }
    .theme-preview .from-primary\\/10 { --tw-gradient-from: color-mix(in srgb, var(--theme-primary) 10%, transparent) !important; }
    .theme-preview .to-secondary\\/10 { --tw-gradient-to: color-mix(in srgb, var(--theme-secondary) 10%, transparent) !important; }
    .theme-preview .bg-background { background-color: var(--theme-background) !important; }
    .theme-preview .text-foreground { color: var(--theme-foreground) !important; }
    .theme-preview .bg-muted { background-color: var(--theme-muted) !important; }
    .theme-preview .bg-muted\\/50 { background-color: color-mix(in srgb, var(--theme-muted) 50%, white) !important; }
    .theme-preview .text-muted-foreground { color: #888888 !important; }
    .theme-preview .border-border { border-color: var(--theme-border) !important; }
    .theme-preview .bg-card { background-color: var(--theme-card) !important; }
    .theme-preview .bg-card\\/70 { background-color: color-mix(in srgb, var(--theme-card) 70%, white) !important; }
    .theme-preview .text-card-foreground { color: var(--theme-foreground) !important; }
    .theme-preview .bg-surfacestrong { background-color: var(--theme-surface-strong) !important; }
    .theme-preview .shadow-primary\\/20 { box-shadow: 0 20px 40px -12px var(--theme-primary) !important; }
    .theme-preview .shadow-primary\\/10 { box-shadow: 0 10px 25px -8px var(--theme-primary) !important; }
    .theme-preview .shadow-glow { box-shadow: 0 0 40px var(--theme-ring-glow) !important; }
    .theme-preview .ring-glow { box-shadow: 0 0 0 4px var(--theme-ring-glow) !important; }
    .theme-preview .text-glow { text-shadow: 0 0 20px var(--theme-ring-glow) !important; }

    /* ── Editorial Typography Scale ──────────────────────────── */
    .theme-preview h1 {
      font-size: clamp(2.8rem, 7vw, 6rem) !important;
      font-weight: 800 !important;
      line-height: 0.95 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
    }
    .theme-preview h2 {
      font-size: clamp(2rem, 4.5vw, 3.5rem) !important;
      font-weight: 700 !important;
      line-height: 1.05 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
    }
    .theme-preview h3 {
      font-size: clamp(1.25rem, 2vw, 1.75rem) !important;
      font-weight: 600 !important;
      line-height: 1.3 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
    }
    .theme-preview h4 {
      font-size: 1rem !important;
      font-weight: 600 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
      text-transform: uppercase !important;
    }
    .theme-preview p {
      font-size: clamp(1rem, 1.2vw, 1.15rem) !important;
      line-height: 1.7 !important;
    }

    /* ── Section Spacing ────────────────────────────────────── */
    .theme-preview section + section { margin-top: 0 !important; }

    /* ── Scroll Reveal Animations ───────────────────────────── */
    @keyframes pReveal { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pSlideLeft { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes pSlideRight { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes pScaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
    @keyframes pGradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes pMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes pFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pCounter { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pLineGrow { from { width: 0; } to { width: 100%; } }
    @keyframes pFloatOrb { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, -20px); } }
    @keyframes pPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
    @keyframes pTextReveal { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0% 0 0); } }

    /* ── Buttons ────────────────────────────────────────────── */
    .theme-preview button[class*="bg-primary"],
    .theme-preview a[class*="bg-primary"],
    .theme-preview [class*="btn-gradient"] {
      position: relative !important;
      overflow: hidden !important;
      border-radius: var(--ds-btn-radius) !important;
      font-weight: 600 !important;
      letter-spacing: 0.05em !important;
      text-transform: uppercase !important;
      font-size: 0.8rem !important;
      padding: 1rem 2.5rem !important;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .theme-preview button[class*="bg-primary"]:hover,
    .theme-preview a[class*="bg-primary"]:hover,
    .theme-preview [class*="btn-gradient"]:hover {
      transform: translateY(-2px) !important;
      letter-spacing: 0.12em !important;
    }
    .theme-preview a[class*="bg-white"],
    .theme-preview button[class*="bg-white"] {
      border-radius: var(--ds-btn-radius) !important;
      font-weight: 600 !important;
      letter-spacing: 0.05em !important;
      text-transform: uppercase !important;
      font-size: 0.8rem !important;
      padding: 1rem 2.5rem !important;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .theme-preview a[class*="bg-white"]:hover,
    .theme-preview button[class*="bg-white"]:hover {
      letter-spacing: 0.12em !important;
    }

    /* ── Navigation ─────────────────────────────────────────── */
    .theme-preview nav {
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
    }
    .theme-preview nav a,
    .theme-preview nav button {
      font-size: 0.8rem !important;
    }

    /* ── Footer ─────────────────────────────────────────────── */
    .theme-preview footer {
      position: relative !important;
      overflow: hidden !important;
    }

    /* ── Input Focus ────────────────────────────────────────── */
    .theme-preview input:focus, .theme-preview textarea:focus, .theme-preview select:focus {
      border-color: var(--theme-foreground) !important;
      outline: none !important;
      box-shadow: none !important;
    }

    /* ── Form Submit ────────────────────────────────────────── */
    .theme-preview form button[type="submit"],
    .theme-preview form button:not([type]) {
      background-color: var(--theme-primary) !important;
      color: var(--theme-primary-foreground) !important;
      font-weight: 600 !important;
      letter-spacing: 0.08em !important;
      text-transform: uppercase !important;
      font-size: 0.8rem !important;
      padding: 1rem 2.5rem !important;
      border-radius: var(--ds-btn-radius) !important;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .theme-preview form button[type="submit"]:hover,
    .theme-preview form button:not([type]):hover {
      letter-spacing: 0.15em !important;
    }

    /* ── CTA Gradient Sections ──────────────────────────────── */
    .theme-preview section[class*="bg-gradient-to-r"],
    .theme-preview section[class*="bg-gradient-to-br"] {
      position: relative !important;
      overflow: hidden !important;
    }

    /* ── Editorial Borders ──────────────────────────────────── */
    .theme-preview .editorial-border {
      border: var(--ds-border-width) solid var(--theme-border) !important;
    }
    .theme-preview .editorial-line {
      height: 1px !important;
      background-color: var(--theme-border) !important;
    }
    .theme-preview .editorial-label {
      font-size: 0.65rem !important;
      letter-spacing: 0.2em !important;
      text-transform: uppercase !important;
      font-weight: 500 !important;
    }

    /* ── Number Typography ──────────────────────────────────── */
    .theme-preview .number-display {
      font-size: clamp(3rem, 8vw, 8rem) !important;
      font-weight: 800 !important;
      line-height: 0.9 !important;
      letter-spacing: -0.06em !important;
    }

    /* ── Image Treatments ───────────────────────────────────── */
    .theme-preview .img-editorial {
      object-fit: cover !important;
      object-position: center !important;
    }
    .theme-preview .img-mask-circle {
      clip-path: circle(50% at 50% 50%) !important;
    }
    .theme-preview .img-mask-diamond {
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%) !important;
    }

    /* ── Hover Interactions ─────────────────────────────────── */
    .theme-preview .hover-lift {
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .theme-preview .hover-lift:hover {
      transform: translateY(-8px) !important;
      box-shadow: var(--ds-shadow) !important;
    }
    .theme-preview .hover-zoom {
      overflow: hidden !important;
    }
    .theme-preview .hover-zoom img {
      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .theme-preview .hover-zoom:hover img {
      transform: scale(1.08) !important;
    }
    .theme-preview [class*="border-border"][class*="bg-background"],
    .theme-preview [class*="border"][class*="rounded"] {
      box-shadow: none !important;
      transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    .theme-preview [class*="border-border"][class*="bg-background"]:hover,
    .theme-preview [class*="border"][class*="rounded"]:hover {
      box-shadow: var(--ds-shadow) !important;
    }

    /* ── Marquee ────────────────────────────────────────────── */
    .theme-preview .marquee-track {
      display: flex !important;
      animation: pMarquee 30s linear infinite !important;
      width: max-content !important;
    }
    .theme-preview .marquee-track:hover {
      animation-play-state: paused !important;
    }

    /* ── Sticky Sections ────────────────────────────────────── */
    .theme-preview .sticky-section {
      position: sticky !important;
      top: 0 !important;
    }

    /* ── Editorial Grid ─────────────────────────────────────── */
    .theme-preview .editorial-grid {
      display: grid !important;
      gap: 1px !important;
      background-color: var(--theme-border) !important;
    }
    .theme-preview .editorial-grid > * {
      background-color: var(--theme-background) !important;
    }
  `;

  if (!page) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No pages found in website spec
      </div>
    );
  }

  // Navbar and footer are generated as ordinary sections (see MockAIProvider)
  // driven by the client's own component selection, so they render through
  // the same dynamic PageRenderer as everything else below — no hardcoded
  // chrome duplicating (and overriding) what the client actually chose.
  return (
    <div className="theme-preview" style={themeStyle}>
      <style>{previewOverrides}</style>

      <main onClick={(e) => {
        const link = (e.target as HTMLElement).closest('a[href^="/"]');
        if (link && onNavigatePage) {
          e.preventDefault();
          const slug = link.getAttribute('href')?.replace(/^\//, '').replace(/\/$/, '');
          if (slug) onNavigatePage(slug);
        }
      }}>
        <PageRenderer page={page} />
      </main>
    </div>
  );
};

export default WebsiteRenderer;
