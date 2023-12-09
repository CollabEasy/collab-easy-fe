import { CollabRequestData, SearchCollab, SendCollabRequest } from "types/model/";
import * as actionTypes from "../actionTypes/collabActionTypes";

export const sendCollabRequestAction = (data: SendCollabRequest) => ({
    type: actionTypes.SEND_COLLAB_REQUEST,
    payload: {
      data,
    },
})

export const sendCollabRequestSuccess = (data: CollabRequestData) => ({
  type: actionTypes.SEND_COLLAB_REQUEST_SUCCESS,
  payload: {
    data
  },
})

export const sendCollabRequestFailure = () => ({
  type: actionTypes.SEND_COLLAB_REQUEST_FAILURE,
  payload: {},
})

export const sendCollabRequestRequest = () => ({
  type: actionTypes.SEND_COLLAB_REQUEST_REQUEST,
  payload: {}
})


export const updateCollabRequest = (data: CollabRequestData) => ({
  type: actionTypes.UPDATE_COLLAB_REQUEST,
  payload: {
    data
  }
})

export const updateCollabRequestRequest = () => ({
  type: actionTypes.UPDATE_COLLAB_REQUEST_REQUEST,
  payload: {
    
  }
})

export const updateCollabRequestSuccess = (data: CollabRequestData) => ({
  type: actionTypes.UPDATE_COLLAB_REQUEST_SUCCESS,
  payload: {
    data
  }
})

export const updateCollabRequestFailure = () => ({
  type: actionTypes.UPDATE_COLLAB_REQUEST_FAILURE,
  payload: {
    
  }
})

export const acceptCollabRequestAction = (id: string) => ({
  type: actionTypes.ACCEPT_COLLAB_REQUEST,
  payload: {
    id,
  },
});

export const acceptCollabRequestActionRequest = () => ({
  type: actionTypes.ACCEPT_COLLAB_REQUEST_REQUEST,
  payload: {
  },
});

export const acceptCollabRequestActionSuccess = (id: string) => ({
  type: actionTypes.ACCEPT_COLLAB_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const acceptCollabRequestActionFailure = () => ({
  type: actionTypes.ACCEPT_COLLAB_REQUEST_FAILURE,
  payload: {
  },
});

export const rejectCollabRequestAction = (id: string) => ({
  type: actionTypes.REJECT_COLLAB_REQUEST,
  payload: {
    id,
  },
});

export const rejectCollabRequestActionRequest = () => ({
  type: actionTypes.REJECT_COLLAB_REQUEST_REQUEST,
  payload: {
    
  },
});

export const rejectCollabRequestActionSuccess = (id: string) => ({
  type: actionTypes.REJECT_COLLAB_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const rejectCollabRequestActionFailure = () => ({
  type: actionTypes.REJECT_COLLAB_REQUEST_FAILURE,
  payload: {
    
  },
});

export const cancelCollabRequestAction = (id: string) => ({
  type: actionTypes.CANCEL_COLLAB_REQUEST,
  payload: {
    id,
  },
});

export const cancelCollabRequestActionRequest = () => ({
  type: actionTypes.CANCEL_COLLAB_REQUEST_REQUEST,
  payload: {
    
  },
});

export const cancelCollabRequestActionSuccess = (id: string) => ({
  type: actionTypes.CANCEL_COLLAB_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const cancelCollabRequestActionFailure = () => ({
  type: actionTypes.CANCEL_COLLAB_REQUEST_FAILURE,
  payload: {
    
  },
});

export const completeCollabRequestAction = (id: string) => ({
  type: actionTypes.COMPLETE_COLLAB_REQUEST,
  payload: {
    id,
  },
});

export const completeCollabRequestActionRequest = () => ({
  type: actionTypes.COMPLETE_COLLAB_REQUEST_REQUEST,
  payload: {
    
  },
});

export const completeCollabRequestActionSuccess = (id: string) => ({
  type: actionTypes.COMPLETE_COLLAB_REQUEST_SUCCESS,
  payload: {
    id
  },
});

export const completeCollabRequestActionFailure = () => ({
  type: actionTypes.COMPLETE_COLLAB_REQUEST_FAILURE,
  payload: {
    
  },
});


export const getCollabRequestsAction = (data: SearchCollab) => ({
  type: actionTypes.SEARCH_COLLAB_REQUEST,
  payload: {
    data,
  },
});

export const getCollabRequestsActionRequest = () => ({
  type: actionTypes.SEARCH_COLLAB_REQUEST_REQUEST,
  payload: {
    
  },
});

export const getCollabRequestsActionSuccess = (data: CollabRequestData) => ({
  type: actionTypes.SEARCH_COLLAB_REQUEST_SUCCESS,
  payload: {
    data
  },
});

export const getCollabRequestsActionFailure = () => ({
  type: actionTypes.SEARCH_COLLAB_REQUEST_FAILURE,
  payload: {
    
  },
});

export const setShowCollabModalState = (show: boolean, collab_id: string) => ({
  type: actionTypes.SET_SHOW_COLLAB_MODAL_STATUS,
  payload: {
    show,
    collab_id: collab_id,
  }
})

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

export const fetchCollabsWithUser = (slug: string) => ({
  type: actionTypes.FETCH_COLLAB_WITH_USER,
  payload: {
    slug,
  },
});

export const fetchCollabsWithUserRequest = () => ({
  type: actionTypes.FETCH_COLLAB_WITH_USER_REQUEST,
});

export const fetchCollabsWithUserSuccess = (data: any) => ({
  type: actionTypes.FETCH_COLLAB_WITH_USER_SUCCESS,
  payload: {
    data,
  },
});

export const fetchCollabsWithUserFailure = () => ({
  type: actionTypes.FETCH_COLLAB_WITH_USER_FAILURE,
});

export const fetchCollabsDateWise = (fetchAll: boolean) => ({
  type: actionTypes.FETCH_COLLABS_DATE_WISE,
  payload : {
    fetchAll
  }
})

export const fetchCollabsDateWiseSuccess = (data: any) => ({
  type: actionTypes.FETCH_COLLABS_DATE_WISE_SUCCESS,
  payload : {
    data
  }
})


export const fetchCollabsDateWiseFailure = () => ({
  type: actionTypes.FETCH_COLLABS_DATE_WISE_FAILURE,
})