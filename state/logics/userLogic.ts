import { createLogic } from 'redux-logic'
import { fetchUserDataAction, FETCH_USER_DATA, setUserDataAction, updateArtistArtSuccess, updateArtistProfile, UPDATE_ARTIST_PROFILE } from 'state/action'
import { LogicDeps } from 'state'
import { AppState } from 'types/states'
import { FSACreatorPayload } from 'types/states/FSACreator'
import { FETCH_ARTIST_CATEGORIES_DATA, setArtistCategoriesData, fetchArtistCategoriesData, UPDATE_ARTIST_ART, updateArtistArt } from 'state/action/artistAction'

export const fetchUserDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchUserDataAction>,
  any,
  LogicDeps
>({
  type: [FETCH_USER_DATA],
  async process({ action, api, getState }, dispatch, done) {
    const { id: userId } = action.payload
    console.log(getState(), 'printing state')
    console.log('userid to fetch data', userId)
    try {
      const userData = await api.artistApi.getArtistData()
      console.log('fetched user data from api', userData)
      dispatch(setUserDataAction(userData))
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
  async process({ api }, dispatch, done) {
    try {
      const categoriesData = await api.artistApi.getArtistCategoryData()
      console.log('artist data: ', categoriesData)
      dispatch(setArtistCategoriesData(categoriesData))
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const updateArtistArtLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof updateArtistArt>,
  any,
  LogicDeps
>({
  type: [UPDATE_ARTIST_ART],
  async process({ action, api }, dispatch, done) {
    try {
      const { data } = action.payload
      const result = await api.artistApi.updateArtistCategories(data)
      console.log('artist update sucess: ', result)
      dispatch(updateArtistArtSuccess(result))
    } catch (error) {
    } finally {
      done()
    }
  },
})

export const updateArtistProfileLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof updateArtistProfile>,
  any,
  LogicDeps
>({
  type: [UPDATE_ARTIST_PROFILE],
  async process({ action, api }, dispatch, done) {
    try {
      const { data } = action.payload
      const result = await api.artistApi.updateArtistProfile(data)
      console.log('artist profile update success: ', result)
      // TO-DO need to all get artist details action
    } catch (error) {
    } finally {
      done()
    }
  },
})