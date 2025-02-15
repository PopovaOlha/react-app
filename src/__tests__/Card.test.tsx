import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider
import CardList from '../components/CardList/CardList';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { store } from '../store/store';
import ThemeProvider from '../context/ThemeProvider';

const mockOnCardClick = vi.fn();

const mockCharacters = [
  {
    id: '1',
    name: 'Luke Skywalker',
    description: 'A legendary Jedi Knight',
    image: 'https://via.placeholder.com/150',
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    eyeColor: 'blue',
    gender: 'male',
    hairColor: 'blond',
    height: '172',
    mass: '77',
    skinColor: 'fair',
    homeworld: 'Tatooine',
    character: 'Luke Skywalker',
  },
  {
    id: '2',
    name: 'Darth Vader',
    description: 'A powerful Sith Lord',
    image: 'https://via.placeholder.com/150',
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    eyeColor: 'red',
    gender: 'male',
    hairColor: 'none',
    height: '202',
    mass: '136',
    skinColor: 'black',
    homeworld: 'Tatooine',
    character: 'Darth Vader',
  },
];

test('renders character list correctly', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CardList characters={mockCharacters} onCardClick={mockOnCardClick} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Darth Vader')).toBeInTheDocument();
});

test('displays "No characters found" when the list is empty', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CardList characters={[]} onCardClick={mockOnCardClick} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText('No characters found')).toBeInTheDocument();
});

test('calls onCardClick when a card is clicked', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <CardList characters={mockCharacters} onCardClick={mockOnCardClick} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
});
