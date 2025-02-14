import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, CharactersState } from '../interfaces/interfaces';

const initialState: CharactersState = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(
        (char) => char.id !== action.payload
      );
    },
    clearCharacters: (state) => {
      state.characters = [];
    },
  },
});

export const { setCharacters, addCharacter, removeCharacter, clearCharacters } =
  charactersSlice.actions;

export default charactersSlice.reducer;
