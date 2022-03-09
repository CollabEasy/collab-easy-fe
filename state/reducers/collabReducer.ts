import * as actionTypes from "../actionTypes/collabActionTypes";
import { CollabRequestState } from "types/states/collab";
import { CollabRequestData } from "types/model";

const initialState: CollabRequestState = {
  collabDetails: {
    sent: {
      active: [],
      pending: [],
      rejected: [],
      completed: [],
    },
    received: {
      active: [],
      pending: [],
      rejected: [],
      completed: [],
    },
  },
  isFetchingCollabDetails: false,
  showCollabModal: false,
  isSendingRequest: false,
};

const getUpdatedList = (requests: CollabRequestData[], updatedRequest: CollabRequestData) => {
  const newRequestList = [];
  requests.forEach((request, index) => {
    if (request.id === updatedRequest.id) {
      newRequestList.push(updatedRequest);
    } else {
      newRequestList.push(request);
    }
  });
  return newRequestList;
}

const collabReducer = (state = initialState, action): CollabRequestState => {
  switch (action.type) {
    case actionTypes.SEND_COLLAB_REQUEST_REQUEST:
      return {
        ...state,
        isSendingRequest: true,
      };
    case actionTypes.SEND_COLLAB_REQUEST_SUCCESS:
      const newPendingSent = [action.payload.data];
      newPendingSent.concat(state.collabDetails.sent.pending);
      return {
        ...state,
        isSendingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          sent: {
            ...state.collabDetails.sent,
            pending: newPendingSent,
          }
        }
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
      }
    case actionTypes.UPDATE_COLLAB_REQUEST_SUCCESS:
      const updatedRequest = action.payload.data;

      return {
        ...state,
        isSendingRequest: false,
        collabDetails: {
          ...state.collabDetails,
          sent: {
            ...state.collabDetails.sent,
            active: getUpdatedList(state.collabDetails.sent.active, updatedRequest),
            pending: getUpdatedList(state.collabDetails.sent.pending, updatedRequest),
            rejected: getUpdatedList(state.collabDetails.sent.rejected, updatedRequest),
            completed: getUpdatedList(state.collabDetails.sent.completed, updatedRequest),
          }
        }
      }
    case actionTypes.UPDATE_COLLAB_REQUEST_FAILURE:
      return {
        ...state,
        isSendingRequest: false,
      }
    default:
      return state;
  }
};

export default collabReducer;
