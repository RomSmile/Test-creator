import { combineReducers } from "redux";
import testsReducer from "./testsReducer/testsReducer";

export const allReducers = combineReducers({
  testsReducer,
});
