import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';

const Wrapper: React.FC<{ totalPages: number }> = ({ totalPages }) => (
  <MemoryRouter initialEntries={['/?page=1']}>
    <Routes>
      <Route path="/" element={<Pagination totalPages={totalPages} />} />
    </Routes>
  </MemoryRouter>
);

describe('Pagination Component', () => {
  test('renders current page and total pages', () => {
    render(<Wrapper totalPages={5} />);
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  test('disables "previous" button on the first page', () => {
    render(<Wrapper totalPages={5} />);
    expect(screen.getByRole('button', { name: /←/i })).toBeDisabled();
  });

  test('disables "next" button on the last page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=5']}>
        <Routes>
          <Route path="/" element={<Pagination totalPages={5} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /→/i })).toBeDisabled();
  });

  test('updates search params when clicking next', () => {
    render(<Wrapper totalPages={5} />);

    const nextButton = screen.getByRole('button', { name: /→/i });
    fireEvent.click(nextButton);
  });

  test('updates search params when clicking previous', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <Routes>
          <Route path="/" element={<Pagination totalPages={5} />} />
        </Routes>
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /←/i });
    fireEvent.click(prevButton);
  });
});
