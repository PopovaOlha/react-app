import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
import logo from '../assets/rss-logo.c19ce1b4.svg';
import { vi } from 'vitest';

vi.mock('../ThrowErrorButto/ThrowErrorButton', () => ({
  default: () => <div>ThrowErrorButton</div>,
}));

describe('Footer', () => {
  it('renders the footer with logo and ThrowErrorButton', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    const logoImage = screen.getByAltText('React School logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logo);
    expect(logoImage).toHaveAttribute('width', '40');
    expect(logoImage).toHaveAttribute('height', '30');
  });
});
