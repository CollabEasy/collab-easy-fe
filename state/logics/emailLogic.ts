import { createLogic } from "redux-logic";
import { AppState, LogicDeps } from "state";
import { FSACreatorPayload } from "types/states";

import * as emailApi from "../../api/email";
import * as actions from "../action/emailAction";
import * as notifActions from "../action/notificationAction";
import * as actionTypes from "../actionTypes/emailActionTypes";

export const sendEmailToOneUser = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.sendEmailToOneUser>,
  any,
  LogicDeps
>({
  type: [actionTypes.SEND_EMAIL_TO_ONE_USER],
  async process({ action, api }, dispatch, done) {
    try {
    //   dispatch(actions.sendEmailToOneUserRequest());
      const result = await emailApi.sendEmail(
        action.payload["subject"],
        action.payload["content"]
      );
      if (action.payload['fromAdmin'] === true) {
        dispatch(notifActions.showNotification(true, "Email API called successfully"));
      }
      dispatch(actions.sendEmailToOneUserSuccess());
    } catch (error) {
        const error_response = error.response.data;
        if (action.payload['fromAdmin']) {
            dispatch(notifActions.showNotification(false, error_response['err_str']));
        }
    } finally {
      done();
    }
  },
});

export const sendEmailToAllUsers = createLogic<
  AppState,
  FSACreatorPayload<typeof actions.sendEmailToAllUsers>,
  any,
  LogicDeps
>({
  type: [actionTypes.SEND_EMAIL_TO_ALL_USERS],
  async process({ action, api }, dispatch, done) {
    try {
    //   dispatch(actions.sendEmailToOneUserRequest());
      const result = await emailApi.sendEmailToAll(
        action.payload["subject"],
        action.payload["content"]
      );
      if (action.payload['fromAdmin']) {
        dispatch(notifActions.showNotification(true, "Email API called successfully"));
      }
      dispatch(actions.sendEmailToAllSuccess());
    } catch (error) {
        const error_response = error.response.data;
        if (action.payload['fromAdmin'] === true) {
            dispatch(notifActions.showNotification(false, error_response['err_str']));
        }
    } finally {
      done();
    }
  },
});
