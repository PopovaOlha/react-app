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
}

export interface CardListProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
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
export interface Props {
  children: ReactNode;
}

export interface State {
  hasError: boolean;
}
