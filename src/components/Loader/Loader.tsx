import { Component } from 'react';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <di className={styles.loader}>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Loading...</p>
        </di>
      </div>
    );
  }
}

export default Loader;
