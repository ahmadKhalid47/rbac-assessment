import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: null,
    email: null,
    role: null,
  },
  reducers: {
    set_id: (state, action) => {
      state._id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setEmail,setName,setRole,set_id } = userSlice.actions;
export default userSlice.reducer;
