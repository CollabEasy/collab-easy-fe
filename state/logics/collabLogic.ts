import { CollabRequestStatus } from "config/constants";
import { createLogic } from "redux-logic";
import { LogicDeps } from "state";
import * as actions from "../action/collabAction";
import * as actionTypes from "../actionTypes/collabActionTypes";
import { AppState } from "types/states";
import { FSACreatorPayload } from "types/states/FSACreator";

export const sendCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.sendCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [actionTypes.SEND_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { data: collabRequest } = action.payload;
    try {
      dispatch(actions.sendCollabRequestRequest());
      const response = await api.collabApi.sendCollabRequest(collabRequest);
      dispatch(actions.setShowCollabModalState(false));
      dispatch(actions.sendCollabRequestSuccess(response['data']));
    } catch (error) {
      dispatch(actions.sendCollabRequestFailure());
    } finally {
      done()
    }
  },
});

export const updatedCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateCollabRequest>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPDATE_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { data: collabRequest } = action.payload;
    try {
      dispatch(actions.updateCollabRequestRequest());
      const request = await api.collabApi.updateCollabRequest(collabRequest);
      dispatch(actions.setShowCollabModalState(false));
      dispatch(actions.updateCollabRequestSuccess(collabRequest));
    } catch (error) {
      dispatch(actions.updateCollabRequestFailure());
    } finally {
      done()
    }
  },
});

export const acceptCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.acceptCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [actionTypes.ACCEPT_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id } = action.payload;
    try {
      dispatch(actions.acceptCollabRequestActionRequest());
      const request = await api.collabApi.acceptCollabRequest(id);
      dispatch(actions.acceptCollabRequestActionSuccess(id))
      dispatch(actions.setShowCollabModalState(false));
    } catch (error) {
      dispatch(actions.acceptCollabRequestActionFailure())
    } finally {
      
      done();
    }
  },
});

export const cancelCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.cancelCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [actionTypes.CANCEL_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id } = action.payload;
    try {
      dispatch(actions.cancelCollabRequestActionRequest());
      const request = await api.collabApi.cancelCollabRequest(id);
      dispatch(actions.cancelCollabRequestActionSuccess(id))
      dispatch(actions.setShowCollabModalState(false));
    } catch (error) {
      dispatch(actions.cancelCollabRequestActionFailure())
    } finally {
      
      done();
    }
  },
});

export const rejectCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.rejectCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [actionTypes.REJECT_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id } = action.payload;
    try {
      dispatch(actions.rejectCollabRequestActionRequest());
      const request = await api.collabApi.rejectCollabRequest(id);
      dispatch(actions.rejectCollabRequestActionSuccess(id))
      dispatch(actions.setShowCollabModalState(false));
    } catch (error) {
      dispatch(actions.rejectCollabRequestActionFailure());
    } finally {
      done();
    }
  },
});

export const getCollabRequestsLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.getCollabRequestsAction>,
  any,
  LogicDeps
>({
  type: [actionTypes.SEARCH_COLLAB_REQUEST],
  async process({ action, api }, dispatch, done) {
    const { data } = action.payload
    try {
      dispatch(actions.getCollabRequestsActionRequest())
      const response = await api.collabApi.getCollabRequest(data);
      if (response['data'] !== undefined) {
        dispatch(actions.getCollabRequestsActionSuccess(response['data']));
      }
    } catch (error) {
      dispatch(actions.getCollabRequestsActionFailure());
    } finally {
      done();
    }
  },
});
