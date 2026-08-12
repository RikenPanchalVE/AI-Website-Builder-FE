import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectApi } from "@/api/projectApi";
import {
  updateBusiness,
  setPages,
  setPageSections,
  setPageContentField,
  setTheme,
  setComponent,
  setComponents,
  setContent,
  setCurrentStep,
} from "@/store/slices/builderSlice";
import { BUSINESS_TYPES, type BusinessTypeConfig } from "@/config/businessTypes";
import { BUSINESS_CATEGORIES, PAGE_SECTIONS } from "@/data/designOptions";
import { COMPONENT_CATEGORIES, type ComponentCategory } from "@/data/componentOptions";
import { DESIGN_STYLES, COLOR_PALETTES, TYPOGRAPHY_OPTIONS } from "@/data/designOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import LivePreviewPanel from "@/components/questionnaire/LivePreviewPanel";
import FullScreenPreviewModal from "@/components/questionnaire/FullScreenPreviewModal";
import ImageUploadField from "@/components/questionnaire/ImageUploadField";
import { AVAILABLE_PAGES, sectionType } from "@/components/questionnaire/previewSpec";

interface StepDef {
  key: string;
  title: string;
  subtitle: string;
  kind: "business" | "pages" | "page" | "design" | "colors" | "review";
  pageId?: string;
}

function buildSteps(pages: string[]): StepDef[] {
  const selected = pages.length ? pages : ["home"];
  const pageSteps: StepDef[] = selected.map((id) => {
    const label = AVAILABLE_PAGES.find((p) => p.id === id)?.label || id;
    return {
      key: `page:${id}`,
      title: label,
      subtitle: `Everything about your ${label} page`,
      kind: "page",
      pageId: id,
    };
  });

  return [
    { key: "business", title: "Business", subtitle: "Tell us about your business", kind: "business" },
    { key: "pages", title: "Pages", subtitle: "Which pages do you need?", kind: "pages" },
    ...pageSteps,
    { key: "design", title: "Design", subtitle: "Choose your visual style", kind: "design" },
    { key: "colors", title: "Colors", subtitle: "Pick your brand colors", kind: "colors" },
    { key: "review", title: "Review", subtitle: "Review and generate", kind: "review" },
  ];
}

/* ── Small shared bits ─────────────────────────────────────────────── */

