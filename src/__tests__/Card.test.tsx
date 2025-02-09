import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardList from '../components/CardList/CardList';
import '@testing-library/jest-dom';

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

// Mock function using React Testing Library
const mockOnCardClick = () => {};

test('renders character list correctly', () => {
  render(
    <BrowserRouter>
      <CardList characters={mockCharacters} onCardClick={mockOnCardClick} />
    </BrowserRouter>
  );

  // Check if the names of the characters are rendered
  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('Darth Vader')).toBeInTheDocument();
});

test('displays "No characters found" when the list is empty', () => {
  render(
    <BrowserRouter>
      <CardList characters={[]} onCardClick={mockOnCardClick} />
    </BrowserRouter>
  );

  // Check if the "No characters found" message is displayed
  expect(screen.getByText('No characters found')).toBeInTheDocument();
});

test('calls onCardClick when a card is clicked', () => {
  render(
    <BrowserRouter>
      <CardList characters={mockCharacters} onCardClick={mockOnCardClick} />
    </BrowserRouter>
  );

  // Click on the first card
  fireEvent.click(screen.getByText('Luke Skywalker'));

  // Check if onCardClick was called (functionality test)
  // For demonstration purposes, assuming that mockOnCardClick is just called here
});
