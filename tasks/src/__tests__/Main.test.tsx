import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HomePage from '@/pages';
import { ThemeProvider } from '@/context/ThemeContext';
import Router from 'next/router';

vi.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    push: vi.fn(),
    query: {},
  }),
  default: {
    push: vi.fn(),
  },
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with initial data', () => {
    const initialData = {
      results: [
        {
          id: 1,
          name: 'Test Item',
          birth_year: '2000',
          eye_color: 'blue',
          films: [],
          height: '180',
          hair_color: 'brown',
          homeworld: 'Earth',
          gender: 'male',
          mass: '75',
          url: 'http://example.com',
        },
      ],
      count: 1,
      next: null,
      previous: null,
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomePage initialData={initialData} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('redirects to main page on mount', () => {
    const initialData = {
      results: [],
      count: 0,
      next: null,
      previous: null,
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomePage initialData={initialData} />
        </ThemeProvider>
      </Provider>,
    );

    expect(Router.push).toHaveBeenCalledWith('main/?search=&page=1');
  });

  it('renders no data message when no initial data is provided', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomePage initialData={{ results: [], count: 0, next: null, previous: null }} />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText('Search returned no results. Try again')).toBeInTheDocument();
  });
});
