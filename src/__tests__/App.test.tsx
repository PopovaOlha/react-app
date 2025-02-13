import { render, screen, waitFor } from '@testing-library/react';
import App from '../components/App/App';
import { vi } from 'vitest';

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

    window.history.pushState({}, '', '/details');

    await waitFor(() => screen.getByText('Star Wars Characters'));

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
  });

  it('renders the NotFound page for an invalid route', async () => {
    render(<App />);

    window.history.pushState({}, '', '/invalid-route');

    await waitFor(() => screen.getByText('Throw Error'));

    expect(screen.getByText('Throw Error')).toBeInTheDocument();
  });
});
