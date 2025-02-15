import React from 'react';
import styles from './ThemeToggle.module.css';
import useTheme from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleWrapper}>
      <span className={styles.toggleLabel}>Light</span>
      <div
        className={`${styles.toggleSwitch} ${theme === 'dark' ? styles.active : ''}`}
        onClick={toggleTheme}
      />
      <span className={styles.toggleLabel}>Dark</span>
    </div>
  );
};

export default ThemeToggle;
