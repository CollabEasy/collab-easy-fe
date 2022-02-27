import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as sampleApi from "../../api/sample";
import * as actions from "../action/sampleAction";
import * as actionTypes from "../actionTypes/sampleActionTypes";

export const uploadSampleLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.uploadSample>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPLOAD_SAMPLE_WORK],
  async process({ action, api }, dispatch, done) {
    const { data } = action.payload;
    console.log("data : ", data);
    try {
      dispatch(actions.uploadSampleWorkRequest());
      const result = await sampleApi.uploadSampleApi(data);
      dispatch(actions.uploadSampleWorkSuccess(result));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});


export const fetchSampleLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistSamples>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_SAMPLE_WORK],
  async process({ action, api }, dispatch, done) {
    const { slug } = action.payload;
    try {
      dispatch(actions.fetchArtistSamplesRequest());
      const result = await sampleApi.fetchSampleApi(slug);
      dispatch(actions.fetchArtistSamplesSuccess(result));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});


export const deleteSampleLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.deleteSample>,
  any,
  LogicDeps
>({
  type: [actionTypes.DELETE_SAMPLE_WORK],
  async process({ action, api }, dispatch, done) {
    const { data } = action.payload;
    try {
      dispatch(actions.deleteArtistSampleRequest());
      const result = await sampleApi.deleteSampleAPI(data);
      dispatch(actions.deleteArtistSampleSuccess(data));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});