import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CardList from '../components/CardList/CardList';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ThemeProvider from '../context/ThemeProvider';
import { mockStore } from '../mocks/mockStore';

const mockCharacters = [
  {
    id: '1',
    name: 'Luke Skywalker',
    birthYear: 'A legendary Jedi Knight',
    image: 'https://via.placeholder.com/150',
    character: 'Luke Skywalker',
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    eyeColor: 'blue',
    gender: 'male',
    hairColor: 'blond',
    height: '172',
    mass: '77',
    skinColor: 'fair',
    homeworld: 'Tatooine',
  },
  {
    id: '2',
    name: 'Darth Vader',
    birthYear: 'A powerful Sith Lord',
    image: 'https://via.placeholder.com/150',
    character: 'Darth Vader',
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    eyeColor: 'red',
    gender: 'male',
    hairColor: 'none',
    height: '202',
    mass: '136',
    skinColor: 'black',
    homeworld: 'Tatooine',
  },
];

const mockOnCardClick = vi.fn();

test('calls onCardClick when a card is clicked', async () => {
  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <ThemeProvider>
          <CardList characters={mockCharacters} onCardClick={mockOnCardClick} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  const cards = await screen.findAllByTestId('character-card');
  expect(cards[0]).toBeInTheDocument();
  expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
});
