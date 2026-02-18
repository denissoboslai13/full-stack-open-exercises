import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return "";
    },
  },
});

export const { login, logout } = loggedUserSlice.actions;

export const getLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const getLogin = (user) => {
  return (dispatch) => {
    dispatch(login(user));
  };
};

export default loggedUserSlice.reducer;
