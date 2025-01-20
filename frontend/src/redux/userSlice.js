// src/redux/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
};

// Create a slice for the user
const userSlice = createSlice({
  name: "user",
  initialState, 
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
