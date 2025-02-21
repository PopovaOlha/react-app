import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../components/Flyout/Flyout';
import { unselectAll } from '../store/selectedItemsSlice';
import { vi } from 'vitest';
import { mockCharacters } from '../mocks/handlers';
import ThemeProvider from '../context/ThemeProvider';

vi.mock('../../hooks/useTheme', () => ({
  __esModule: true,
  default: vi.fn(() => ({ theme: 'light' })),
}));

interface SelectedItemsState {
  selectedCharacters: typeof mockCharacters;
}

const createMockStore = (selectedCharacters: typeof mockCharacters) =>
  configureStore({
    reducer: {
      selectedItems: (state: SelectedItemsState = { selectedCharacters }) =>
        state,
    },
  });

test('renders flyout with selected items', () => {
  const store = createMockStore(mockCharacters);

  render(
    <Provider store={store}>
      <ThemeProvider>
        {' '}
        <Flyout />
      </ThemeProvider>
    </Provider>
  );

  expect(screen.getByText(/3 items selected/)).toBeInTheDocument();
  expect(screen.getByText('Unselect all')).toBeInTheDocument();
});

test('does not render flyout when no items are selected', () => {
  const emptyStore = createMockStore([]);

  const { container } = render(
    <Provider store={emptyStore}>
      <ThemeProvider>
        {' '}
        <Flyout />
      </ThemeProvider>
    </Provider>
  );

  expect(container).not.toBeEmptyDOMElement();
});

test('triggers unselectAll action when "Unselect all" button is clicked', () => {
  const store = createMockStore(mockCharacters);

  const dispatch = vi.fn();
  store.dispatch = dispatch;

  render(
    <Provider store={store}>
      <ThemeProvider>
        {' '}
        <Flyout />
      </ThemeProvider>
    </Provider>
  );

  fireEvent.click(screen.getByText('Unselect all'));

  expect(dispatch).toHaveBeenCalledWith(unselectAll());
});
