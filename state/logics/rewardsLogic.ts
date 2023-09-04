import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as rewardsApi from "../../api/rewards";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/rewardsTypes";

export const fetchRewardsActivityLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchRewardsActivity>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_REWARDS],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchRewardsActivityRequest());
      const result = await rewardsApi.fetchRewardsActivity();
      dispatch(actions.fetchRewardsActivitySuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});

