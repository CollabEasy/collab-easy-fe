import * as actionTypes from "../actionTypes/collabActionTypes";
import { CollabRequestState } from "types/states/collab";
import { CollabRequestData } from "types/model";

const initialState: CollabRequestState = {
  collabDetails: {
    sent: {
      all: [],
      active: [],
      pending: [],
      rejected: [],
      completed: [],
    },
    received: {
      all: [],
      active: [],
      pending: [],
      rejected: [],
      completed: [],
    },
  },
  isFetchingCollabDetails: true,
  showCollabModal: false,
  isSendingRequest: false,
  isAcceptingRequest: false,
  isRejectingRequest: false,
  isCancellingRequest: false,
  isCompletingRequest: false,
};

const getUpdatedList = (
  requests: CollabRequestData[],
  updatedRequest: CollabRequestData
) => {
  const newRequestList = [];
  requests.forEach((request, index) => {
    if (request.id === updatedRequest.id) {
      newRequestList.push(updatedRequest);
    } else {
      newRequestList.push(request);
    }
  });
  return newRequestList;
};

let id = "";
let newPending = [];
let newActive = [];
let newRejected = [];
let newCompleted = [];
let newAll = [];


const collabReducer = (state = initialState, action): CollabRequestState => {
  switch (action.type) {
    case actionTypes.SEND_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isSendingRequest: true,
      };
    case actionTypes.SEND_COLLAB_REQUEST_SUCCESS:
      const collabRequestData = action.payload.data;
      const newPendingSent = [collabRequestData];
      const newAllSent = [collabRequestData];
      return {
        ...state,
        isSendingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          sent: {
            ...state.collabDetails.sent,
            pending: newPendingSent.concat(state.collabDetails.sent.pending),
            all: newAllSent.concat(state.collabDetails.sent.all),
          },
        },
      };
    case actionTypes.SEND_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isSendingRequest: false,
      };
    case actionTypes.SET_SHOW_COLLAB_MODAL_STATUS:
      return {
        ...state,
        showCollabModal: action.payload.show,
      };
    case actionTypes.SEARCH_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isFetchingCollabDetails: true,
      };
    case actionTypes.SEARCH_COLLAB_REQUEST_SUCCESS:
      return {
        ...state,
        isFetchingCollabDetails: false,
        collabDetails: action.payload.data,
      };
    case actionTypes.SEARCH_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isFetchingCollabDetails: false,
      };
    case actionTypes.UPDATE_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isSendingRequest: true,
      };
    case actionTypes.UPDATE_COLLAB_REQUEST_SUCCESS:
      const updatedRequest = action.payload.data;
      // console.log(updatedRequest);
      return {
        ...state,
        isSendingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          sent: {
            ...state.collabDetails.sent,
            all: getUpdatedList(
              state.collabDetails.sent.all,
              updatedRequest
            ),
            active: getUpdatedList(
              state.collabDetails.sent.active,
              updatedRequest
            ),
            pending: getUpdatedList(
              state.collabDetails.sent.pending,
              updatedRequest
            ),
            rejected: getUpdatedList(
              state.collabDetails.sent.rejected,
              updatedRequest
            ),
            completed: getUpdatedList(
              state.collabDetails.sent.completed,
              updatedRequest
            ),
          },
        },
      };
    case actionTypes.UPDATE_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isSendingRequest: false,
      };
    case actionTypes.ACCEPT_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isAcceptingRequest: true,
      }
    case actionTypes.REJECT_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isRejectingRequest: true,
      }
    case actionTypes.CANCEL_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isCancellingRequest: true,
      };
    case actionTypes.COMPLETE_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isCompletingRequest: true,
      };
    case actionTypes.ACCEPT_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isAcceptingRequest: false,
      }
    case actionTypes.REJECT_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isRejectingRequest: false,
      }
    case actionTypes.CANCEL_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isCancellingRequest: false,
      };
    case actionTypes.COMPLETE_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isCompletingRequest: false,
      };
    case actionTypes.ACCEPT_COLLAB_REQUEST_SUCCESS:
      id = action.payload.id;
      newPending = [];
      newActive = [];
      newAll = [];
      state.collabDetails.received.pending.forEach((request, index) => {
        if (request.id === id) {
          request.status = "ACTIVE";
          newAll.push(request);
          newActive.push(request);
        } else {
          newPending.push(request);
        }
      });

      state.collabDetails.received.all.forEach((request, _) => {
        if (request.id !== id) {
          newAll.push(request);
        }
      })

      return {
        ...state,
        isAcceptingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          received: {
            ...state.collabDetails.received,
            all: newAll,
            pending: newPending,
            active: newActive.concat(state.collabDetails.received.active),
          },
        },
      };
    case actionTypes.REJECT_COLLAB_REQUEST_SUCCESS:
      id = action.payload.id;
      newAll = [];
      newPending = [];
      newRejected = [];
      state.collabDetails.received.pending.forEach((request, index) => {
        if (request.id === id) {
          request.status = "REJECTED";
          newAll.push(request);
          newRejected.push(request);
        } else {
          newPending.push(request);
        }
      });

      state.collabDetails.received.pending.forEach((request, _) => {
        if (request.id !== id) {
          newAll.push(request);
        }
      })

      return {
        ...state,
        isRejectingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          received: {
            ...state.collabDetails.received,
            all: newAll,
            pending: newPending,
            rejected: newRejected.concat(state.collabDetails.received.rejected),
          },
        },
      };
    case actionTypes.CANCEL_COLLAB_REQUEST_SUCCESS:
      id = action.payload.id;
      newAll = [];
      newPending = [];
      state.collabDetails.sent.pending.forEach((request, index) => {
        if (request.id !== id) {
          newPending.push(request);
        }
      });

      state.collabDetails.sent.all.forEach((request, index) => {
        if (request.id !== id) {
          newAll.push(request);
        }
      });

      return {
        ...state,
        isCancellingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          sent: {
            ...state.collabDetails.received,
            all: newAll,
            pending: newPending,
          },
        },
      };
    case actionTypes.COMPLETE_COLLAB_REQUEST_SUCCESS:
      id = action.payload.id;
      newCompleted = [];
      newAll = [];
      state.collabDetails.received.active.forEach((request, index) => {
        if (request.id === id) {
          request.status = "COMPLETE";
          newAll.push(request);
          newCompleted.push(request);
        } 
      });

      state.collabDetails.received.all.forEach((request, _) => {
        if (request.id !== id) {
          newAll.push(request);
        }
      })

      return {
        ...state,
        isCompletingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          received: {
            ...state.collabDetails.received,
            all: newAll,
            completed: newCompleted.concat(state.collabDetails.received.completed),
          },
        },
      };
    default:
      return state;
  }
};

export default collabReducer;
