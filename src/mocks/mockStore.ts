import { configureStore } from '@reduxjs/toolkit';
import { charactersApi } from '../api/starWarsApi';

export const mockStore = configureStore({
  reducer: {
    selectedItems: (state = { selectedCharacters: [] }) => state,
    ui: (state = { isLoading: false }) => state,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});
