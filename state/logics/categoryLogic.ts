import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as categoryApi from "../../api/category";
import * as actions from "../action/";
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
      dispatch(actions.fetchArtistsByCategoryIdFalilure(error));
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
      dispatch(actions.fetchArtistsByCategorySlugRequest());
      const result = await categoryApi.getArtistsByCategorySlugAPI(slug);
      dispatch(actions.fetchArtistsByCategorySlugSuccess(result));
    } catch (error) {
      // console.log("error : ", error);
      dispatch(actions.fetchArtistsByCategorySlugFalilure(error));
    } finally {
      done();
    }
  },
});

export const fetchArtistCategoriesLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.getAllCategories>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ALL_CATEGORIES],
  async process({ api }, dispatch, done) {
    try {
      dispatch(actions.getAllCategoriesRequest())
      const categoriesData = await categoryApi.getAllCategories();
      dispatch(actions.getAllCategoriesSuccess(categoriesData));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const addCategoryLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.addCategory>,
  any,
  LogicDeps
>({
  type: [actionTypes.ADD_CATEGORY],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.addCategoryRequest())
      const { data } = action.payload;
      const categoryData = await categoryApi.addCategoryApi(data);
      dispatch(actions.addCategorySuccess(categoryData));
      dispatch(actions.setShowCategoryModal(false));
    } catch (error) {
    } finally {
      done();
    }
  },
});