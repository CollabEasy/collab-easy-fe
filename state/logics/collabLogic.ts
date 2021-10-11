import { CollabRequestStatus } from "config/constants";
import { createLogic } from "redux-logic";
import { LogicDeps } from "state";
import {
  acceptCollabRequestAction,
  ACCEPT_COLLAB_REQUEST,
  getCollabRequestsAction,
  rejectCollabRequestAction,
  REJECT_COLLAB_REQUEST,
  SEARCH_COLLAB_REQUEST,
  sendCollabRequestAction,
  SEND_COLLAB_REQUEST,
  setActiveCollabRequestsAction,
  setCompletedCollabRequestsAction,
  setPendingCollabRequestsAction,
} from "state/action";
import { AppState } from "types/states";
import { FSACreatorPayload } from "types/states/FSACreator";

export const sendCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof sendCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [SEND_COLLAB_REQUEST],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { data: collabRequest } = action.payload;
    try {
      const request = await api.collabApi.sendCollabRequest(collabRequest);
      dispatch(getCollabRequestsAction({status: CollabRequestStatus.ACTIVE}))
      dispatch(getCollabRequestsAction({status: CollabRequestStatus.PENDING}))
      dispatch(getCollabRequestsAction({status: CollabRequestStatus.SCHEDULED}))
      dispatch(getCollabRequestsAction({status: CollabRequestStatus.REJECTED}))
    } catch (error) {
    } finally {
      done()
    }
  },
});

export const acceptCollabRequestLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof acceptCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [ACCEPT_COLLAB_REQUEST],
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
  FSACreatorPayload<typeof rejectCollabRequestAction>,
  any,
  LogicDeps
>({
  type: [REJECT_COLLAB_REQUEST],
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
  FSACreatorPayload<typeof getCollabRequestsAction>,
  any,
  LogicDeps
>({
  type: [SEARCH_COLLAB_REQUEST],
  async process({ action, api }, dispatch, done) {
    const {
      data: { status },
    } = action.payload
    try {
      const request = await api.collabApi.getCollabRequest({ status: status });
      switch (status) {
        case "Pending":
          dispatch(setPendingCollabRequestsAction(request.data))
          break
        case "Active":
          dispatch(setActiveCollabRequestsAction(request.data))
          break
        case "Completed":
          dispatch(setCompletedCollabRequestsAction(request.data))
          break
        case "Rejected":
          dispatch(setCompletedCollabRequestsAction(request.data))
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
