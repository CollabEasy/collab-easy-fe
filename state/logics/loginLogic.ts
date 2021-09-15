import { AppState, FSACreatorPayload } from 'types/states'
import { createLogic } from 'redux-logic'
import { fetchLoginData, FETCH_LOGIN_DATA, setUserData } from 'state/action'
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
      const loginData = await api.login.getLoginData(token)
      console.log('fetched user data from api', loginData);
    //   dispatch(setUserData(loginData))
    } catch (error) {
    } finally {
      done()
    }
  },
})