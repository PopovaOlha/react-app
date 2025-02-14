import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../interfaces/interfaces';

interface SelectedItemsState {
  selectedCharacters: Character[];
}

const initialState: SelectedItemsState = {
  selectedCharacters: JSON.parse(localStorage.getItem('selectedItems') || '[]'), // Загрузка из localStorage
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
      localStorage.setItem(
        'selectedItems',
        JSON.stringify(state.selectedCharacters)
      );
    },
    unselectCharacter: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (char) => char.id !== String(action.payload)
      );
      localStorage.setItem(
        'selectedItems',
        JSON.stringify(state.selectedCharacters)
      );
    },
    unselectAll: (state) => {
      state.selectedCharacters = [];
      localStorage.removeItem('selectedItems');
    },
  },
});

export const { selectCharacter, unselectCharacter, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
