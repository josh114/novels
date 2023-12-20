import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { upload_url } from "../config/url";

const uploadAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = uploadAdapter.getInitialState();

export const uploadSlice = createApi({
  reducerPath: "uploadSlice",
  baseQuery: fetchBaseQuery({ baseUrl: upload_url }),
  tagTypes: ["Upload"],
  endpoints: (builder) => ({
    getUploads: builder.query({
      query: () => ({
        url: "/upload",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUploads = responseData.map((upload) => {
          upload.id = upload._id;
          return upload;
        });
        return uploadAdapter.setAll(initialState, loadedUploads);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Upload", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Upload", id })),
          ];
        } else return [{ type: "Upload", id: "LIST" }];
      },
    }),
    addUpload: builder.mutation({
      invalidatesTags: [{ type: "Upload", id: "LIST" }],
    }),
    deleteUpload: builder.mutation({
      query: ({ id }) => ({
        url: `/upload/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Upload", id: arg.id }],
    }),
  }),
});

export const {
  useGetUploadsQuery,
  useAddUploadMutation,
  useDeleteUploadMutation,
} = uploadSlice;

export const selectUploadResult = uploadSlice.endpoints.getUploads.select();

// creates memoized selector
const selectUploadsData = createSelector(
  selectUploadResult,
  (uploadResult) => uploadResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
  selectAll: selectAllUploads,
  selectById: selectUploadById,
  selectIds: selectUploadIds,
} = uploadAdapter.getSelectors(
  (state) => selectUploadsData(state) ?? initialState
);
