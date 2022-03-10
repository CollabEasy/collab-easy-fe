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
      console.log("calling scratchpad api in logic");
      dispatch(actions.fetchScratchpadByArtistIdRequest());
      const result = await scratchpadApi.fetchScratchpadByArtistIdAPI();
      console.log("Rabbal data recieved in logic : " , result);
      dispatch(actions.fetchScratchpadByArtistIdSuccess(result));
    } catch (error) {
      console.log("error : ", error);
    } finally {
      done();
    }
  },
});