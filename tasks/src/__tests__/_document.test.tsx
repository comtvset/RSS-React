import Document from '@/pages/_document';
import { describe, it, expect, vi } from 'vitest';
import { renderToString } from 'react-dom/server';

vi.mock('next/document', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    Html: ({ children }: { children: React.ReactNode }) => <html>{children}</html>,
    Main: () => <div>Main component</div>,
    NextScript: () => <script>Next script</script>,
    Head: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Custom Document', () => {
  it('should render custom document correctly', () => {
    const renderResult = renderToString(<Document />);

    expect(renderResult).toContain('<html');
    expect(renderResult).toContain('<div>');
    expect(renderResult).toContain('<body');
    expect(renderResult).toContain('<link rel="icon" href="/nextjs.ico"');
    expect(renderResult).toContain('Main component');
    expect(renderResult).toContain('Next script');
  });
});
