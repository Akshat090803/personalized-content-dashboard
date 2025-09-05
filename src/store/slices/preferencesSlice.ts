import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  favoriteGenres: string[];
  preferredDecade: string;
  viewMode: 'grid' | 'list';
  autoplay: boolean;
  showAdultContent: boolean;
}

interface PreferencesState {
  preferences: UserPreferences;
  isSettingsOpen: boolean;
}

const defaultPreferences: UserPreferences = {
  favoriteGenres: ['Action', 'Comedy', 'Drama'],
  preferredDecade: '2020s',
  viewMode: 'grid',
  autoplay: false,
  showAdultContent: false,
};

const savedPreferences = localStorage.getItem('userPreferences');
const initialPreferences = savedPreferences 
  ? JSON.parse(savedPreferences) 
  : defaultPreferences;

const initialState: PreferencesState = {
  preferences: initialPreferences,
  isSettingsOpen: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
      localStorage.setItem('userPreferences', JSON.stringify(state.preferences));
    },
    toggleFavoriteGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload;
      const index = state.preferences.favoriteGenres.indexOf(genre);
      
      if (index >= 0) {
        state.preferences.favoriteGenres.splice(index, 1);
      } else {
        state.preferences.favoriteGenres.push(genre);
      }
      
      localStorage.setItem('userPreferences', JSON.stringify(state.preferences));
    },
    setSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsOpen = action.payload;
    },
    resetPreferences: (state) => {
      state.preferences = defaultPreferences;
      localStorage.setItem('userPreferences', JSON.stringify(defaultPreferences));
    }
  },
});

export const { 
  updatePreferences, 
  toggleFavoriteGenre, 
  setSettingsOpen, 
  resetPreferences 
} = preferencesSlice.actions;

export default preferencesSlice.reducer;