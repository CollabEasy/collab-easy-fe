import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as notificationApi from "../../api/notification";
import * as actions from "../action/";
import * as actionTypes from "../actionTypes/notificationsActionTypes";

export const fetchNotifications = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchScratchpadByArtistId>,
  any,
  LogicDeps
>({
  type: [actionTypes.FETCH_NOTIFICATIONS_REQUEST],
  async process({ action, api }, dispatch, done) {
    try {
      dispatch(actions.fetchUserAnalyticsRequest());
      const result = await notificationApi.fetchNotifications();
      console.log("result : ", result);
      dispatch(actions.fetchNotificationsSuccess(result));
    } catch (error) {
      // console.log("error : ", error);
    } finally {
      done();
    }
  },
});

export const markNotifsRead = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.fetchScratchpadByArtistId>,
  any,
  LogicDeps
>({
  type: [actionTypes.MARK_NOTIFICATIONS_READ],
  async process({ action, api }, dispatch, done) {
    try {
      await notificationApi.markNotificationsRead();
    } catch (error) {
      // console.log("error : ", error);
    } finally {
      done();
    }
  },
});
