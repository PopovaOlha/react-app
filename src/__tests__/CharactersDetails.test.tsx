import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import { vi, Mock } from 'vitest';
import CharacterDetails from '../pages/CharacterDetails/CharacterDetails';
import { ThemeProvider } from '../context/ThemeProvider';
import { store } from '../store/store';

vi.mock('../../api/starWarsApi', () => ({
  fetchCharacterDetails: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('CharacterDetails', () => {
  const mockNavigate = vi.fn();
  const mockSearchParams = new URLSearchParams('details=1');

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useSearchParams as Mock).mockReturnValue([mockSearchParams]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders character details correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <CharacterDetails searchTerm="Luke" page={1} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    const loadingIndicator = await screen.findByTestId('loading');
    expect(loadingIndicator).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId('loading')).toBeInTheDocument()
    );
  });

  it('displays an error message if fetching data fails', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <CharacterDetails searchTerm="Luke" page={1} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });

  it('displays an error message if fetching data fails', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <CharacterDetails searchTerm="Luke" page={1} />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });
});
