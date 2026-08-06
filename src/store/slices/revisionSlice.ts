import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RevisionState {
  revisions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RevisionState = {
  revisions: [],
  loading: false,
  error: null,
};

const revisionSlice = createSlice({
  name: "revision",
  initialState,
  reducers: {
    setRevisions: (state, action: PayloadAction<any[]>) => {
      state.revisions = action.payload;
    },
    addRevision: (state, action: PayloadAction<any>) => {
      state.revisions.unshift(action.payload);
    },
    updateRevision: (state, action: PayloadAction<any>) => {
      const index = state.revisions.findIndex((r) => r._id === action.payload._id);
      if (index !== -1) {
        state.revisions[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRevisions, addRevision, updateRevision, setLoading, setError } =
  revisionSlice.actions;

export default revisionSlice.reducer;
