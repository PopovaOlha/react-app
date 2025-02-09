import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
