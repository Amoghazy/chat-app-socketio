import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo";
import socket from "./slices/socket";

const store = configureStore({
  reducer: {
    userInfo,
    socket,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {

        ignoredActions: ["soketSlice/setSocketConnection"],
   
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
       
        ignoredPaths: ["items.dates"],
      },
    }),
});
export default store;
