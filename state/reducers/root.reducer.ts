import { combineReducers } from "redux"
import { AppState } from "types/states";
import home from "./home.reducer"
import user from "./user.reducer";

export const rootReducer = combineReducers<AppState>({
  home,
  user
});
