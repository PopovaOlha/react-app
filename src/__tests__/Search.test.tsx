import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';
import { vi } from 'vitest';

describe('Search Component', () => {
  test('renders input and search button', () => {
    render(<Search onSearch={vi.fn()} />);

    expect(
      screen.getByPlaceholderText('Search for a character...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<Search onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search for a character...');
    fireEvent.change(input, { target: { value: 'Luke' } });

    expect(input).toHaveValue('Luke');
  });

  test('calls onSearch with trimmed input value', () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a character...');
    fireEvent.change(input, { target: { value: '  Vader  ' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Vader');
  });
});
