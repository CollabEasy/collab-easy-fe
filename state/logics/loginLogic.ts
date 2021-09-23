import { AppState, FSACreatorPayload } from 'types/states'
import { createLogic } from 'redux-logic'
import { fetchLoginData, FETCH_LOGIN_DATA, setUserLoggedIn, SET_USER_LOGGED_IN } from 'state/action'
import { LogicDeps } from 'state'

export const fetchLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchLoginData>,
  any,
  LogicDeps
>({
  type: [FETCH_LOGIN_DATA],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { token } = action.payload
    try {
      const loginData = await api.loginApi.getLoginData(token)
      console.log('fetched user data from api', loginData);
      console.log("inside heree!!!");
      dispatch(setUserLoggedIn(loginData));
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const setUserLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof setUserLoggedIn>,
  any,
  LogicDeps
>({
  type: [SET_USER_LOGGED_IN],
  async process({ action, api, getState, routes }, dispatch, done) {
    console.log("here-----", action.payload);
    const { data } = action.payload
    try {
      localStorage.setItem('token', data.data.token)
        } catch (error) {
    } finally {
      done()
    }
  },
})
