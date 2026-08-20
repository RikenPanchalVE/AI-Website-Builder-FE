import { WebsiteConfig, DEFAULT_WEBSITE_CONFIG } from "@/data/websiteConfig";

// questionnaireService.saveQuestionnaire (server) stores the incoming
// WebsiteConfig-shaped payload verbatim - it spreads `...incoming` into the
// saved `answers` document before flattening a *separate* copy of the same
// data for the AI provider to consume. So the nested business/theme/
// components/content/etc. shape this needs already exists in whatever GET
// /projects/:id/questionnaire returns; this just merges it over the
// defaults (per top-level section) so re-opening an older project - one
// saved before a given field existed, or with the legacy pre-WebsiteConfig
// flat format - still produces every key the editor UI expects instead of
// crashing on a missing one.
export function answersToConfig(answers: Record<string, any> | null | undefined): WebsiteConfig {
  const a = answers || {};
  return {
    business: { ...DEFAULT_WEBSITE_CONFIG.business, ...(a.business || {}) },
    pages: a.pages?.length ? a.pages : DEFAULT_WEBSITE_CONFIG.pages,
    sections: { ...DEFAULT_WEBSITE_CONFIG.sections, ...(a.sections || {}) },
    pageContent: a.pageContent || {},
    theme: { ...DEFAULT_WEBSITE_CONFIG.theme, ...(a.theme || {}) },
    components: { ...DEFAULT_WEBSITE_CONFIG.components, ...(a.components || {}) },
    sectionColors: a.sectionColors || {},
    content: { ...DEFAULT_WEBSITE_CONFIG.content, ...(a.content || {}) },
    branding: { ...DEFAULT_WEBSITE_CONFIG.branding, ...(a.branding || {}) },
  };
}
