import { createLogic } from "redux-logic";
import * as actions from "../action/userAction";
import * as notifActions from "../action/notificationAction";
import * as homeActions from "../action/homeAction";
import { LogicDeps } from "state";
import { AppState } from "types/states";
import { FSACreatorPayload } from "types/states/FSACreator";
import * as actionType from '../actionTypes/userActionTypes';
import * as homeActionTypes from '../actionTypes/homeActionTypes';

export const fetchLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof homeActions.fetchLoginData>,
  any,
  LogicDeps
>({
  type: [homeActionTypes.FETCH_LOGIN_DATA],
  async process({ action, api }, dispatch, done) {
    const { token } = action.payload;
    try {
      dispatch(actions.userLoginRequest());
      const loginData = await api.loginApi.getLoginData(token);
      dispatch(homeActions.closeLoginModalAction());
      const tokenData: any = loginData;
      if (tokenData.data !== undefined) {
        localStorage.setItem("token", tokenData.data.token);
      }
      dispatch(actions.setUserLoggedIn(loginData));
    } catch (error) {
      const error_response = error.response;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
      dispatch(actions.userLoginFailure(error));
    } finally {
      done();
    }
  },
});

export const fetchBasicUser = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchBasicUser>,
  any,
  LogicDeps
>({
  type: [actionType.FETCH_BASIC_USER],
  async process({ action, api }, dispatch, done) {
    const { slug } = action.payload;
    try {
      dispatch(actions.fetchBasicUserRequest());
      const data = await api.loginApi.getBasicUser(slug);
      dispatch(actions.fetchBasicUserSuccess(data));
    } catch (error) {
      const error_response = error.response;
      dispatch(actions.fetchBasicUserFailure())
    } finally {
      done();
    }
  },
});

export const updateLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof homeActions.updateLoginData>,
  any,
  LogicDeps
>({
  type: [homeActionTypes.UPDATE_LOGIN_DATA],
  async process({ action, api }, dispatch, done) {
    try {
      const token = localStorage.getItem('token');
      const loginData = await api.loginApi.getArtistDetails(token)
      loginData['data']['token'] = token; 
      dispatch(actions.setUserLoggedIn(loginData));
    } catch (error) {
      dispatch(actions.userLoginFailure(error));
    } finally {
      done();
    }
  },
});

export const setuserLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.setUserLoggedIn>,
  any,
  LogicDeps
>({
  type: [actionType.SET_USER_LOGGED_IN],
  async process({ action }, dispatch, done) {
    const { data } = action.payload;
    try {
      localStorage.setItem("token", data.data.token);
      dispatch(actions.fetchArtistSkills(""));
      // To-Do we need to set token in cookies
      // Cookies.set('token', data.data.token)
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const fetchUserDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchUserDataAction>,
  any,
  LogicDeps
>({
  type: [actionType.FETCH_USER_DATA],
  async process({ action, api, getState }, dispatch, done) {
    const { id: userId } = action.payload;
    try {
      const userData = await api.artistApi.getArtistData();
      dispatch(actions.setUserDataAction(userData));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const updateArtistArtLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateArtistArt>,
  any,
  LogicDeps
>({
  type: [actionType.UPDATE_ARTIST_ART],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.updateArtistArtRequest());
      const { data } = action.payload;
      const result = await api.artistApi.updateArtistCategories(data);
      dispatch(notifActions.showNotification(true, 'Art styles saved successfully 🥳'));
      dispatch(actions.updateArtistArtSuccess(data.artNames));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
    } finally {
      done();
    }
  },
});

export const updateArtistPreferenceLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateArtistPreference>,
  any,
  LogicDeps
>({
  type: [actionType.UPDATE_ARTIST_PREFERENCE],
  async process({ action, api }, dispatch, done) {
    try {
      const { key, value } = action.payload;
      dispatch(actions.updateArtistPreferenceRequest(key));
      const result = await api.artistApi.updateArtistPreference(key, value);
      dispatch(notifActions.showNotification(true, 'Preferences saved successfully 🥳'))
      dispatch(actions.updateArtistPreferenceSuccess(key, value));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
    } finally {
      done();
    }
  },
});

export const fetchArtistPreferencesLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistPreferences>,
  any,
  LogicDeps
>({
  type: [actionType.FETCH_ARTIST_PREFERENCES],
  async process({ action, api }, dispatch, done) {
    try {
      const result = await api.artistApi.fetchArtistPreferencesAPI();
      dispatch(actions.fetchArtistPreferencesSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const updateArtistProfileLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateArtistProfile>,
  any,
  LogicDeps
>({
  type: [actionType.UPDATE_ARTIST_PROFILE],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.updateArtistProfileRequest());
      const { data } = action.payload;
      const result = await api.artistApi.updateArtistProfile(data);
      dispatch(notifActions.showNotification(true, 'Profile updated successfully 🥳'));
      dispatch(actions.updateArtistProfileSuccess(data));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
    } finally {
      done();
    }
  },
});

export const fetchArtistSkillsLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistSkills>,
  any,
  LogicDeps
>({
  type: [actionType.FETCH_ARTIST_SKILLS],
  async process({ action, api }, dispatch, done) {
    try {
      const { data } = action.payload; 
      const result = await api.artistApi.fetchArtistSkillsAPI(data);
      dispatch(actions.fetchArtistSkillSuccess(result));
      // TO-DO need to all get artist details action
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const fetchUserByHandleLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchUserByHandle>,
  any,
  LogicDeps
>({
  type: [actionType.FETCH_USER_BY_HANDLE],
  async process({ action, api }, dispatch, done) {
    try {
      const handle = action.payload.data;
      const result = await api.artistApi.fetchUserByHandle(handle);
      dispatch(actions.fetchUserByHandleSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const updateProfilePicture = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateProfilePicture>,
  any,
  LogicDeps
>({
  type: [actionType.UPDATE_PROFILE_PICTURE],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.updateProfilePictureRequest());
      const data = action.payload.data;
      const result = await api.artistApi.updateProfilePicture(data);
      dispatch(actions.updateProfilePictureSuccess(result));
      dispatch(notifActions.showNotification(true, "Profile picture updated sucessfully."));
    } catch (error) {
      dispatch(notifActions.showNotification(false, "Profile picture updation failed. " + error.response.err_str));
      dispatch(actions.updateProfilePictureFailure(error.response.err_str));
    } finally {
      done();
    }
  },
});

export const updateProfileCompleteStatus = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateProfileCompleteStatus>,
  any,
  LogicDeps
>({
  type: [actionType.UPDATE_PROFILE_COMPLETE_STATUS],
  async process({ action, api }, dispatch, done) {
    try {
      const result = await api.artistApi.fetchProfileCompleteStatus();
      dispatch(actions.updateProfileCompleteStatusSuccess(result));
    } catch (error) {

    } finally {
      done();
    }
  },
});
