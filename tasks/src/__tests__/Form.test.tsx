import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from 'src/components/form/Form';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/query';

vi.mock('src/store', async (importOriginal) => {
  const actual: typeof import('src/store') = await importOriginal();
  return {
    ...actual,
    useLazyGetQueryQuery: vi
      .fn()
      .mockReturnValue([vi.fn(), {}, { fulfilledTimeStamp: Date.now() }]) as () => [
      QueryDefinition<
        unknown,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
        never,
        unknown,
        'starWarsAPI'
      >,
      Record<string, unknown>,
      { fulfilledTimeStamp: number },
    ],
    setLoadingSlice: vi.fn(),
    setInputSlice: vi.fn(),
    setResultSlice: vi.fn(),
    setCountSlice: vi.fn(),
  };
});

vi.mock('src/context/useTheme', () => ({
  useTheme: () => ({
    themeStyles: { formInput: 'mocked-form-input', button: 'mocked-button' },
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual: typeof import('react-router-dom') = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Form', () => {
  it('should update input value on change', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Form setActivePage={vi.fn()} />
        </Provider>
      </MemoryRouter>,
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
