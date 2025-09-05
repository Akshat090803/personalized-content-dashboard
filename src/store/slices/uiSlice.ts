import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  isMobile: boolean;
  searchFocused: boolean;
  loading: boolean;
}

const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const initialState: UIState = {
  theme: savedTheme || systemTheme,
  sidebarOpen: true,
  isMobile: false,
  searchFocused: false,
  loading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      
      // Apply theme to document
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
      
      // Apply theme to document
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
      if (action.payload) {
        state.sidebarOpen = false;
      }
    },
    setSearchFocused: (state, action: PayloadAction<boolean>) => {
      state.searchFocused = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

export const { 
  toggleTheme, 
  setTheme, 
  toggleSidebar, 
  setSidebarOpen, 
  setIsMobile,
  setSearchFocused,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer;