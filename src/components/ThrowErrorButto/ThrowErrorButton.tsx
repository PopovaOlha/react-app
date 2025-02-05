import styles from './ThrowErrorButton.module.css';

const ThrowErrorButton: React.FC = () => {
  const throwError = (): void => {
    console.error('Test Console Error: Something went wrong!');
    throw new Error('Test Error: Button Click Error!');
  };

  return (
    <button className={styles.throwErrorButton} onClick={throwError}>
      Throw Error
    </button>
  );
};

export default ThrowErrorButton;
