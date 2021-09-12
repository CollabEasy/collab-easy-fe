import { createLogic } from 'redux-logic'
import { fetchUserDataAction, FETCH_USER_DATA, setUserDataAction } from 'state/action'
import { LogicDeps } from 'state'
import { AppState } from 'types/states'
import { FSACreatorPayload } from 'types/states/FSACreator'

export const fetchUserDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchUserDataAction>,
  any,
  LogicDeps
>({
  type: [FETCH_USER_DATA],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id: userId } = action.payload
    console.log(getState(), 'printing state')
    console.log('userid to fetch data', userId)
    try {
      const userData = await api.userApi.getUserData(userId)
      console.log('fetched user data from api', userData)
      dispatch(setUserDataAction(userData))
    } catch (error) {
    } finally {
      done()
    }
  },
})