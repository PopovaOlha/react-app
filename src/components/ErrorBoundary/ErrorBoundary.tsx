import { Component } from 'react';
import ErrorModal from '../ErrorModal/ErrorModal';
import { State } from '../../interfaces/interfaces';

class ErrorBoundary extends Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '', consoleErrors: [] };
  }

  componentDidMount(): void {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.setState((prevState) => ({
        consoleErrors: [...prevState.consoleErrors, args.join(' ')],
      }));
      originalConsoleError(...args);
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message, consoleErrors: [] };
  }

  closeModal = (): void => {
    this.setState({ hasError: false, errorMessage: '', consoleErrors: [] });
  };

  render(): React.ReactNode {
    const { hasError, errorMessage, consoleErrors } = this.state;

    return (
      <div>
        {(hasError || consoleErrors.length > 0) && (
          <ErrorModal
            errorMessage={errorMessage}
            consoleErrors={consoleErrors}
            onClose={this.closeModal}
          />
        )}
        {this.props.children}
      </div>
    );
  }
}

export default ErrorBoundary;
