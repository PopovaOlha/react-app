import { render, screen } from '@testing-library/react';
import Loader from '../components/Loader/Loader';

describe('Loader Component', () => {
  test('renders the loader component with correct classes', () => {
    render(<Loader />);

    const loaderContainer = screen.getByTestId('loading');
    expect(loaderContainer).toBeInTheDocument();

    expect(loaderContainer.className).toMatch(/^_loaderContainer/);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    const text = screen.getByText(/loading/i);
    expect(text).toBeInTheDocument();
  });
});
