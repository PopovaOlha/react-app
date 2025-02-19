import styles from './Footer.module.css';
import logo from '../../assets/rss-logo.c19ce1b4.svg';
import ThrowErrorButton from '../ThrowErrorButto/ThrowErrorButton';
import { LOGO_HEIGHT, LOGO_WIDTH } from '../../config/constants';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>
        <img
          src={logo}
          alt="React School logo"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
        />
      </span>
      <ThrowErrorButton />
    </footer>
  );
};

export default Footer;
