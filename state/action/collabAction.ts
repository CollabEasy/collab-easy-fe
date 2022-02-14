import { CollabRequestData, SearchCollab, SendCollabRequest } from "types/model/";
import * as actionTypes from "../actionTypes/collabActionTypes";

export const sendCollabRequestAction = (data: SendCollabRequest) => ({
    type: actionTypes.SEND_COLLAB_REQUEST,
    payload: {
      data,
    },
})

export const acceptCollabRequestAction = (id: number) => ({
  type: actionTypes.ACCEPT_COLLAB_REQUEST,
  payload: {
    id,
  },
});

export const rejectCollabRequestAction = (id: number) => ({
  type: actionTypes.REJECT_COLLAB_REQUEST,
  payload: {
    id,
  },
});


export const getCollabRequestsAction = (data: SearchCollab) => ({
  type: actionTypes.SEARCH_COLLAB_REQUEST,
  payload: {
    data,
  },
});

export const setPendingCollabRequestsAction = (data: CollabRequestData) => ({
  type: actionTypes.SET_PENDING_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
})

export const setActiveCollabRequestsAction = (data: CollabRequestData) => ({
  type: actionTypes.SET_ACTIVE_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
})

export const setRejectedCollabRequestsAction = (data: CollabRequestData) => ({
  type: actionTypes.SET_REJECTED_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
})

export const setCompletedCollabRequestsAction = (data: CollabRequestData) => ({
  type: actionTypes.SET_COMPLETED_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
});