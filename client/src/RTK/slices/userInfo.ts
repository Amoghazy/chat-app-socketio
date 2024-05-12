// userInfoSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Iuser from "../../types/Iuser";

export interface UserInfoState {
  userInfo: Iuser;
  token: string;
  isAuthenticated: boolean;
  onlineUsers: string[];
}

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    isAuthenticated: false,
    userInfo: {} as Iuser,
    token: "",
    onlineUsers: [],
  } as UserInfoState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Iuser>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    logout_user: (state) => {
      state.userInfo = {} as Iuser;
      state.token = "";
      state.onlineUsers = [];
      state.isAuthenticated = false;
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setUserInfo, setToken, logout_user, setOnlineUsers } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
