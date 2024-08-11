import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { getActiveCard, getLoading, getQuery, store } from '@/store';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { DetailWindow } from '@/components/DetailWindow/DetailWindow';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/context/ThemeContext';

const mockContextValue = {
  setIsOpen: vi.fn(),
  activePage: '1',
  inputValue: '',
};

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
    useSelector: vi.fn((selector) => {
      if (selector === getActiveCard) {
        return {
          name: 'Test Name',
          birth_year: '1990',
          eye_color: 'blue',
          height: '180',
          homeworld: 'Earth',
          hair_color: 'brown',
          gender: 'male',
          mass: '80',
          url: 'https://example.com',
        };
      }
      if (selector === getLoading) {
        return false;
      }
      if (selector === getQuery) {
        return 'test query';
      }
      return null;
    }),
  };
});

vi.mock('@/context/useTheme', () => ({
  useTheme: () => ({
    themeStyles: { detailContainer: 'mocked-detail-container', title: 'mocked-title' },
  }),
}));

describe('DetailWindow', () => {
  it('renders active card details correctly', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <DetailWindow
              setIsOpen={mockContextValue.setIsOpen}
              activePage={mockContextValue.activePage}
              inputValue={mockContextValue.inputValue}
            />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText(/Birth year: 1990/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 180/i)).toBeInTheDocument();
    expect(screen.getByText(/Homeworld: Earth/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair color: brown/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 80/i)).toBeInTheDocument();
    expect(screen.getByText(/URL: https:\/\/example.com/i)).toBeInTheDocument();
  });
});
