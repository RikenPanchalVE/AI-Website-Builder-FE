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
  setBranding,
  setCurrentStep,
} from "@/store/slices/builderSlice";
import { BUSINESS_TYPES, type BusinessTypeConfig } from "@/config/businessTypes";
import type { WebsiteConfig } from "@/data/websiteConfig";
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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Popover, Accordion } from "radix-ui";

interface StepDef {
  key: string;
  title: string;
  subtitle: string;
  kind: "business" | "pages" | "design" | "colors" | "review";
}

// Fixed, top-level steps — pages no longer clutter this row as individual
// entries. Each selected page instead becomes a sub-tab nested under the
// single "Pages" step (see pageSubStep state below), so the top bar stays
// clean regardless of whether a business has 2 pages or 8.
const STEPS: StepDef[] = [
  { key: "business", title: "Business", subtitle: "Tell us about your business", kind: "business" },
  { key: "pages", title: "Pages", subtitle: "Which pages do you need?", kind: "pages" },
  { key: "design", title: "Design", subtitle: "Choose your visual style", kind: "design" },
  { key: "colors", title: "Colors", subtitle: "Pick your brand colors", kind: "colors" },
  { key: "review", title: "Review", subtitle: "Review and generate", kind: "review" },
];

// Only these hero layouts are actually built around a photo (Hero1's dark
// cinematic full-bleed image, Hero4's full-bg image with overlaid text) — the
// others (Split Editorial, Centered Statement, Minimal Text) are text-first
// and don't use an uploaded background image, so the upload field would be
// misleading to show for them.
// Hero2 (Split Editorial) has an image slot too — its right column falls
// back to a decorative gradient with no image, same as Hero1/Hero4 — it
// was just missing from this set, so the upload field never showed for it.
const IMAGE_HERO_IDS = new Set(["hero1", "hero2", "hero4"]);

const PAGE_SELECT_KEY = "select";

interface PageSubStepDef {
  key: string; // PAGE_SELECT_KEY or a page id
  title: string;
}

