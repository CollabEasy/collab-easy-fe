import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as proposalCommentApi from "../../api/proposal-comment";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/proposalCommentTypes";

export const fetchProposalCommentByProposalIdLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchProposalCommentByProposalId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_PROPOSAL_COMMENT_BY_PROPOSAL_ID],
  async process({ action, api }, dispatch, done) {
    const { proposalId } = action.payload;
    try {
      dispatch(actions.fetchProposalCommentByProposalIdRequest());
      const result = await proposalCommentApi.fetchProposalCommentAPI(proposalId);
      dispatch(actions.fetchProposalCommentByProposalIdSuccess([result]));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const addProposalCommentLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.addProposalComment>,
  any,
  LogicDeps
>({
  type: [actionTypes.ADD_PROPOSAL_COMMENT],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.addProposalCommentRequest());
      const { data } = action.payload;
      const result = await proposalCommentApi.addProposalCommentAPI(data);
      dispatch(actions.addProposalCommentSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});