import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouteError } from 'react-router-dom';
import ErrorPage from 'src/pages/ErrorPage/ErrorPage';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', () => ({
  useRouteError: vi.fn(),
}));

describe('ErrorPage component', () => {
  it('should display default error message when no error is provided', () => {
    (useRouteError as Mock).mockReturnValue(null);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });

  it('should display statusText if provided', () => {
    const error = { statusText: 'Not Found' };
    (useRouteError as Mock).mockReturnValue(error);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('should display error message if provided', () => {
    const error = { message: 'Something went wrong' };
    (useRouteError as Mock).mockReturnValue(error);

    render(<ErrorPage />);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('Sorry, an unexpected error has occurred.')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
