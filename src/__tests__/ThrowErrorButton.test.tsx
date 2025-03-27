import { render, screen, fireEvent } from '@testing-library/react';
import ThrowErrorButton from '../components/ThrowErrorButto/ThrowErrorButton';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { vi } from 'vitest';

describe('ThrowErrorButton Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders the button', () => {
    render(<ThrowErrorButton />);
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  test('displays ErrorModal when wrapped in ErrorBoundary', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(button);

    expect(
      await screen.findByText(/Something went wrong/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('closes ErrorModal when close button is clicked', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(button);

    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
  });
});
