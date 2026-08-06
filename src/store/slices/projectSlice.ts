import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  currentProject: any;
  projects: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  currentProject: null,
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<any>) => {
      state.currentProject = action.payload;
    },
    updateProjectStatus: (state, action: PayloadAction<string>) => {
      if (state.currentProject) {
        state.currentProject.status = action.payload;
      }
    },
    setProjects: (state, action: PayloadAction<any[]>) => {
      state.projects = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProject: (state) => {
      state.currentProject = null;
    },
  },
});

export const {
  setCurrentProject,
  updateProjectStatus,
  setProjects,
  setLoading,
  setError,
  clearProject,
} = projectSlice.actions;

export default projectSlice.reducer;
