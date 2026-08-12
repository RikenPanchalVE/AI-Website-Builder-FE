import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectApi } from "@/api/projectApi";
import {
  updateBusiness,
  setGoals,
  setPages,
  setPageSections,
  setTheme,
  setComponent,
  setContent,
  setBranding,
  setCurrentStep,
} from "@/store/slices/builderSlice";
import { BUSINESS_TYPES, type BusinessTypeConfig } from "@/config/businessTypes";
import { BUSINESS_CATEGORIES, PAGE_SECTIONS, BUSINESS_GOALS } from "@/data/designOptions";
import { COMPONENT_CATEGORIES, COMPONENT_MAP } from "@/data/componentOptions";
import { DESIGN_STYLES, COLOR_PALETTES, TYPOGRAPHY_OPTIONS } from "@/data/designOptions";

const AVAILABLE_PAGES = [
  { id: "home", label: "Home", required: true },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "pricing", label: "Pricing" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
  { id: "faq", label: "FAQ" },
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Team" },
  { id: "menu", label: "Menu" },
  { id: "properties", label: "Properties" },
  { id: "courses", label: "Courses" },
  { id: "classes", label: "Classes" },
  { id: "destinations", label: "Destinations" },
  { id: "features", label: "Features" },
  { id: "inventory", label: "Inventory" },
  { id: "reservations", label: "Reservations" },
  { id: "booking", label: "Booking" },
];

const STEPS = [
  { title: "Business", subtitle: "Tell us about your business" },
  { title: "Goals", subtitle: "What should your website achieve?" },
  { title: "Pages", subtitle: "Which pages do you need?" },
  { title: "Sections", subtitle: "What goes on each page?" },
  { title: "Design", subtitle: "Choose your visual style" },
  { title: "Colors", subtitle: "Pick your brand colors" },
  { title: "Components", subtitle: "Select section layouts" },
  { title: "Content", subtitle: "Add your content" },
  { title: "Review", subtitle: "Review and generate" },
];

const QuestionnairePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((s: any) => s.project);
  const { config, currentStep } = useSelector((s: any) => s.builder);
  const enquiry = currentProject?.enquiry;

  const [submitting, setSubmitting] = useState(false);
  const [localStep, setLocalStep] = useState(0);
  const step = currentStep || localStep;

  const businessType = BUSINESS_TYPES[config.business.type] || null;

  useEffect(() => {
    if (!currentProject) navigate("/");
  }, [currentProject, navigate]);

  useEffect(() => {
    if (enquiry?.businessType && !config.business.type) {
      dispatch(updateBusiness({
        name: enquiry.businessName || "",
        type: enquiry.businessType,
      }));
    }
  }, [enquiry, config.business.type, dispatch]);

  const setStep = (s: number) => {
    setLocalStep(s);
    dispatch(setCurrentStep(s));
  };

  const canNext = (): boolean => {
    switch (step) {
      case 0: return !!config.business.type;
      case 1: return config.goals.length > 0;
      case 2: return config.pages.length > 0;
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Generating your website...</p>
          <p className="text-sm text-gray-400 mt-1">This may take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              Website Builder
              {businessType && <span className="text-xl">{businessType.icon}</span>}
            </h1>
            <span className="text-sm text-gray-500">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex mt-3 gap-1 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  i === step ? "bg-blue-100 text-blue-700 font-medium"
                  : i < step ? "text-green-600 hover:bg-green-50"
                  : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                  i < step ? "bg-green-100 text-green-600"
                  : i === step ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-400"
                }`}>
                  {i < step ? "\u2713" : i + 1}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{STEPS[step].title}</h2>
          <p className="text-sm text-gray-500 mt-1">{STEPS[step].subtitle}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {step === 0 && <StepBusiness config={config} dispatch={dispatch} businessType={businessType} />}
          {step === 1 && <StepGoals config={config} dispatch={dispatch} />}
          {step === 2 && <StepPages config={config} dispatch={dispatch} businessType={businessType} />}
          {step === 3 && <StepSections config={config} dispatch={dispatch} />}
          {step === 4 && <StepDesign config={config} dispatch={dispatch} businessType={businessType} />}
          {step === 5 && <StepColors config={config} dispatch={dispatch} businessType={businessType} />}
          {step === 6 && <StepComponents config={config} dispatch={dispatch} businessType={businessType} />}
          {step === 7 && <StepContent config={config} dispatch={dispatch} />}
          {step === 8 && <StepReview config={config} />}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {step === STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canNext()}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Generate Website
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext()}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

function StepBusiness({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BUSINESS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => dispatch(updateBusiness({ type: cat.id }))}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all ${
                config.business.type === cat.id
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
        <input
          type="text"
          value={config.business.name}
          onChange={(e) => dispatch(updateBusiness({ name: e.target.value }))}
          placeholder="Your Business Name"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
        <textarea
          value={config.business.description}
          onChange={(e) => dispatch(updateBusiness({ description: e.target.value }))}
          placeholder="What does your business do? What products or services do you offer?"
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={config.business.location}
            onChange={(e) => dispatch(updateBusiness({ location: e.target.value }))}
            placeholder="City, State, Country"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
          <input
            type="text"
            value={config.business.targetAudience}
            onChange={(e) => dispatch(updateBusiness({ targetAudience: e.target.value }))}
            placeholder="e.g., Young professionals, Families"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={config.business.email}
            onChange={(e) => dispatch(updateBusiness({ email: e.target.value }))}
            placeholder="contact@business.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={config.business.phone}
            onChange={(e) => dispatch(updateBusiness({ phone: e.target.value }))}
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function StepGoals({ config, dispatch }: { config: any; dispatch: any }) {
  const toggleGoal = (id: string) => {
    const current = config.goals as string[];
    if (current.includes(id)) {
      dispatch(setGoals(current.filter((g) => g !== id)));
    } else {
      dispatch(setGoals([...current, id]));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Select what you want your website to achieve. Choose as many as apply.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {BUSINESS_GOALS.map((goal) => {
          const selected = config.goals.includes(goal.id);
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={`flex items-start gap-3 px-4 py-3 rounded-lg border text-left transition-all ${
                selected
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                selected ? "bg-blue-500 border-blue-500" : "border-gray-300"
              }`}>
                {selected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <div>
                <div className="font-medium text-sm">{goal.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{goal.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepPages({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const suggestedPages = businessType?.suggestedPages || [];
  const togglePage = (id: string) => {
    if (id === "home") return;
    const current = config.pages as string[];
    if (current.includes(id)) {
      dispatch(setPages(current.filter((p) => p !== id)));
    } else {
      dispatch(setPages([...current, id]));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">Select the pages you need. Home is always included. We suggest pages based on your business type.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {AVAILABLE_PAGES.map((page) => {
          const selected = config.pages.includes(page.id);
          const suggested = suggestedPages.includes(page.id);
          return (
            <button
              key={page.id}
              type="button"
              onClick={() => togglePage(page.id)}
              disabled={page.required}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all ${
                selected
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : page.required
                  ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
                  : suggested
                  ? "bg-purple-50 border-purple-300 text-purple-700 hover:border-purple-400"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                selected ? "bg-blue-500 border-blue-500" : "border-gray-300"
              }`}>
                {selected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span>{page.label}</span>
              {suggested && !selected && <span className="text-xs text-purple-500 ml-auto">Suggested</span>}
              {page.required && <span className="text-xs text-gray-400 ml-auto">Required</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSections({ config, dispatch }: { config: any; dispatch: any }) {
  const pages = config.pages as string[];
  const sections = config.sections as Record<string, string[]>;

  const toggleSection = (pageId: string, sectionId: string) => {
    const current = sections[pageId] || [];
    if (current.includes(sectionId)) {
      dispatch(setPageSections({ page: pageId, sections: current.filter((s) => s !== sectionId) }));
    } else {
      dispatch(setPageSections({ page: pageId, sections: [...current, sectionId] }));
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Choose which sections appear on each page. We suggest sections based on your business type.</p>
      {pages.map((pageId) => {
        const pageSections = PAGE_SECTIONS[pageId];
        if (!pageSections) return null;
        const pageConfig = AVAILABLE_PAGES.find((p) => p.id === pageId);
        const selectedSections = sections[pageId] || [];
        return (
          <div key={pageId} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">{pageConfig?.label || pageId}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pageSections.map((sec) => {
                const selected = selectedSections.includes(sec.id);
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => toggleSection(pageId, sec.id)}
                    className={`flex items-start gap-2 px-3 py-2 rounded-lg border text-left text-sm transition-all ${
                      selected
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      selected ? "bg-blue-500 border-blue-500" : "border-gray-300"
                    }`}>
                      {selected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <div className="font-medium">{sec.label}</div>
                      <div className="text-xs text-gray-500">{sec.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepDesign({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const typographyOptions = TYPOGRAPHY_OPTIONS;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Design Style *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DESIGN_STYLES.map((style) => {
            const selected = config.theme.style === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => dispatch(setTheme({ style: style.id }))}
                className={`rounded-lg border p-3 text-left transition-all ${
                  selected
                    ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex gap-1 mb-2">
                  {style.preview.colors.map((color, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div className="font-medium text-sm text-gray-900">{style.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{style.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Typography</label>
        <div className="grid grid-cols-2 gap-2">
          {typographyOptions.map((typo) => {
            const selected = config.theme.typography === typo.id;
            return (
              <button
                key={typo.id}
                type="button"
                onClick={() => dispatch(setTheme({ typography: typo.id }))}
                className={`px-3 py-2.5 rounded-lg border text-left transition-all ${
                  selected
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-sm" style={{ fontFamily: typo.fontFamily }}>{typo.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{typo.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["minimal", "bold", "gradient", "monochrome"].map((style) => {
            const selected = config.theme.accentStyle === style;
            return (
              <button
                key={style}
                type="button"
                onClick={() => dispatch(setTheme({ accentStyle: style }))}
                className={`px-3 py-2 rounded-lg border text-sm capitalize transition-all ${
                  selected
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {style}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepColors({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color Palette</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COLOR_PALETTES.map((palette) => {
            const selected = config.theme.primaryColor === palette.primary && config.theme.secondaryColor === palette.secondary;
            return (
              <button
                key={palette.name}
                type="button"
                onClick={() => dispatch(setTheme({ primaryColor: palette.primary, secondaryColor: palette.secondary }))}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all ${
                  selected
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: palette.primary }} />
                  <div className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: palette.secondary }} />
                </div>
                <div>
                  <div className="font-medium text-sm">{palette.name}</div>
                  <div className="text-xs text-gray-500">{palette.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.theme.primaryColor}
              onChange={(e) => dispatch(setTheme({ primaryColor: e.target.value }))}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={config.theme.primaryColor}
              onChange={(e) => dispatch(setTheme({ primaryColor: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={config.theme.secondaryColor}
              onChange={(e) => dispatch(setTheme({ secondaryColor: e.target.value }))}
              className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={config.theme.secondaryColor}
              onChange={(e) => dispatch(setTheme({ secondaryColor: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme Mode</label>
        <div className="grid grid-cols-3 gap-2">
          {(["light", "dark", "auto"] as const).map((mode) => {
            const selected = config.theme.mode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => dispatch(setTheme({ mode }))}
                className={`px-3 py-2 rounded-lg border text-sm capitalize transition-all ${
                  selected
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
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

function StepComponents({ config, dispatch, businessType }: { config: any; dispatch: any; businessType: BusinessTypeConfig | null }) {
  const suggestedComponents = businessType?.suggestedComponents || {};
  const selectedSections = config.sections as Record<string, string[]>;
  const visibleCategories = COMPONENT_CATEGORIES.filter((cat) => {
    if (cat.required) return true;
    return (config.pages as string[]).some((page) => {
      const pageSections = selectedSections[page] || [];
      return pageSections.includes(cat.category);
    });
  });

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500">Choose the layout for each section. We suggest options based on your business type.</p>
      {visibleCategories.map((cat) => {
        const currentComponent = config.components[cat.category] || "";
        const suggestedId = suggestedComponents[cat.category];
        return (
          <div key={cat.category} className="border border-gray-200 rounded-lg p-4">
            <div className="mb-3">
              <h3 className="font-medium text-gray-900">{cat.label}</h3>
              <p className="text-xs text-gray-500">{cat.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.options.map((opt) => {
                const selected = currentComponent === opt.id;
                const isSuggested = suggestedId === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => dispatch(setComponent({ category: cat.category, componentId: opt.id }))}
                    className={`rounded-lg border p-3 text-left transition-all ${
                      selected
                        ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-1">
                        {opt.preview.elements.slice(0, 3).map((el, i) => (
                          <div key={i} className="w-6 h-4 rounded bg-gray-200 border border-gray-300" />
                        ))}
                      </div>
                      {isSuggested && !selected && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">Suggested</span>
                      )}
                    </div>
                    <div className="font-medium text-sm text-gray-900">{opt.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.description}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opt.preview.elements.map((el, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded capitalize">
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
      })}
    </div>
  );
}

function StepContent({ config, dispatch }: { config: any; dispatch: any }) {
  const services = config.content.services as Array<{ title: string; description: string; icon: string }>;
  const testimonials = config.content.testimonials as Array<{ name: string; role: string; content: string; rating: number }>;
  const faq = config.content.faq as Array<{ question: string; answer: string }>;

  const addService = () => {
    dispatch(setContent({ services: [...services, { title: "", description: "", icon: "star" }] }));
  };
  const updateService = (index: number, field: string, value: string) => {
    const updated = services.map((s, i) => i === index ? { ...s, [field]: value } : s);
    dispatch(setContent({ services: updated }));
  };
  const removeService = (index: number) => {
    dispatch(setContent({ services: services.filter((_, i) => i !== index) }));
  };

  const addTestimonial = () => {
    dispatch(setContent({ testimonials: [...testimonials, { name: "", role: "", content: "", rating: 5 }] }));
  };
  const updateTestimonial = (index: number, field: string, value: any) => {
    const updated = testimonials.map((t, i) => i === index ? { ...t, [field]: value } : t);
    dispatch(setContent({ testimonials: updated }));
  };
  const removeTestimonial = (index: number) => {
    dispatch(setContent({ testimonials: testimonials.filter((_, i) => i !== index) }));
  };

  const addFaq = () => {
    dispatch(setContent({ faq: [...faq, { question: "", answer: "" }] }));
  };
  const updateFaq = (index: number, field: string, value: string) => {
    const updated = faq.map((f, i) => i === index ? { ...f, [field]: value } : f);
    dispatch(setContent({ faq: updated }));
  };
  const removeFaq = (index: number) => {
    dispatch(setContent({ faq: faq.filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Services</h3>
          <button type="button" onClick={addService} className="text-sm text-blue-600 hover:text-blue-700">+ Add Service</button>
        </div>
        {services.length === 0 ? (
          <p className="text-sm text-gray-400">No services added yet. Click "+ Add Service" to get started.</p>
        ) : (
          <div className="space-y-3">
            {services.map((service, i) => (
              <div key={i} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(i, "title", e.target.value)}
                    placeholder="Service name"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={service.description}
                    onChange={(e) => updateService(i, "description", e.target.value)}
                    placeholder="Brief description"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button type="button" onClick={() => removeService(i)} className="text-red-500 hover:text-red-700 text-sm mt-1">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Testimonials</h3>
          <button type="button" onClick={addTestimonial} className="text-sm text-blue-600 hover:text-blue-700">+ Add Testimonial</button>
        </div>
        {testimonials.length === 0 ? (
          <p className="text-sm text-gray-400">No testimonials added yet.</p>
        ) : (
          <div className="space-y-3">
            {testimonials.map((t, i) => (
              <div key={i} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => updateTestimonial(i, "name", e.target.value)}
                      placeholder="Client name"
                      className="px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={t.role}
                      onChange={(e) => updateTestimonial(i, "role", e.target.value)}
                      placeholder="Role / Company"
                      className="px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <textarea
                    value={t.content}
                    onChange={(e) => updateTestimonial(i, "content", e.target.value)}
                    placeholder="What they said..."
                    rows={2}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button type="button" onClick={() => removeTestimonial(i)} className="text-red-500 hover:text-red-700 text-sm mt-1">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">FAQ</h3>
          <button type="button" onClick={addFaq} className="text-sm text-blue-600 hover:text-blue-700">+ Add FAQ</button>
        </div>
        {faq.length === 0 ? (
          <p className="text-sm text-gray-400">No FAQ items added yet.</p>
        ) : (
          <div className="space-y-3">
            {faq.map((f, i) => (
              <div key={i} className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={f.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    placeholder="Question"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={f.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    placeholder="Answer"
                    rows={2}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button type="button" onClick={() => removeFaq(i)} className="text-red-500 hover:text-red-700 text-sm mt-1">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StepReview({ config }: { config: any }) {
  const businessType = BUSINESS_TYPES[config.business.type];
  const pages = config.pages as string[];
  const goals = config.goals as string[];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Business Information</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Type:</span> <span className="font-medium">{businessType?.icon} {businessType?.label || config.business.type}</span></div>
          <div><span className="text-gray-500">Name:</span> <span className="font-medium">{config.business.name || "Not provided"}</span></div>
          <div><span className="text-gray-500">Location:</span> <span className="font-medium">{config.business.location || "Not provided"}</span></div>
          <div><span className="text-gray-500">Audience:</span> <span className="font-medium">{config.business.targetAudience || "Not provided"}</span></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Goals</h3>
        <div className="flex flex-wrap gap-1">
          {goals.map((g: string) => {
            const goal = BUSINESS_GOALS.find((bg) => bg.id === g);
            return <span key={g} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{goal?.label || g}</span>;
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Pages ({pages.length})</h3>
        <div className="flex flex-wrap gap-1">
          {pages.map((p: string) => {
            const page = AVAILABLE_PAGES.find((ap) => ap.id === p);
            return <span key={p} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{page?.label || p}</span>;
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Design</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Style:</span> <span className="font-medium capitalize">{config.theme.style}</span></div>
          <div><span className="text-gray-500">Typography:</span> <span className="font-medium capitalize">{config.theme.typography}</span></div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Colors:</span>
            <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: config.theme.primaryColor }} />
            <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: config.theme.secondaryColor }} />
          </div>
          <div><span className="text-gray-500">Mode:</span> <span className="font-medium capitalize">{config.theme.mode}</span></div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Components</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(config.components as Record<string, string>).map(([cat, compId]) => {
            if (!compId) return null;
            const catConfig = COMPONENT_CATEGORIES.find((c) => c.category === cat);
            const optConfig = catConfig?.options.find((o) => o.id === compId);
            return (
              <div key={cat}>
                <span className="text-gray-500 capitalize">{cat}:</span>{" "}
                <span className="font-medium">{optConfig?.name || compId}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-medium">Ready to generate your website?</p>
        <p className="mt-1">Click "Generate Website" to create your custom website based on all the selections above.</p>
      </div>
    </div>
  );
}

export default QuestionnairePage;
