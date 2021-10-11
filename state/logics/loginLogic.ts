import { AppState, FSACreatorPayload } from 'types/states'
import { createLogic } from 'redux-logic'
import { fetchLoginData, fetchUserDataAction, FETCH_LOGIN_DATA, setUserLoggedInAction, SET_USER_LOGGED_IN } from 'state/action'
import { LogicDeps } from 'state'

export const fetchLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchLoginData>,
  any,
  LogicDeps
>({
  type: [FETCH_LOGIN_DATA],
  async process({ action, api }, dispatch, done) {
    const { token } = action.payload
    try {
      const loginData = await api.loginApi.getLoginData(token)
      console.log('fetched user data from api', loginData);
      dispatch(setUserLoggedInAction(loginData));
      dispatch(fetchUserDataAction(loginData.data.artist_id))
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const setUserLoginDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof setUserLoggedInAction>,
  any,
  LogicDeps
>({
  type: [SET_USER_LOGGED_IN],
  async process({ action }, dispatch, done) {
    console.log("here-----", action.payload);
    const { data } = action.payload
    try {
      localStorage.setItem('token', data.data.token)
      // To-Do we need to set token in cookies
     // Cookies.set('token', data.data.token)
        } catch (error) {
    } finally {
      done()
    }
  },
})
