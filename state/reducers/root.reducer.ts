import { combineReducers } from "redux"
import homeReducer from "./home.reducer"
import userReducer from "./user.reducer";

export const rootReducer = combineReducers({
  homeReducer,
  userReducer
});