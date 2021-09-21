import {
  SET_ACTIVE_COLLAB_REQUEST_DATA,
  SET_COMPLETED_COLLAB_REQUEST_DATA,
  SET_PENDING_COLLAB_REQUEST_DATA,
  SET_REJECTED_COLLAB_REQUEST_DATA,
} from "state/action";
import { CollabRequestState } from "types/states/collab";

const initialState: CollabRequestState = {
  active: [],
  pending: [],
  rejected: [],
  completed: [],
};

const collabReducer = (state = initialState, action): CollabRequestState => {
  switch (action.type) {
    case SET_PENDING_COLLAB_REQUEST_DATA:
      return {
        ...state,
        pending: action.payload.data,
      };
    case SET_ACTIVE_COLLAB_REQUEST_DATA:
      return {
        ...state,
        active: action.payload.data,
      };
    case SET_COMPLETED_COLLAB_REQUEST_DATA:
      return {
        ...state,
        completed: action.payload.data,
      };
    case SET_REJECTED_COLLAB_REQUEST_DATA:
      return {
        ...state,
        rejected: action.payload.data,
      };
    default:
      return state;
  }
};

export default collabReducer;
