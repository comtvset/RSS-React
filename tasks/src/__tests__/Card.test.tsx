import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from 'src/components/Card/Card';
import '@testing-library/jest-dom';
import { PersonAllFields } from 'src/components/Pages/mainPage/MainPage';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { ThemeProvider } from 'src/context/ThemeContext';
import { setActiveCard } from 'src/store/activeCardSlice';
import { addCheckedCard, removeCheckedCard } from 'src/store/checkedCardSlice';
import { useDispatch } from 'react-redux';

const samplePerson: PersonAllFields = {
  name: 'persone',
  height: 'tall',
  mass: '100',
  hair_color: 'blue',
  skin_color: 'blue',
  eye_color: 'blue',
  birth_year: '0',
  gender: 'enby',
  homeworld: 'https://test',
  films: ['film_1', 'film_2'],
  species: ['film_1', 'film_2'],
  vehicles: ['the_best'],
  starships: ['the_best'],
  created: 'tomorrow',
  edited: 'yesterday',
  url: 'https://test',
};

describe('Card', () => {
  it('should render card with correct data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Card result={samplePerson} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('persone')).toBeInTheDocument();
    expect(screen.getByText(/Birth year: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: tall/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: enby/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 100/i)).toBeInTheDocument();
  });

  it('should apply theme styles', () => {
    vi.mock('src/context/useTheme', () => ({
      useTheme: () => ({ themeStyles: { card: 'mocked-theme-card' } }),
    }));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Card result={samplePerson} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const cardElement = screen.getByText('persone').closest('div');
    expect(cardElement).toHaveClass('mocked-theme-card');
  });

  it('should call setActiveCard and navigate on card click', async () => {
    vi.mock('react-redux', async (importOriginal) => {
      const actual: typeof import('react-redux') = await importOriginal();
      return {
        ...actual,
        useDispatch: vi.fn(),
      };
    });

    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Card result={samplePerson} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const cardElement = screen.getByText('persone');
    fireEvent.click(cardElement);

    expect(mockDispatch).toHaveBeenCalledWith(setActiveCard(samplePerson));
  });

  it('should update checkbox state and dispatch actions', async () => {
    vi.mock('react-redux', async (importOriginal) => {
      const actual: typeof import('react-redux') = await importOriginal();
      return {
        ...actual,
        useDispatch: vi.fn(),
      };
    });

    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider>
            <Card result={samplePerson} />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>,
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(mockDispatch).toHaveBeenCalledWith(addCheckedCard(samplePerson));

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(mockDispatch).toHaveBeenCalledWith(removeCheckedCard(samplePerson));
  });
});
