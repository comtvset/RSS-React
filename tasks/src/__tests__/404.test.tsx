import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/404';

describe('NotFound Component', () => {
  it('renders correctly with the correct message', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { name: /Oops!/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist/i),
    ).toBeInTheDocument();
  });
});
