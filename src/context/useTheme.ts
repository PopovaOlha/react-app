import { useContext } from 'react';
import { ThemeContext } from '../context/ themeContext';
import { ThemeContextType } from '../interfaces/interfaces';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
