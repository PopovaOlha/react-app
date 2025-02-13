import styles from './ThrowErrorButton.module.css';

const ThrowErrorButton: React.FC = () => {
  const throwError = (): void => {
    console.error('Test Console Error: Something went wrong!');
  };
  return (
    <button className={styles.throwErrorButton} onClick={throwError}>
      Throw Error
    </button>
  );
};

export default ThrowErrorButton;
