import React, { useState, useEffect } from 'react';
import ErrorModal from '../ErrorModal//ErrorModal';

interface State {
  hasError: boolean;
  errorMessage: string;
  consoleErrors: string[];
}

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<State>({
    hasError: false,
    errorMessage: '',
    consoleErrors: [],
  });

  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      setState((prevState) => ({
        ...prevState,
        consoleErrors: [...prevState.consoleErrors, args.join(' ')],
      }));
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  const closeModal = (): void => {
    setState({ hasError: false, errorMessage: '', consoleErrors: [] });
  };

  if (state.hasError || state.consoleErrors.length > 0) {
    return (
      <div>
        <ErrorModal
          errorMessage={state.errorMessage}
          consoleErrors={state.consoleErrors}
          onClose={closeModal}
        />
        {children}
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
