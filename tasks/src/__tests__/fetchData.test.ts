import { fetchData } from '../serveces/API/fetchData';
import { describe, it, expect } from 'vitest';

describe('fetchData function', () => {
  it('fetches data successfully', async () => {
    const data = await fetchData('luke', '1');
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0].name).toBe('Luke Skywalker');
  });
});
