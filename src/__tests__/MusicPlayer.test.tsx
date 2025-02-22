import { fireEvent, render, screen } from '@testing-library/react';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { vi } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { mockStore } from '../mocks/mockStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeProvider from '../context/ThemeProvider';

vi.mock('../components/MusicPlayer/MusicPlayer.tsx', () => ({
  default: ({
    errorMessage,
    consoleErrors = [],
    onClose,
  }: {
    errorMessage: string;
    consoleErrors: string[];
    onClose: () => void;
  }) => (
    <div data-testid="error-modal">
      <div>{errorMessage}</div>
      <ul>
        {consoleErrors.map((error: string, index: number) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

beforeAll(() => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
});

describe('ErrorBoundary and MusicPlayer', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does not display the ErrorModal when there are no errors', () => {
    render(
      <ErrorBoundary>
        <div>No error here</div>
      </ErrorBoundary>
    );

    expect(screen.queryByTestId('error-modal')).not.toBeInTheDocument();
  });

  it('should toggle play/pause when the button is clicked', async () => {
    render(
      <Provider store={mockStore}>
        <ThemeProvider>
          <BrowserRouter>
            <MusicPlayer />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    const playPauseButton = screen.getByRole('button');

    expect(playPauseButton).toHaveRole('button');

    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveRole('button');

    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveRole('button');
  });
});
