import { describe, it, expect, vi } from 'vitest';
import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@/pages';
import { NextApiRequest, NextApiResponse } from 'next';

describe('getServerSideProps', () => {
  it('returns correct data', async () => {
    const mockContext: GetServerSidePropsContext = {
      req: {} as NextApiRequest,
      res: {} as NextApiResponse,
      query: {
        search: 'Luke',
        page: '2',
        cardName: '',
      },
      resolvedUrl: '',
      params: {},
      preview: false,
      previewData: {},
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        results: [
          { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
          { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
        ],
      }),
    });

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        initialData: {
          results: [
            { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
            { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
          ],
        },
        initialActiveCard: null,
      },
    });

    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/?search=Luke&page=2');
  });
});
