import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { api_endpoint } from '../config/url';

const getNovelAdapter = createEntityAdapter({});

const initialState = getNovelAdapter.getInitialState();

export const getNovelSlice = createApi({
  reducerPath: 'getNovelSlice',
  baseQuery: fetchBaseQuery({ baseUrl: api_endpoint }),
  tagTypes: ['Novel'],
  endpoints: (builder) => ({
    getNovels: builder.query({
      query: () => ({
        url: '/novel',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedNovels = responseData.map((novel) => {
          novel.id = novel._id;
          return novel;
        });
        return getNovelAdapter.setAll(initialState, loadedNovels);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: 'Novel', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Novel', id })),
          ];
        } else return [{ type: 'Novel', id: 'LIST' }];
      },
    }),
    getSingleNovel: builder.query({
      query: ({ id }) => ({
        url: `/novel/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedNovel = responseData;
        loadedNovel.id = loadedNovel._id;
        return loadedNovel;
      },
      providesTags: (result) => [{ type: 'Novel', id: result.id }],
    }),
  }),
});

export const { useGetNovelsQuery, useGetSingleNovelQuery } = getNovelSlice;

export const selectNovelResult = getNovelSlice.endpoints.getNovels.select();

//crete memoized selector
const selectNovelsData = createSelector(selectNovelResult, (result) => {
  return result.data;
});

//getSelectors create these selectors and we rename them with aliases using destructuring
export const { selectById: selectNovelById, selectIds: selectNovelIds } =
  getNovelAdapter.getSelectors(
    (state) => selectNovelsData(state) ?? initialState
  );
