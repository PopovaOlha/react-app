import React from 'react';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div>
        <div className={styles.text}>Page Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;
