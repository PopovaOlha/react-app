import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loading">
      <div className={styles.loader}>
        <div className={styles.spinner} data-testid="spinner"></div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
