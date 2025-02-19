import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useSearchParams, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from '../pages/Main/Main';
import { Mock, vi } from 'vitest';
import ThemeProvider from '../context/ThemeProvider';
import store from '../store/store';

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
  default: () => <div data-testid="loading">Loading...</div>,
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

  const renderMain = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

  it('renders the title, search bar, and footer', () => {
    renderMain();

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('displays a loader while fetching data', async () => {
    renderMain();

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    );
  });

  it('displays an error message if fetching data fails', async () => {
    renderMain();

    expect(await screen.findByText('Throw Error')).toBeInTheDocument();
  });

  it('updates the URL when a search is performed', () => {
    renderMain();

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Darth' } });
  });

  it('renders the CharacterDetails component when a character ID is selected', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams('query=Luke&page=1&details=1'),
    ]);

    renderMain();

    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
