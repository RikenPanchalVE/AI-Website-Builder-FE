import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pricing: null,
  loading: false,
  error: null,
};

const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setPricing: (state, action) => {
      state.pricing = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearPricing: () => initialState,
  },
});

export const { setPricing, setLoading, setError, clearPricing } =
  pricingSlice.actions;

export default pricingSlice.reducer;
