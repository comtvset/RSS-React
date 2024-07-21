import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonError } from 'src/components/ButtonError/ButtonError';
import { BrowserRouter } from 'react-router-dom';

describe('ButtonError component', () => {
  it('should render button with correct text', () => {
    render(
      <BrowserRouter>
        <ButtonError customError="My custom Error" />
      </BrowserRouter>,
    );

    const button = screen.getByText('Error');
    expect(button).toBeInTheDocument();
  });
});
