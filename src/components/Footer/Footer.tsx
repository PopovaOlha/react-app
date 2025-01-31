import { Component } from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/rss-logo.c19ce1b4.svg';
import ThrowErrorButton from '../ThrowErrorButto/ThrowErrorButton';

class Footer extends Component {
  render(): JSX.Element {
    return (
      <footer className={styles.footer}>
        <span className={styles.logo}>
          <img src={logo} alt="React School logo" width={40} height={40} />
        </span>
        <ThrowErrorButton />
      </footer>
    );
  }
}

export default Footer;
