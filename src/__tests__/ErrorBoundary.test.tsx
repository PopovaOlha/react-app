import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ThrowErrorButton from '../components/ThrowErrorButto/ThrowErrorButton';
import { vi } from 'vitest';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches errors in its children and displays the ErrorModal', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Throw Error'));

    expect(await screen.findByText('Error Log')).toBeInTheDocument();
    expect(
      await screen.findByText('Test Console Error: Something went wrong!')
    ).toBeInTheDocument();
  });

  it('displays the correct error message in the ErrorModal', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Throw Error'));
  });

  it('displays console errors in the ErrorModal', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Throw Error'));

    const consoleError = await screen.findByText(
      'Test Console Error: Something went wrong!'
    );
    expect(consoleError).toBeInTheDocument();
  });

  it('closes the ErrorModal when the close button is clicked', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Throw Error'));

    await screen.findByText('Error Log');

    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByText('Error Log')).not.toBeInTheDocument();
  });

  it('does not display the ErrorModal when there are no errors', () => {
    render(
      <ErrorBoundary>
        <div>No Error Here</div>
      </ErrorBoundary>
    );

    expect(screen.queryByText('Error Log')).not.toBeInTheDocument();
  });
});
