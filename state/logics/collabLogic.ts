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
      const request = await api.collabApi.sendCollabRequest(collabRequest);
      dispatch(actions.getCollabRequestsAction({status: CollabRequestStatus.ACTIVE}))
      dispatch(actions.getCollabRequestsAction({status: CollabRequestStatus.PENDING}))
      dispatch(actions.getCollabRequestsAction({status: CollabRequestStatus.SCHEDULED}))
      dispatch(actions.getCollabRequestsAction({status: CollabRequestStatus.REJECTED}))
    } catch (error) {
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
    const { id: requestId } = action.payload;
    try {
      const request = await api.collabApi.acceptCollabRequest(
        String(requestId)
      );
    } catch (error) {
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
    const { id: requestId } = action.payload;
    try {
      const request = await api.collabApi.rejectCollabRequest(
        String(requestId)
      );
    } catch (error) {
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
    const {
      data: { status },
    } = action.payload
    try {
      const request = await api.collabApi.getCollabRequest({ status: status });
      switch (status) {
        case "Pending":
          dispatch(actions.setPendingCollabRequestsAction(request.data))
          break
        case "Active":
          dispatch(actions.setActiveCollabRequestsAction(request.data))
          break
        case "Completed":
          dispatch(actions.setCompletedCollabRequestsAction(request.data))
          break
        case "Rejected":
          dispatch(actions.setCompletedCollabRequestsAction(request.data))
          break
        default:
          break
      }
    } catch (error) {
    } finally {
      done();
    }
  },
});
