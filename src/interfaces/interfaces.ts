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
