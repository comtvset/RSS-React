import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from 'src/components/Pagination/Pagination';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store, useGetQueryQuery } from 'src/store';

interface UseGetQueryResult {
  data: {
    count: number;
    results: string[];
  };
  isFetching: boolean;
  refetch: () => void;
}

vi.mock('src/store', async (importOriginal) => {
  const actual: typeof import('src/store') = await importOriginal();
  return {
    ...actual,
    useGetQueryQuery: vi.fn() as unknown as () => UseGetQueryResult,
  };
});

vi.mock('src/context/useTheme', () => ({
  useTheme: () => ({
    themeStyles: { page: 'mocked-page' },
  }),
}));

describe('Pagination', () => {
  const mockSetActivePage = vi.fn();

  beforeEach(() => {
    const mockedUseGetQueryQuery = useGetQueryQuery as unknown as {
      mockReturnValue: (value: UseGetQueryResult) => void;
    };
    mockedUseGetQueryQuery.mockReturnValue({
      data: { count: 30, results: [] },
      isFetching: false,
      refetch: vi.fn(),
    });
  });

  it('should render pagination correctly', () => {
    render(
      <Provider store={store}>
        <Pagination activePage="1" setActivePage={mockSetActivePage} />
      </Provider>,
    );

    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('should call setActivePage when page number is clicked', () => {
    render(
      <Provider store={store}>
        <Pagination activePage="1" setActivePage={mockSetActivePage} />
      </Provider>,
    );

    const pageButton = screen.getByText('1');
    fireEvent.click(pageButton);

    expect(mockSetActivePage).toHaveBeenCalledWith('1');
  });

  it('should call setActivePage when next button is clicked', () => {
    render(
      <Provider store={store}>
        <Pagination activePage="1" setActivePage={mockSetActivePage} />
      </Provider>,
    );

    const nextButton = screen.getByText('>');
    fireEvent.click(nextButton);

    expect(mockSetActivePage).toHaveBeenCalledWith('2');
  });

  it('should call setActivePage when previous button is clicked if not on first page', () => {
    render(
      <Provider store={store}>
        <Pagination activePage="2" setActivePage={mockSetActivePage} />
      </Provider>,
    );

    const prevButton = screen.getByText('<');
    fireEvent.click(prevButton);

    expect(mockSetActivePage).toHaveBeenCalledWith('1');
  });
});
