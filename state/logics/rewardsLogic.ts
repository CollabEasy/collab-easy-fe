import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as rewardsApi from "../../api/rewards";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/rewardsTypes";
import * as notifActions from "../action/notificationAction";

export const fetchRewardsLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchRewards>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_REWARDS_ACTIVITY],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchRewardsRequest());
      const result = await rewardsApi.fetchRewards();
      dispatch(actions.fetchRewardsSuccess([result]));
    } catch (error) {

    } finally {
      done();
    }
  },
});

export const fetchRewardsActivityLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchRewardsActivity>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_REWARDS_ACTIVITY],
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
      dispatch(actions.setIsReferralDone());
      dispatch(notifActions.showNotification(true, 'Woo Hoo, you have earned 150 points by referral program  🥳'));
    } catch (error) {
      const error_response = error.response.data;
      dispatch(notifActions.showNotification(false, error_response['err_str']));
    } finally {
      done();
    }
  },
});

export const skipRefferalCodeLogic = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.skipRefferalCode>,
  any,
  LogicDeps
>({
  type: [actionTypes.SKIP_REFFERAL_CODE],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.skipRefferalCodeRequest());
      const result = await rewardsApi.skipRefferalCode();
      dispatch(actions.skipRefferalCodeSuccess([result]));
      dispatch(actions.setIsReferralDone());
      dispatch(notifActions.showNotification(true, 'You have skipped earning points by referral program.'));
    } catch (error) {
    } finally {
      done();
    }
  },
});

