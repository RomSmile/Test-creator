import { configureStore } from "@reduxjs/toolkit";
import { allReducers } from "./reducers";

export const store = configureStore({
  reducer: allReducers,
});

export type RootState = ReturnType<typeof allReducers>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
