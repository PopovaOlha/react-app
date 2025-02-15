import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import charactersReducer from './charactersSlice';
import { charactersApi } from '../api/starWarsApi';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    characters: charactersReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
