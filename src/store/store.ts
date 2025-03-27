import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';
import uiReducer from './uiSlice';
import { charactersApi } from '../api/starWarsApi';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    ui: uiReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
