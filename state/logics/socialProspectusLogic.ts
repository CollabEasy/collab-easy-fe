import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as socialProspectusApi from "../../api/social-prospectus";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/socialProspectusActionTypes";

export const fetchArtistSocialProspectusLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistSocialProspectus>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ARTIST_SOCIAL_PROSPECTUS],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchArtistSocialProspectusRequest());
      console.log("I'm here and now going to make  acall");
      const result = await socialProspectusApi.fetchArtistSocialProspectusAPI();
      dispatch(actions.fetchArtistSocialProspectusSuccess([result]));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});

export const updateArtistSocialProspectusLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateArtistSocialProspectus>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPDATE_ARTIST_SOCIAL_PROSPECTUS],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.updateArtistSocialProspectusRequest());
      const { data } = action.payload;
      console.log("Rabbal is inside save social prospectus logic", data);
      const result = await api.socialProspectusApi.addArtistSocialProspectusAPI(data);
      console.log("Successfully saved prospectus ", result);
      dispatch(actions.updateArtistSocialProspectusSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});

export const deleteArtistSocialProspectusLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.deleteArtistSocialProspectus>,
  any,
  LogicDeps
>({
  type: [actionTypes.DELETE_ARTIST_SOCIAL_PROSPECTUS],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.deleteArtistSocialProspectusRequest());
      const { data } = action.payload;
      console.log("Rabbal is inside delete social prospectus logic", data);
      const result = await api.socialProspectusApi.deleteArtistSocialProspectusAPI(data);
      console.log("Successfully delete prospectus ");
      dispatch(actions.deleteArtistSocialProspectusSuccess(result));
    } catch (error) {
    } finally {
      done();
    }
  },
});