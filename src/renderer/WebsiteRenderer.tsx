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

// Per-section color/theme override, one slot per component-category (the
// same unit the layout picker already uses - see ComponentVariantPicker in
// QuestionnairePage.tsx), keyed by that category string.
export interface SectionColorOverride {
  preset: "default" | "light" | "dark" | "primary" | "secondary" | "custom";
  customBackground?: string;
  customPrimary?: string;
  customSecondary?: string;
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
    sectionColors?: Record<string, SectionColorOverride>;
  };
  navigation?: {
    items?: Array<{ label?: string; href?: string; page?: string; slug?: string }>;
  };
  footer?: {
    copyright?: string;
    links?: Array<{ label?: string; href?: string }>;
  };
}

// A section's `id` (e.g. "trainers", "solutions", "contact_form") isn't
// always the same string as the component-category its color/layout picker
// is keyed by ("team", "services", "contact") - several categories are
// deliberately shared by more than one section family (see
// ComponentVariantPicker's call sites in QuestionnairePage.tsx: Solutions
// and Industries both pick from the "services" family, Amenities/
// Facilities/Skills all share "why_choose_us", etc). Anything not listed
// here uses its own id as the category, which covers the majority where
// the two already match.
const SECTION_ID_TO_CATEGORY: Record<string, string> = {
  contact_form: "contact",
  trainers: "team",
  feature_grid: "services",
  benefits: "why_choose_us",
  amenities: "why_choose_us",
  facilities: "why_choose_us",
  skills: "why_choose_us",
  case_studies: "portfolio",
  experiences: "portfolio",
  solutions: "services",
  industries: "services",
  rooms: "course_grid",
  travel_packages: "course_grid",
  programs: "course_grid",
  menu_highlights: "menu_items",
  inventory_grid: "portfolio",
  features: "why_choose_us",
  services_default: "services",
  testimonials_default: "testimonials",
  cta_default: "cta",
  blog_preview: "blog",
  blog_grid: "blog",
};

// Most components paint their root <section> with bg-background (and text
// with text-foreground) - but a deliberate handful of "dramatic statement"
// components go the other way around: bg-foreground for the surface,
// text-background for the text (Hero1's cinematic full-bleed dark hero is
// the original of this pattern; several others reuse it for the same
// high-contrast effect). Picking "Light" for one of these used to still
// assign the chosen color to `background`, which these components never
// read for their own surface - so the section visibly went dark on "Light"
// and light on "Dark", the exact inversion this list exists to catch. Any
// component not listed here uses the normal bg-background/text-foreground
// pairing and needs no special handling.
const INVERTED_SURFACE_COMPONENTS = new Set([
  "Hero1",
  "Hero4",
  "WhyChooseUs",
  "Stats2",
  "BusinessHours2",
  "CTABanner",
  "CTA1",
  "NewsletterSignup",
]);

