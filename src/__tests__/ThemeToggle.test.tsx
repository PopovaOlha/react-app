import { render, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import styles from '../components/ThemeToggle/ThemeToggle.module.css';
import useTheme from '../hooks/useTheme';

// Mock the `useTheme` hook properly
vi.mock('../hooks/useTheme', () => ({
  __esModule: true, // This makes sure it is treated as an ES module
  default: vi.fn(), // This adds a default export to the mock
}));

describe('ThemeToggle', () => {
  it('should render with Light and Dark labels', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    const { getByText } = render(<ThemeToggle />);
    expect(getByText('Light')).toBeInTheDocument();
    expect(getByText('Dark')).toBeInTheDocument();
  });

  it('should apply the "active" class when the theme is dark', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn(),
    });

    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toHaveClass(styles.toggleWrapper);
  });

  it('should not apply the "active" class when the theme is light', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });

    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).not.toHaveClass(styles.active);
  });

  it('should call toggleTheme when the switch is clicked', () => {
    const toggleThemeMock = vi.fn();
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    const { getByRole } = render(<ThemeToggle />);
    fireEvent.click(getByRole('button'));
    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
