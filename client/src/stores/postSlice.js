import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostServices } from "../services/postServices";

const PostReducer = createSlice({
  name: "blog",
  initialState: {
    status: "idle",
    data: [],
    page: 1,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchPost.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.status = "success";
      state.data = action.payload;
    });
    builder.addCase(searchPost.rejected, (state) => {
      state.status = "error";
    });
  },
});
const { reducer, actions } = PostReducer;
export default reducer;
export const { setPage } = actions;

export const searchPost = createAsyncThunk("blog/search", async (keyword) => {
  const blogs = await PostServices.search(keyword);
  return blogs.data;
});
