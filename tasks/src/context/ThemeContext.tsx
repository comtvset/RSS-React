import React, { createContext, useState, ReactNode, useLayoutEffect, useMemo } from 'react';
import themeStyle from 'src/theme/themeStyle.module.scss';
import defaultStyle from 'src/theme/defaultStyle.module.scss';

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  themeStyles: Record<string, string>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useLayoutEffect(() => {
    const className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [theme]);

  const themeStyles = useMemo(() => {
    return theme === 'light' ? themeStyle : defaultStyle;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
export type { Theme };
