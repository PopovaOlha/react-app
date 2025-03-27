import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';
import { vi } from 'vitest';
import ThemeProvider from '../context/ThemeProvider';

describe('Search Component', () => {
  const renderWithTheme = (component: React.ReactNode) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  test('renders input and search button', () => {
    renderWithTheme(<Search onSearch={vi.fn()} />);

    expect(
      screen.getByPlaceholderText('Search for a character...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    renderWithTheme(<Search onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search for a character...');
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input).toHaveValue('Luke');
  });

  test('calls onSearch with trimmed input value', () => {
    const mockOnSearch = vi.fn();
    renderWithTheme(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a character...');
    fireEvent.change(input, { target: { value: '  Vader  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Vader');
  });
});
