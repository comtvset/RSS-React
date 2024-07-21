import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from 'src/myApp';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  it('should render Main component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const searchResultsHeading = screen.getByText(/Search Results:/i);
    expect(searchResultsHeading).toBeInTheDocument();
  });
});
