import { render, screen, waitFor } from '@testing-library/react';
import App from '../components/App/App';
import { vi } from 'vitest';

// Mock the child components
vi.mock('../../pages/Main/Main', () => ({
  default: () => <div>Main Page</div>,
}));

vi.mock('../../pages/CharacterDetails/CharacterDetails', () => ({
  default: () => <div>Character Details</div>,
}));

vi.mock('../../pages/NotFound/NotFound', () => ({
  default: () => <div>404 Not Found</div>,
}));

describe('App', () => {
  it('renders the CharacterDetails page when the details route is visited', async () => {
    render(<App />);

    // Simulate visiting the details route
    window.history.pushState({}, '', '/details');

    // Wait for the CharacterDetails page to be rendered
    await waitFor(() => screen.getByText('Star Wars Characters'));

    // Check if the CharacterDetails page is rendered
    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
  });

  it('renders the NotFound page for an invalid route', async () => {
    render(<App />);

    // Simulate visiting an invalid route
    window.history.pushState({}, '', '/invalid-route');

    // Wait for the NotFound page to be rendered
    await waitFor(() => screen.getByText('Throw Error'));

    // Check if the NotFound page is rendered
    expect(screen.getByText('Throw Error')).toBeInTheDocument();
  });
});
