import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const updated = action.payload;
      return state.map((a) => (a.id !== updated.id ? a : updated));
    },
    del(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id != id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    commentBlog(state, action) {
      const updated = action.payload;
      return state.map((blog) => (blog.id === updated.id ? updated : blog));
    },
  },
});

export const { createBlog, vote, setBlogs, del, commentBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const voteBlog = (id, content) => {
  return async (dispatch) => {
    console.log(id, content);
    const votedBlog = await blogService.update(id, content);
    dispatch(vote(votedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(del(id));
  };
};

export const commentBlogAsync = (id, comment) => {
  return async (dispatch) => {
    const updated = await blogService.addComment(id, comment);
    dispatch(commentBlog(updated));
  };
};

export default blogSlice.reducer;
