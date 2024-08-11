import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectedWindow } from '@/components/SelectedWindow/SelectedWindow';
import { Provider } from 'react-redux';
import { getCheckedCard, store } from '@/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { clearCheckedCard } from '@/store/checkedCardSlice';

vi.mock('@/store/checkedCardSlice', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    clearCheckedCard: vi.fn(() => ({ type: 'checkedCard/clearCheckedCard' })),
  };
});

vi.mock('@/serveces/tools/convertToCSV', () => ({
  convertToCSV: vi.fn(),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    useSelector: vi.fn((selector) => {
      if (selector === getCheckedCard) {
        return [
          { name: 'Luke Skywalker', height: '172', mass: '77' },
          { name: 'Darth Vader', height: '202', mass: '136' },
        ];
      }
      return null;
    }),
  };
});

global.URL.createObjectURL = vi.fn(() => 'mocked-url');
global.URL.revokeObjectURL = vi.fn();

describe('SelectedWindow', () => {
  it('renders correctly with selected items', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SelectedWindow />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Unselect all/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Download/i })).toBeInTheDocument();
  });

  it('calls unselect function when button is clicked', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SelectedWindow />
        </ThemeProvider>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: /Unselect all/i });
    fireEvent.click(button);

    expect(clearCheckedCard).toHaveBeenCalled();
  });

  it('creates a CSV download link when checked items are present', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SelectedWindow />
        </ThemeProvider>
      </Provider>,
    );

    expect(screen.getByRole('link', { name: /Download/i })).toHaveAttribute('href', 'mocked-url');
    expect(screen.getByRole('link', { name: /Download/i })).toHaveAttribute(
      'download',
      '2_items(StarWars).csv',
    );
  });
});
