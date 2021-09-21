import { CollabRequestData, SearchCollab, SendCollabRequest } from "types/model/"

export const SEND_COLLAB_REQUEST = "COLLAB/SEND_COLLAB_REQUEST"
export const REJECT_COLLAB_REQUEST = "COLLAB/REJECT_REQUEST"
export const ACCEPT_COLLAB_REQUEST = "COLLAB/ACCEPT_REQUEST"
export const SEARCH_COLLAB_REQUEST = "COLLAB/SEARCH_COLLAB_REQUEST"
export const SET_PENDING_COLLAB_REQUEST_DATA = "COLLAB/SET_PENDING_COLLAB_REQUEST_DATA"
export const SET_ACTIVE_COLLAB_REQUEST_DATA = "COLLAB/SET_ACTIVE_COLLAB_REQUEST_DATA"
export const SET_COMPLETED_COLLAB_REQUEST_DATA = "COLLAB/SET_COMPLETED_COLLAB_REQUEST_DATA"
export const SET_REJECTED_COLLAB_REQUEST_DATA = "COLLAB/SET_REJECTED_COLLAB_REQUEST_DATA"

export const sendCollabRequestAction = (data: SendCollabRequest) => ({
    type: SEND_COLLAB_REQUEST,
    payload: {
      data,
    },
})

export const acceptCollabRequestAction = (id: number) => ({
  type: ACCEPT_COLLAB_REQUEST,
  payload: {
    id,
  },
});

export const rejectCollabRequestAction = (id: number) => ({
  type: REJECT_COLLAB_REQUEST,
  payload: {
    id,
  },
});


export const getCollabRequestsAction = (data: SearchCollab) => ({
  type: SEARCH_COLLAB_REQUEST,
  payload: {
    data,
  },
});

export const setPendingCollabRequestsAction = (data: CollabRequestData) => ({
  type: SET_PENDING_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
})

export const setActiveCollabRequestsAction = (data: CollabRequestData) => ({
  type: SET_ACTIVE_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
})

export const setRejectedCollabRequestsAction = (data: CollabRequestData) => ({
  type: SET_REJECTED_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
})

export const setCompletedCollabRequestsAction = (data: CollabRequestData) => ({
  type: SET_COMPLETED_COLLAB_REQUEST_DATA,
  payload: {
    data,
  },
});