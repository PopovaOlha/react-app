import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../interfaces/interfaces';

interface SelectedItemsState {
  selectedCharacters: Character[];
}

const initialState: SelectedItemsState = {
  selectedCharacters: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      if (
        !state.selectedCharacters.some((char) => char.id === action.payload.id)
      ) {
        state.selectedCharacters.push(action.payload);
      }
    },
    unselectCharacter: (state, action: PayloadAction<string>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (char) => char.id !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
    },
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.selectedCharacters = action.payload;
    },
    selectMultipleCharacters: (state, action: PayloadAction<Character[]>) => {
      state.selectedCharacters = action.payload;
    },
  },
});

export const {
  selectCharacter,
  unselectCharacter,
  unselectAll,
  setCharacters,
  selectMultipleCharacters,
} = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
