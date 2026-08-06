import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: null,
  processing: false,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setProcessing: (state, action) => {
      state.processing = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPayment, setProcessing, setLoading, setError } =
  paymentSlice.actions;

export default paymentSlice.reducer;
