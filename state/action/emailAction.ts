import * as actionType from '../actionTypes/emailActionTypes';

export const sendEmailToOneUser = (subject: string, content: string, fromAdmin: boolean) => ({
  type: actionType.SEND_EMAIL_TO_ONE_USER,
  payload: {
      subject,
      content,
      fromAdmin,
  }
});

export const sendEmailToOneUserRequest = () => ({
  type: actionType.SEND_EMAIL_TO_ONE_USER_REQUEST,
  payload: {}
});

export const sendEmailToOneUserSuccess = () => ({
    type: actionType.SEND_EMAIL_TO_ONE_USER_SUCCESS,
    payload: {}
  });
