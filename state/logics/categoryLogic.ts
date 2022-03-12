import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as categoryApi from "../../api/category";
import * as actions from "../action/categoryAction";
import * as actionTypes from "../actionTypes/categoryActionTypes";

export const fetchArtistsByCategoryIdLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistsByCategoryId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ARTIST_BY_CATEGORY_ID],
  async process({ action, api }, dispatch, done) {
    const { id } = action.payload;
    try {
      //console.log("calling api in logic");
      dispatch(actions.fetchArtistsByCategoryIdRequest());
      const result = await categoryApi.getArtistsByCategoryIdAPI(id);
      dispatch(actions.fetchArtistsByCategoryIdSuccess(result));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});

export const fetchArtistsByCategorySlugLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistsByCategorySlug>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ARTIST_BY_CATEGORY_SLUG],
  async process({ action, api }, dispatch, done) {
    const { slug } = action.payload;
    try {
      //console.log("calling api in logic");
      dispatch(actions.fetchArtistsByCategorySlugRequest());
      const result = await categoryApi.getArtistsByCategorySlugAPI(slug);
      dispatch(actions.fetchArtistsByCategorySlugSuccess(result));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});

export const fetchAllCategoriesLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchAllCategories>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ALL_CATEGORIES],
  async process({ }, dispatch, done) {
    try {
      console.log("Rabbal you are in logic");
      dispatch(actions.fetchAllCategoriesRequest())
      console.log("Rabbal is in the API to fetch all categories");
      const categoriesData = await categoryApi.getAllCategories();
      dispatch(actions.fetchAllCategoriesSuccess(categoriesData));
    } catch (error) {
    } finally {
      done();
    }
  },
});