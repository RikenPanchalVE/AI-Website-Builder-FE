import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  currentModal: string | null;
  notifications: Array<{ id: number; [key: string]: any }>;
  darkMode: boolean;
}

const initialState: UIState = {
  sidebarOpen: false,
  currentModal: null,
  notifications: [],
  darkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.currentModal = action.payload;
    },
    closeModal: (state) => {
      state.currentModal = null;
    },
    addNotification: (state, action: PayloadAction<{ title: string; description?: string; variant?: string }>) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  toggleDarkMode,
} = uiSlice.actions;

export default uiSlice.reducer;
