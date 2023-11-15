import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
 name: "contestSlice",
 initialState: { loaderActive: true },
 reducers: {
  toggleLoader: (state, action) => {
   state.loaderActive = action.payload;
  },
 },
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
