import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { createNotification, clearNotification } = errorSlice.actions;

export const setError = (message, seconds) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default errorSlice.reducer;
