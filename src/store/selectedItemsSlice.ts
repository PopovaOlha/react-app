import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedItems: string[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<string>) {
      if (!state.selectedItems.includes(action.payload)) {
        state.selectedItems.push(action.payload);
      }
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (id) => id !== action.payload
      );
    },
    unselectAll(state) {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
