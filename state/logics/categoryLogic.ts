import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as categoryApi from "../../api/category";
import * as actions from "../action/categoryAction";
import * as actionTypes from "../actionTypes/categoryActionTypes";

export const fetchArtistsByCategoryLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistsByCategory>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ARTIST_BY_CATEGORY],
  async process({ action, api }, dispatch, done) {
    const { id } = action.payload;
    try {
      console.log("calling api in logic");
      dispatch(actions.fetchArtistsByCategoryRequest());
      const result = await categoryApi.getArtistsByCategoryAPI(id);
      dispatch(actions.fetchArtistsByCategorySuccess(result));
    } catch (error) {
      console.log("error : ", error);
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