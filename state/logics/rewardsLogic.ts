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

export const verifyRefferalCodeLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.verifyRefferalCode>,
  any,
  LogicDeps
>({
  type: [actionTypes.VERIFY_REFFERAL_CODE],
  async process({ action, api }, dispatch, done) {
    try {
      const refferalCode = action.payload.refferalCode;
      dispatch(actions.verifyRefferalCodeRequest());
      const result = await rewardsApi.verifyRefferalCode(refferalCode);
      dispatch(actions.verifyRefferalCodeSuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});

