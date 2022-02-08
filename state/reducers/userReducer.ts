import {
  SET_USER_DATA,
  SET_USER_LOGGED_IN,
  RESET_USER_LOGGED_IN,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_SKILLS_FETCHED,
  USER_DETAILS_UPDATED,
  UPDATE_ARTIST_PROFILE_REQUEST,
  UPDATE_ARTIST_PREFERENCE_REQUEST,
  UPDATE_ARTIST_PREFERENCE_SUCCESS,
  FETCH_ARTIST_PREFERENCES_SUCCESS,
} from "state/action";
import { UserState } from "types/states";

const initialState: UserState = {
  user: {new_user: false},
  otherUser: {},
  isUpdatingProfile: false,
  isUpdatingPrefs: "",
  isLoggedIn: false,
  preferences: {},
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
      return {
        ...state,
        isLoggedIn: false,
        errors: action.payload.data,
      };
    case RESET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: false,
        user: {new_user: false},
        errors: {},
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        user: {new_user: false},
        isLoggedIn: false,
        errors: {},
      };
    case UPDATE_ARTIST_PROFILE_REQUEST:
      return {
        ...state,
        isUpdatingProfile: true,
      }
    case USER_DETAILS_UPDATED:
      return {
        ...state,
        isUpdatingProfile: false,
        user: action.payload.data,
      };
    case USER_SKILLS_FETCHED:
      return {
        ...state,
        user: {
          ...state.user,
          skills: action.payload.data.data,
        },
      };
    case UPDATE_ARTIST_PREFERENCE_REQUEST:
      return {
        ...state,
        isUpdatingPrefs: action.payload.key,
      };
    case UPDATE_ARTIST_PREFERENCE_SUCCESS:
      
      const prefKey = action.payload.key;
      const prefVal = action.payload.value;

      return {
        ...state,
        isUpdatingPrefs: "",
        preferences: {
          ...state.preferences,
          [prefKey]: prefVal
        }
      };
    case FETCH_ARTIST_PREFERENCES_SUCCESS:
      return {
        ...state,
        isUpdatingPrefs: "",
        preferences: action.payload.data.data['preferences'] !== undefined ? action.payload.data.data.preferences: {},
      }
    default:
      return state;
  }
};

export default userReducer;
