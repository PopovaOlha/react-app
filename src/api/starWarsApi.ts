import { APICharacter, Character } from '../interfaces/interfaces';
import { API_URL } from '../config/api.ts';

export const fetchCharacters = async (
  searchTerm = ''
): Promise<Character[]> => {
  try {
    const url = searchTerm
      ? `${API_URL}?search=${encodeURIComponent(searchTerm)}`
      : API_URL;

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
