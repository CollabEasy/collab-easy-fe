import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as proposalApi from "../../api/proposal";
import * as actions from "../action";
import * as actionTypes from "../actionTypes/proposalQuestionAnswerTypes";

export const fetchProposalConversationByProposalIdLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchProposalQuestionsByProposalId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_PROPOSAL_ALL_QUESTIONS_BY_PROPOSAL_ID],
  async process({ action, api }, dispatch, done) {
    const { collabId } = action.payload;
    try {
      dispatch(actions.fetchProposalQuestionsByProposalIdRequest());
      const result = await proposalApi.fetchProposalQuestionsAndAnswersAPI(collabId);
      dispatch(actions.fetchProposalQuestionsByProposalIdSuccess([result]));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const AddProposalCommentLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.addProposalQuestion>,
  any,
  LogicDeps
>({
  type: [actionTypes.ADD_PROPOSAL_QUESTION],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.addProposalQuestionRequest());
      const { proposalId, data } = action.payload;
      const result = await proposalApi.addProposalQuestionApi(proposalId, data);
      dispatch(actions.addProposalQuestionSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});