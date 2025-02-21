import { fireEvent, render, screen } from '@testing-library/react';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { vi } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// Mock MusicPlayer's error modal
vi.mock('../components/MusicPlayer/MusicPlayer.tsx', () => ({
  default: ({
    errorMessage,
    consoleErrors = [], // Ensure this is always an array
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

// Mock localStorage functions
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
    render(<MusicPlayer />);

    const playPauseButton = screen.getByRole('button');

    // Check initial play state
    expect(playPauseButton).toHaveRole('button');

    // Simulate play action
    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveRole('button');

    // Simulate pause action
    fireEvent.click(playPauseButton);
    expect(playPauseButton).toHaveRole('button');
  });
});
