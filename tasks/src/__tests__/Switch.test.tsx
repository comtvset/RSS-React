import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Switch } from '@/components/Switch/Switch';
import { ThemeContext, ThemeContextType } from '@/context/ThemeContext';

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock('src/context/ThemeContext', () => {
  const mockToggleTheme = vi.fn();

  const mockThemeContextValue: ThemeContextType = {
    theme: 'dark',
    themeStyles: {},
    toggleTheme: mockToggleTheme,
  };

  return {
    ThemeContext: React.createContext<ThemeContextType>(mockThemeContextValue),
  };
});

describe('Switch component', () => {
  it('should render the switch correctly', async () => {
    render(
      <ThemeContext.Provider
        value={{
          theme: 'dark',
          themeStyles: {},
          toggleTheme: vi.fn(),
        }}
      >
        <Switch />
      </ThemeContext.Provider>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should toggle theme when checkbox is clicked', async () => {
    const mockToggleTheme = vi.fn();

    render(
      <ThemeContext.Provider
        value={{
          theme: 'dark',
          themeStyles: {},
          toggleTheme: mockToggleTheme,
        }}
      >
        <Switch />
      </ThemeContext.Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('should apply the correct class based on theme', () => {
    render(
      <ThemeContext.Provider
        value={{
          theme: 'light',
          themeStyles: {},
          toggleTheme: vi.fn(),
        }}
      >
        <Switch />
      </ThemeContext.Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
