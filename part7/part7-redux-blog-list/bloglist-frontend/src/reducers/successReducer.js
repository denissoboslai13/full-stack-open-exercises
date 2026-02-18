import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const successSlice = createSlice({
  name: "success",
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

export const { createNotification, clearNotification } = successSlice.actions;

export const setSuccess = (message, seconds) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default successSlice.reducer;
