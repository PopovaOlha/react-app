import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import ThrowErrorButton from '../components/ThrowErrorButto/ThrowErrorButton';
import { vi } from 'vitest';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Mock console.error to suppress error logs
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original console.error
    vi.restoreAllMocks();
  });

  it('catches errors in its children and displays the ErrorModal', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    // Click the button to throw an error
    fireEvent.click(screen.getByText('Throw Error'));

    // Wait for the ErrorModal to appear
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

    // Click the button to throw an error
    fireEvent.click(screen.getByText('Throw Error'));
  });

  it('displays console errors in the ErrorModal', async () => {
    render(
      <ErrorBoundary>
        <ThrowErrorButton />
      </ErrorBoundary>
    );

    // Click the button to throw an error
    fireEvent.click(screen.getByText('Throw Error'));

    // Wait for the console error to appear
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

    // Click the button to throw an error
    fireEvent.click(screen.getByText('Throw Error'));

    // Wait for the ErrorModal to appear
    await screen.findByText('Error Log');

    // Click the close button
    fireEvent.click(screen.getByText('Close'));

    // Check if the ErrorModal is closed
    expect(screen.queryByText('Error Log')).not.toBeInTheDocument();
  });

  it('does not display the ErrorModal when there are no errors', () => {
    render(
      <ErrorBoundary>
        <div>No Error Here</div>
      </ErrorBoundary>
    );

    // Check if the ErrorModal is not displayed
    expect(screen.queryByText('Error Log')).not.toBeInTheDocument();
  });
});
