import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsiteConfig, DEFAULT_WEBSITE_CONFIG } from "@/data/websiteConfig";

interface BuilderState {
  config: WebsiteConfig;
  currentStep: number;
  completed: boolean;
  loading: boolean;
  error: string | null;
  // Set when re-entering the builder to edit an already-generated project
  // (from the Request Changes / Revision page) instead of building a new
  // one from scratch. originalConfig is a snapshot taken at that moment -
  // diffed against `config` on save to produce the revision's change list.
  editMode: boolean;
  originalConfig: WebsiteConfig | null;
}

const initialState: BuilderState = {
  config: structuredClone(DEFAULT_WEBSITE_CONFIG),
  currentStep: 0,
  completed: false,
  loading: false,
  error: null,
  editMode: false,
  originalConfig: null,
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    updateBusiness: (state, action: PayloadAction<Partial<WebsiteConfig["business"]>>) => {
      state.config.business = { ...state.config.business, ...action.payload };
    },
    setPages: (state, action: PayloadAction<string[]>) => {
      state.config.pages = action.payload;
    },
    setSections: (state, action: PayloadAction<Record<string, string[]>>) => {
      state.config.sections = action.payload;
    },
    setPageSections: (state, action: PayloadAction<{ page: string; sections: string[] }>) => {
      state.config.sections[action.payload.page] = action.payload.sections;
    },
    setPageContentField: (
      state,
      action: PayloadAction<{ page: string; section: "hero" | "about_story" | "cta"; field: string; value: string }>
    ) => {
      const { page, section, field, value } = action.payload;
      if (!state.config.pageContent[page]) state.config.pageContent[page] = {};
      if (!state.config.pageContent[page][section]) state.config.pageContent[page][section] = {};
      (state.config.pageContent[page][section] as Record<string, string>)[field] = value;
    },
    setTheme: (state, action: PayloadAction<Partial<WebsiteConfig["theme"]>>) => {
      state.config.theme = { ...state.config.theme, ...action.payload };
    },
    setComponent: (state, action: PayloadAction<{ category: string; componentId: string }>) => {
      state.config.components[action.payload.category] = action.payload.componentId;
    },
    setComponents: (state, action: PayloadAction<Record<string, string>>) => {
      state.config.components = { ...state.config.components, ...action.payload };
    },
    setSectionColor: (state, action: PayloadAction<{ key: string; value: WebsiteConfig["sectionColors"][string] }>) => {
      if (!state.config.sectionColors) state.config.sectionColors = {};
      state.config.sectionColors[action.payload.key] = action.payload.value;
    },
    setContent: (state, action: PayloadAction<Partial<WebsiteConfig["content"]>>) => {
      state.config.content = { ...state.config.content, ...action.payload };
    },
    setBranding: (state, action: PayloadAction<Partial<WebsiteConfig["branding"]>>) => {
      state.config.branding = { ...state.config.branding, ...action.payload };
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 0) state.currentStep -= 1;
    },
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.completed = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetBuilder: () => initialState,
    loadConfig: (state, action: PayloadAction<WebsiteConfig>) => {
      state.config = action.payload;
    },
    // Enters edit mode for an existing project: hydrates the builder with
    // its saved config and keeps an untouched snapshot to diff against
    // later. `startAtStep` lets the caller land the user directly on
    // Review (where every section is visible with per-item Edit buttons -
    // see StepReview) instead of back at step 0.
    startEdit: (state, action: PayloadAction<{ config: WebsiteConfig; startAtStep: number }>) => {
      state.config = action.payload.config;
      state.originalConfig = structuredClone(action.payload.config);
      state.editMode = true;
      state.currentStep = action.payload.startAtStep;
      state.completed = false;
      state.error = null;
    },
  },
});

export const {
  updateBusiness,
  setPages,
  setSections,
  setPageSections,
  setPageContentField,
  setTheme,
  setComponent,
  setComponents,
  setSectionColor,
  setContent,
  setBranding,
  setCurrentStep,
  nextStep,
  prevStep,
  setCompleted,
  setLoading,
  setError,
  resetBuilder,
  loadConfig,
  startEdit,
} = builderSlice.actions;

export default builderSlice.reducer;
