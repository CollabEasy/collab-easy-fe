import { SEND_COLLAB_REQUEST, ACCEPT_COLLAB_REQUEST, REJECT_COLLAB_REQUEST } from "state/action";
import { UserState } from "types/states";

const initialState: UserState = {
  isLoggedIn: false
};

const collabReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    case SEND_COLLAB_REQUEST:
      return {
        ...state,
        user: action.payload.data
      };
    case REJECT_COLLAB_REQUEST:
      return {
        ...state,
        isLoggedIn: true
      }
    default:
      return state
  }
};

export default collabReducer