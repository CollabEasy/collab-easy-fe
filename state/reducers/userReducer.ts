import * as actionType from "../actionTypes/userActionTypes";
import { UserState } from "types/states";

const initialState: UserState = {
  user: { new_user: false },
  otherUser: {},
  isUpdatingProfile: false,
  isUpdatingPrefs: "",
  isLoggedIn: false,
  preferences: {},
  errors: {},
  artCategories: [],
  isFetchingUser: true,
};

const userReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    
    case actionType.SET_IS_FETCHING_USER:
      return {
        ...state,
        isFetchingUser: action.payload.value,
      }
    case actionType.SET_USER_DATA:
      return {
        ...state,
        errors: {},
        isFetchingUser: false,
        user: action.payload.data,
      };
    case actionType.SET_USER_LOGGED_IN:
      return {
        ...state,
        errors: {},
        isFetchingUser: false,
        isLoggedIn: true,
        user: action.payload.data?.data || {},
      };
    case actionType.USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.payload.data,
      };
    case actionType.RESET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: false,
        user: { new_user: false },
        errors: {},
      };
    case actionType.USER_LOGIN_REQUEST:
      return {
        ...state,
        isFetchingUser: false,
        user: { new_user: false },
        isLoggedIn: false,
        errors: {},
      };
    case actionType.UPDATE_ARTIST_PROFILE_REQUEST:
      return {
        ...state,
        isUpdatingProfile: true,
      };
    case actionType.USER_DETAILS_UPDATED:
      return {
        ...state,
        isUpdatingProfile: false,
        user: action.payload.data,
      };
    case actionType.USER_SKILLS_FETCHED:
      return {
        ...state,
        user: {
          ...state.user,
          skills: action.payload.data.data,
        },
      };
    case actionType.UPDATE_ARTIST_PREFERENCE_REQUEST:
      return {
        ...state,
        isUpdatingPrefs: action.payload.key,
      };
    case actionType.UPDATE_ARTIST_PREFERENCE_SUCCESS:
      const prefKey = action.payload.key;
      const prefVal = action.payload.value;

      return {
        ...state,
        isUpdatingPrefs: "",
        preferences: {
          ...state.preferences,
          [prefKey]: prefVal,
        },
      };
    case actionType.FETCH_ARTIST_PREFERENCES_SUCCESS:
      return {
        ...state,
        isUpdatingPrefs: "",
        preferences:
          action.payload.data.data["preferences"] !== undefined
            ? action.payload.data.data.preferences
            : {},
      };
    case actionType.UPDATE_ARTIST_ART_REQUEST:
      return {
        ...state,
        isUpdatingProfile: true,
      };
    case actionType.UPDATE_ARTIST_ART_SUCCESS:
      return {
        ...state,
        isUpdatingProfile: false,
        artCategories: action.payload.data,
      };
    case actionType.SET_NEW_USER_VALUE:
      return {
        ...state,
        user: {
          ...state.user,
          new_user: action.payload.data,
        }
      }
    default:
      return state;
  }
};

export default userReducer;
