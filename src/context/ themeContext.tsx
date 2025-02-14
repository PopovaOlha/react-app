import React, { createContext, useState } from 'react';
import {
  Theme,
  ThemeContextType,
  ThemeProviderProps,
} from '../interfaces/interfaces';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
