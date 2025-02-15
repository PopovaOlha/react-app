import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APICharacter, Character } from '../interfaces/interfaces';
import { API_URL } from '../config/api';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    searchCharacters: builder.query<
      Character[],
      { searchTerm?: string; page?: number }
    >({
      query: ({ searchTerm = '', page = 1 }) =>
        `?search=${encodeURIComponent(searchTerm)}&page=${page}`,
      transformResponse: (response: { results: APICharacter[] }) =>
        response.results.map((char) => {
          const id = char.url.match(/\/people\/(\d+)\//)?.[1] || 'placeholder';
          return {
            id,
            name: char.name,
            description: char.birth_year || 'No description available',
            image: `../../static/people/${id}.jpg`,
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
        }),
    }),
    getCharacterDetails: builder.query<Character, string>({
      query: (id) => `/${id}/`,
      transformResponse: (data: APICharacter) => ({
        id: data.url.match(/\/people\/(\d+)\//)?.[1] || 'placeholder',
        name: data.name,
        description: data.birth_year || 'No description available',
        image: `../../static/people/${data.url.match(/\/people\/(\d+)\//)?.[1]}.jpg`,
        character: data.name,
        eyeColor: data.eye_color,
        films: data.films,
        gender: data.gender,
        hairColor: data.hair_color,
        height: data.height,
        homeworld: data.homeworld,
        mass: data.mass,
        skinColor: data.skin_color,
      }),
    }),
  }),
});

export const { useSearchCharactersQuery, useGetCharacterDetailsQuery } =
  charactersApi;
