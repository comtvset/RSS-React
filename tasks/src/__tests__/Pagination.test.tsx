import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/Pagination/Pagination';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context/ThemeContext';

describe('Pagination', () => {
  const mockProps = {
    activePage: '1',
    setActivePage: vi.fn(),
    initialData: {
      count: 100,
      next: 'https://swapi.dev/api/people/?page=2',
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
          starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
    },
    results: [],
    setResults: vi.fn(),
  };

  it('renders pagination correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Pagination {...mockProps} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('calls setActivePage and router.push on page click', () => {
    vi.mock('next/router', () => ({
      useRouter: () => ({
        query: { search: 'test' },
        push: vi.fn(),
      }),
    }));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Pagination {...mockProps} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const page2 = screen.getByText('2');
    fireEvent.click(page2);

    expect(mockProps.setActivePage).toHaveBeenCalledWith('2');
  });
});
