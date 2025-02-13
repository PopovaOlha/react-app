import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from '../components/ErrorModal/ErrorModal';
import { vi } from 'vitest';

describe('ErrorModal', () => {
  const onCloseMock = vi.fn();

  it('renders the modal with error message and console errors', () => {
    const errorMessage = 'Test error message';
    const consoleErrors = ['Error 1', 'Error 2'];

    render(
      <ErrorModal
        errorMessage={errorMessage}
        consoleErrors={consoleErrors}
        onClose={onCloseMock}
      />
    );

    expect(screen.getByText('Error Log')).toBeInTheDocument();

    consoleErrors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });

    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('renders the modal without error message and with no console errors', () => {
    render(
      <ErrorModal errorMessage={''} consoleErrors={[]} onClose={onCloseMock} />
    );

    expect(screen.getByText('Error Log')).toBeInTheDocument();

    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();

    expect(screen.getByText('No console errors.')).toBeInTheDocument();

    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <ErrorModal
        errorMessage="Test error message"
        consoleErrors={[]}
        onClose={onCloseMock}
      />
    );

    fireEvent.click(screen.getByText('Close'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the overlay is clicked', () => {
    render(
      <ErrorModal
        errorMessage="Test error message"
        consoleErrors={[]}
        onClose={onCloseMock}
      />
    );

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the modal content is clicked', () => {
    render(
      <ErrorModal
        errorMessage="Test error message"
        consoleErrors={[]}
        onClose={onCloseMock}
      />
    );
  });
});
