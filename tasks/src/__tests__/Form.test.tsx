import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '@/components/form/Form';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from '@/context/ThemeContext';

vi.mock('next/router', () => ({
  useRouter: vi.fn().mockReturnValue({
    query: {},
    push: vi.fn(),
  }),
}));

vi.mock('../../hooks/myCustomHook', () => ({
  useCustomHook: vi.fn().mockReturnValue(['', vi.fn()]),
}));

vi.mock('../../context/useTheme', () => ({
  useTheme: vi.fn().mockReturnValue({
    themeStyles: { formInput: 'mocked-form-input', button: 'mocked-button' },
  }),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual: typeof import('react-redux') = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
    Provider: actual.Provider,
  };
});

describe('Form', () => {
  it('should update input value on change', () => {
    const initialData = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Form setActivePage={vi.fn()} initialData={initialData} setResults={vi.fn()} />
        </ThemeProvider>
      </Provider>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
