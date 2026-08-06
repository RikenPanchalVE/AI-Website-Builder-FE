import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AssetState {
  assets: any[];
  uploading: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AssetState = {
  assets: [],
  uploading: false,
  loading: false,
  error: null,
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<any[]>) => {
      state.assets = action.payload;
    },
    addAsset: (state, action: PayloadAction<any>) => {
      state.assets.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((a) => a._id !== action.payload);
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAssets, addAsset, removeAsset, setUploading, setLoading, setError } =
  assetSlice.actions;

export default assetSlice.reducer;
