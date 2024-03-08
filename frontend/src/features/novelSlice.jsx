import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from "../app/api/apiSlice";
// import { api_endpoint } from '../config/url';

const novelAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = novelAdapter.getInitialState();

// export const novelApiSlice = createApi({
//   reducerPath: 'getNovelSlice',
//   baseQuery: fetchBaseQuery({ baseUrl: api_endpoint }),
//   tagTypes: ['Novel'],
//   endpoints: (builder) => ({
//     getNovels: builder.query({
//       query: () => ({
//         url: '/novel',
//         validateStatus: (response, result) => {
//           return response.status === 200 && !result.isError;
//         },
//       }),
//       transformResponse: (responseData) => {
//         const loadedNovels = responseData.map((novel) => {
//           novel.id = novel._id;
//           return novel;
//         });
//         return novelAdapter.setAll(initialState, loadedNovels);
//       },
//       providesTags: (result) => {
//         if (result?.ids) {
//           return [
//             { type: 'Novel', id: 'LIST' },
//             ...result.ids.map((id) => ({ type: 'Novel', id })),
//           ];
//         } else return [{ type: 'Novel', id: 'LIST' }];
//       },
//     }),
//     getSingleNovel: builder.query({
//       query: (id) => ({
//         url: `/novel/${id}`,
//         validateStatus: (response, result) => {
//           return response.status === 200 && !result.isError;
//         },
//       }),
//       transformResponse: (responseData) => {
//         const loadedNovels = responseData.map((novel) => {
//           novel.id = novel._id;
//           return novel;
//         });
//         return novelAdapter.setAll(initialState, loadedNovels);
//       },
//       providesTags: (result) => {
//         if (result?.ids) {
//           return [
//             { type: 'Novel', id: 'LIST' },
//             ...result.ids.map((id) => ({ type: 'Novel', id })),
//           ];
//         } else return [{ type: 'Novel', id: 'LIST' }];
//       },
//     }),
//     addNovel: builder.mutation({
//       query: (novelData) => ({
//         url: '/novel',
//         method: 'POST',
//         body: {
//           ...novelData,
//         },
//       }),
//       invalidatesTags: [{ type: 'Novel', id: 'LIST' }],
//     }),
//     updateNovel: builder.mutation({
//       query: (id, novelData) => ({
//         url: `/novel/${id}`,
//         method: 'PATCH',
//         body: {
//           ...novelData,
//         },
//       }),
//       invalidatesTags: (result, error, arg) => [{ type: 'Novel', id: arg.id }],
//     }),
//     deleteNovel: builder.mutation({
//       query: (id) => ({
//         url: `/novel/${id}`,
//         method: 'DELETE',
//         body: { id },
//       }),
//       invalidatesTags: (result, error, arg) => [{ type: 'Novel', id: arg.id }],
//     }),
//   }),
// });

export const novelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNovels: builder.query({
      query: () => ({
        url: "/novel",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedNovels = responseData.map((novel) => {
          novel.id = novel._id;
          return novel;
        });
        return novelAdapter.setAll(initialState, loadedNovels);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Novel", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Novel", id })),
          ];
        } else return [{ type: "Novel", id: "LIST" }];
      },
    }),
    getSingleNovel: builder.query({
      query: (id) => ({
        url: `/novel/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        let loadedNovel = responseData;
        loadedNovel.id = loadedNovel._id;
        return loadedNovel;
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Novel", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Novel", id })),
          ];
        } else return [{ type: "Novel", id: "LIST" }];
      },
    }),
    addNovel: builder.mutation({
      query: (novelData) => ({
        url: "/novel",
        method: "POST",
        body: {
          ...novelData,
        },
      }),
      invalidatesTags: [{ type: "Novel", id: "LIST" }],
    }),
    updateNovel: builder.mutation({
      query: (id, novelData) => ({
        url: `/novel/${id}`,
        method: "PATCH",
        body: {
          ...novelData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Novel", id: arg.id }],
    }),
    deleteNovel: builder.mutation({
      query: (id) => ({
        url: `/novel/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Novel", id: arg.id }],
    }),
  }),
});

export const {
  useGetNovelsQuery,
  useGetSingleNovelQuery,
  useAddNovelMutation,
  useUpdateNovelMutation,
  useDeleteNovelMutation,
} = novelApiSlice;

//returns the query result object

export const selectNovelsResult = novelApiSlice.endpoints.getNovels.select();

//creates memoized selector

const selectNovelData = createSelector(
  selectNovelsResult,
  (novelsResult) => novelsResult.data //normalized state object with ids and entities
);

//getselectors creates these selectors and we rename them with aliases with destructuring

export const {
  selectAll: selectAllNovels,
  selectById: selectNovelById,
  selectIds: selectNovelIds,
} = novelAdapter.getSelectors(
  (state) => selectNovelData(state) ?? initialState
);
