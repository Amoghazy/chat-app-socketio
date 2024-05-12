import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const soketSlice = createSlice({
  name: "soketSlice",
  initialState: {},
  reducers: {
    setSocketConnection: (state, action: PayloadAction<any>) => {
      state = action.payload;
    return state
    },
  },
});

export const { setSocketConnection } = soketSlice.actions;

export default soketSlice.reducer;
