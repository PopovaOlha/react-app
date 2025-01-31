import { Component, ErrorInfo } from 'react';
import { Props, State } from '../../interfaces/interfaces';

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render(): JSX.Element {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }
    return this.props.children ? <>{this.props.children}</> : <></>;
  }
}

export default ErrorBoundary;
