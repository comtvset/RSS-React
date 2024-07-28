import { getPages } from '../serveces/tools/getPages';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('getPages function', () => {
  it('calculates total pages correctly', () => {
    expect(getPages(30)).toEqual(['1', '2', '3']);
    expect(getPages(25)).toEqual(['1', '2', '3']);
    expect(getPages(5)).toEqual(['1']);
    expect(getPages(0)).toEqual([]);
  });

  it('returns an empty array for negative counts', () => {
    expect(getPages(-10)).toEqual([]);
  });
});
