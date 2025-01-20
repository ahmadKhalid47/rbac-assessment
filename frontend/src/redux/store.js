// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// Create the store and add the user slice reducer
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
