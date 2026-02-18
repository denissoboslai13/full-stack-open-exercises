import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blogReducer";
// import filterReducer from './reducers/filterReducer'
import successReducer from "./reducers/successReducer";
import errorReducer from "./reducers/errorReducer";
import userReducer from "./reducers/userReducer";
import loggedUserReducer from "./reducers/loggedUserReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    error: errorReducer,
    success: successReducer,
    users: userReducer,
    loggedUser: loggedUserReducer,
  },
});

export default store;
