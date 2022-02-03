import {
  SET_USER_DATA,
  SET_USER_LOGGED_IN,
  RESET_USER_LOGGED_IN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_DETAILS_UPDATED,
} from "state/action";
import { UserState } from "types/states";

const initialState: UserState = {
  user: {},
  isLoggedIn: false,
  errors: {},
};

const userReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        errors: {},
        user: action.payload.data,
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        errors: {},
        isLoggedIn: true,
        user: action.payload.data?.data || {},
      };
    case USER_LOGIN_FAILURE:
      console.log("errors : ", action.payload.data);
      return {
        ...state,
        isLoggedIn: false,
        errors: action.payload.data,
      };
    case RESET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        errors: {},
      };
    case USER_LOGIN_REQUEST:
      return {
        user: {},
        isLoggedIn: false,
        errors: {},
      };
    case USER_DETAILS_UPDATED:
      console.log("updating user : ", action.payload.data)
      return {
        ...state,
        user: action.payload.data,
      }
    default:
      return state;
  }
};

export default userReducer;
