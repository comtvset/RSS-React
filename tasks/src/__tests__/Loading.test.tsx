import { render, screen } from '@testing-library/react';
import { Loading } from '@/components/Loading/Loading';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('Loading Component', () => {
  it('renders loading text', () => {
    render(<Loading />);

    const loadingText = screen.getByText(/loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
