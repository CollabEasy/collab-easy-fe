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
      const result = await socialProspectusApi.fetchArtistSocialProspectusAPI();
      dispatch(actions.fetchArtistSocialProspectusSuccess([result]));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});

export const updateArtistSocialProspectusLogi = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateArtistSocialProspectus>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPDATE_ARTIST_SOCIAL_PROSPECTUS],
  async process({ action, api }, dispatch, done) {
    console.log("Rabbal is inside save scratchpad logic", action.payload);
    try {
      dispatch(actions.updateArtistSocialProspectusRequest());
      const { data } = action.payload;
      const result = await api.socialProspectusApi.updateArtistSocialProspectusAPI(data);
      dispatch(actions.updateArtistSocialProspectusSuccess(data));
    } catch (error) {
    } finally {
      done();
    }
  },
});