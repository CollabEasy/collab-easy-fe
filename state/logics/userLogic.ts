import { AppState, FSACreatorPayload } from 'types/states'
import { createLogic } from 'redux-logic'
import { fetchUserData, FETCH_USER_DATA, setUserData } from 'state/action'
import { LogicDeps } from 'state'
import { FETCH_ARTIST_CATEGORIES_DATA, setArtistCategoriesData, fetchArtistCategoriesData } from 'state/action/artistAction'

export const fetchUserDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchUserData>,
  any,
  LogicDeps
>({
  type: [FETCH_USER_DATA],
  async process({ action, api, getState, routes }, dispatch, done) {
    const { id: userId } = action.payload
    console.log(getState(), 'printing state')
    console.log('userid to fetch data', userId)
    try {
      const userData = await api.getUserData(userId)
      console.log('fetched user data from api', userData)
      dispatch(setUserData(userData))
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const fetchArtistCategoriesLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchArtistCategoriesData>,
  any,
  LogicDeps
>({
  type: [FETCH_ARTIST_CATEGORIES_DATA],
  async process({ action, api, getState, routes }, dispatch, done) {
    try {
      const userData = await api.artist.getArtistCategoryData()
      console.log('artist data: ', userData)
      dispatch(setArtistCategoriesData(userData))
    } catch (error) {
    } finally {
      done()
    }
  },
})