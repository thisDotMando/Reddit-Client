import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    posts: postsReducer,
  },
});