function buildPageSubSteps(pages: string[]): PageSubStepDef[] {
  const selected = pages.length ? pages : ["home"];
  return [
    { key: PAGE_SELECT_KEY, title: "Select Pages" },
    ...selected.map((id) => ({
      key: id,
      title: AVAILABLE_PAGES.find((p) => p.id === id)?.label || id,
    })),
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

  const [pageSubStep, setPageSubStep] = useState<string>(PAGE_SELECT_KEY);
  const [previewPage, setPreviewPage] = useState("home");
  const [fullScreenPreview, setFullScreenPreview] = useState(false);

  const businessType = BUSINESS_TYPES[config.business.type] || null;
  const currentStepDef = STEPS[Math.min(step, STEPS.length - 1)];
  const pageSubSteps = useMemo(() => buildPageSubSteps(config.pages), [config.pages]);
  const pageSubIndex = Math.max(pageSubSteps.findIndex((s) => s.key === pageSubStep), 0);
  const isOnPageDetail = currentStepDef.kind === "pages" && pageSubStep !== PAGE_SELECT_KEY;

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

  // If a page gets deselected while its sub-tab is active (or on first
  // load), fall back to the page-selection sub-tab instead of pointing at
  // a page that no longer exists.
  useEffect(() => {
    if (pageSubStep !== PAGE_SELECT_KEY && !config.pages.includes(pageSubStep)) {
      setPageSubStep(PAGE_SELECT_KEY);
    }
  }, [config.pages, pageSubStep]);

  // Keep the live preview focused on whichever page the client is currently
  // configuring, so the answer to "how does this look" is always right there.
  useEffect(() => {
    if (isOnPageDetail) setPreviewPage(pageSubStep);
  }, [isOnPageDetail, pageSubStep]);

  const setStep = (s: number) => {
    setLocalStep(s);
    dispatch(setCurrentStep(s));
  };

  // Jumps to a top-level step from the main tab row. Always resets the
  // Pages step back to its selection sub-tab so there's one predictable
  // entry point, no matter which page sub-tab was open before.
  const goToStep = (i: number) => {
    setStep(i);
    if (STEPS[i].kind === "pages") setPageSubStep(PAGE_SELECT_KEY);
  };

  // Same idea, but for the Review step's per-item "Edit" buttons — jumps
  // straight into a specific page's own sub-tab (or the page-selection
  // tab, for anything not tied to one particular page) instead of always
  // landing on selection first.
  const goToPageTab = (pageId: string) => {
    setStep(STEPS.findIndex((s) => s.kind === "pages"));
    setPageSubStep(pageId);
  };

  const canNext = (): boolean => {
    switch (currentStepDef?.kind) {
      case "business": return !!config.business.type;
      case "pages": return config.pages.length > 0;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStepDef.kind === "pages" && pageSubIndex < pageSubSteps.length - 1) {
      setPageSubStep(pageSubSteps[pageSubIndex + 1].key);
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handlePrev = () => {
    if (currentStepDef.kind === "pages" && pageSubIndex > 0) {
      setPageSubStep(pageSubSteps[pageSubIndex - 1].key);
      return;
    }
    if (step > 0) {
      const prevStep = STEPS[step - 1];
      // Re-entering Pages from Design mirrors going forward through it —
      // land on the last page sub-tab rather than back at selection.
      if (prevStep.kind === "pages") setPageSubStep(pageSubSteps[pageSubSteps.length - 1]?.key || PAGE_SELECT_KEY);
      setStep(step - 1);
    }
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

  // Folds the Pages step's sub-tab position into the overall progress so the
  // bar still advances smoothly while stepping through individual pages.
  const pagesSubFraction = currentStepDef.kind === "pages" ? (pageSubIndex + 1) / pageSubSteps.length : 1;
  const progress = ((step + pagesSubFraction) / STEPS.length) * 100;
  const activePageSubStepDef = pageSubSteps[pageSubIndex];
  const headerTitle = isOnPageDetail ? activePageSubStepDef?.title || currentStepDef.title : currentStepDef.title;
  const headerSubtitle = currentStepDef.kind === "pages"
    ? (isOnPageDetail ? `Everything about your ${activePageSubStepDef?.title} page` : currentStepDef.subtitle)
    : currentStepDef.subtitle;

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
              {isOnPageDetail && ` · ${activePageSubStepDef?.title}`}
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
                onClick={() => goToStep(i)}
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

          {currentStepDef.kind === "pages" && (
            <div className="mt-2 flex gap-1 overflow-x-auto border-t border-border/60 pt-2">
              {pageSubSteps.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setPageSubStep(s.key)}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs transition-colors",
                    s.key === pageSubStep
                      ? "bg-primary text-primary-foreground"
                      : i < pageSubIndex
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  )}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
          <div className="min-w-0">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">{headerTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{headerSubtitle}</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
              {currentStepDef.kind === "business" && <StepBusiness config={config} dispatch={dispatch} businessType={businessType} />}
              {currentStepDef.kind === "pages" && !isOnPageDetail && <StepPages config={config} dispatch={dispatch} businessType={businessType} />}
              {isOnPageDetail && (
                <StepPageDetail
                  config={config}
                  dispatch={dispatch}
                  businessType={businessType}
                  pageId={pageSubStep}
                  isFirstPage={config.pages[0] === pageSubStep}
                />
              )}
              {currentStepDef.kind === "design" && <StepDesign config={config} dispatch={dispatch} businessType={businessType} />}
              {currentStepDef.kind === "colors" && <StepColors config={config} dispatch={dispatch} />}
              {currentStepDef.kind === "review" && (
                <StepReview
                  config={config}
                  onEditStep={goToStep}
                  onEditPage={goToPageTab}
                  businessStepIndex={STEPS.findIndex((s) => s.kind === "business")}
                  designStepIndex={STEPS.findIndex((s) => s.kind === "design")}
                  colorsStepIndex={STEPS.findIndex((s) => s.kind === "colors")}
                />
              )}
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
              projectId={currentProject.projectId}
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
          projectId={currentProject.projectId}
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

      <FieldBlock label="Location">
        <Input
          value={config.business.location}
          onChange={(e) => dispatch(updateBusiness({ location: e.target.value }))}
          placeholder="City, State, Country"
        />
      </FieldBlock>

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

// Multi-select dropdown for pages outside the current business type's
// suggested set. Stays open across multiple picks (only Escape / an
// outside click closes it) so the user can add several at once instead of
// re-opening it per page.
function OtherPagesDropdown({
  pages,
  selected,
  onToggle,
}: {
  pages: Array<{ id: string; label: string }>;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedCount = pages.filter((p) => selected.includes(p.id)).length;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-2 rounded-lg border border-dashed border-border bg-background px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/40 sm:w-auto sm:min-w-[240px]"
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {selectedCount > 0 ? `${selectedCount} other page${selectedCount > 1 ? "s" : ""} added` : "Add another page"}
          </span>
          <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-50 w-72 rounded-lg border border-border bg-card p-2 shadow-lg outline-none"
        >
          <p className="mb-1.5 px-2 pt-1 text-xs text-muted-foreground">
            Not related to your business type, but available if you need them. Select as many as you like.
          </p>
          <div className="max-h-72 space-y-0.5 overflow-y-auto">
            {pages.map((p) => {
              const isSelected = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onToggle(p.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors",
                    isSelected ? "bg-primary/5 text-foreground" : "text-foreground hover:bg-muted"
                  )}
                >
                  <CheckBox selected={isSelected} />
                  {p.label}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

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

  // The main grid only offers pages that actually make sense for the
  // selected business type — no more picking "Properties" for a bakery.
  // Falls back to the full list on the rare case a business type couldn't
  // be resolved (in which case there's nothing left over for the dropdown).
  const relevantIds = businessType
    ? new Set(["home", ...(businessType.suggestedPages || [])])
    : null;
  const visiblePages = relevantIds
    ? AVAILABLE_PAGES.filter((p) => relevantIds.has(p.id))
    : AVAILABLE_PAGES;
  const otherPages = relevantIds
    ? AVAILABLE_PAGES.filter((p) => !relevantIds.has(p.id))
    : [];
  const addedOtherPages = otherPages.filter((p) => config.pages.includes(p.id));

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

      {otherPages.length > 0 && (
        <div className="border-t border-border pt-4">
          <Label className="mb-2">Need something else?</Label>
          <OtherPagesDropdown pages={otherPages} selected={config.pages} onToggle={togglePage} />
          {addedOtherPages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {addedOtherPages.map((p) => (
                <Badge key={p.id} variant="secondary" className="gap-1 pr-1">
                  {p.label}
                  <button
                    type="button"
                    onClick={() => togglePage(p.id)}
                    className="ml-1 flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-muted-foreground/20"
                    aria-label={`Remove ${p.label}`}
                  >
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
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

/* ── Drag-and-drop section order ─────────────────────────────────────
   Section order in the actual generated website is driven directly by the
   order of ids in config.sections[pageId] (both the live preview and every
   server-side page builder loop over that array in order and assign
   order: order++ as they go) — so reordering this list is a real, direct
   control over section order on the live site, not cosmetic. ─────────── */

function SortableSectionRow({ id, index, label }: { id: string; index: number; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm",
        isDragging && "z-10 opacity-90 shadow-md"
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="flex h-6 w-6 shrink-0 touch-none cursor-grab items-center justify-center rounded text-muted-foreground hover:bg-muted active:cursor-grabbing"
        aria-label={`Drag to reorder ${label}`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" />
          <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
          <circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" />
        </svg>
      </button>
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
        {index + 1}
      </span>
      <span className="font-medium text-foreground">{label}</span>
    </div>
  );
}

function SectionOrderList({
  items,
  labelFor,
  onReorder,
}: {
  items: string[];
  labelFor: (id: string) => string;
  onReorder: (next: string[]) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Label>Section Order</Label>
        <span className="text-xs text-muted-foreground">Drag to reorder</span>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-1.5">
            {items.map((id, i) => (
              <SortableSectionRow key={id} id={id} index={i} label={labelFor(id)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
  const pageContent = (config.pageContent?.[pageId] || {}) as WebsiteConfig["pageContent"][string];

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
        {isFirstPage && IMAGE_HERO_IDS.has(config.components.hero || "hero1") && (
          <ImageUploadField
            value={config.branding?.bannerImages?.[0] || null}
            onChange={(url) =>
              dispatch(setBranding({ bannerImages: url ? [url] : [] }))
            }
            label="Background Image (optional). Leave blank for a solid gradient background instead."
          />
        )}
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
        {isFirstPage && (config.components.hero || "hero1") === "hero2" && (
          <>
            <PageContentField
              pageId={pageId}
              section="hero"
              field="socialProofText"
              label="Social Proof Heading"
              placeholder="Trusted by 1,000+"
              dispatch={dispatch}
              value={pageContent.hero?.socialProofText || ""}
            />
            <PageContentField
              pageId={pageId}
              section="hero"
              field="socialProofSubtext"
              label="Social Proof Subtext"
              placeholder="happy clients"
              dispatch={dispatch}
              value={pageContent.hero?.socialProofSubtext || ""}
            />
          </>
        )}
        {isFirstPage && (config.components.hero || "hero1") === "hero3" && (
          <>
            <PageContentField
              pageId={pageId}
              section="hero"
              field="secondaryCtaText"
              label="Second Button Text"
              placeholder="Learn More"
              dispatch={dispatch}
              value={pageContent.hero?.secondaryCtaText || ""}
            />
            <div>
              <Label className="mb-1.5 text-xs text-muted-foreground">Stats Bar</Label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {([1, 2, 3] as const).map((n) => (
                  <div key={n} className="space-y-1.5 rounded-lg border border-border p-2.5">
                    <Input
                      value={(pageContent.hero as Record<string, string> | undefined)?.[`stat${n}Value`] || ""}
                      onChange={(e) =>
                        dispatch(setPageContentField({ page: pageId, section: "hero", field: `stat${n}Value`, value: e.target.value }))
                      }
                      placeholder={["500+", "98%", "24/7"][n - 1]}
                    />
                    <Input
                      value={(pageContent.hero as Record<string, string> | undefined)?.[`stat${n}Label`] || ""}
                      onChange={(e) =>
                        dispatch(setPageContentField({ page: pageId, section: "hero", field: `stat${n}Label`, value: e.target.value }))
                      }
                      placeholder={["Projects", "Satisfaction", "Support"][n - 1]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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

      {selectedSections.length > 1 && (
        <SectionOrderList
          items={selectedSections}
          labelFor={(id) => pageSections.find((s) => s.id === id)?.label || id}
          onReorder={(next) => dispatch(setPageSections({ page: pageId, sections: next }))}
        />
      )}

      {hasStory && (
        <>
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
          {layoutFor("about_story") && (
            <ComponentVariantPicker cat={layoutFor("about_story")!} currentComponent={config.components.about_story || ""} suggestedId={suggestedComponents.about_story} dispatch={dispatch} />
          )}
        </>
      )}

      {has("about_values") && (
        <>
          <AboutValuesEditor config={config} dispatch={dispatch} />
          {layoutFor("about_values") && (
            <ComponentVariantPicker cat={layoutFor("about_values")!} currentComponent={config.components.about_values || ""} suggestedId={suggestedComponents.about_values} dispatch={dispatch} />
          )}
        </>
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

      {has("team") && (
        <>
          <TeamEditor config={config} dispatch={dispatch} />
          {layoutFor("team") && (
            <ComponentVariantPicker cat={layoutFor("team")!} currentComponent={config.components.team || ""} suggestedId={suggestedComponents.team} dispatch={dispatch} />
          )}
        </>
      )}

      {has("testimonials") && (
        <>
          <TestimonialsEditor config={config} dispatch={dispatch} />
          {layoutFor("testimonials") && (
            <ComponentVariantPicker cat={layoutFor("testimonials")!} currentComponent={config.components.testimonials || ""} suggestedId={suggestedComponents.testimonials} dispatch={dispatch} />
          )}
        </>
      )}

      {has("why_choose_us") && (
        <>
          <WhyChooseUsEditor config={config} dispatch={dispatch} />
          {layoutFor("why_choose_us") && (
            <ComponentVariantPicker cat={layoutFor("why_choose_us")!} currentComponent={config.components.why_choose_us || ""} suggestedId={suggestedComponents.why_choose_us} dispatch={dispatch} />
          )}
        </>
      )}

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

      {has("menu_items") && (
        <>
          <MenuItemsEditor config={config} dispatch={dispatch} />
          {layoutFor("menu_items") && (
            <ComponentVariantPicker cat={layoutFor("menu_items")!} currentComponent={config.components.menu_items || ""} suggestedId={suggestedComponents.menu_items} dispatch={dispatch} />
          )}
        </>
      )}

      {has("daily_specials") && (
        <>
          <DailySpecialsEditor config={config} dispatch={dispatch} />
          {layoutFor("daily_specials") && (
            <ComponentVariantPicker cat={layoutFor("daily_specials")!} currentComponent={config.components.daily_specials || ""} suggestedId={suggestedComponents.daily_specials} dispatch={dispatch} />
          )}
        </>
      )}

      {has("stats") && (
        <>
          <StatsEditor config={config} dispatch={dispatch} />
          {layoutFor("stats") && (
            <ComponentVariantPicker cat={layoutFor("stats")!} currentComponent={config.components.stats || ""} suggestedId={suggestedComponents.stats} dispatch={dispatch} />
          )}
        </>
      )}

      {has("timeline") && (
        <>
          <TimelineEditor config={config} dispatch={dispatch} />
          {layoutFor("timeline") && (
            <ComponentVariantPicker cat={layoutFor("timeline")!} currentComponent={config.components.timeline || ""} suggestedId={suggestedComponents.timeline} dispatch={dispatch} />
          )}
        </>
      )}

      {has("business_hours") && (
        <>
          <BusinessHoursEditor config={config} dispatch={dispatch} />
          {layoutFor("business_hours") && (
            <ComponentVariantPicker cat={layoutFor("business_hours")!} currentComponent={config.components.business_hours || ""} suggestedId={suggestedComponents.business_hours} dispatch={dispatch} />
          )}
        </>
      )}

      {(has("agents") || has("trainers") || has("doctors") || has("instructors")) && <TeamEditor config={config} dispatch={dispatch} />}
      {/* Agents/Trainers/Doctors/Instructors all edit the same shared team
          list above (TeamEditor), but each renders through its own
          component family server-side, so each gets its own layout picker —
          normally only one of these is active on a given page. */}
      {has("agents") && layoutFor("agents") && (
        <ComponentVariantPicker cat={layoutFor("agents")!} currentComponent={config.components.agents || ""} suggestedId={suggestedComponents.agents} dispatch={dispatch} />
      )}
      {has("trainers") && layoutFor("team") && (
        <ComponentVariantPicker cat={layoutFor("team")!} currentComponent={config.components.team || ""} suggestedId={suggestedComponents.team} dispatch={dispatch} />
      )}
      {has("doctors") && layoutFor("doctors") && (
        <ComponentVariantPicker cat={layoutFor("doctors")!} currentComponent={config.components.doctors || ""} suggestedId={suggestedComponents.doctors} dispatch={dispatch} />
      )}
      {has("instructors") && layoutFor("instructors") && (
        <ComponentVariantPicker cat={layoutFor("instructors")!} currentComponent={config.components.instructors || ""} suggestedId={suggestedComponents.instructors} dispatch={dispatch} />
      )}

      {has("class_schedule") && <ClassScheduleEditor config={config} dispatch={dispatch} />}

      {has("course_grid") && (
        <>
          <CoursesEditor config={config} dispatch={dispatch} />
          {layoutFor("course_grid") && (
            <ComponentVariantPicker cat={layoutFor("course_grid")!} currentComponent={config.components.course_grid || ""} suggestedId={suggestedComponents.course_grid} dispatch={dispatch} />
          )}
        </>
      )}

      {has("destination_grid") && (
        <>
          <DestinationsEditor config={config} dispatch={dispatch} />
          {layoutFor("destination_grid") && (
            <ComponentVariantPicker cat={layoutFor("destination_grid")!} currentComponent={config.components.destination_grid || ""} suggestedId={suggestedComponents.destination_grid} dispatch={dispatch} />
          )}
        </>
      )}

      {has("travel_deals") && (
        <>
          <DailySpecialsEditor config={config} dispatch={dispatch} />
          {layoutFor("travel_deals") && (
            <ComponentVariantPicker cat={layoutFor("travel_deals")!} currentComponent={config.components.travel_deals || ""} suggestedId={suggestedComponents.travel_deals} dispatch={dispatch} />
          )}
        </>
      )}

      {has("feature_grid") && <ServicesEditor config={config} dispatch={dispatch} />}

      {has("inventory_grid") && <PortfolioEditor config={config} dispatch={dispatch} />}

      {has("solutions") && (
        <>
          <SolutionsEditor config={config} dispatch={dispatch} />
          {/* Solutions reuses the Services layout family server-side (there's
              no separate "solutions" component set) — same picker, same
              selection, so it stays in sync with any Services section on
              the same page instead of offering a second, disconnected
              choice for what resolves to the same component either way. */}
          {layoutFor("services") && (
            <ComponentVariantPicker cat={layoutFor("services")!} currentComponent={config.components.services || ""} suggestedId={suggestedComponents.services} dispatch={dispatch} />
          )}
        </>
      )}

      {has("industries") && (
        <>
          <IndustriesEditor config={config} dispatch={dispatch} />
          {/* Industries reuses the Services layout family server-side too. */}
          {layoutFor("services") && (
            <ComponentVariantPicker cat={layoutFor("services")!} currentComponent={config.components.services || ""} suggestedId={suggestedComponents.services} dispatch={dispatch} />
          )}
        </>
      )}

      {has("case_studies") && (
        <>
          <CaseStudiesEditor config={config} dispatch={dispatch} />
          {/* Case Studies reuses the Portfolio layout family server-side. */}
          {layoutFor("portfolio") && (
            <ComponentVariantPicker cat={layoutFor("portfolio")!} currentComponent={config.components.portfolio || ""} suggestedId={suggestedComponents.portfolio} dispatch={dispatch} />
          )}
        </>
      )}

      {has("rooms") && (
        <>
          <RoomsEditor config={config} dispatch={dispatch} />
          {layoutFor("course_grid") && (
            <ComponentVariantPicker cat={layoutFor("course_grid")!} currentComponent={config.components.course_grid || ""} suggestedId={suggestedComponents.course_grid} dispatch={dispatch} />
          )}
        </>
      )}

      {has("amenities") && (
        <>
          <AmenitiesEditor config={config} dispatch={dispatch} />
          {/* Amenities reuses the Why Choose Us layout family server-side. */}
          {layoutFor("why_choose_us") && (
            <ComponentVariantPicker cat={layoutFor("why_choose_us")!} currentComponent={config.components.why_choose_us || ""} suggestedId={suggestedComponents.why_choose_us} dispatch={dispatch} />
          )}
        </>
      )}

      {has("experiences") && (
        <>
          <ExperiencesEditor config={config} dispatch={dispatch} />
          {/* Experiences reuses the Portfolio layout family server-side. */}
          {layoutFor("portfolio") && (
            <ComponentVariantPicker cat={layoutFor("portfolio")!} currentComponent={config.components.portfolio || ""} suggestedId={suggestedComponents.portfolio} dispatch={dispatch} />
          )}
        </>
      )}

      {has("travel_packages") && (
        <>
          <TravelPackagesEditor config={config} dispatch={dispatch} />
          {layoutFor("course_grid") && (
            <ComponentVariantPicker cat={layoutFor("course_grid")!} currentComponent={config.components.course_grid || ""} suggestedId={suggestedComponents.course_grid} dispatch={dispatch} />
          )}
        </>
      )}

      {has("process") && (
        <>
          <ProcessEditor config={config} dispatch={dispatch} />
          {layoutFor("process") && (
            <ComponentVariantPicker cat={layoutFor("process")!} currentComponent={config.components.process || ""} suggestedId={suggestedComponents.process} dispatch={dispatch} />
          )}
        </>
      )}

      {has("programs") && (
        <>
          <ProgramsEditor config={config} dispatch={dispatch} />
          {layoutFor("course_grid") && (
            <ComponentVariantPicker cat={layoutFor("course_grid")!} currentComponent={config.components.course_grid || ""} suggestedId={suggestedComponents.course_grid} dispatch={dispatch} />
          )}
        </>
      )}

      {has("facilities") && (
        <>
          <FacilitiesEditor config={config} dispatch={dispatch} />
          {/* Facilities reuses the Why Choose Us layout family server-side. */}
          {layoutFor("why_choose_us") && (
            <ComponentVariantPicker cat={layoutFor("why_choose_us")!} currentComponent={config.components.why_choose_us || ""} suggestedId={suggestedComponents.why_choose_us} dispatch={dispatch} />
          )}
        </>
      )}

      {has("skills") && (
        <>
          <SkillsEditor config={config} dispatch={dispatch} />
          {/* Skills reuses the Why Choose Us layout family server-side. */}
          {layoutFor("why_choose_us") && (
            <ComponentVariantPicker cat={layoutFor("why_choose_us")!} currentComponent={config.components.why_choose_us || ""} suggestedId={suggestedComponents.why_choose_us} dispatch={dispatch} />
          )}
        </>
      )}

      {(has("contact") || has("map") || has("contact_info")) && (
        <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          Your contact form, map, and contact info sections use the phone, email, and address from the Business step.
        </div>
      )}

      {has("contact") && (
        <ContentBlock title="Contact Form Content" hint="Customize the heading, intro text, and submit button on your contact form.">
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Heading</Label>
            <Input
              value={config.content.contact?.heading || ""}
              onChange={(e) => dispatch(setContent({ contact: { ...config.content.contact, heading: e.target.value } }))}
              placeholder="Get In Touch"
            />
          </div>
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Intro Text</Label>
            <Textarea
              value={config.content.contact?.intro || ""}
              onChange={(e) => dispatch(setContent({ contact: { ...config.content.contact, intro: e.target.value } }))}
              placeholder="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
              rows={2}
            />
          </div>
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Submit Button Text</Label>
            <Input
              value={config.content.contact?.submitButtonText || ""}
              onChange={(e) => dispatch(setContent({ contact: { ...config.content.contact, submitButtonText: e.target.value } }))}
              placeholder="Send Message"
            />
          </div>
          {layoutFor("contact") && (
            <ComponentVariantPicker cat={layoutFor("contact")!} currentComponent={config.components.contact || ""} suggestedId={suggestedComponents.contact} dispatch={dispatch} />
          )}
        </ContentBlock>
      )}

      {has("map") && layoutFor("map") && (
        <ComponentVariantPicker cat={layoutFor("map")!} currentComponent={config.components.map || ""} suggestedId={suggestedComponents.map} dispatch={dispatch} />
      )}

      {has("contact_info") && (
        <ContentBlock title="Contact Info Content" hint="Optional heading shown above your phone/email/address block.">
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Heading</Label>
            <Input
              value={config.content.contact?.infoHeading || ""}
              onChange={(e) => dispatch(setContent({ contact: { ...config.content.contact, infoHeading: e.target.value } }))}
              placeholder="e.g. Get in Touch"
            />
          </div>
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Subtitle</Label>
            <Input
              value={config.content.contact?.infoSubtitle || ""}
              onChange={(e) => dispatch(setContent({ contact: { ...config.content.contact, infoSubtitle: e.target.value } }))}
              placeholder="Optional subtitle"
            />
          </div>
          {layoutFor("contact_info") && (
            <ComponentVariantPicker cat={layoutFor("contact_info")!} currentComponent={config.components.contact_info || ""} suggestedId={suggestedComponents.contact_info} dispatch={dispatch} />
          )}
        </ContentBlock>
      )}

      {hasCta && (
        <>
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
          {layoutFor("cta") && (
            <ComponentVariantPicker cat={layoutFor("cta")!} currentComponent={config.components.cta || ""} suggestedId={suggestedComponents.cta} dispatch={dispatch} />
          )}
        </>
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

// The About page's Values section had a layout picker but its actual
// content — 4 values, always "Excellence/Integrity/Innovation/Customer
// Focus" — was hardcoded with no editor anywhere, unlike every other list
// section on this page.
function AboutValuesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string }>(config, dispatch, "aboutValues");
  return (
    <EditableList
      title="Our Values"
      items={items}
      onAdd={() => addItem({ title: "", description: "" })}
      addLabel="+ Add Value"
      emptyLabel="No values added yet — defaults to Excellence, Integrity, Innovation, and Customer Focus."
      onRemove={removeItem}
      renderItem={(v, i) => (
        <>
          <Input value={v.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="e.g. Integrity" />
          <Input value={v.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
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

function SolutionsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; icon: string }>(config, dispatch, "solutions");
  return (
    <EditableList
      title="Solutions"
      items={items}
      onAdd={() => addItem({ title: "", description: "", icon: "star" })}
      addLabel="+ Add Solution"
      emptyLabel='No solutions added yet. Click "+ Add Solution" to get started.'
      onRemove={removeItem}
      renderItem={(item, i) => (
        <>
          <Input value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Solution name" />
          <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
        </>
      )}
    />
  );
}

function IndustriesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; icon: string }>(config, dispatch, "industries");
  return (
    <EditableList
      title="Industries"
      items={items}
      onAdd={() => addItem({ title: "", description: "", icon: "star" })}
      addLabel="+ Add Industry"
      emptyLabel='No industries added yet. Click "+ Add Industry" to get started.'
      onRemove={removeItem}
      renderItem={(item, i) => (
        <>
          <Input value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Industry name" />
          <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
        </>
      )}
    />
  );
}

function CaseStudiesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; image?: string | null }>(config, dispatch, "caseStudies");
  return (
    <EditableList
      title="Case Studies"
      items={items}
      onAdd={() => addItem({ title: "", description: "", image: null })}
      addLabel="+ Add Case Study"
      emptyLabel='No case studies added yet. Click "+ Add Case Study" to get started.'
      onRemove={removeItem}
      renderItem={(c, i) => (
        <>
          <Input value={c.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Case study title" />
          <Textarea value={c.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="What you did and the result" rows={2} />
          <ImageUploadField value={c.image} onChange={(url) => updateItem(i, { image: url })} label="Cover Image (optional)" />
        </>
      )}
    />
  );
}

function RoomsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>(config, dispatch, "rooms");
  return (
    <EditableList
      title="Rooms & Suites"
      items={items}
      onAdd={() => addItem({ title: "", description: "", price: "", category: "", level: "", duration: "", image: null })}
      addLabel="+ Add Room"
      emptyLabel='No rooms added yet. Click "+ Add Room" to get started.'
      onRemove={removeItem}
      renderItem={(r, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={r.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Room name" />
            <Input value={r.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$189/night" />
          </div>
          <Textarea value={r.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Room description" rows={2} />
          <Input value={r.category || ""} onChange={(e) => updateItem(i, { category: e.target.value })} placeholder="Category, e.g. Deluxe" />
          <ImageUploadField value={r.image} onChange={(url) => updateItem(i, { image: url })} label="Room Photo (optional)" />
        </>
      )}
    />
  );
}

function AmenitiesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string }>(config, dispatch, "amenities");
  return (
    <EditableList
      title="Amenities"
      items={items}
      onAdd={() => addItem({ title: "", description: "" })}
      addLabel="+ Add Amenity"
      emptyLabel='No amenities added yet. Click "+ Add Amenity" to get started.'
      onRemove={removeItem}
      renderItem={(a, i) => (
        <>
          <Input value={a.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="e.g. Pool & Spa" />
          <Input value={a.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
        </>
      )}
    />
  );
}

function ExperiencesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; image?: string | null }>(config, dispatch, "experiences");
  return (
    <EditableList
      title="Experiences"
      items={items}
      onAdd={() => addItem({ title: "", description: "", image: null })}
      addLabel="+ Add Experience"
      emptyLabel='No experiences added yet. Click "+ Add Experience" to get started.'
      onRemove={removeItem}
      renderItem={(e_, i) => (
        <>
          <Input value={e_.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Experience name" />
          <Textarea value={e_.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" rows={2} />
          <ImageUploadField value={e_.image} onChange={(url) => updateItem(i, { image: url })} label="Photo (optional)" />
        </>
      )}
    />
  );
}

function TravelPackagesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>(config, dispatch, "travelPackages");
  return (
    <EditableList
      title="Travel Packages"
      items={items}
      onAdd={() => addItem({ title: "", description: "", price: "", category: "", level: "", duration: "", image: null })}
      addLabel="+ Add Package"
      emptyLabel='No packages added yet. Click "+ Add Package" to get started.'
      onRemove={removeItem}
      renderItem={(p, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={p.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Package name" />
            <Input value={p.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$1,299" />
          </div>
          <Textarea value={p.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="What's included" rows={2} />
          <div className="grid grid-cols-2 gap-2">
            <Input value={p.category || ""} onChange={(e) => updateItem(i, { category: e.target.value })} placeholder="Category, e.g. Adventure" />
            <Input value={p.duration || ""} onChange={(e) => updateItem(i, { duration: e.target.value })} placeholder="Duration, e.g. 7 days" />
          </div>
          <ImageUploadField value={p.image} onChange={(url) => updateItem(i, { image: url })} label="Cover Image (optional)" />
        </>
      )}
    />
  );
}

function ProcessEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; icon?: string }>(config, dispatch, "process");
  return (
    <EditableList
      title="Our Process"
      items={items}
      onAdd={() => addItem({ title: "", description: "", icon: String(items.length + 1) })}
      addLabel="+ Add Step"
      emptyLabel='No process steps added yet. Click "+ Add Step" to get started.'
      onRemove={removeItem}
      renderItem={(s, i) => (
        <>
          <Input value={s.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Step name, e.g. Discover" />
          <Textarea value={s.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="What happens in this step" rows={2} />
        </>
      )}
    />
  );
}

function ProgramsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string; price: string; category?: string; level?: string; duration?: string; image?: string | null }>(config, dispatch, "programs");
  return (
    <EditableList
      title="Programs"
      items={items}
      onAdd={() => addItem({ title: "", description: "", price: "", category: "", level: "", duration: "", image: null })}
      addLabel="+ Add Program"
      emptyLabel='No programs added yet. Click "+ Add Program" to get started.'
      onRemove={removeItem}
      renderItem={(p, i) => (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Input value={p.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="Program name" />
            <Input value={p.price} onChange={(e) => updateItem(i, { price: e.target.value })} placeholder="$89/mo" />
          </div>
          <Textarea value={p.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="What's included" rows={2} />
          <div className="grid grid-cols-3 gap-2">
            <Input value={p.category || ""} onChange={(e) => updateItem(i, { category: e.target.value })} placeholder="Category" />
            <Input value={p.level || ""} onChange={(e) => updateItem(i, { level: e.target.value })} placeholder="Level" />
            <Input value={p.duration || ""} onChange={(e) => updateItem(i, { duration: e.target.value })} placeholder="Duration" />
          </div>
          <ImageUploadField value={p.image} onChange={(url) => updateItem(i, { image: url })} label="Cover Image (optional)" />
        </>
      )}
    />
  );
}

function FacilitiesEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string }>(config, dispatch, "facilities");
  return (
    <EditableList
      title="Facilities"
      items={items}
      onAdd={() => addItem({ title: "", description: "" })}
      addLabel="+ Add Facility"
      emptyLabel='No facilities added yet. Click "+ Add Facility" to get started.'
      onRemove={removeItem}
      renderItem={(f, i) => (
        <>
          <Input value={f.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="e.g. Modern Exam Rooms" />
          <Input value={f.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
        </>
      )}
    />
  );
}

function SkillsEditor({ config, dispatch }: { config: any; dispatch: any }) {
  const { items, addItem, updateItem, removeItem } = useListContent<{ title: string; description: string }>(config, dispatch, "skills");
  return (
    <EditableList
      title="Skills"
      items={items}
      onAdd={() => addItem({ title: "", description: "" })}
      addLabel="+ Add Skill"
      emptyLabel='No skills added yet. Click "+ Add Skill" to get started.'
      onRemove={removeItem}
      renderItem={(s, i) => (
        <>
          <Input value={s.title} onChange={(e) => updateItem(i, { title: e.target.value })} placeholder="e.g. Brand Strategy" />
          <Input value={s.description} onChange={(e) => updateItem(i, { description: e.target.value })} placeholder="Brief description" />
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

// Footer text was entirely hardcoded (tagline fell back silently to the
// business description, copyright/CTA copy couldn't be touched at all) —
// this is the only place in the questionnaire to edit it, since the footer
// is site-wide rather than per-page like Hero/CTA content.
function FooterContentEditor({ config, dispatch, isRichFooter }: { config: any; dispatch: any; isRichFooter: boolean }) {
  const footer = config.content.footer || {};
  const update = (patch: Record<string, string>) => dispatch(setContent({ footer: { ...footer, ...patch } }));
  const currentYear = new Date().getFullYear();

  return (
    <ContentBlock title="Footer Content" hint="Customize the text shown at the bottom of every page. Leave anything blank to use the defaults.">
      <div>
        <Label className="mb-1.5 text-xs text-muted-foreground">Tagline</Label>
        <Textarea
          value={footer.tagline || ""}
          onChange={(e) => update({ tagline: e.target.value })}
          placeholder={config.business.description || "A short line about your business shown in the footer."}
          rows={2}
        />
      </div>
      <div>
        <Label className="mb-1.5 text-xs text-muted-foreground">Copyright Text</Label>
        <Input
          value={footer.copyrightText || ""}
          onChange={(e) => update({ copyrightText: e.target.value })}
          placeholder={`© ${currentYear} ${config.business.name || "Your Business"}. All rights reserved.`}
        />
      </div>
      {isRichFooter && (
        <>
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Call-to-Action Heading</Label>
            <Input value={footer.ctaHeading || ""} onChange={(e) => update({ ctaHeading: e.target.value })} placeholder="Get in Touch" />
          </div>
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Call-to-Action Text</Label>
            <Textarea
              value={footer.ctaSubtext || ""}
              onChange={(e) => update({ ctaSubtext: e.target.value })}
              placeholder="Ready to start your project? Let's talk about how we can help."
              rows={2}
            />
          </div>
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Call-to-Action Button Text</Label>
            <Input value={footer.ctaButtonText || ""} onChange={(e) => update({ ctaButtonText: e.target.value })} placeholder="Start a Project" />
          </div>
        </>
      )}
    </ContentBlock>
  );
}

function StepDesign({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const suggestedComponents = businessType?.suggestedComponents || {};
  const navbarCat = COMPONENT_CATEGORIES.find((c) => c.category === "navbar");
  const footerCat = COMPONENT_CATEGORIES.find((c) => c.category === "footer");

  // theme.typography AND theme.primaryColor/secondaryColor default to fixed
  // values that get pinned again by the business-type preset in Step 1
  // (selectBusinessType dispatches its own colorScheme), so picking a
  // Design Style here used to only change its font — the color swatches
  // shown on each style card were purely decorative and never actually
  // applied. Re-sync typography AND colors to match the style whenever one
  // is picked; the Colors step below can still override either afterward.
  const selectDesignStyle = (styleId: string) => {
    const style = DESIGN_STYLES.find((s) => s.id === styleId);
    const matchedTypography = TYPOGRAPHY_OPTIONS.find((t) => t.fontFamily === style?.preview.fontFamily)?.id;
    // Always resolve typography explicitly (clearing it when this style's
    // font isn't one of the Typography options) so a leftover selection
    // from a previous style or the business-type preset can never shadow
    // the style that was just picked.
    dispatch(setTheme({
      style: styleId,
      typography: matchedTypography || "",
      ...(style ? { primaryColor: style.primaryColor, secondaryColor: style.secondaryColor } : {}),
    }));
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
          <FooterContentEditor
            config={config}
            dispatch={dispatch}
            isRichFooter={(config.components.footer || suggestedComponents.footer) === "footer1"}
          />
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

function EditIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
    </svg>
  );
}

// The Review step used to be a long wall of always-expanded cards — once
// every section actually showed its real content (not just a name), that
// got long enough to be hard to scan. An accordion keeps everything just
// as reachable (nothing summarized away) while only showing full detail
// for whatever the client is actually looking at right now.
function ReviewCard({ value, title, badge, onEdit, children }: { value: string; title: string; badge?: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <Accordion.Item value={value} className="overflow-hidden rounded-lg border border-border bg-muted/30">
      <Accordion.Header className="flex items-stretch">
        <Accordion.Trigger className="group flex flex-1 items-center gap-2 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/60">
          <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {title}
          {badge && <span className="font-normal text-muted-foreground">{badge}</span>}
        </Accordion.Trigger>
        {onEdit && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="my-auto mr-3 h-auto shrink-0 gap-1 px-2 py-1 text-xs"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
          >
            <EditIcon />
            Edit
          </Button>
        )}
      </Accordion.Header>
      <Accordion.Content className="border-t border-border bg-background/40 px-4 py-3">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}

// Every list-content type the client can fill in across every business
// type/page, so the Review step can show all of it generically instead of
// the previous "layout choices only" summary that left every typed-in
// service, testimonial, team member, menu item, etc. completely invisible
// until generation.
const CONTENT_LABELS: Record<string, string> = {
  services: "Services",
  testimonials: "Testimonials",
  faq: "FAQ",
  stats: "Statistics",
  team: "Team Members",
  portfolio: "Portfolio",
  gallery: "Gallery Images",
  whyChooseUs: "Why Choose Us",
  pricingPlans: "Pricing Plans",
  menuItems: "Menu Items",
  dailySpecials: "Daily Specials",
  blogPosts: "Blog Posts",
  timeline: "Timeline",
  businessHours: "Business Hours",
  classSchedule: "Class Schedule",
  courses: "Courses",
  destinations: "Destinations",
  solutions: "Solutions",
  industries: "Industries",
  caseStudies: "Case Studies",
  rooms: "Rooms & Suites",
  amenities: "Amenities",
  experiences: "Experiences",
  travelPackages: "Travel Packages",
  process: "Process Steps",
  programs: "Programs",
  facilities: "Facilities",
  skills: "Skills",
};

function contentItemLabel(item: Record<string, any>): string {
  return item?.title || item?.name || item?.question || item?.label || item?.day || item?.year || "Untitled";
}

// The short description/body text for a content item — different list
// types name this field differently (a service's "description", a
// testimonial's "content", a team member's "bio", an FAQ's "answer"...),
// so this checks every field actually used across the editors above
// instead of just "description".
function contentItemDescription(item: Record<string, any>): string | undefined {
  return (
    item?.description || item?.content || item?.bio || item?.answer ||
    item?.excerpt || item?.hours || item?.value || item?.price || undefined
  );
}

// Maps a section's canonical type (from previewSpec.ts's sectionType()) to
// the config.content key it actually pulls from — mirrors exactly which
// useListContent(config, dispatch, "key") each editor above is wired to
// (including the handful that share a family: Feature Grid reuses
// Services' own list, Inventory Grid reuses Portfolio's, Travel Deals
// reuses Daily Specials', and Agents/Trainers/Doctors/Instructors all
// share one Team list). Lets the Review step show what will actually
// render for each section the client picked, not just its name.
const SECTION_CONTENT_KEY: Record<string, string> = {
  services: "services",
  feature_grid: "services",
  testimonials: "testimonials",
  faq: "faq",
  portfolio: "portfolio",
  inventory_grid: "portfolio",
  gallery: "gallery",
  team: "team",
  agents: "team",
  trainers: "team",
  doctors: "team",
  instructors: "team",
  why_choose_us: "whyChooseUs",
  pricing: "pricingPlans",
  blog_preview: "blogPosts",
  menu_items: "menuItems",
  daily_specials: "dailySpecials",
  travel_deals: "dailySpecials",
  stats: "stats",
  timeline: "timeline",
  business_hours: "businessHours",
  class_schedule: "classSchedule",
  course_grid: "courses",
  rooms: "rooms",
  travel_packages: "travelPackages",
  programs: "programs",
  destination_grid: "destinations",
  solutions: "solutions",
  industries: "industries",
  case_studies: "caseStudies",
  amenities: "amenities",
  experiences: "experiences",
  process: "process",
  facilities: "facilities",
  skills: "skills",
  about_values: "aboutValues",
};

interface SectionDetail {
  // Every item that will actually render in this section — full title +
  // description, not a truncated summary — so a service or FAQ entry can
  // be checked at a glance instead of guessed at from just its name.
  items?: Array<{ title: string; description?: string }>;
  // Set instead of `items` when there's nothing customized yet — explains
  // what will show in its place rather than just going blank.
  note?: string;
}

function sectionDetail(
  type: string | undefined,
  ctx: { content: Record<string, any>; pageContent?: any; contactContent: Record<string, any>; business: Record<string, any> }
): SectionDetail {
  if (!type) return {};
  const contentKey = SECTION_CONTENT_KEY[type];
  if (contentKey) {
    const items = (ctx.content[contentKey] || []) as Record<string, any>[];
    if (items.length === 0) return { note: "Not customized — will use content suited to your business type." };
    return { items: items.map((it) => ({ title: contentItemLabel(it), description: contentItemDescription(it) })) };
  }
  if (type === "about_story") {
    const storyContent = ctx.pageContent?.about_story?.content?.trim();
    return storyContent ? { items: [{ title: "Company Story", description: storyContent }] } : { note: "Not customized — will use a generated company story." };
  }
  if (type === "cta") {
    const headline = ctx.pageContent?.cta?.headline?.trim();
    return headline
      ? { items: [{ title: headline, description: ctx.pageContent?.cta?.subheadline?.trim() }] }
      : { note: "Not customized — will use default call-to-action text." };
  }
  if (type === "contact") {
    const heading = ctx.contactContent.heading?.trim();
    return heading || ctx.contactContent.intro
      ? { items: [{ title: heading || "Contact Form", description: ctx.contactContent.intro }] }
      : { note: "Not customized — will use a default heading and button text." };
  }
  if (type === "contact_info" || type === "map") {
    const line = [ctx.business.phone, ctx.business.email, ctx.business.address].filter(Boolean).join(" · ");
    return line ? { items: [{ title: "Contact Details", description: line }] } : { note: "Phone/email/address not provided yet." };
  }
  return {};
}

// Shared renderer for a section's full detail — used both inside each
// page's section list and inside the top-level "Content" card, so a
// service's title+description looks identical wherever it's reviewed.
function SectionDetailView({ detail }: { detail: SectionDetail }) {
  if (detail.items && detail.items.length > 0) {
    return (
      <div className="mt-1.5 space-y-1.5">
        {detail.items.map((it, i) => (
          <div key={i} className="rounded bg-background px-2.5 py-1.5">
            <div className="text-xs font-medium text-foreground">{it.title}</div>
            {it.description && <div className="mt-0.5 text-xs text-muted-foreground">{it.description}</div>}
          </div>
        ))}
      </div>
    );
  }
  if (detail.note) {
    return <p className="mt-1 text-xs text-muted-foreground">{detail.note}</p>;
  }
  return null;
}

const REVIEW_CARD_KEYS = ["business", "pages", "design", "colors", "layout", "content", "values", "footer", "contact", "branding"];

function StepReview({
  config,
  onEditStep,
  onEditPage,
  businessStepIndex,
  designStepIndex,
  colorsStepIndex,
}: {
  config: any;
  onEditStep: (index: number) => void;
  onEditPage: (pageId: string) => void;
  businessStepIndex: number;
  designStepIndex: number;
  colorsStepIndex: number;
}) {
  const businessType = BUSINESS_TYPES[config.business.type];
  const pages = (config.pages || []) as string[];
  const content = config.content || {};
  const pageContentMap = config.pageContent || {};
  const footerContent = content.footer || {};
  const contactContent = content.contact || {};

  // Business Information + Pages & Sections open by default — the two most
  // useful things to check right after clicking through — everything else
  // starts collapsed so the page reads as a scannable list, not a wall of
  // text, while still being one click away.
  const [openCards, setOpenCards] = useState<string[]>(["business", "pages"]);
  const [openPages, setOpenPages] = useState<string[]>(pages[0] ? [pages[0]] : []);
  const allExpanded = openCards.length >= REVIEW_CARD_KEYS.length;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            if (allExpanded) { setOpenCards([]); setOpenPages([]); }
            else { setOpenCards([...REVIEW_CARD_KEYS]); setOpenPages([...pages]); }
          }}
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </Button>
      </div>

      <Accordion.Root type="multiple" value={openCards} onValueChange={setOpenCards} className="space-y-2">
        <ReviewCard value="business" title="Business Information" onEdit={() => onEditStep(businessStepIndex)}>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-muted-foreground">Type:</span> <span className="font-medium text-foreground">{businessType?.icon} {businessType?.label || config.business.type}</span></div>
            <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{config.business.name || "Not provided"}</span></div>
            <div className="col-span-2"><span className="text-muted-foreground">Description:</span> <span className="font-medium text-foreground">{config.business.description || "Not provided"}</span></div>
            <div><span className="text-muted-foreground">Location:</span> <span className="font-medium text-foreground">{config.business.location || "Not provided"}</span></div>
            <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{config.business.email || "Not provided"}</span></div>
            <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{config.business.phone || "Not provided"}</span></div>
            <div className="col-span-2"><span className="text-muted-foreground">Address:</span> <span className="font-medium text-foreground">{config.business.address || "Not provided"}</span></div>
            {(config.business.socialLinks || []).length > 0 && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Social:</span>{" "}
                <span className="font-medium text-foreground">
                  {(config.business.socialLinks as Array<{ platform: string; url: string }>)
                    .filter((l) => l.url)
                    .map((l) => `${l.platform}: ${l.url}`)
                    .join(", ") || "Not provided yet"}
                </span>
              </div>
            )}
          </div>
        </ReviewCard>

        <ReviewCard value="pages" title="Pages & Sections" badge={`${pages.length} pages`} onEdit={() => onEditPage(PAGE_SELECT_KEY)}>
          <Accordion.Root type="multiple" value={openPages} onValueChange={setOpenPages} className="space-y-2">
            {pages.map((pageId: string) => {
              const page = AVAILABLE_PAGES.find((ap) => ap.id === pageId);
              const sectionIds: string[] = config.sections?.[pageId] || [];
              const sectionDefs = PAGE_SECTIONS[pageId] || [];
              const pc = pageContentMap[pageId];
              const isFirstPage = pages[0] === pageId;
              return (
                <Accordion.Item key={pageId} value={pageId} className="overflow-hidden rounded-md border border-border bg-background">
                  <Accordion.Header className="flex items-stretch">
                    <Accordion.Trigger className="group flex flex-1 items-center gap-2 px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/40">
                      <svg className="h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {page?.label || pageId}
                      <span className="font-normal text-muted-foreground">{sectionIds.length} section{sectionIds.length === 1 ? "" : "s"}</span>
                    </Accordion.Trigger>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="my-auto mr-2 h-auto shrink-0 px-2 py-0.5 text-xs"
                      onClick={(e) => { e.stopPropagation(); onEditPage(pageId); }}
                    >
                      Edit
                    </Button>
                  </Accordion.Header>
                  <Accordion.Content className="space-y-1.5 border-t border-border p-2.5">
                    {/* Every page gets its own Hero content — only the first
                        page renders the real Hero1-5 layout, but the rest
                        still use this same headline/subheadline/button for
                        their compact page-title bar. */}
                    <div className="rounded border border-border/60 bg-muted/30 px-2.5 py-1.5">
                      <div className="text-xs font-medium text-foreground">{isFirstPage ? "Hero" : "Page Header"}</div>
                      <p className="text-xs text-muted-foreground">
                        {pc?.hero?.headline?.trim() ? `Headline: "${pc.hero.headline}"` : "Headline not customized — will use a generated one."}
                      </p>
                      {pc?.hero?.subheadline?.trim() && <p className="text-xs text-muted-foreground">Subheadline: "{pc.hero.subheadline}"</p>}
                      {isFirstPage && pc?.hero?.ctaText?.trim() && <p className="text-xs text-muted-foreground">Button: "{pc.hero.ctaText}"</p>}
                    </div>

                    {sectionIds.length > 0 ? (
                      sectionIds.map((sid) => {
                        const type = sectionType(sid);
                        const detail = sectionDetail(type, { content, pageContent: pc, contactContent, business: config.business || {} });
                        return (
                          <div key={sid} className="rounded border border-border/60 bg-muted/30 px-2.5 py-1.5">
                            <div className="text-xs font-medium text-foreground">{sectionDefs.find((s) => s.id === sid)?.label || sid}</div>
                            <SectionDetailView detail={detail} />
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-muted-foreground">No sections selected yet.</p>
                    )}
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </ReviewCard>

        <ReviewCard value="design" title="Design Style" onEdit={() => onEditStep(designStepIndex)}>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-muted-foreground">Style:</span> <span className="font-medium capitalize text-foreground">{config.theme.style}</span></div>
            <div><span className="text-muted-foreground">Typography:</span> <span className="font-medium capitalize text-foreground">{config.theme.typography}</span></div>
            <div><span className="text-muted-foreground">Accent:</span> <span className="font-medium capitalize text-foreground">{config.theme.accentStyle}</span></div>
          </div>
        </ReviewCard>

        <ReviewCard value="colors" title="Colors & Mode" onEdit={() => onEditStep(colorsStepIndex)}>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Primary:</span>
              <div className="h-5 w-5 rounded-full border border-border" style={{ backgroundColor: config.theme.primaryColor }} />
              <span className="font-mono text-xs text-foreground">{config.theme.primaryColor}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Secondary:</span>
              <div className="h-5 w-5 rounded-full border border-border" style={{ backgroundColor: config.theme.secondaryColor }} />
              <span className="font-mono text-xs text-foreground">{config.theme.secondaryColor}</span>
            </div>
            <div><span className="text-muted-foreground">Mode:</span> <span className="font-medium capitalize text-foreground">{config.theme.mode}</span></div>
          </div>
        </ReviewCard>

        <ReviewCard value="layout" title="Layout Choices" onEdit={() => onEditPage(PAGE_SELECT_KEY)}>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(config.components as Record<string, string>).map(([cat, compId]) => {
              if (!compId) return null;
              const catConfig = COMPONENT_CATEGORIES.find((c) => c.category === cat);
              const optConfig = catConfig?.options.find((o) => o.id === compId);
              return (
                <div key={cat}>
                  <span className="capitalize text-muted-foreground">{cat.replace(/_/g, " ")}:</span>{" "}
                  <span className="font-medium text-foreground">{optConfig?.name || compId}</span>
                </div>
              );
            })}
          </div>
        </ReviewCard>

        <ReviewCard value="content" title="Content" onEdit={() => onEditPage(PAGE_SELECT_KEY)}>
          {Object.keys(CONTENT_LABELS).some((key) => (content[key] || []).length > 0) ? (
            <div className="space-y-3">
              {Object.entries(CONTENT_LABELS).map(([key, label]) => {
                const items = (content[key] || []) as Record<string, any>[];
                if (items.length === 0) return null;
                return (
                  <div key={key}>
                    <div className="text-sm font-medium text-foreground">{label} ({items.length})</div>
                    <SectionDetailView detail={{ items: items.map((it) => ({ title: contentItemLabel(it), description: contentItemDescription(it) })) }} />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nothing added yet — services, testimonials, team members, and every other list section will use content suited to your business type instead.
            </p>
          )}
        </ReviewCard>

        {pages.includes("about") && (config.sections?.about || []).includes("values") && (
          <ReviewCard value="values" title="Our Values" onEdit={() => onEditPage("about")}>
            {(content.aboutValues || []).length > 0 ? (
              <SectionDetailView detail={{ items: (content.aboutValues as Array<{ title: string; description: string }>).map((v) => ({ title: v.title || "Untitled", description: v.description })) }} />
            ) : (
              <p className="text-sm text-muted-foreground">Not customized — will default to Excellence, Integrity, Innovation, and Customer Focus.</p>
            )}
          </ReviewCard>
        )}

        <ReviewCard value="footer" title="Footer Content" onEdit={() => onEditStep(designStepIndex)}>
          {(footerContent.tagline || footerContent.copyrightText || footerContent.ctaButtonText) ? (
            <div className="space-y-1 text-sm">
              {footerContent.tagline && <p><span className="text-muted-foreground">Tagline:</span> <span className="text-foreground">{footerContent.tagline}</span></p>}
              {footerContent.copyrightText && <p><span className="text-muted-foreground">Copyright:</span> <span className="text-foreground">{footerContent.copyrightText}</span></p>}
              {footerContent.ctaButtonText && <p><span className="text-muted-foreground">CTA Button:</span> <span className="text-foreground">{footerContent.ctaButtonText}</span></p>}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Not customized — will use your business description as the tagline and a standard copyright line.</p>
          )}
        </ReviewCard>

        {pages.includes("contact") && (
          <ReviewCard value="contact" title="Contact Page Content" onEdit={() => onEditPage("contact")}>
            {(contactContent.heading || contactContent.intro || contactContent.submitButtonText || contactContent.infoHeading) ? (
              <div className="space-y-1 text-sm">
                {contactContent.heading && <p><span className="text-muted-foreground">Heading:</span> <span className="text-foreground">{contactContent.heading}</span></p>}
                {contactContent.intro && <p><span className="text-muted-foreground">Intro:</span> <span className="text-foreground">{contactContent.intro}</span></p>}
                {contactContent.submitButtonText && <p><span className="text-muted-foreground">Submit Button:</span> <span className="text-foreground">{contactContent.submitButtonText}</span></p>}
                {contactContent.infoHeading && <p><span className="text-muted-foreground">Info Heading:</span> <span className="text-foreground">{contactContent.infoHeading}</span></p>}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not customized — default heading and button text will be used.</p>
            )}
          </ReviewCard>
        )}

        <ReviewCard value="branding" title="Branding" onEdit={() => onEditPage(pages[0] || "home")}>
          {(config.branding?.logo || (config.branding?.bannerImages || []).length > 0) ? (
            <div className="flex flex-wrap gap-3">
              {config.branding?.logo && (
                <div className="flex items-center gap-2">
                  <img src={config.branding.logo} alt="Logo" className="h-10 w-10 rounded border border-border object-cover" />
                  <span className="text-xs text-muted-foreground">Logo</span>
                </div>
              )}
              {(config.branding?.bannerImages || []).map((url: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={url} alt="Banner" className="h-10 w-16 rounded border border-border object-cover" />
                  <span className="text-xs text-muted-foreground">Banner Image</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No logo or images uploaded — a placeholder will be used instead.</p>
          )}
        </ReviewCard>
      </Accordion.Root>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
        <p className="font-medium">Ready to generate your website?</p>
        <p className="mt-1 text-muted-foreground">Click "Generate Website" to create your custom website based on all the selections above.</p>
      </div>
    </div>
  );
}

export default QuestionnairePage;
