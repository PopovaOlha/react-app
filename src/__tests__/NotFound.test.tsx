import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound/NotFound';

describe('NotFound Component', () => {
  test('renders the NotFound component correctly', () => {
    render(<NotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('renders the spinner', () => {
    render(<NotFound />);
  });
});
