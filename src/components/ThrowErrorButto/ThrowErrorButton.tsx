import styles from './ThrowErrorButton.module.css';

const ThrowErrorButton: React.FC = () => {
  const throwError = (): void => {
    throw new Error('Test Error: Something went wrong!');
  };

  return (
    <button className={styles.throwErrorButton} onClick={throwError}>
      Throw Error
    </button>
  );
};

export default ThrowErrorButton;
