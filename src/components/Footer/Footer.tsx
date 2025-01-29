import { Component } from 'react';
import styles from './Footer.module.css';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    );
  }
}

export default Footer;
