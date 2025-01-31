import { Component } from 'react';
import styles from './ErrorModal.module.css';
import { Props } from '../../interfaces/interfaces';

class ErrorModal extends Component<Props> {
  render(): JSX.Element {
    const { errorMessage, consoleErrors, onClose } = this.props;

    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>Error Log</h2>
          {errorMessage && (
            <p>
              <strong>Error:</strong> {errorMessage}
            </p>
          )}

          <h3>Console Errors:</h3>
          {consoleErrors.length > 0 ? (
            <ul className={styles.errorList}>
              {consoleErrors.map((error: string, index: number) => (
                <li key={index} className={styles.errorItem}>
                  {error}
                </li>
              ))}
            </ul>
          ) : (
            <p>No console errors.</p>
          )}

          <button onClick={onClose} className={styles.button}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorModal;
