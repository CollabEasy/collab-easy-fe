import { combineReducers } from "redux"
import { AppState } from "types/states";
import home from "./reducers/homeReducer";
import user from "./reducers/userReducer";
import collab from "./reducers/collabReducer";
import sample from "./reducers/sampleReducer";
import category from "./reducers/categoryReducer";
import scratchpad from "./reducers/scratchpadReducer";

const rootReducer = combineReducers<AppState>({
  home,
  user,
  collab,
  sample,
  category,
  scratchpad,
});

export default rootReducer