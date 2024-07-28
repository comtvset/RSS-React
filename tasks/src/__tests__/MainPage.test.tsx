import { describe, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Main } from 'src/pages/mainPage/MainPage';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { ThemeProvider } from 'src/context/ThemeContext';

vi.mock('src/components/form/Form', () => ({
  Form: ({ setActivePage }: { setActivePage: (page: string) => void }) => (
    <div>
      Mocked Form
      <button onClick={() => setActivePage('2')}>Change Page</button>
    </div>
  ),
}));

vi.mock('src/components/Results/Results', () => ({
  Results: ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => (
    <div>
      Mocked Results
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Open</button>
    </div>
  ),
}));

vi.mock('src/components/Pagination/Pagination', () => ({
  Pagination: ({
    setActivePage,
  }: {
    activePage: string;
    setActivePage: (page: string) => void;
  }) => (
    <div>
      Mocked Pagination
      <button onClick={() => setActivePage('2')}>Next Page</button>
    </div>
  ),
}));

vi.mock('src/components/SelectedWindow/SelectedWindow', () => ({
  SelectedWindow: () => <div>Mocked SelectedWindow</div>,
}));

vi.mock('src/hooks/myCustomHook', () => ({
  CustomHook: () => ['mocked value'],
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: typeof import('react-router-dom') = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should navigate on page change', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith('/?search=mocked value&page=1');
  });

  it('should update activePage state when Form button is clicked', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const button = screen.getByText('Change Page');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Mocked Pagination')).toBeInTheDocument();
    });
  });

  it('should toggle isOpen state when Results button is clicked', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const button = screen.getByText('Toggle Open');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Mocked Results')).toBeInTheDocument();
    });
  });
});
