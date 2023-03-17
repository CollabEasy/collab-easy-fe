import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as analyticsAPI from "../../api/analytics";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/analyticsActionTypes";

export const fetchUserAnalytics = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchScratchpadByArtistId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_USER_ANALYTICS],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchUserAnalyticsRequest());
      const result = await analyticsAPI.fetchUserAnalytics(
        action.payload["start_date"],
        action.payload["end_date"]
      );
      dispatch(actions.fetchUserAnalyticsSuccess(result));
    } catch (error) {
      // console.log("error : ", error);
    } finally {
      done();
    }
  },
});