// Builds the CSS custom-property overrides a section needs to render in
// its own color/theme instead of the site's - every component reads its
// colors through var(--theme-*) (see WebsiteRenderer's previewOverrides
// block below), and CSS custom properties cascade to descendants, so
// redefining them on a wrapping element repaints everything inside without
// touching a single component's own code.
function buildSectionStyleOverride(
  override: SectionColorOverride | undefined,
  componentName: string,
  primaryColor: string,
  secondaryColor: string
): React.CSSProperties | undefined {
  if (!override || !override.preset || override.preset === "default") return undefined;

  let background: string;
  let primary = primaryColor;
  let secondary = secondaryColor;

  switch (override.preset) {
    case "light":
      background = "#ffffff";
      break;
    case "dark":
      background = "#0a0a0a";
      break;
    case "primary":
      background = primaryColor;
      break;
    case "secondary":
      background = secondaryColor;
      break;
    case "custom":
      background = override.customBackground || "#ffffff";
      primary = override.customPrimary || primaryColor;
      secondary = override.customSecondary || secondaryColor;
      break;
    default:
      return undefined;
  }

  let foreground = getReadableTextColor(background);

  // The component actually reads bg-foreground for its surface and
  // text-background for its text - the exact opposite of what every other
  // component does - so hand it the exact opposite assignment too. This
  // keeps `background` meaning "what the user picked" and `foreground`
  // meaning "the readable contrast color" from the caller's perspective;
  // only which CSS variable ends up carrying which one flips.
  if (INVERTED_SURFACE_COMPONENTS.has(componentName)) {
    [background, foreground] = [foreground, background];
  }

  const primaryForeground = getReadableTextColor(primary);
  const secondaryForeground = getReadableTextColor(secondary);
  // Solid hex, not an alpha-transparent color - mirrors exactly how the
  // site-wide theme computes mutedColor/borderColor (a small step from the
  // background toward the foreground, see mixWithWhite server-side). An
  // earlier version used hexWithAlpha(foreground, ...) here, which put an
  // already-transparent color into --theme-muted; Tailwind's own
  // `bg-muted/30`-style utilities then mix that color *again* with white,
  // multiplying the two alphas together and washing the tint out to
  // near-invisible - solid colors don't have that problem.
  const muted = mixHex(background, foreground, 0.06);
  const border = mixHex(background, foreground, 0.14);

  return {
    // Tailwind itself generates every utility (bg-primary, text-primary/62,
    // border-background/20, any class, any opacity - Tailwind v4 compiles
    // opacity variants as color-mix() against the base variable, so they
    // all resolve dynamically) from these exact *unprefixed* --color-*
    // names, the same ones WebsiteRenderer sets once, globally, in
    // `themeStyle` below. The custom --theme-* names only exist for the
    // small hand-maintained whitelist of `!important` overrides further
    // down in this file - redefining just those left every class outside
    // that whitelist (the vast majority) completely unaffected by a
    // section override, since Tailwind's own rules never read --theme-*
    // at all. Redefining --color-* here is what makes *every* class in
    // *every* component respond, with no whitelist to keep in sync.
    "--color-primary": primary,
    "--color-primary-foreground": primaryForeground,
    "--color-secondary": secondary,
    "--color-secondary-foreground": secondaryForeground,
    "--color-background": background,
    "--color-foreground": foreground,
    "--color-muted": muted,
    "--color-muted-foreground": "#888888",
    "--color-border": border,
    "--color-card": background,
    "--color-card-foreground": foreground,
    // The hand-maintained !important whitelist further down in this file
    // still needs its own --theme-* names redefined too, so anything on
    // that list stays consistent with the rest of the section.
    "--theme-background": background,
    "--theme-foreground": foreground,
    "--theme-card": background,
    "--theme-muted": muted,
    "--theme-border": border,
    "--theme-primary": primary,
    "--theme-primary-foreground": primaryForeground,
    "--theme-secondary": secondary,
    "--theme-secondary-foreground": secondaryForeground,
    "--theme-accent": primary,
    "--theme-primary-soft": hexWithAlpha(primary, 0.1),
    "--theme-secondary-soft": hexWithAlpha(secondary, 0.15),
    "--theme-surface-strong": hexWithAlpha(primary, 0.14),
    "--theme-gradient-from": primary,
    "--theme-gradient-to": secondary,
    "--theme-ring-glow": hexWithAlpha(primary, 0.2),
    "--bg": background,
    "--bgc": muted,
    "--bdr": border,
    "--bgd": muted,
    "--ctx": foreground,
    "--ctx2": muted,
    "--c1": primary,
    // Plain (non-variable) paint on the wrapper itself, as a safety net -
    // most sections set their own bg-*/text-* class on the root <section>
    // and repaint themselves purely from the variables above, but a few
    // (e.g. Hero5) intentionally leave their section transparent and rely
    // on the page's own background showing through. Without this, an
    // override on one of those would recolor the text but leave the actual
    // backdrop untouched.
    backgroundColor: background,
    color: foreground,
  } as React.CSSProperties;
}

