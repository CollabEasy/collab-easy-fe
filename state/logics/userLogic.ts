import { createLogic } from "redux-logic";
import {
  fetchUserDataAction,
  fetchArtistSkills,
  FETCH_USER_DATA,
  setUserDataAction,
  updateArtistArtSuccess,
  updateArtistProfile,
  fetchArtistSkillSuccess,
  updateArtistProfileSuccess,
  UPDATE_ARTIST_PROFILE,
  updateArtistPreference,
  updateArtistPreferenceSuccess,
  fetchArtistPreferences,
  fetchArtistPreferencesSuccess,
  FETCH_ARTIST_PREFERENCES,
  FETCH_ARTIST_PREFERENCES_SUCCESS,
  UPDATE_ARTIST_PREFERENCE,
} from "state/action";
import { LogicDeps } from "state";
import { AppState } from "types/states";
import { FSACreatorPayload } from "types/states/FSACreator";
import {
  FETCH_ARTIST_CATEGORIES_DATA,
  FETCH_ARTIST_SKILLS,
  setArtistCategoriesData,
  fetchArtistCategoriesData,
  UPDATE_ARTIST_ART,
  updateArtistArt,
} from "state/action/artistAction";

export const fetchUserDataLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchUserDataAction>,
  any,
  LogicDeps
>({
  type: [FETCH_USER_DATA],
  async process({ action, api, getState }, dispatch, done) {
    const { id: userId } = action.payload;
    try {
      const userData = await api.artistApi.getArtistData();
      dispatch(setUserDataAction(userData));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const fetchArtistCategoriesLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchArtistCategoriesData>,
  any,
  LogicDeps
>({
  type: [FETCH_ARTIST_CATEGORIES_DATA],
  async process({ api }, dispatch, done) {
    try {
      const categoriesData = await api.artistApi.getArtistCategoryData();
      dispatch(setArtistCategoriesData(categoriesData));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const updateArtistArtLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof updateArtistArt>,
  any,
  LogicDeps
>({
  type: [UPDATE_ARTIST_ART],
  async process({ action, api }, dispatch, done) {
    try {
      const { data } = action.payload;
      const result = await api.artistApi.updateArtistCategories(data);
      dispatch(updateArtistArtSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const updateArtistPreferenceLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof updateArtistPreference>,
  any,
  LogicDeps
>({
  type: [UPDATE_ARTIST_PREFERENCE],
  async process({ action, api }, dispatch, done) {
    try {
      const { key, value } = action.payload;
      const result = await api.artistApi.updateArtistPreference(key, value);
      dispatch(updateArtistPreferenceSuccess(key, value));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const fetchArtistPreferencesLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchArtistPreferences>,
  any,
  LogicDeps
>({
  type: [FETCH_ARTIST_PREFERENCES],
  async process({ action, api }, dispatch, done) {
    try {
      const result = await api.artistApi.fetchArtistPreferencesAPI();
      dispatch(fetchArtistPreferencesSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const updateArtistProfileLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof updateArtistProfile>,
  any,
  LogicDeps
>({
  type: [UPDATE_ARTIST_PROFILE],
  async process({ action, api }, dispatch, done) {
    try {
      const { data } = action.payload;
      const result = await api.artistApi.updateArtistProfile(data);
      dispatch(updateArtistProfileSuccess(data));
      // TO-DO need to all get artist details action
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const fetchArtistSkillsLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof fetchArtistSkills>,
  any,
  LogicDeps
>({
  type: [FETCH_ARTIST_SKILLS],
  async process({ action, api }, dispatch, done) {
    try {
      const result = await api.artistApi.fetchArtistSkillsAPI();
      dispatch(fetchArtistSkillSuccess(result));
      // TO-DO need to all get artist details action
    } catch (error) {
    } finally {
      done();
    }
  },
});
