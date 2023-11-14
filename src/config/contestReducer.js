import { createSlice } from "@reduxjs/toolkit";

export const contestSlice = createSlice({
  name: "contestSlice",
  initialState: { contestList: [] },
  reducers: {
    contestsAdded: (state, action) => {
      state.contestList = action.payload;
    },
  },
});

export const {contestsAdded} =contestSlice.actions;
export default contestSlice.reducer;
