import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { AppProps } from 'next/app';
import AppWrapper from '@/pages/_app';

vi.mock('../components/Switch/Switch', () => ({
  Switch: () => <div>Switch Component</div>,
}));

vi.mock('next/router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    useRouter: () => ({
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
    }),
  };
});

describe('AppWrapper Component', () => {
  it('should render AppWrapper correctly', () => {
    const Component = () => <div>Component Content</div>;
    const pageProps = {};

    const props: AppProps = {
      Component,
      pageProps,
      router: {} as never,
    };

    render(<AppWrapper {...props} />);

    expect(screen.getByText('Switch Component')).toBeInTheDocument();
    expect(screen.getByText('Component Content')).toBeInTheDocument();
  });
});
