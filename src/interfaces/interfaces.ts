import { ReactNode } from 'react';

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchState {
  searchTerm: string;
}

export interface Character {
  id: string;
  image: string;
  name: string;
  description: string;
  character: string;
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
