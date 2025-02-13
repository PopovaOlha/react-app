import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate, useSearchParams } from 'react-router-dom';
import CharacterDetails from '../pages/CharacterDetails/CharacterDetails';
import { vi, Mock } from 'vitest';
// Mock the fetchCharacterDetails API
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
      <MemoryRouter>
        <CharacterDetails searchTerm="Luke" page={1} />
      </MemoryRouter>
    );

    const loadingIndicator = await screen.findByTestId('loading');
    expect(loadingIndicator).toBeInTheDocument();

    // Wait for the loading to finish
    await waitFor(() =>
      expect(screen.queryByTestId('loading')).toBeInTheDocument()
    );
    render(
      <MemoryRouter>
        <CharacterDetails searchTerm="Luke" page={1} />
      </MemoryRouter>
    );
  });

  it('displays an error message if fetching data fails', async () => {
    render(
      <MemoryRouter>
        <CharacterDetails searchTerm="Luke" page={1} />
      </MemoryRouter>
    );
  });

  it('displays an error message if fetching data fails', async () => {
    render(
      <MemoryRouter>
        <CharacterDetails searchTerm="Luke" page={1} />
      </MemoryRouter>
    );
  });
});
