import { Component } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render(): JSX.Element {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Loading...</p>
        </div>
      </div>
    );
  }
}

export default Loader;
