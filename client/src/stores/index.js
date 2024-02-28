import { configureStore } from "@reduxjs/toolkit";

import PostReducer from "../stores/postSlice";

const Rootreducer = {
  post: PostReducer,
};

const store = configureStore({
  reducer: Rootreducer,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
