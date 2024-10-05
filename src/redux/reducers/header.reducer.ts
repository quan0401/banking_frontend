import { createSlice, Slice } from "@reduxjs/toolkit";

const initialValue = false;

const headerReducer: Slice = createSlice({
  name: "header",
  initialState: initialValue,
  reducers: {
    toggleHeader: (_: boolean, action): boolean => {
      return action.payload;
    },
  },
});

export const { toggleHeader } = headerReducer.actions;
export default headerReducer.reducer;