const CheckIcon = () => (
  <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CheckBox = ({ selected }: { selected: boolean }) => (
  <span
    className={cn(
      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
      selected ? "border-primary bg-primary" : "border-input bg-background"
    )}
  >
    {selected && <CheckIcon />}
  </span>
);

function SectionIntro({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function FieldBlock({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5">{label}</Label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ── Root page ──────────────────────────────────────────────────────── */

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((s: any) => s.project);
  const { config, currentStep } = useSelector((s: any) => s.builder);
  const enquiry = currentProject?.enquiry;

  const [submitting, setSubmitting] = useState(false);
  const [localStep, setLocalStep] = useState(0);
  const step = currentStep || localStep;

  const [previewPage, setPreviewPage] = useState("home");
  const [fullScreenPreview, setFullScreenPreview] = useState(false);

  const businessType = BUSINESS_TYPES[config.business.type] || null;
  const STEPS = useMemo(() => buildSteps(config.pages), [config.pages]);
  const currentStepDef = STEPS[Math.min(step, STEPS.length - 1)];

  useEffect(() => {
    if (!currentProject) navigate("/");
  }, [currentProject, navigate]);

  useEffect(() => {
    // The landing page only collects the business name — type is chosen
    // here, in Step 0 — so seed the name (and type, if an older/legacy
    // project already has one) without requiring both to be present.
    if (enquiry?.businessName && !config.business.name) {
      dispatch(updateBusiness({
        name: enquiry.businessName,
        ...(enquiry.businessType && !config.business.type ? { type: enquiry.businessType } : {}),
      }));
    }
  }, [enquiry, config.business.name, config.business.type, dispatch]);

  // Keep the live preview focused on whichever page the client is currently
  // configuring, so the answer to "how does this look" is always right there.
  useEffect(() => {
    if (currentStepDef?.kind === "page" && currentStepDef.pageId) {
      setPreviewPage(currentStepDef.pageId);
    }
  }, [currentStepDef]);

  const setStep = (s: number) => {
    setLocalStep(s);
    dispatch(setCurrentStep(s));
  };

  const canNext = (): boolean => {
    switch (currentStepDef?.kind) {
      case "business": return !!config.business.type;
      case "pages": return config.pages.length > 0;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const projectId = currentProject.projectId;
      await projectApi.saveQuestionnaire(projectId, config);
      await projectApi.generate(projectId);
      navigate(`/preview/${projectId}`);
    } catch (err) {
      console.error("Failed:", err);
      alert("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (!currentProject) return null;

  if (submitting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="font-medium text-foreground">Generating your website...</p>
        <p className="mt-1 text-sm text-muted-foreground">This may take a moment</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="mb-2 flex items-center justify-between">
            <h1 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              Website Builder
              {businessType && <span className="text-xl">{businessType.icon}</span>}
            </h1>
            <span className="text-sm text-muted-foreground">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex gap-1 overflow-x-auto pb-0.5">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors",
                  i === step ? "bg-primary/10 font-medium text-primary"
                  : i < step ? "text-foreground/70 hover:bg-muted"
                  : "text-muted-foreground hover:bg-muted"
                )}
              >
                <span className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium",
                  i < step ? "bg-primary/15 text-primary"
                  : i === step ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                )}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
          <div className="min-w-0">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">{currentStepDef.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{currentStepDef.subtitle}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
              {currentStepDef.kind === "business" && <StepBusiness config={config} dispatch={dispatch} businessType={businessType} />}
              {currentStepDef.kind === "pages" && <StepPages config={config} dispatch={dispatch} businessType={businessType} />}
              {currentStepDef.kind === "page" && currentStepDef.pageId && (
                <StepPageDetail
                  config={config}
                  dispatch={dispatch}
                  businessType={businessType}
                  pageId={currentStepDef.pageId}
                  isFirstPage={config.pages[0] === currentStepDef.pageId}
                />
              )}
              {currentStepDef.kind === "design" && <StepDesign config={config} dispatch={dispatch} businessType={businessType} />}
              {currentStepDef.kind === "colors" && <StepColors config={config} dispatch={dispatch} />}
              {currentStepDef.kind === "review" && <StepReview config={config} />}
            </div>

            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrev} disabled={step === 0}>
                Previous
              </Button>
              {step === STEPS.length - 1 ? (
                <Button type="button" onClick={handleSubmit} disabled={!canNext()}>
                  Generate Website
                </Button>
              ) : (
                <Button type="button" onClick={handleNext} disabled={!canNext()}>
                  Next
                </Button>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <LivePreviewPanel
              config={config}
              activePage={previewPage}
              onPageChange={setPreviewPage}
              onExpand={() => setFullScreenPreview(true)}
            />
          </div>
        </div>
      </main>

      <button
        type="button"
        onClick={() => setFullScreenPreview(true)}
        className="fixed bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg lg:hidden"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
        </svg>
        Preview
      </button>

      {fullScreenPreview && (
        <FullScreenPreviewModal
          config={config}
          activePage={previewPage}
          onPageChange={setPreviewPage}
          onClose={() => setFullScreenPreview(false)}
        />
      )}
    </div>
  );
};

/* ── Step: Business ────────────────────────────────────────────────── */

function StepBusiness({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const selectBusinessType = (id: string) => {
    dispatch(updateBusiness({ type: id }));

    // Seed smart, industry-appropriate defaults (theme, colors, layout
    // variants, pages) so two different business types actually produce
    // different-looking sites out of the box. Everything here stays fully
    // editable in later steps — this is just a better starting point than
    // "modern blue" for every business.
    const preset = BUSINESS_TYPES[id];
    if (!preset) return;

    const palette = preset.colorSchemes?.[0];
    dispatch(setTheme({
      style: preset.designStyle.themeStyle,
      typography: preset.designStyle.typography,
      ...(palette ? { primaryColor: palette.primary, secondaryColor: palette.secondary } : {}),
    }));

    if (preset.suggestedComponents) {
      dispatch(setComponents(preset.suggestedComponents));
    }

    const validPageIds = new Set(AVAILABLE_PAGES.map((p) => p.id));
    const seededPages = (preset.suggestedPages || []).filter((p) => validPageIds.has(p));
    if (seededPages.length > 0) {
      dispatch(setPages(seededPages.includes("home") ? seededPages : ["home", ...seededPages]));
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="mb-2">Business Type *</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BUSINESS_CATEGORIES.map((cat) => {
            const selected = config.business.type === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectBusinessType(cat.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                  selected
                    ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                    : "border-border bg-background text-foreground hover:border-primary/40"
                )}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>
        {config.business.type && (
          <p className="mt-2 text-xs text-muted-foreground">
            We've pre-selected a color palette, layout style, and starter pages for this business type — change anything you like as you go.
          </p>
        )}
      </div>

      <FieldBlock label="Business Name *">
        <Input
          value={config.business.name}
          onChange={(e) => dispatch(updateBusiness({ name: e.target.value }))}
          placeholder="Your Business Name"
        />
      </FieldBlock>

      <FieldBlock label="Business Description">
        <Textarea
          value={config.business.description}
          onChange={(e) => dispatch(updateBusiness({ description: e.target.value }))}
          placeholder="What does your business do? What products or services do you offer?"
          rows={3}
        />
      </FieldBlock>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldBlock label="Location">
          <Input
            value={config.business.location}
            onChange={(e) => dispatch(updateBusiness({ location: e.target.value }))}
            placeholder="City, State, Country"
          />
        </FieldBlock>
        <FieldBlock label="Target Audience">
          <Input
            value={config.business.targetAudience}
            onChange={(e) => dispatch(updateBusiness({ targetAudience: e.target.value }))}
            placeholder="e.g., Young professionals, Families"
          />
        </FieldBlock>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldBlock label="Email">
          <Input
            type="email"
            value={config.business.email}
            onChange={(e) => dispatch(updateBusiness({ email: e.target.value }))}
            placeholder="contact@business.com"
          />
        </FieldBlock>
        <FieldBlock label="Phone">
          <Input
            type="tel"
            value={config.business.phone}
            onChange={(e) => dispatch(updateBusiness({ phone: e.target.value }))}
            placeholder="+1 (555) 123-4567"
          />
        </FieldBlock>
      </div>

      <FieldBlock label="Address" hint="Shown on your Contact page and in the footer.">
        <Input
          value={config.business.address}
          onChange={(e) => dispatch(updateBusiness({ address: e.target.value }))}
          placeholder="123 Main St, Suite 100, City, State 12345"
        />
      </FieldBlock>

      <SocialLinksEditor config={config} dispatch={dispatch} />
    </div>
  );
}

const SOCIAL_PLATFORMS = ["facebook", "instagram", "twitter", "linkedin", "youtube", "tiktok"];

function SocialLinksEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const socialLinks = (config.business.socialLinks || []) as Array<{ platform: string; url: string }>;

  const updateLinks = (links: Array<{ platform: string; url: string }>) => {
    dispatch(updateBusiness({ socialLinks: links }));
  };

  const addLink = () => {
    const unused = SOCIAL_PLATFORMS.find((p) => !socialLinks.some((l) => l.platform === p)) || "facebook";
    updateLinks([...socialLinks, { platform: unused, url: "" }]);
  };
  const updateLink = (index: number, field: "platform" | "url", value: string) => {
    updateLinks(socialLinks.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };
  const removeLink = (index: number) => {
    updateLinks(socialLinks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label>Social Media Links</Label>
        <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={addLink}>+ Add Link</Button>
      </div>
      {socialLinks.length === 0 ? (
        <p className="text-xs text-muted-foreground">No social links added yet.</p>
      ) : (
        <div className="space-y-2">
          {socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2">
              <select
                value={link.platform}
                onChange={(e) => updateLink(i, "platform", e.target.value)}
                className="h-9 rounded-md border border-input bg-transparent px-3 text-sm capitalize shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <Input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => removeLink(i)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Step: Pages ───────────────────────────────────────────────────── */

function StepPages({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const togglePage = (id: string) => {
    if (id === "home") return;
    const current = config.pages as string[];
    if (current.includes(id)) {
      dispatch(setPages(current.filter((p) => p !== id)));
    } else {
      dispatch(setPages([...current, id]));
    }
  };

  // Only offer pages that actually make sense for the selected business
  // type — no more picking "Properties" for a bakery. Falls back to the
  // full list on the rare case a business type couldn't be resolved.
  const relevantIds = businessType
    ? new Set(["home", ...(businessType.suggestedPages || [])])
    : null;
  const visiblePages = relevantIds
    ? AVAILABLE_PAGES.filter((p) => relevantIds.has(p.id))
    : AVAILABLE_PAGES;

  return (
    <div className="space-y-4">
      <SectionIntro>
        Select the pages you need. Home is always included. This list is based on your business type — you'll
        configure exactly what goes on each one next.
      </SectionIntro>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {visiblePages.map((page) => {
          const selected = config.pages.includes(page.id);
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => togglePage(page.id)}
              disabled={page.required}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                selected
                  ? "border-primary bg-primary/5 text-foreground"
                  : page.required
                  ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              )}
            >
              <CheckBox selected={selected} />
              <span>{page.label}</span>
              {page.required && <span className="ml-auto text-xs text-muted-foreground">Required</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step: Per-page detail (sections + layout for that page) ────────── */

function ComponentVariantPicker({
  cat,
  currentComponent,
  suggestedId,
  dispatch,
}: {
  cat: ComponentCategory;
  currentComponent: string;
  suggestedId?: string;
  dispatch: any;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3">
        <h3 className="font-medium text-foreground">{cat.label}</h3>
        <p className="text-xs text-muted-foreground">{cat.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cat.options.map((opt) => {
          const selected = currentComponent === opt.id;
          const isSuggested = suggestedId === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => dispatch(setComponent({ category: cat.category, componentId: opt.id }))}
              className={cn(
                "rounded-lg border p-3 text-left transition-all",
                selected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-background hover:border-primary/40"
              )}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-1">
                  {opt.preview.elements.slice(0, 3).map((_, i) => (
                    <div key={i} className="h-4 w-6 rounded border border-border bg-muted" />
                  ))}
                </div>
                {isSuggested && !selected && (
                  <Badge variant="secondary" className="text-[10px]">Suggested</Badge>
                )}
              </div>
              <div className="text-sm font-medium text-foreground">{opt.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{opt.description}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {opt.preview.elements.map((el, i) => (
                  <span key={i} className="rounded bg-muted px-1.5 py-0.5 text-[10px] capitalize text-muted-foreground">
                    {el.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PageContentField({
  pageId,
  section,
  field,
  label,
  placeholder,
  dispatch,
  value,
  multiline,
}: {
  pageId: string;
  section: "hero" | "about_story" | "cta";
  field: string;
  label: string;
  placeholder: string;
  dispatch: any;
  value: string;
  multiline?: boolean;
}) {
  const handleChange = (v: string) =>
    dispatch(setPageContentField({ page: pageId, section, field, value: v }));

  return (
    <div>
      <Label className="mb-1.5 text-xs text-muted-foreground">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder} rows={3} />
      ) : (
        <Input value={value} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

function ContentBlock({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3">
        <h3 className="font-medium text-foreground">{title}</h3>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function StepPageDetail({
  config,
  dispatch,
  businessType,
  pageId,
  isFirstPage,
}: {
  config: any;
  dispatch: any;
  businessType: BusinessTypeConfig | null;
  pageId: string;
  isFirstPage: boolean;
}) {
  const pageLabel = AVAILABLE_PAGES.find((p) => p.id === pageId)?.label || pageId;
  const businessName = config.business.name || "your business";
  const pageSections = PAGE_SECTIONS[pageId] || [];
  const sections = config.sections as Record<string, string[]>;
  const selectedSections = sections[pageId] || [];
  const suggestedComponents = businessType?.suggestedComponents || {};
  const pageContent = (config.pageContent?.[pageId] || {}) as {
    hero?: { headline?: string; subheadline?: string; ctaText?: string };
    about_story?: { content?: string };
    cta?: { headline?: string; subheadline?: string; ctaText?: string };
  };

  const toggleSection = (sectionId: string) => {
    const current = selectedSections;
    if (current.includes(sectionId)) {
      dispatch(setPageSections({ page: pageId, sections: current.filter((s) => s !== sectionId) }));
    } else {
      dispatch(setPageSections({ page: pageId, sections: [...current, sectionId] }));
    }
  };

  // Hero is the one category shared by every page, so its layout is chosen
  // once — on the first page — rather than re-asked on every subsequent
  // page. Its text content, however, is genuinely different per page, so
  // that's always editable here.
  const heroCategory = COMPONENT_CATEGORIES.find((c) => c.category === "hero");
  const layoutFor = (category: string) => COMPONENT_CATEGORIES.find((c) => c.category === category);
  const has = (type: string) => selectedSections.some((id) => sectionType(id) === type);
  const hasStory = has("about_story");
  const hasCta = has("cta");

  return (
    <div className="space-y-6">
      <SectionIntro>
        Write the content for your {pageLabel} page and choose how it looks. Leave anything blank to use content
        suited to your business instead.
      </SectionIntro>

      {isFirstPage && heroCategory && (
        <ComponentVariantPicker
          cat={heroCategory}
          currentComponent={config.components.hero || ""}
          suggestedId={suggestedComponents.hero}
          dispatch={dispatch}
        />
      )}

      <ContentBlock title="Hero Content" hint="The first thing visitors see on this page.">
        <PageContentField
          pageId={pageId}
          section="hero"
          field="headline"
          label="Headline"
          placeholder={`e.g. Welcome to ${businessName}`}
          dispatch={dispatch}
          value={pageContent.hero?.headline || ""}
        />
        <PageContentField
          pageId={pageId}
          section="hero"
          field="subheadline"
          label="Subheadline"
          placeholder="A short sentence about what you do"
          dispatch={dispatch}
          value={pageContent.hero?.subheadline || ""}
          multiline
        />
        <PageContentField
          pageId={pageId}
          section="hero"
          field="ctaText"
          label="Button Text"
          placeholder="Get Started"
          dispatch={dispatch}
          value={pageContent.hero?.ctaText || ""}
        />
      </ContentBlock>

      {pageSections.length > 0 && (
        <div>
          <Label className="mb-2">Sections</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {pageSections.map((sec) => {
              const selected = selectedSections.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className={cn(
                    "flex items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all",
                    selected
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40"
                  )}
                >
                  <CheckBox selected={selected} />
                  <div>
                    <div className="font-medium">{sec.label}</div>
                    <div className="text-xs text-muted-foreground">{sec.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasStory && (
        <ContentBlock title="Your Story" hint="Tell visitors about your business in your own words.">
          <PageContentField
            pageId={pageId}
            section="about_story"
            field="content"
            label="Story"
            placeholder={`${businessName} was founded to...`}
            dispatch={dispatch}
            value={pageContent.about_story?.content || ""}
            multiline
          />
        </ContentBlock>
      )}

      {has("services") && (
        <>
          <ServicesEditor config={config} dispatch={dispatch} />
          {layoutFor("services") && (
            <ComponentVariantPicker cat={layoutFor("services")!} currentComponent={config.components.services || ""} suggestedId={suggestedComponents.services} dispatch={dispatch} />
          )}
        </>
      )}

      {has("portfolio") && (
        <>
          <PortfolioEditor config={config} dispatch={dispatch} />
          {layoutFor("portfolio") && (
            <ComponentVariantPicker cat={layoutFor("portfolio")!} currentComponent={config.components.portfolio || ""} suggestedId={suggestedComponents.portfolio} dispatch={dispatch} />
          )}
        </>
      )}

      {has("gallery") && (
        <>
          <GalleryEditor config={config} dispatch={dispatch} />
          {layoutFor("gallery") && (
            <ComponentVariantPicker cat={layoutFor("gallery")!} currentComponent={config.components.gallery || ""} suggestedId={suggestedComponents.gallery} dispatch={dispatch} />
          )}
        </>
      )}

      {has("team") && <TeamEditor config={config} dispatch={dispatch} />}

      {has("testimonials") && (
        <>
          <TestimonialsEditor config={config} dispatch={dispatch} />
          {layoutFor("testimonials") && (
            <ComponentVariantPicker cat={layoutFor("testimonials")!} currentComponent={config.components.testimonials || ""} suggestedId={suggestedComponents.testimonials} dispatch={dispatch} />
          )}
        </>
      )}

      {has("why_choose_us") && <WhyChooseUsEditor config={config} dispatch={dispatch} />}

      {has("pricing") && (
        <>
          <PricingPlansEditor config={config} dispatch={dispatch} />
          {layoutFor("pricing") && (
            <ComponentVariantPicker cat={layoutFor("pricing")!} currentComponent={config.components.pricing || ""} suggestedId={suggestedComponents.pricing} dispatch={dispatch} />
          )}
        </>
      )}

      {has("faq") && (
        <>
          <FaqEditor config={config} dispatch={dispatch} />
          {layoutFor("faq") && (
            <ComponentVariantPicker cat={layoutFor("faq")!} currentComponent={config.components.faq || ""} suggestedId={suggestedComponents.faq} dispatch={dispatch} />
          )}
        </>
      )}

      {has("blog_preview") && (
        <>
          <BlogPostsEditor config={config} dispatch={dispatch} />
          {layoutFor("blog") && (
            <ComponentVariantPicker cat={layoutFor("blog")!} currentComponent={config.components.blog || ""} suggestedId={suggestedComponents.blog} dispatch={dispatch} />
          )}
        </>
      )}

      {has("menu_items") && <MenuItemsEditor config={config} dispatch={dispatch} />}

      {has("daily_specials") && <DailySpecialsEditor config={config} dispatch={dispatch} />}

      {has("stats") && <StatsEditor config={config} dispatch={dispatch} />}

      {has("timeline") && <TimelineEditor config={config} dispatch={dispatch} />}

      {has("business_hours") && <BusinessHoursEditor config={config} dispatch={dispatch} />}

      {(has("agents") || has("trainers")) && <TeamEditor config={config} dispatch={dispatch} />}

      {has("class_schedule") && <ClassScheduleEditor config={config} dispatch={dispatch} />}

      {has("course_grid") && <CoursesEditor config={config} dispatch={dispatch} />}

      {has("destination_grid") && <DestinationsEditor config={config} dispatch={dispatch} />}

      {has("travel_deals") && <DailySpecialsEditor config={config} dispatch={dispatch} />}

      {has("feature_grid") && <ServicesEditor config={config} dispatch={dispatch} />}

      {has("inventory_grid") && <PortfolioEditor config={config} dispatch={dispatch} />}

      {(has("contact") || has("map") || has("contact_info")) && (
        <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          Your contact form, map, and contact info sections use the phone, email, and address from the Business step —
          nothing else to fill in here.
          {has("contact") && layoutFor("contact") && (
            <div className="mt-3">
              <ComponentVariantPicker cat={layoutFor("contact")!} currentComponent={config.components.contact || ""} suggestedId={suggestedComponents.contact} dispatch={dispatch} />
            </div>
          )}
        </div>
      )}

      {hasCta && (
        <ContentBlock title="Call-to-Action Content">
          <PageContentField
            pageId={pageId}
            section="cta"
            field="headline"
            label="Headline"
            placeholder="Ready to Get Started?"
            dispatch={dispatch}
            value={pageContent.cta?.headline || ""}
          />
          <PageContentField
            pageId={pageId}
            section="cta"
            field="subheadline"
            label="Subheadline"
            placeholder="A short supporting line"
            dispatch={dispatch}
            value={pageContent.cta?.subheadline || ""}
          />
          <PageContentField
            pageId={pageId}
            section="cta"
            field="ctaText"
            label="Button Text"
            placeholder="Contact Us"
            dispatch={dispatch}
            value={pageContent.cta?.ctaText || ""}
          />
        </ContentBlock>
      )}
    </div>
  );
}

/* ── Per-section content editors (shared content pools, edited wherever
   the section first appears — the same services list shown on Home and a
   dedicated Services page is the same list, not duplicated) ───────────── */

function useListContent<T>(config: any, dispatch: any, key: string) {
  const items = (config.content[key] || []) as T[];
  const setItems = (next: T[]) => dispatch(setContent({ [key]: next }));
  const addItem = (item: T) => setItems([...items, item]);
  const updateItem = (i: number, patch: Partial<T>) => setItems(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  return { items, addItem, updateItem, removeItem };
}

function ServicesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; icon: string }>(config, dispatch, "services");
  return (
    <EditableList
      title="Services"
      items={items}
      onAdd={() => addItem({ title: "", description: "", icon: "star" })}
      addLabel="+ Add Service"
      emptyLabel='No services added yet. Click "+ Add Service" to get started.'
      onRemove={removeItem}
      renderItem={(item, i) => (
        <>
          <Input value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Service name" />
          <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
        </>
      )}
    />
  );
}

function TestimonialsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ name: string; role: string; content: string; rating: number; avatar?: string | null }>(config, dispatch, "testimonials");
  return (
    <EditableList
      title="Testimonials"
      items={items}
      onAdd={() => addItem({ name: "", role: "", content: "", rating: 5, avatar: null })}
      addLabel="+ Add Testimonial"
      emptyLabel="No testimonials added yet."
      onRemove={removeItem}
      renderItem={(t, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={t.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Client name" />
            <Input value={t.role} onChange={(e) => updateItem(i, { role: e.target.value })} placeholder="Role / Company" />
          </div>
          <Textarea value={t.content} onChange={(e) => updateItem(i, { content: e.target.value })} placeholder="What they said..." rows={2} />
          <ImageUploadField value={t.avatar} onChange={(url) => updateItem(i, { avatar: url })} label="Photo (optional)" />
        </>
      )}
    />
  );
}

function FaqEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ question: string; answer: string }>(config, dispatch, "faq");
  return (
    <EditableList
      title="FAQ"
      items={items}
      onAdd={() => addItem({ question: "", answer: "" })}
      addLabel="+ Add FAQ"
      emptyLabel="No FAQ items added yet."
      onRemove={removeItem}
      renderItem={(f, i) => (
        <>
          <Input value={f.question} onChange={(e) => updateItem(i, { question: e.target.value })} placeholder="Question" />
          <Textarea value={f.answer} onChange={(e) => updateItem(i, { answer: e.target.value })} placeholder="Answer" rows={2} />
        </>
      )}
    />
  );
}

function PortfolioEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; image?: string | null }>(config, dispatch, "portfolio");
  return (
    <EditableList
      title="Portfolio Projects"
      items={items}
      onAdd={() => addItem({ title: "", description: "", image: null })}
      addLabel="+ Add Project"
      emptyLabel="No projects added yet."
      onRemove={removeItem}
      renderItem={(p, i) => (
        <>
          <Input value={p.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Project name" />
          <Input value={p.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
          <ImageUploadField value={p.image} onChange={(url) => updateItem(i, { image: url })} label="Project Image" />
        </>
      )}
    />
  );
}

function GalleryEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ url: string; alt?: string }>(config, dispatch, "gallery");
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-foreground">Gallery Images</h3>
        <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={() => addItem({ url: "", alt: "" })}>+ Add Image</Button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No images added yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((img, i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <ImageUploadField value={img.url || null} onChange={(url) => updateItem(i, { url: url || "" })} />
              <button type="button" onClick={() => removeItem(i)} className="mt-2 text-xs text-muted-foreground hover:text-destructive">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TeamEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ name: string; role: string; bio?: string; avatar?: string | null }>(config, dispatch, "team");
  return (
    <EditableList
      title="Team Members"
      items={items}
      onAdd={() => addItem({ name: "", role: "", bio: "", avatar: null })}
      addLabel="+ Add Member"
      emptyLabel="No team members added yet."
      onRemove={removeItem}
      renderItem={(m, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={m.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Name" />
            <Input value={m.role} onChange={(e) => updateItem(i, { role: e.target.value })} placeholder="Role" />
          </div>
          <Input value={m.bio || ""} onChange={(e) => updateItem(i, { bio: e.target.value })} placeholder="Short bio (optional)" />
          <ImageUploadField value={m.avatar} onChange={(url) => updateItem(i, { avatar: url })} label="Photo" />
        </>
      )}
    />
  );
}

function WhyChooseUsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string }>(config, dispatch, "whyChooseUs");
  return (
    <EditableList
      title="Why Choose Us"
      items={items}
      onAdd={() => addItem({ title: "", description: "" })}
      addLabel="+ Add Reason"
      emptyLabel="No reasons added yet."
      onRemove={removeItem}
      renderItem={(r, i) => (
        <>
          <Input value={r.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="e.g. Expert Team" />
          <Input value={r.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
        </>
      )}
    />
  );
}

function MenuItemsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ name: string; description: string; price: string; image?: string | null }>(config, dispatch, "menuItems");
  return (
    <EditableList
      title="Menu Items"
      items={items}
      onAdd={() => addItem({ name: "", description: "", price: "", image: null })}
      addLabel="+ Add Item"
      emptyLabel='No menu items added yet. Click "+ Add Item" to get started.'
      onRemove={removeItem}
      renderItem={(item, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={item.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Item name" />
            <Input value={item.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$12" />
          </div>
          <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
          <ImageUploadField value={item.image} onChange={(url) => updateItem(i, { image: url })} label="Photo (optional)" />
        </>
      )}
    />
  );
}

function DailySpecialsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ name: string; description: string; price: string; tag?: string; originalPrice?: string }>(config, dispatch, "dailySpecials");
  return (
    <EditableList
      title="Daily Specials"
      items={items}
      onAdd={() => addItem({ name: "", description: "", price: "", tag: "Today's Special", originalPrice: "" })}
      addLabel="+ Add Special"
      emptyLabel="No specials added yet."
      onRemove={removeItem}
      renderItem={(item, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={item.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Special name" />
            <Input value={item.tag || ""} onChange={(e) => updateItem(i, { tag: e.target.value })} placeholder="Tag, e.g. Today's Special" />
          </div>
          <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
          <div className="grid grid-cols-2 gap-2">
            <Input value={item.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$15" />
            <Input value={item.originalPrice || ""} onChange={(e) => updateItem(i, { originalPrice: e.target.value })} placeholder="Original price (optional)" />
          </div>
        </>
      )}
    />
  );
}

function BlogPostsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; excerpt: string; author?: string; date?: string; image?: string | null; category?: string }>(config, dispatch, "blogPosts");
  return (
    <EditableList
      title="Blog Posts"
      items={items}
      onAdd={() => addItem({ title: "", excerpt: "", author: "", date: "", image: null, category: "" })}
      addLabel="+ Add Post"
      emptyLabel='No posts added yet. Click "+ Add Post" to get started.'
      onRemove={removeItem}
      renderItem={(post, i) => (
        <>
          <Input value={post.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Post title" />
          <Textarea value={post.excerpt} onChange={(e) => updateItem(i, { excerpt: e.target.value })} placeholder="Short excerpt" rows={2} />
          <div className="grid grid-cols-2 gap-2">
            <Input value={post.author || ""} onChange={(e) => updateItem(i, { author: e.target.value })} placeholder="Author (optional)" />
            <Input value={post.category || ""} onChange={(e) => updateItem(i, { category: e.target.value })} placeholder="Category (optional)" />
          </div>
          <ImageUploadField value={post.image} onChange={(url) => updateItem(i, { image: url })} label="Cover Image (optional)" />
        </>
      )}
    />
  );
}

function StatsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ label: string; value: string }>(config, dispatch, "stats");
  return (
    <EditableList
      title="Statistics"
      items={items}
      onAdd={() => addItem({ label: "", value: "" })}
      addLabel="+ Add Stat"
      emptyLabel='No stats added yet. Click "+ Add Stat" to get started.'
      onRemove={removeItem}
      renderItem={(s, i) => (
        <div className="grid grid-cols-2 gap-2">
          <Input value={s.value} onChange={(e) => updateItem(i, { value: e.target.value })} placeholder="250+" />
          <Input value={s.label} onChange={(e) => updateItem(i, { label: e.target.value })} placeholder="Happy Clients" />
        </div>
      )}
    />
  );
}

function TimelineEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ year: string; title: string; description?: string }>(config, dispatch, "timeline");
  return (
    <EditableList
      title="Timeline"
      items={items}
      onAdd={() => addItem({ year: "", title: "", description: "" })}
      addLabel="+ Add Milestone"
      emptyLabel="No milestones added yet."
      onRemove={removeItem}
      renderItem={(m, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={m.year} onChange={(e) => updateItem(i, { year: e.target.value })} placeholder="Year, e.g. 2018" />
            <Input value={m.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Milestone title" />
          </div>
          <Input value={m.description || ""} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description (optional)" />
        </>
      )}
    />
  );
}

function BusinessHoursEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ day: string; hours: string }>(config, dispatch, "businessHours");
  return (
    <EditableList
      title="Business Hours"
      items={items}
      onAdd={() => addItem({ day: "", hours: "" })}
      addLabel="+ Add Hours"
      emptyLabel='No hours added yet. Click "+ Add Hours" to get started.'
      onRemove={removeItem}
      renderItem={(h, i) => (
        <div className="grid grid-cols-2 gap-2">
          <Input value={h.day} onChange={(e) => updateItem(i, { day: e.target.value })} placeholder="Monday - Friday" />
          <Input value={h.hours} onChange={(e) => updateItem(i, { hours: e.target.value })} placeholder="9:00 AM - 6:00 PM" />
        </div>
      )}
    />
  );
}

function ClassScheduleEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ day: string; time: string; className: string }>(config, dispatch, "classSchedule");
  return (
    <EditableList
      title="Class Schedule"
      items={items}
      onAdd={() => addItem({ day: "", time: "", className: "" })}
      addLabel="+ Add Class"
      emptyLabel='No classes added yet. Click "+ Add Class" to get started.'
      onRemove={removeItem}
      renderItem={(c, i) => (
        <div className="grid grid-cols-3 gap-2">
          <Input value={c.className} onChange={(e) => updateItem(i, { className: e.target.value })} placeholder="Morning Strength" className="col-span-3 sm:col-span-1" />
          <Input value={c.day} onChange={(e) => updateItem(i, { day: e.target.value })} placeholder="Monday" />
          <Input value={c.time} onChange={(e) => updateItem(i, { time: e.target.value })} placeholder="6:00 AM" />
        </div>
      )}
    />
  );
}

function CoursesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>(config, dispatch, "courses");
  return (
    <EditableList
      title="Courses"
      items={items}
      onAdd={() => addItem({ title: "", description: "", price: "", category: "", level: "", duration: "", image: null })}
      addLabel="+ Add Course"
      emptyLabel='No courses added yet. Click "+ Add Course" to get started.'
      onRemove={removeItem}
      renderItem={(c, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={c.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Course title" />
            <Input value={c.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$99" />
          </div>
          <Textarea value={c.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="What students will learn" rows={2} />
          <div className="grid grid-cols-3 gap-2">
            <Input value={c.category || ""} onChange={(e) => updateItem(i, { category: e.target.value })} placeholder="Category" />
            <Input value={c.level || ""} onChange={(e) => updateItem(i, { level: e.target.value })} placeholder="Level" />
            <Input value={c.duration || ""} onChange={(e) => updateItem(i, { duration: e.target.value })} placeholder="Duration" />
          </div>
          <ImageUploadField value={c.image} onChange={(url) => updateItem(i, { image: url })} label="Cover Image (optional)" />
        </>
      )}
    />
  );
}

function DestinationsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ name: string; price?: string; image?: string | null }>(config, dispatch, "destinations");
  return (
    <EditableList
      title="Destinations"
      items={items}
      onAdd={() => addItem({ name: "", price: "", image: null })}
      addLabel="+ Add Destination"
      emptyLabel='No destinations added yet. Click "+ Add Destination" to get started.'
      onRemove={removeItem}
      renderItem={(d, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={d.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Destination name" />
            <Input value={d.price || ""} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="From $899" />
          </div>
          <ImageUploadField value={d.image} onChange={(url) => updateItem(i, { image: url })} label="Photo (optional)" />
        </>
      )}
    />
  );
}

function PricingPlansEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ name: string; price: string; period?: string; features: string[]; popular?: boolean }>(config, dispatch, "pricingPlans");
  return (
    <EditableList
      title="Pricing Plans"
      items={items}
      onAdd={() => addItem({ name: "", price: "", period: "mo", features: [] })}
      addLabel="+ Add Plan"
      emptyLabel="No plans added yet."
      onRemove={removeItem}
      renderItem={(plan, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={plan.name} onChange={(e) => updateItem(i, { name: e.target.value })} placeholder="Plan name" />
            <Input value={plan.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$29" />
          </div>
          <Input
            value={(plan.features || []).join(", ")}
            onChange={(e) => updateItem(i, { features: e.target.value.split(",").map((f) => f.trim()).filter(Boolean) })}
            placeholder="Feature one, Feature two, Feature three"
          />
        </>
      )}
    />
  );
}

/* ── Step: Design ──────────────────────────────────────────────────── */

function StepDesign({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const suggestedComponents = businessType?.suggestedComponents || {};
  const navbarCat = COMPONENT_CATEGORIES.find((c) => c.category === "navbar");
  const footerCat = COMPONENT_CATEGORIES.find((c) => c.category === "footer");

  // theme.typography defaults to "inter" (and gets pinned again by the
  // business-type preset in Step 1), so the live preview's font lookup
  // (`typography?.fontFamily || styleProfile.preview.fontFamily`) almost
  // always resolves via typography first — meaning a Design Style pick
  // never actually changed the visible font. Re-sync typography to match
  // the style's own font whenever a style is picked; the Typography step
  // below can still override it afterward.
  const selectDesignStyle = (styleId: string) => {
    const style = DESIGN_STYLES.find((s) => s.id === styleId);
    const matchedTypography = TYPOGRAPHY_OPTIONS.find((t) => t.fontFamily === style?.preview.fontFamily)?.id;
    // Always resolve typography explicitly (clearing it when this style's
    // font isn't one of the Typography options) so a leftover selection
    // from a previous style or the business-type preset can never shadow
    // the style that was just picked.
    dispatch(setTheme({ style: styleId, typography: matchedTypography || "" }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2">Design Style *</Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DESIGN_STYLES.map((style) => {
            const selected = config.theme.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => selectDesignStyle(style.id)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all",
                  selected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border bg-background hover:border-primary/40"
                )}
              >
                <div className="mb-2 flex gap-1">
                  {style.preview.colors.map((color, i) => (
                    <div key={i} className="h-5 w-5 rounded-full border border-border" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div className="text-sm font-medium text-foreground">{style.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{style.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="mb-2">Typography</Label>
        <div className="grid grid-cols-2 gap-2">
          {TYPOGRAPHY_OPTIONS.map((typo) => {
            const selected = config.theme.typography === typo.id;
            return (
              <button
                key={typo.id}
                type="button"
                onClick={() => dispatch(setTheme({ typography: typo.id }))}
                className={cn(
                  "rounded-lg border px-3 py-2.5 text-left transition-all",
                  selected ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
                )}
              >
                <div className="text-sm font-medium text-foreground" style={{ fontFamily: typo.fontFamily }}>{typo.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{typo.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <Label className="mb-2">Accent Style</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["minimal", "bold", "gradient", "monochrome"].map((style) => {
            const selected = config.theme.accentStyle === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() => dispatch(setTheme({ accentStyle: style }))}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm capitalize transition-all",
                  selected ? "border-primary bg-primary/5 font-medium text-primary" : "border-border bg-background text-foreground hover:border-primary/40"
                )}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <p className="mb-4 text-sm font-medium text-foreground">Site Navigation</p>
        <div className="space-y-4">
          {navbarCat && (
            <ComponentVariantPicker
              cat={navbarCat}
              currentComponent={config.components.navbar || ""}
              suggestedId={suggestedComponents.navbar}
              dispatch={dispatch}
            />
          )}
          {footerCat && (
            <ComponentVariantPicker
              cat={footerCat}
              currentComponent={config.components.footer || ""}
              suggestedId={suggestedComponents.footer}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Step: Colors ──────────────────────────────────────────────────── */

function StepColors({ config, dispatch }: { config: any; dispatch: any }) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2">Color Palette</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {COLOR_PALETTES.map((palette) => {
            const selected = config.theme.primaryColor === palette.primary && config.theme.secondaryColor === palette.secondary;
            return (
              <button
                key={palette.name}
                type="button"
                onClick={() => dispatch(setTheme({ primaryColor: palette.primary, secondaryColor: palette.secondary }))}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all",
                  selected ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"
                )}
              >
                <div className="flex gap-1">
                  <div className="h-6 w-6 rounded-full border border-border" style={{ backgroundColor: palette.primary }} />
                  <div className="h-6 w-6 rounded-full border border-border" style={{ backgroundColor: palette.secondary }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{palette.name}</div>
                  <div className="text-xs text-muted-foreground">{palette.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldBlock label="Primary Color">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.theme.primaryColor}
              onChange={(e) => dispatch(setTheme({ primaryColor: e.target.value }))}
              className="h-9 w-10 shrink-0 cursor-pointer rounded-lg border border-border bg-transparent"
            />
            <Input
              value={config.theme.primaryColor}
              onChange={(e) => dispatch(setTheme({ primaryColor: e.target.value }))}
              className="font-mono"
            />
          </div>
        </FieldBlock>
        <FieldBlock label="Secondary Color">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.theme.secondaryColor}
              onChange={(e) => dispatch(setTheme({ secondaryColor: e.target.value }))}
              className="h-9 w-10 shrink-0 cursor-pointer rounded-lg border border-border bg-transparent"
            />
            <Input
              value={config.theme.secondaryColor}
              onChange={(e) => dispatch(setTheme({ secondaryColor: e.target.value }))}
              className="font-mono"
            />
          </div>
        </FieldBlock>
      </div>

      <div>
        <Label className="mb-2">Theme Mode</Label>
        <div className="grid grid-cols-3 gap-2">
          {(["light", "dark", "auto"] as const).map((mode) => {
            const selected = config.theme.mode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => dispatch(setTheme({ mode }))}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm capitalize transition-all",
                  selected ? "border-primary bg-primary/5 font-medium text-primary" : "border-border bg-background text-foreground hover:border-primary/40"
                )}
              >
                {mode}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Step: Content ─────────────────────────────────────────────────── */

function EditableList<T>({
  title,
  items,
  onAdd,
  addLabel,
  emptyLabel,
  onRemove,
  renderItem,
}: {
  title: string;
  items: T[];
  onAdd: () => void;
  addLabel: string;
  emptyLabel: string;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-foreground">{title}</h3>
        <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={onAdd}>{addLabel}</Button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
              <div className="flex-1 space-y-2">{renderItem(item, i)}</div>
              <Button type="button" variant="ghost" size="sm" className="mt-1 text-destructive hover:text-destructive" onClick={() => onRemove(i)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* ── Step: Review ──────────────────────────────────────────────────── */

function ReviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-muted/50 p-4">
      <h3 className="mb-2 font-medium text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function StepReview({ config }: { config: any }) {
  const businessType = BUSINESS_TYPES[config.business.type];
  const pages = config.pages as string[];

  return (
    <div className="space-y-4">
      <ReviewCard title="Business Information">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted-foreground">Type:</span> <span className="font-medium text-foreground">{businessType?.icon} {businessType?.label || config.business.type}</span></div>
          <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{config.business.name || "Not provided"}</span></div>
          <div><span className="text-muted-foreground">Location:</span> <span className="font-medium text-foreground">{config.business.location || "Not provided"}</span></div>
          <div><span className="text-muted-foreground">Audience:</span> <span className="font-medium text-foreground">{config.business.targetAudience || "Not provided"}</span></div>
          <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{config.business.email || "Not provided"}</span></div>
          <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{config.business.phone || "Not provided"}</span></div>
          <div className="col-span-2"><span className="text-muted-foreground">Address:</span> <span className="font-medium text-foreground">{config.business.address || "Not provided"}</span></div>
          {(config.business.socialLinks || []).length > 0 && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Social:</span>{" "}
              <span className="font-medium capitalize text-foreground">
                {(config.business.socialLinks as Array<{ platform: string; url: string }>).map((l) => l.platform).join(", ")}
              </span>
            </div>
          )}
        </div>
      </ReviewCard>

      <ReviewCard title={`Pages (${pages.length})`}>
        <div className="flex flex-wrap gap-1.5">
          {pages.map((p: string) => {
            const page = AVAILABLE_PAGES.find((ap) => ap.id === p);
            return <Badge key={p} variant="outline">{page?.label || p}</Badge>;
          })}
        </div>
      </ReviewCard>

      <ReviewCard title="Design">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-muted-foreground">Style:</span> <span className="font-medium capitalize text-foreground">{config.theme.style}</span></div>
          <div><span className="text-muted-foreground">Typography:</span> <span className="font-medium capitalize text-foreground">{config.theme.typography}</span></div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Colors:</span>
            <div className="h-5 w-5 rounded-full border border-border" style={{ backgroundColor: config.theme.primaryColor }} />
            <div className="h-5 w-5 rounded-full border border-border" style={{ backgroundColor: config.theme.secondaryColor }} />
          </div>
          <div><span className="text-muted-foreground">Mode:</span> <span className="font-medium capitalize text-foreground">{config.theme.mode}</span></div>
        </div>
      </ReviewCard>

      <ReviewCard title="Components">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(config.components as Record<string, string>).map(([cat, compId]) => {
            if (!compId) return null;
            const catConfig = COMPONENT_CATEGORIES.find((c) => c.category === cat);
            const optConfig = catConfig?.options.find((o) => o.id === compId);
            return (
              <div key={cat}>
                <span className="capitalize text-muted-foreground">{cat}:</span>{" "}
                <span className="font-medium text-foreground">{optConfig?.name || compId}</span>
              </div>
            );
          })}
        </div>
      </ReviewCard>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
        <p className="font-medium">Ready to generate your website?</p>
        <p className="mt-1 text-muted-foreground">Click "Generate Website" to create your custom website based on all the selections above.</p>
      </div>
    </div>
  );
}

export default QuestionnairePage;
