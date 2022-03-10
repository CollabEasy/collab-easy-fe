import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as scratchpadApi from "../../api/scratchpad";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/scratchpadActionTypes";

export const fetchScratchpadByArtistIdLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchScratchpadByArtistId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_SCRATCHPAD_BY_ARTIST_ID],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchScratchpadByArtistIdRequest());
      const result = await scratchpadApi.fetchScratchpadByArtistIdAPI();
      dispatch(actions.fetchScratchpadByArtistIdSuccess(result));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});

export const updateArtistScratchpadLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.updateArtistScratchpad>,
  any,
  LogicDeps
>({
  type: [actionTypes.UPDATE_ARTIST_SCRATCHPAD],
  async process({ action, api }, dispatch, done) {
    console.log("Rabbal is inside save scratchpad logic", action.payload);
    try {
      dispatch(actions.updateArtistScratchpadRequest());
      const { data } = action.payload;
      const result = await api.scratchpadApi.updateArtistScratchpad(data);
      dispatch(actions.updateArtistScratchpadSuccess(data));
    } catch (error) {
    } finally {
      done();
    }
  },
});