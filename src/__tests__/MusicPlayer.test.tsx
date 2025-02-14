import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { vi } from 'vitest';

vi.mock('../ErrorModal/ErrorModal', () => ({
  default: ({
    errorMessage,
    consoleErrors,
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

describe('ErrorBoundary', () => {
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
});
