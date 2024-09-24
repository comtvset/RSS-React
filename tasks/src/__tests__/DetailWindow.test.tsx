import { describe, it, vi } from 'vitest';
import { render, waitFor, screen } from '@testing-library/react';
import { store, useGetQueryQuery } from 'src/store';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { DetailWindow } from 'src/components/DetailWindow/DetailWindow';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'src/context/ThemeContext';

vi.mock('src/store', async (importOriginal) => {
  const actual: typeof import('src/store') = await importOriginal();
  return {
    ...actual,
    useGetQueryQuery: vi.fn(),
  };
});

const mockUseGetQueryQuery = vi.mocked(useGetQueryQuery);

describe('DetailWindow', () => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual: typeof import('react-router-dom') = await importOriginal();
    return {
      ...actual,
      useOutletContext: () => ({
        setActiveCard: vi.fn(),
        activeCard: null,
        setIsOpen: vi.fn(),
        activePage: null,
        inputValue: '',
      }),
    };
  });

  describe('DetailWindow', () => {
    it('Check fetch error msg', async () => {
      mockUseGetQueryQuery.mockReturnValue({
        data: undefined,
        error: new Error('Failed to fetch'),
        isLoading: false,
        isSuccess: false,
        isError: true,
        refetch: vi.fn(),
      });

      render(
        <MemoryRouter>
          <Provider store={store}>
            <ThemeProvider>
              <DetailWindow />
            </ThemeProvider>
          </Provider>
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          'Failed to fetch data. Please try again later.',
        );
      });
    });
  });
});
