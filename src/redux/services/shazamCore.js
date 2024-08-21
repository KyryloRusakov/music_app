import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spotify23.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '97331e9ee3msh010b30b74183ac0p1c8b91jsna68d41696fec');

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => ({
      url: '/recommendations',
      params: {
        limit: '20',
        seed_tracks: '0c6xIDDpzE81m2q797ordA',
        seed_artists: '4NHQUGzhtTLFvgF5SZesLK',
      },
    }),
    }),
    getArtists: builder.query({ query: () => ({
      url: '/artists',
      params: {
        ids: '1Xyo4u8uXC1ZmMpatF05PJ,3YQKmKGau1PzlVlkL1iodx,6M2wZ9GZgrQXHCFfjv46we,04gDigrS5kc9YWfZHwBETP,0hCNtLu0JehylgoiP8L4Gh,5YGY8feqx7naU7z4HrwZM6,66CXWjxzNUsdJxJ2JdwvnR',
      },
    }),
    }),
    getSongDetails: builder.query({ query: ({ songid }) => ({
      url: '/track_lyrics',
      params: {
        id: `${songid}`,
      },
    }),
    }),
    getArtistOverview: builder.query({ query: ({ id }) => ({
      url: '/artist_overview',
      params: {
        id: `${id}`,
      },
    }),
    }),
    getSongsRelated: builder.query({ query: ({ id }) => ({
      url: '/artist_singles',
      params: {
        id: `${id}`,
      },
    }),
    }),
  }),
});

export const { useGetTopChartsQuery, useGetArtistsQuery, useGetSongDetailsQuery, useGetArtistOverviewQuery, useGetSongsRelatedQuery } = shazamCoreApi;
