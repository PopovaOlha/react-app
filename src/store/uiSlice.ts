import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UiState } from '../interfaces/interfaces';

const initialState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;
