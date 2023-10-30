import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as proposalInterestApi from "../../api/proposal-interest";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/proposalInterestTypes";
import * as notifActions from "../action/notificationAction";

export const addProposalInterestLogic = createLogic<
    AppState,
    FSACreatorPayload<typeof actions.addProposalInterest>,
    any,
    LogicDeps
>({
    type: [actionTypes.ADD_PROPOSAL_INTEREST],
    async process({ action, api }, dispatch, done) {
        try {
            dispatch(actions.addProposalInterestRequest())
            const {proposalId, data } = action.payload;
            const proposalData = await proposalInterestApi.addProposalInterestApi(proposalId, data);
            dispatch(actions.addProposalInterestSuccess(proposalData));
            dispatch(notifActions.showNotification(true, 'Thanks for showing interest in this proposal 🥳'));
        } catch (error) {
            const error_response = error.response.data;
            dispatch(notifActions.showNotification(false, error_response['err_str']));
        } finally {
            done();
        }
    },
});


export const fetchProposalsInterestsLogic = createLogic<
    AppState,
    FSACreatorPayload<typeof actions.getProposalsInterests>,
    any,
    LogicDeps
>({
    type: [actionTypes.FETCH_ALL_PROPOSAL_INTERESTS],
    async process({ action, api }, dispatch, done) {
        try {
            dispatch(actions.getProposalsInterestsRequest())
            const {proposalId } = action.payload;
            const proposalsData = await proposalInterestApi.getProposalsInterestsApi(proposalId);
            dispatch(actions.getProposalsInterestsSuccess([proposalsData]));
        } catch (error) {
        } finally {
            done();
        }
    },
});

export const acceptProposalInterestLogic = createLogic<
    AppState,
    FSACreatorPayload<typeof actions.acceptProposalInterest>,
    any,
    LogicDeps
>({
    type: [actionTypes.ACCEPT_PROPOSAL_INTEREST],
    async process({ action, api }, dispatch, done) {
        try {
            dispatch(actions.acceptProposalInterestRequest())
            const {proposalId, data } = action.payload;
            const proposalData = await proposalInterestApi.acceptProposalInterestApi(proposalId, data);
            dispatch(actions.acceptProposalInterestSuccess(proposalData));
        } catch (error) {
            const error_response = error.response.data;
            dispatch(notifActions.showNotification(false, error_response['err_str']));
        } finally {
            done();
        }
    },
});
