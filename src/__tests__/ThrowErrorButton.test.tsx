import { render, screen, fireEvent } from '@testing-library/react';
import ThrowErrorButton from '../components/ThrowErrorButto/ThrowErrorButton';
import { vi } from 'vitest';

describe('ThrowErrorButton Component', () => {
  test('renders button', () => {
    render(<ThrowErrorButton />);
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  test('calls console.error when the button is clicked', () => {
    // Мокаем console.error
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ThrowErrorButton />);

    const button = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(button);

    // Проверяем, что console.error был вызван
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Test Console Error: Something went wrong!'
    );

    consoleErrorMock.mockRestore();
  });
});
