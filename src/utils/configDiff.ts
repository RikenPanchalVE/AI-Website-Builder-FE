import { WebsiteConfig } from "@/data/websiteConfig";

export interface RevisionChangeEntry {
  path: string;
  label: string;
  oldValue: unknown;
  newValue: unknown;
}

// A few top-level/common paths get a hand-written label; everything else
// falls back to titleCase-ing each path segment, which reads fine for the
// vast majority of fields (content.services -> "Services",
// components.hero -> "Hero Section Style", etc. - see labelFor below).
const LABELS: Record<string, string> = {
  "business.name": "Business Name",
  "business.type": "Business Type",
  "business.industry": "Industry",
  "business.description": "Description",
  "business.location": "Location",
  "business.countriesServed": "Countries Served",
  "business.email": "Email",
  "business.phone": "Phone",
  "business.address": "Address",
  "business.socialLinks": "Social Links",
  pages: "Pages",
  "theme.style": "Design Style",
  "theme.primaryColor": "Primary Color",
  "theme.secondaryColor": "Secondary Color",
  "theme.mode": "Theme Mode",
  "theme.typography": "Typography",
  "theme.accentStyle": "Accent Style",
  "branding.logo": "Logo",
  "branding.bannerImages": "Banner Images",
};

function titleCase(segment: string): string {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function labelFor(pathParts: string[]): string {
  const path = pathParts.join(".");
  if (LABELS[path]) return LABELS[path];
  const [root, second, third, fourth] = pathParts;
  switch (root) {
    case "components":
      return `${titleCase(second)} Section Style`;
    case "sectionColors":
      return `${titleCase(second)} Section Color`;
    case "content":
      return third ? `${titleCase(second)} - ${titleCase(third)}` : titleCase(second);
    case "sections":
      return `${titleCase(second)} Page Sections`;
    case "pageContent": {
      const page = titleCase(second);
      const block = third ? titleCase(third).replace(/^About Story$/, "About") : "";
      const field = fourth ? titleCase(fourth) : "";
      return [page, block, field].filter(Boolean).join(" - ");
    }
    default:
      return pathParts.map(titleCase).join(" - ");
  }
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function valuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null && b == null) return true;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

// sectionColors.<category> and content.footer/content.contact are small,
// cohesive settings objects - diffing them field-by-field (preset vs
// customBackground vs customPrimary) reads as noise. Everything else
// (business, theme, pageContent's hero/about_story/cta blocks) benefits
// from drilling all the way to individual leaf fields.
function isOpaqueObjectPath(pathParts: string[]): boolean {
  return pathParts[0] === "sectionColors" && pathParts.length === 2;
}

/**
 * Deep-diffs two WebsiteConfig objects (or arbitrary plain-object subsets of
 * one) into a flat list of leaf-level changes. Arrays (content lists like
 * services/testimonials, pages, banner images, ...) are reported as a
 * single entry carrying the full old/new arrays rather than diffed
 * item-by-item - the UI renders a readable summary plus an expandable raw
 * view, which stays correct for every content-array shape in the config
 * without needing bespoke per-list-type diff logic.
 */
export function diffConfig(before: unknown, after: unknown): RevisionChangeEntry[] {
  const changes: RevisionChangeEntry[] = [];

  function walk(pathParts: string[], b: unknown, a: unknown) {
    if (valuesEqual(b, a)) return;

    if (isPlainObject(b) && isPlainObject(a) && !isOpaqueObjectPath(pathParts)) {
      const keys = new Set([...Object.keys(b), ...Object.keys(a)]);
      for (const key of keys) {
        walk([...pathParts, key], b[key], a[key]);
      }
      return;
    }

    changes.push({ path: pathParts.join("."), label: labelFor(pathParts), oldValue: b, newValue: a });
  }

  walk([], before || {}, after || {});
  return changes;
}

export function diffWebsiteConfig(before: WebsiteConfig, after: WebsiteConfig): RevisionChangeEntry[] {
  return diffConfig(before, after);
}

// One-line human summary for a revision, e.g. "3 changes: Primary Color,
// Hero Section Style, Services" - used as the record's display title
// before the user expands it for full detail.
export function summarizeChanges(changes: RevisionChangeEntry[]): string {
  if (changes.length === 0) return "No changes";
  const names = changes.slice(0, 3).map((c) => c.label);
  const rest = changes.length - names.length;
  return `${changes.length} change${changes.length === 1 ? "" : "s"}: ${names.join(", ")}${rest > 0 ? `, +${rest} more` : ""}`;
}
