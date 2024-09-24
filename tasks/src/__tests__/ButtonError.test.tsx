import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonError } from 'src/components/ButtonError/ButtonError';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'src/context/ThemeContext';
import '@testing-library/jest-dom';

describe('ButtonError component', () => {
  it('should render button with correct text', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <ButtonError customError="My custom Error" />
        </ThemeProvider>
      </BrowserRouter>,
    );

    const button = screen.getByText('Error');
    expect(button).toBeInTheDocument();
  });
});
