import { combineReducers } from "redux"
import { AppState } from "types/states";
import home from "./reducers/homeReducer"
import user from "./reducers/userReducer";

const rootReducer = combineReducers<AppState>({
  home,
  user
});

export default rootReducer