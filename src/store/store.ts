import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import charactersReducer from './charactersSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
