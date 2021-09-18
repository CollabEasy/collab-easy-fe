import { combineReducers } from "redux"
import { AppState } from "types/states";
import home from "./reducers/homeReducer"
import user from "./reducers/userReducer";
import artist from "./reducers/artistReducer"


const rootReducer = combineReducers<AppState>({
  home,
  user,
  artist
});

export default rootReducer