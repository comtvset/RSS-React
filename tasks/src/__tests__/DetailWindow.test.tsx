import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DetailWindow } from 'src/components/DetailWindow/DetailWindow';
import { fetchData } from 'src/serveces/API/fetchData.ts';
import '@testing-library/jest-dom';

vi.mock('src/serveces/API/fetchData.ts', () => ({
  fetchData: vi.fn(),
}));

const mockFetchData = vi.mocked(fetchData);

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => ({
      setActiveCard: vi.fn(),
      activeCard: null,
      setIsOpen: vi.fn(),
      activePage: null,
      query: '',
    }),
  };
});

describe('DetailWindow', () => {
  it('Show a loading message while fetching data', async () => {
    mockFetchData.mockResolvedValueOnce({ data: null });

    render(
      <BrowserRouter>
        <DetailWindow />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('Check fetch error msg', async () => {
    mockFetchData.mockRejectedValue(new Error('Failed to fetch'));

    render(
      <BrowserRouter>
        <DetailWindow />
      </BrowserRouter>,
    );

    await waitFor(() => {
      // screen.debug();
    });
  });
});
