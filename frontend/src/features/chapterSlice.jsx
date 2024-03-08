import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../app/api/apiSlice";
// import { api_endpoint } from "../config/url";

const chapterAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = chapterAdapter.getInitialState();

export const chapterApiSlice = apiSlice.injectEndpoints({
  // reducerPath: 'chapterSlice',
  // baseQuery: fetchBaseQuery({ baseUrl: api_endpoint }),
  // tagTypes: ['Chapter'],
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (novelId) => ({
        url: `/chapter/novel/${novelId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedChapters = responseData.map((chapter) => {
          chapter.id = chapter._id;
          return chapter;
        });
        return chapterAdapter.setAll(initialState, loadedChapters);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Chapter", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Chapter", id })),
          ];
        } else return [{ type: "Chapter", id: "LIST" }];
      },
    }),
    getSingleChapter: builder.query({
      query: (id) => ({
        url: `/chapter/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const chap = [responseData];
        const loadedChapters = chap.map((chapter) => {
          chapter.id = chapter._id;
          return chapter;
        });
        return chapterAdapter.setAll(initialState, loadedChapters);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Chapter", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Chapter", id })),
          ];
        } else return [{ type: "Chapter", id: "LIST" }];
      },
    }),
    getUpdates: builder.query({
      query: () => ({
        url: `/updates`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedChapters = responseData.map((chapter) => {
          chapter.id = chapter._id;
          return chapter;
        });
        return chapterAdapter.setAll(initialState, loadedChapters);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Chapter", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Chapter", id })),
          ];
        } else return [{ type: "Chapter", id: "LIST" }];
      },
    }),
    addChapter: builder.mutation({
      query: (chapterData) => ({
        url: "/chapter",
        method: "POST",
        body: {
          ...chapterData,
        },
      }),
      invalidatesTags: [{ type: "Chapter", id: "LIST" }],
    }),
    updateChapter: builder.mutation({
      query: (chapterData) => {
        console.log("this is from chapterslice", chapterData);
        return {
          url: `/chapter/${chapterData.id}`,
          method: "PATCH",
          body: {
            ...chapterData,
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Chapter", id: arg.id },
      ],
    }),
    deleteChapter: builder.mutation({
      query: (id) => ({
        url: `/chapter/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Chapter", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetChaptersQuery,
  useGetSingleChapterQuery,
  useGetUpdatesQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
} = chapterApiSlice;

//returns the query result object

export const selectChapterResult =
  chapterApiSlice.endpoints.getChapters.select();

//creates memoized selector

const selectChapterData = createSelector(
  selectChapterResult,
  (chapterResult) => chapterResult.data //normalized state object with ids and entities
);

//getselectors creates these selectors and we rename them with aliases with destructuring

export const {
  selectAll: selectAllChapter,
  selectById: selectChapterById,
  selectIds: selectChapterIds,
} = chapterAdapter.getSelectors(
  (state) => selectChapterData(state) ?? initialState
);
