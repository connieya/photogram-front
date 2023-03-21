import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectId = (state: any) => state.user.id;
export const selectUsername = (state: any) => state.user.username;

export default userSlice;
