import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionnaireState {
  answers: Record<string, any>;
  currentStep: number;
  completed: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionnaireState = {
  answers: {},
  currentStep: 0,
  completed: false,
  loading: false,
  error: null,
};

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    updateAnswer: (state, action: PayloadAction<{ key: string; value: any }>) => {
      const { key, value } = action.payload;
      state.answers[key] = value;
    },
    setAnswers: (state, action: PayloadAction<Record<string, any>>) => {
      state.answers = { ...state.answers, ...action.payload };
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
    resetQuestionnaire: () => initialState,
  },
});

export const {
  updateAnswer,
  setAnswers,
  setCurrentStep,
  nextStep,
  prevStep,
  setCompleted,
  setLoading,
  setError,
  resetQuestionnaire,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
