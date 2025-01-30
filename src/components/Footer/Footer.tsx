import { Component } from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/rs-logo.svg';

class Footer extends Component {
  render(): JSX.Element {
    return (
      <footer className={styles.footer}>
        <img src={logo} alt="React School logo" />
        <span>© {new Date().getFullYear()}</span>
      </footer>
    );
  }
}

export default Footer;
