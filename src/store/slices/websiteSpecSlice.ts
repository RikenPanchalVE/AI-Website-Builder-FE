import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spec: null,
  versions: [],
  currentVersion: null,
  loading: false,
  error: null,
};

const websiteSpecSlice = createSlice({
  name: "websiteSpec",
  initialState,
  reducers: {
    setSpec: (state, action) => {
      state.spec = action.payload;
    },
    setVersions: (state, action) => {
      state.versions = action.payload;
    },
    setCurrentVersion: (state, action) => {
      state.currentVersion = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSpec, setVersions, setCurrentVersion, setLoading, setError } =
  websiteSpecSlice.actions;

export default websiteSpecSlice.reducer;
