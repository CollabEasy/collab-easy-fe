import { mockUser } from "api/user";
import { SET_USER_DATA, SET_USER_LOGGED_IN } from "state/action";
import { UserState } from "types/states";

const initialState: UserState = {
  isLoggedIn: false
};

const userReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload.data
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true
      }
    default:
      return state
  }
};

export default userReducer