interface SectionRendererProps {
  component: string;
  props: Record<string, any>;
  styleOverride?: React.CSSProperties;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  component,
  props,
  styleOverride,
}) => {
  const Component = ComponentRegistry[component];

  if (!Component) {
    return (
      <div className="p-4 bg-muted text-muted-foreground text-sm text-center">
        Component &quot;{component}&quot; not found
      </div>
    );
  }

  const rendered = (
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

  // Only wrap when this section actually overrides the site's colors -
  // an unstyled wrapper div is harmless, but there's no reason to add one
  // to every section when almost none of them will use it.
  return styleOverride ? <div style={styleOverride}>{rendered}</div> : rendered;
};

interface PageRendererProps {
  page: Page;
  sectionColors?: Record<string, SectionColorOverride>;
  primaryColor?: string;
  secondaryColor?: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ page, sectionColors, primaryColor, secondaryColor }) => {
  const sorted = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <div>
      {sorted.map((section) => {
        const category = SECTION_ID_TO_CATEGORY[section.id] || section.id;
        const styleOverride = buildSectionStyleOverride(
          sectionColors?.[category],
          section.component,
          primaryColor || "#1a1a1a",
          secondaryColor || "#c8ff00"
        );
        return (
          <SectionRenderer
            key={section.id}
            component={section.component}
            props={section.props}
            styleOverride={styleOverride}
          />
        );
      })}
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

// Linear-interpolates two solid hex colors - used instead of hexWithAlpha
// wherever the result itself needs to stay a solid, non-transparent color
// (see buildSectionStyleOverride's muted/border computation).
const mixHex = (from: string, to: string, amount: number) => {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const mix = (ca: number, cb: number) => Math.round(ca + (cb - ca) * amount);
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(mix(a.r, b.r))}${toHex(mix(a.g, b.g))}${toHex(mix(a.b, b.b))}`;
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
  // Computed per design style (premium/creative/luxury/bold/elegant get
  // "gradient", the rest "plain") but never actually applied anywhere -
  // every page rendered with a flat background regardless. A subtle
  // diagonal wash on top of the flat color is enough to read as a
  // distinct, more polished treatment without fighting page content.
  const backgroundTreatment = (theme as any)?.backgroundTreatment || "plain";
  const backgroundImageCss =
    backgroundTreatment === "gradient"
      ? "linear-gradient(165deg, var(--theme-primary-soft) 0%, transparent 45%, var(--theme-secondary-soft) 100%)"
      : "none";
  // "solid" (Minimal/Bold) fills CTA buttons with the primary color;
  // "gradient" (Gradient) fills them with an actual primary→secondary
  // gradient, not just a flat color; "outline" (Monochrome) renders them as
  // a bordered, transparent button that fills in on hover. Each is a
  // genuinely different treatment, not just a different corner radius, so
  // no accent reads as a slight variation on another.
  const buttonFill = (theme as any)?.buttonFill || "solid";
  // "offset" (Bold) adds a hard, unblurred "brutalist" drop shadow that
  // punches further out on hover; "glow" (Gradient) adds a soft colored
  // glow. Combined with buttonFill, this is what actually makes each accent
  // recognizable at a glance instead of requiring a close-up comparison.
  const buttonShadow = (theme as any)?.buttonShadow || "none";

  // The accent-style button treatment used to only ever reach `bg-primary`
  // buttons - but most Hero CTAs in the component library use
  // bg-foreground or bg-white, and Hero1 specifically uses bg-background
  // (paired with px-8 padding, which nothing else in the library combines
  // with bg-background), so the single most prominent button on the page
  // very often showed no accent styling at all. This selector list covers
  // every CTA pattern actually used across Hero/CTA/Contact/Footer.
  // bg-foreground and bg-background require a companion px-* class (real
  // CTA buttons always carry horizontal padding) - otherwise this would
  // also sweep up small fixed-size elements like Footer3's h-6 w-6 social
  // icon badges (which use "hover:bg-foreground" purely for its color, not
  // as a button) into full CTA-button padding/shadow treatment.
  const ctaSelector = [
    'button[class*="bg-primary"]', 'a[class*="bg-primary"]',
    'button[class*="bg-foreground"][class*="px-"]', 'a[class*="bg-foreground"][class*="px-"]',
    'button[class*="bg-white"]', 'a[class*="bg-white"]',
    '[class*="btn-gradient"]',
  ].map((s) => `.theme-preview ${s}`).join(",\n    ");
  const ctaHoverSelector = [
    'button[class*="bg-primary"]:hover', 'a[class*="bg-primary"]:hover',
    'button[class*="bg-foreground"][class*="px-"]:hover', 'a[class*="bg-foreground"][class*="px-"]:hover',
    'button[class*="bg-white"]:hover', 'a[class*="bg-white"]:hover',
    '[class*="btn-gradient"]:hover',
  ].map((s) => `.theme-preview ${s}`).join(",\n    ");
  // Hero1's section uses bg-foreground while its own button deliberately
  // uses bg-background so it contrasts against that foreground-colored
  // section - every other bg-foreground/bg-white button in the library
  // goes the other direction (button color contrasts against a normal
  // page/section background). Monochrome and Bold's outline/border colors
  // used to be keyed off theme-foreground unconditionally, which is
  // correct for that "every other" case but made Hero1's button's
  // border/text exactly match its own section's background - invisible.
  // Kept as its own selector group so it can get the inverted color pair.
  const ctaReversedSelector = [
    'button[class*="bg-background"][class*="px-"]', 'a[class*="bg-background"][class*="px-"]',
  ].map((s) => `.theme-preview ${s}`).join(",\n    ");
  const ctaReversedHoverSelector = [
    'button[class*="bg-background"][class*="px-"]:hover', 'a[class*="bg-background"][class*="px-"]:hover',
  ].map((s) => `.theme-preview ${s}`).join(",\n    ");
  const formBtnSelector = '.theme-preview form button[type="submit"],\n    .theme-preview form button:not([type])';
  const formBtnHoverSelector = '.theme-preview form button[type="submit"]:hover,\n    .theme-preview form button:not([type]):hover';

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
      /* Fixed per-shape values instead of "rounded" falling back to the
         design style's own base radius - that fallback could land right on
         top of "square"'s 4px for styles with a small base radius (Premium,
         Editorial, etc.), making Minimal and Bold's buttons look the same
         shape even after everything else about them was made distinct. */
      --ds-btn-radius: ${buttonStyle === "pill" ? "9999px" : buttonStyle === "sharp" ? "0px" : buttonStyle === "square" ? "4px" : "14px"};
      --ds-bg-image: ${backgroundImageCss};

      background-color: var(--theme-background);
      background-image: var(--ds-bg-image);
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
    .theme-preview .bg-primary\\/5, .theme-preview .bg-primary\\/8, .theme-preview .bg-primary\\/10 { background-color: var(--theme-primary-soft) !important; }
    .theme-preview .bg-secondary\\/5, .theme-preview .bg-secondary\\/10 { background-color: var(--theme-secondary-soft) !important; }
    .theme-preview .bg-accent { background-color: var(--theme-accent) !important; }
    .theme-preview .text-accent { color: var(--theme-accent) !important; }
    .theme-preview .from-primary { --tw-gradient-from: var(--theme-gradient-from) !important; }
    .theme-preview .to-primary { --tw-gradient-to: var(--theme-gradient-to) !important; }
    .theme-preview .to-secondary { --tw-gradient-to: var(--theme-gradient-to) !important; }
    .theme-preview .from-primary\\/10 { --tw-gradient-from: color-mix(in srgb, var(--theme-primary) 10%, transparent) !important; }
    .theme-preview .to-secondary\\/10 { --tw-gradient-to: color-mix(in srgb, var(--theme-secondary) 10%, transparent) !important; }
    .theme-preview .bg-background { background-color: var(--theme-background) !important; background-image: var(--ds-bg-image) !important; }
    .theme-preview .bg-background\\/10 { background-color: color-mix(in srgb, var(--theme-background) 10%, transparent) !important; }
    .theme-preview .bg-background\\/80 { background-color: color-mix(in srgb, var(--theme-background) 80%, transparent) !important; }
    .theme-preview .bg-background\\/90 { background-color: color-mix(in srgb, var(--theme-background) 90%, transparent) !important; }
    .theme-preview .bg-background\\/95 { background-color: color-mix(in srgb, var(--theme-background) 95%, transparent) !important; }
    .theme-preview .text-foreground { color: var(--theme-foreground) !important; }
    .theme-preview .bg-muted { background-color: var(--theme-muted) !important; }
    /* These opacity variants used to mix toward literal "white" - a stand-in
       for "whatever's usually behind it" that only holds for light-mode
       styles. Every dark-mode design style (Premium/Luxury/Bold/Elegant/
       Tech) computes --theme-muted/--theme-card as a *dark* color, so
       mixing 70-80% of the way toward white turned a dark surface into a
       near-white one - while the text drawn on top of it still used
       --theme-foreground, which in dark mode is near-white too. White text
       on a white card is exactly the "font not visible" bug. Mixing toward
       "transparent" instead is real alpha blending (matches what Tailwind's
       own bg-*/NN opacity utilities do) - it always lightens/darkens
       relative to the color underneath rather than a fixed literal white,
       so it reads correctly against both light and dark themes. */
    .theme-preview .bg-muted\\/20 { background-color: color-mix(in srgb, var(--theme-muted) 20%, transparent) !important; }
    .theme-preview .bg-muted\\/30 { background-color: color-mix(in srgb, var(--theme-muted) 30%, transparent) !important; }
    .theme-preview .bg-muted\\/50 { background-color: color-mix(in srgb, var(--theme-muted) 50%, transparent) !important; }
    .theme-preview .bg-muted\\/80 { background-color: color-mix(in srgb, var(--theme-muted) 80%, transparent) !important; }
    .theme-preview .text-muted-foreground { color: color-mix(in srgb, var(--theme-foreground) 55%, transparent) !important; }
    .theme-preview .border-border { border-color: var(--theme-border) !important; }
    .theme-preview .bg-card { background-color: var(--theme-card) !important; }
    .theme-preview .bg-card\\/70 { background-color: color-mix(in srgb, var(--theme-card) 70%, transparent) !important; }
    .theme-preview .bg-card\\/95 { background-color: color-mix(in srgb, var(--theme-card) 95%, transparent) !important; }
    .theme-preview .text-card-foreground { color: var(--theme-foreground) !important; }
    .theme-preview .bg-surfacestrong { background-color: var(--theme-surface-strong) !important; }
    .theme-preview .shadow-primary\\/20 { box-shadow: 0 20px 40px -12px var(--theme-primary) !important; }
    .theme-preview .shadow-primary\\/10 { box-shadow: 0 10px 25px -8px var(--theme-primary) !important; }
    .theme-preview .shadow-glow { box-shadow: 0 0 40px var(--theme-ring-glow) !important; }
    .theme-preview .ring-glow { box-shadow: 0 0 0 4px var(--theme-ring-glow) !important; }
    .theme-preview .text-glow { text-shadow: 0 0 20px var(--theme-ring-glow) !important; }

    /* ── Editorial Typography Scale ──────────────────────────────────
       Every h1–h4/p in every component is forced through this scale with
       !important (so per-component Tailwind size classes never actually
       apply) - it used to run all the way up to a 6rem/96px h1 and an
       8rem/128px stat number, and forced even a Footer column label
       explicitly set to text-xs (12px) up to 16px. Toned down to sizes
       that read as confident on a Hero without dominating every section
       heading and card title on the page. ────────────────────────── */
    .theme-preview h1 {
      font-size: clamp(2rem, 4vw, 3.25rem) !important;
      font-weight: 800 !important;
      line-height: 1.1 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
    }
    .theme-preview h2 {
      font-size: clamp(1.5rem, 2.5vw, 2.25rem) !important;
      font-weight: 700 !important;
      line-height: 1.15 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
    }
    .theme-preview h3 {
      font-size: clamp(1.125rem, 1.4vw, 1.375rem) !important;
      font-weight: 600 !important;
      line-height: 1.35 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
    }
    .theme-preview h4 {
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      letter-spacing: var(--ds-letter-spacing) !important;
      text-transform: uppercase !important;
    }
    .theme-preview p {
      font-size: clamp(0.9375rem, 0.5vw, 1.0625rem) !important;
      line-height: 1.65 !important;
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
    ${ctaSelector},
    ${ctaReversedSelector},
    ${formBtnSelector} {
      position: relative !important;
      overflow: visible !important;
      border-radius: var(--ds-btn-radius) !important;
      font-weight: 600 !important;
      letter-spacing: 0.05em !important;
      text-transform: uppercase !important;
      font-size: 0.8rem !important;
      padding: 1rem 2.5rem !important;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }
    ${ctaHoverSelector},
    ${ctaReversedHoverSelector},
    ${formBtnHoverSelector} {
      transform: translateY(-2px) !important;
      letter-spacing: 0.12em !important;
    }
    ${buttonFill === "gradient" ? `
    /* Gradient's signature: the button itself is gradient-filled, not just
       the page background - so the accent's name is actually visible on
       the single most-looked-at element on the page. Safe to apply to both
       selector groups: a brand-color gradient fill isn't at risk of
       matching its own section's background the way a foreground/
       background pairing is. */
    ${ctaSelector},
    ${ctaReversedSelector},
    ${formBtnSelector} {
      background-color: var(--theme-primary) !important;
      background-image: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%) !important;
      color: var(--theme-primary-foreground) !important;
      border: none !important;
    }
    ` : ""}
    ${buttonFill === "outline" ? `
    /* Monochrome's signature: buttons read as an outline instead of a
       solid fill, filling in only on hover - a black/white inversion, not
       a color swatch. Deliberately keyed off foreground/background rather
       than the brand primary color: "Monochrome" should mean no color at
       all, and tying it to primary risked an unreadable low-contrast
       outline whenever the chosen primary happened to be a dark shade on a
       dark-mode hero. Placed after the solid-fill rules above so it wins
       the cascade (equal selector specificity, later wins). */
    ${ctaSelector},
    ${formBtnSelector} {
      background-color: transparent !important;
      background-image: none !important;
      color: var(--theme-foreground) !important;
      border: max(2px, var(--ds-border-width)) solid var(--theme-foreground) !important;
    }
    ${ctaHoverSelector},
    ${formBtnHoverSelector} {
      background-color: var(--theme-foreground) !important;
      color: var(--theme-background) !important;
    }
    /* The reversed group (Hero1's own button) sits on a section that's
       already theme-foreground colored, so it needs the opposite pair -
       otherwise its border/text would exactly match its own section's
       background and disappear entirely. */
    ${ctaReversedSelector} {
      background-color: transparent !important;
      background-image: none !important;
      color: var(--theme-background) !important;
      border: max(2px, var(--ds-border-width)) solid var(--theme-background) !important;
    }
    ${ctaReversedHoverSelector} {
      background-color: var(--theme-background) !important;
      color: var(--theme-foreground) !important;
    }
    ` : ""}
    ${buttonShadow === "offset" ? `
    /* Bold's signature: a hard, unblurred "brutalist" drop shadow that
       punches further out (and the button shifts to meet it) on hover -
       loud and graphic, on-trend, unmistakable even in a thumbnail. */
    ${ctaSelector},
    ${formBtnSelector} {
      border: 2px solid var(--theme-foreground) !important;
      box-shadow: 6px 6px 0 0 var(--theme-foreground) !important;
    }
    ${ctaHoverSelector},
    ${formBtnHoverSelector} {
      transform: translate(-3px, -3px) !important;
      box-shadow: 9px 9px 0 0 var(--theme-foreground) !important;
    }
    /* Same reversal as the outline block above - this button's own
       section is already theme-foreground colored. */
    ${ctaReversedSelector} {
      border: 2px solid var(--theme-background) !important;
      box-shadow: 6px 6px 0 0 var(--theme-background) !important;
    }
    ${ctaReversedHoverSelector} {
      transform: translate(-3px, -3px) !important;
      box-shadow: 9px 9px 0 0 var(--theme-background) !important;
    }
    ` : ""}
    ${buttonShadow === "glow" ? `
    /* Gradient's signature companion: a soft colored glow instead of a
       neutral drop shadow, matching the gradient fill. Safe for both
       groups - a brand-color glow isn't at risk of blending into its own
       section's background. */
    ${ctaSelector},
    ${ctaReversedSelector},
    ${formBtnSelector} {
      box-shadow: 0 10px 30px -8px var(--theme-primary) !important;
    }
    ${ctaHoverSelector},
    ${ctaReversedHoverSelector},
    ${formBtnHoverSelector} {
      box-shadow: 0 16px 40px -6px var(--theme-primary) !important;
    }
    ` : ""}

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

    /* Form submit buttons are now covered by the unified button block above
       (formBtnSelector / formBtnHoverSelector), so they get the exact same
       fill/shadow/radius treatment as every other CTA - no separate rule
       set left to keep in sync or fight the cascade with. */

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
      font-size: clamp(2rem, 4vw, 3.5rem) !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      letter-spacing: -0.03em !important;
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
    /* Scoped to the border+bg-background combo specifically (not the
       broader "border"+"rounded" selector above, which also matches
       directional classes like border-b - forcing a full border-width
       there would add sides that were never meant to have one). This is
       what actually makes Bold's thick border and Minimal's hairline
       border visible on real content cards, not just buttons. */
    .theme-preview [class*="border-border"][class*="bg-background"] {
      border-width: var(--ds-border-width) !important;
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
  // the same dynamic PageRenderer as everything else below - no hardcoded
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
        <PageRenderer page={page} sectionColors={theme?.sectionColors} primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </main>
    </div>
  );
};

export default WebsiteRenderer;
