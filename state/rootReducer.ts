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
import notification from "./reducers/notificationReducer";
import contest from "./reducers/contestReducer";
import contestSubmission from "./reducers/contestSubmissionReducer";
import contestSubmissionVote from "./reducers/contestSubmissionVoteReducer";
import rewardsActivity from "./reducers/rewardsReducer";

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
  notification,
  contest,
  contestSubmission,
  contestSubmissionVote,
  rewardsActivity,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_USER_LOGGED_IN') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;