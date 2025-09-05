import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import preferencesReducer from './slices/preferencesSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    preferences: preferencesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;