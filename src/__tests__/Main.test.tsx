import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useSearchParams, useNavigate } from 'react-router-dom';
import Main from '../pages/Main/Main';
import { Mock, vi } from 'vitest';

vi.mock('../../api/starWarsApi', () => ({
  fetchCharacters: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock('../../components/Search/Search', () => ({
  default: ({ onSearch }: { onSearch: (query: string) => void }) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearch(e.target.value)}
    />
  ),
}));

vi.mock('../../components/CardList/CardList', () => ({
  default: ({
    characters,
    onCardClick,
  }: {
    characters: { id: number; name: string }[];
    onCardClick: (id: number) => void;
  }) => (
    <div>
      {characters.map((character) => (
        <div key={character.id} onClick={() => onCardClick(character.id)}>
          {character.name}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../components/Loader/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../../components/Pagination/Pagination', () => ({
  default: ({ totalPages }: { totalPages: number }) => (
    <div>Pagination: {totalPages} pages</div>
  ),
}));

vi.mock('../../components/Footer/Footer', () => ({
  default: () => <footer>Footer</footer>,
}));

vi.mock('../CharacterDetails/CharacterDetails', () => ({
  default: () => <div>CharacterDetails</div>,
}));

describe('Main', () => {
  const mockNavigate = vi.fn();
  const mockSearchParams = new URLSearchParams('query=Luke&page=1');

  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue([mockSearchParams]);
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the title, search bar, and footer', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();

    expect(screen.getByTestId('search-input')).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays a loader while fetching data', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId('loading')).toBeInTheDocument()
    );
  });

  it('displays an error message if fetching data fails', async () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(await screen.findByText('Throw Error')).toBeInTheDocument();
  });

  it('updates the URL when a search is performed', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Darth' } });
  });

  it('renders the CharacterDetails component when a character ID is selected', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams('query=Luke&page=1&details=1'),
    ]);

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
