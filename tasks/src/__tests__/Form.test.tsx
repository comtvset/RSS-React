import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Form } from 'src/components/form/Form';

describe('Form', () => {
  it('should save an empty query to localStorage on search button click', () => {
    render(
      <Form
        query={''}
        setQuery={function (): void {}}
        results={[]}
        setResults={function (): void {}}
        isLoading={false}
        setIsLoading={function (): void {}}
        setCountPage={function (): void {}}
        setActivePage={function (): void {}}
      />,
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(localStorage.getItem('queryData')).toBe('{"query":""}');
  });
  it('should call setQuery with the correct value when input changes', () => {
    const setQueryMock = vi.fn();
    render(
      <Form
        query={''}
        setQuery={setQueryMock}
        results={[]}
        setResults={function (): void {}}
        isLoading={false}
        setIsLoading={function (): void {}}
        setCountPage={function (): void {}}
        setActivePage={function (): void {}}
      />,
    );

    const input = screen.getByLabelText('');
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(setQueryMock).toHaveBeenCalledTimes(1);
    expect(setQueryMock).toHaveBeenCalledWith('test input');
  });
});
