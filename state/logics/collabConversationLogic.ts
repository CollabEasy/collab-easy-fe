import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as collabConversationApi from "../../api/collab-conversation";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/collabConversationActionTypes";

export const fetchCollabConversationByCollabIdLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchCollabConversationByCollabId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_COLLAB_CONVERSATION_BY_COLLAB_ID],
  async process({ action, api }, dispatch, done) {
    const { collabId } = action.payload;
    try {
      dispatch(actions.fetchCollabConversationByCollabIdRequest());
      const result = await collabConversationApi.fetchCollabConversationAPI(collabId);
      dispatch(actions.fetchCollabConversationByCollabIdSuccess([result]));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const AddCollabConversationCommentLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.addCollabConversationComment>,
  any,
  LogicDeps
>({
  type: [actionTypes.ADD_COLLAB_CONVERSATION_COMMENT],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.addCollabConversationCommentRequest());
      const { data } = action.payload;
      const result = await collabConversationApi.addCollabConversationCommentAPI(data);
      dispatch(actions.addCollabConversationCommentSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});