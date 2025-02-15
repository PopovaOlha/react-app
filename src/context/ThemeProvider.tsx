import React, { useState, useEffect } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    document.body.style.backgroundImage =
      theme === 'dark'
        ? "url('/public/images/evvjozguyaa1rqi.avif')"
        : "url('/public/images/enyorw152if51.jpg')";
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
