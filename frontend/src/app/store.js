import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

import authReducer from '../features/auth/authSlice';
import { uploadSlice } from '../features/UploadSlice';
import { getNovelSlice } from '../features/getNovelSlice';
import { chapterApiSlice } from '../features/chapterSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [uploadSlice.reducerPath]: uploadSlice.reducer,
    [getNovelSlice.reducerPath]: getNovelSlice.reducer,
    [chapterApiSlice.reducerPath]: chapterApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiSlice.middleware,
      uploadSlice.middleware,
      getNovelSlice.middleware,
      chapterApiSlice.middleware,
    ]),
  devTools: true,
});
