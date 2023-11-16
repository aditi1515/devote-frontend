import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
 name: "userSlice",
 initialState: { isAuthenticated: false, user: {} },
 reducers: {
  login: (state, action) => {
   state.isAdmin = action.payload?.isOwner;
   state.user = action.payload;
   state.isAuthenticated = true;
  },
  logout: (state, action) => {
   state.user = {};
   state.isAuthenticated = false;
  },
 },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
