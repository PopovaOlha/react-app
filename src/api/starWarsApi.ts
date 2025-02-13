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
        films: char.films,
        eyeColor: char.eye_color,
        gender: char.gender,
        hairColor: char.hair_color,
        height: char.height,
        homeworld: char.homeworld,
        mass: char.mass,
        skinColor: char.skin_color,
      };
    });
  } catch {
    throw new Error('Failed to fetch characters');
  }
};

export const fetchCharacterDetails = async (id: string): Promise<Character> => {
  try {
    const url = `${API_URL}/${id}/`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
      eyeColor: data.eye_color,
      films: data.films,
      gender: data.gender,
      hairColor: data.hair_color,
      height: data.height,
      homeworld: data.homeworld,
      mass: data.mass,
      skinColor: data.skin_color,
    };
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw new Error('Failed to fetch character details');
  }
};
