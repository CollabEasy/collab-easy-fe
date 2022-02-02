import { AppState, FSACreatorPayload } from "types/states";
import { createLogic } from "redux-logic";
import {
  fetchLoginData,
  updateLoginData,
  FETCH_LOGIN_DATA,
  userLoginFailure,
  setUserLoggedIn,
  SET_USER_LOGGED_IN,
  UPDATE_LOGIN_DATA,
  resetUserLoggedIn,
  userLoginRequest,
  closeLoginModalAction,
} from "state/action";
import { LogicDeps } from "state";

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const fetchLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchLoginData>,
  any,
  LogicDeps
>({
  type: [FETCH_LOGIN_DATA],
  async process({ action, api }, dispatch, done) {
    const { token } = action.payload;
    try {
      dispatch(userLoginRequest());
      const loginData = await api.loginApi.getLoginData(token);
      dispatch(closeLoginModalAction());
      dispatch(setUserLoggedIn(loginData));
    } catch (error) {
      console.log("error : ", error);
      dispatch(userLoginFailure(error));
    } finally {
      done();
    }
  },
});

export const updateLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof updateLoginData>,
  any,
  LogicDeps
>({
  type: [UPDATE_LOGIN_DATA],
  async process({ action, api }, dispatch, done) {
    try {
      const token = localStorage.getItem('token');
      const loginData = await api.loginApi.getArtistDetails(token)
      loginData['data']['token'] = token; 
      dispatch(setUserLoggedIn(loginData));
    } catch (error) {
      console.log("error : ", error);
      dispatch(userLoginFailure(error));
    } finally {
      done();
    }
  },
});

export const setuserLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof setUserLoggedIn>,
  any,
  LogicDeps
>({
  type: [SET_USER_LOGGED_IN],
  async process({ action }, dispatch, done) {
    console.log("here-----", action.payload);
    const { data } = action.payload;
    try {
      localStorage.setItem("token", data.data.token);
      // To-Do we need to set token in cookies
      // Cookies.set('token', data.data.token)
    } catch (error) {
    } finally {
      done();
    }
  },
});
