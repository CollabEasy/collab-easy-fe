import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as socialProspectusApi from "../../api/social-prospectus";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/socialProspectusActionTypes";
import * as notifActions from "../action/notificationAction";

export const fetchArtistSocialProspectusLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchArtistSocialProspectus>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_ARTIST_SOCIAL_PROSPECTUS],
  async process({ action, api }, dispatch, done) {
    const { slug } = action.payload;
    try {
      dispatch(actions.fetchArtistSocialProspectusRequest());
      const result = await socialProspectusApi.fetchArtistSocialProspectusAPI(slug);
      dispatch(actions.fetchArtistSocialProspectusSuccess([result]));
    } catch (error) {
     
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
      const result = await api.socialProspectusApi.addArtistSocialProspectusAPI(data);
      dispatch(actions.updateArtistSocialProspectusSuccess(result));
      dispatch(actions.setShowSocialProspectusModal(false));
      dispatch(notifActions.showNotification(true, 'Changes to your social prospectus saved successfully 🥳'));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
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
      const result = await api.socialProspectusApi.deleteArtistSocialProspectusAPI(data);
      dispatch(actions.deleteArtistSocialProspectusSuccess(result));
      dispatch(actions.setShowSocialProspectusModal(false));
      dispatch(notifActions.showNotification(true, 'Changes to your social prospectus saved successfully 🥳'));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
    } finally {
      done();
    }
  },
});