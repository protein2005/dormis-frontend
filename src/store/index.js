import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import dormitorySlice from "./dormitory/dormitory.slice";

export const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      dormitory: dormitorySlice,
    },
  }
);