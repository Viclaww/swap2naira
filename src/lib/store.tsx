import { configureStore } from "@reduxjs/toolkit";
import { generalApi } from "./api/generalApi";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    [generalApi.reducerPath]: generalApi.reducer,
    userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
