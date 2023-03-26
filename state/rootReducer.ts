import { combineReducers } from "redux"
import { AppState } from "types/states";
import home from "./reducers/homeReducer";
import user from "./reducers/userReducer";
import collab from "./reducers/collabReducer";
import sample from "./reducers/sampleReducer";
import category from "./reducers/categoryReducer";
import scratchpad from "./reducers/scratchpadReducer";
import socialProspectus from "./reducers/socialProspectusReducer";
import collabConversation from "./reducers/collabConversationReducer";
import analytics from "./reducers/analyticsReducer";
import toast from "./reducers/toastReducer";
import notification from "./reducers/notificationsReducer";

const appReducer = combineReducers<AppState>({
  home,
  user,
  collab,
  sample,
  category,
  scratchpad,
  socialProspectus,
  collabConversation,
  analytics,
  toast,
  notification,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_USER_LOGGED_IN') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;