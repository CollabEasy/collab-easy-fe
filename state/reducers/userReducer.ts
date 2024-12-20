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
  isFetchingUser: false,
  isUpdatingProfilePic: false,
  showProfilePictureUpdateModal: false,
  basicUser: {},
  isFetchingBasicUser: false,
};

const userReducer = (state = initialState, action): UserState => {
  switch (action.type) {
    case actionType.SET_IS_FETCHING_USER:
      return {
        ...state,
        isFetchingUser: action.payload.value,
      };
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
        isFetchingUser: true,
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
        user: {
          ...state.user,
          new_user: false,
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
        user: {
          ...state.user,
          skills: action.payload.data,
          new_user: false,
        },
      };
    case actionType.SET_NEW_USER_VALUE:
      return {
        ...state,
        user: {
          ...state.user,
          new_user: action.payload.newUser,
        },
      };
    case actionType.SHOW_PROFILE_PICTURE_UPDATE_MODAL:
      return {
        ...state,
        showProfilePictureUpdateModal: action.payload.show,
      };
    case actionType.UPDATE_PROFILE_PICTURE_REQUEST:
      return {
        ...state,
        showProfilePictureUpdateModal: false,
        isUpdatingProfilePic: true,
      };
    case actionType.UPDATE_PROFILE_PICTURE_SUCCESS:
      // console.log("data : ", action.payload.data.data);
      return {
        ...state,
        user: action.payload.data.data,
        isUpdatingProfilePic: false,
      };
    case actionType.UPDATE_PROFILE_PICTURE_FAILURE:
      return {
        ...state,
        isUpdatingProfilePic: false,
      };

    case actionType.SET_IS_REFERRAL_DONE:
      return {
        ...state,
        user: {
          ...state.user,
          is_referral_done: true,
        },
      };
    case actionType.UPDATE_PROFILE_COMPLETE_STATUS_SUCCESS:
      const isComplete = action.payload.data.data;
      return {
        ...state,
        user: {
          ...state.user,
          profile_complete: true,
        },
      };
    case actionType.FETCH_BASIC_USER_SUCCESS:
      const data = action.payload.data.data;
      return {
        ...state,
        isFetchingBasicUser: false,
        basicUser: {
          userId: data.artistId,
          slug: data.slug,
          profilePicUrl: data.profilePicUrl,
          firstName: data.firstName,
          lastName: data.lastName,
          skills: data.skills,
        },
      };
    case actionType.FETCH_BASIC_USER_REQUEST:
      return {
        ...state,
        basicUser: {},
        isFetchingBasicUser: true,
      };
    case actionType.FETCH_BASIC_USER_FAILURE:
      return {
        ...state,
        isFetchingBasicUser: false,
      };
    default:
      return state;
  }
};

export default userReducer;
