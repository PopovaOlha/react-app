import { APICharacter, Character } from '../interfaces/interfaces';
import { API_URL } from '../config/api';

export const fetchCharacters = async (
  searchTerm = '',
  page = 1
): Promise<Character[]> => {
  try {
    const url = `${API_URL}?search=${encodeURIComponent(searchTerm)}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }

    const data: { results: APICharacter[] } = await response.json();

    return data.results.map((char: APICharacter) => {
      const id = char.url.match(/\/people\/(\d+)\//)?.[1] || 'placeholder';
      return {
        id,
        name: char.name,
        description: char.birth_year || 'No description available',
        image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
        character: char.name,
      };
    });
  } catch {
    throw new Error('Failed to fetch characters');
  }
};

export const fetchCharacterDetails = async (id: string): Promise<Character> => {
  try {
    const url = `${API_URL}/${id}/`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch character details');
    }

    const data: APICharacter = await response.json();

    return {
      id,
      name: data.name,
      description: data.birth_year || 'No description available',
      image: `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`,
      character: data.name,
    };
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw new Error('Failed to fetch character details');
  }
};
