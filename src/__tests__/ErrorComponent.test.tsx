import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import styles from '../components/ErrorComponent/ErrorComponent.module.css';

describe('ErrorComponent', () => {
  test('renders the error message correctly', () => {
    const testMessage = 'Something went wrong!';

    render(<ErrorComponent message={testMessage} />);

    const errorMessage = screen.getByText(testMessage);
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays the error icon', () => {
    render(<ErrorComponent message="Test Error" />);

    const errorIcon = screen.getByText('⚠️');
    expect(errorIcon).toBeInTheDocument();
  });

  test('renders the error container with the correct styles', () => {
    render(<ErrorComponent message="Test Error" />);

    const errorContainer = screen.getByText('Test Error').parentElement;
    expect(errorContainer).toHaveClass(styles.error);
  });

  test('renders error message inside the correct container', () => {
    render(<ErrorComponent message="Test Error" />);
    const errorMessage = screen.getByText('Test Error');
    expect(errorMessage).toBeInTheDocument();
  });
});
