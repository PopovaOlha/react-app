import React from 'react';
import styles from './ErrorComponent.module.css';
import { ErrorComponentProps } from '../../interfaces/interfaces';

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorMessage}>{message}</div>
    </div>
  );
};

export default ErrorComponent;
