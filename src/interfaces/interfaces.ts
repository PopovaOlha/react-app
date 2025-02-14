import { ReactNode } from 'react';

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchState {
  searchTerm: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  character: string;
  films: string[];
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: string;
  homeworld: string;
  mass: string;
  skinColor: string;
}

export interface CharactersState {
  characters: Character[];
}

export interface CardProps {
  character: Character;
  onClick: (id: string) => void;
}

export interface CardListProps {
  characters: Character[];
  onCardClick: (id: string) => void;
}

export interface APICharacter {
  name: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  url: string;
}

export interface MusicPlayerState {
  isPlaying: boolean;
  volume: number;
  currentTrackIndex: number;
}

export interface State {
  hasError: boolean;
}

export interface Props {
  children?: ReactNode;
  errorMessage: string;
  consoleErrors: string[];
  onClose: () => void;
}

export interface State {
  hasError: boolean;
  errorMessage: string;
  consoleErrors: string[];
}
export interface CardListProps {
  characters: CardProps['character'][];
}

export interface CharacterDetailsProps {
  searchTerm: string;
  page: number;
}

export interface ApiResponse {
  characters: Character[];
  totalPages: number;
}

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export interface SelectedItemsState {
  selectedItems: string[];
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface SelectedItemsState {
  selectedItems: string[];
}

export interface RootState {
  selectedItems: SelectedItemsState;
  characters: Character[];
}
