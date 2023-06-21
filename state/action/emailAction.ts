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

export const sendEmailToAllUsers = (subject: string, content: string, fromAdmin: boolean) => ({
  type: actionType.SEND_EMAIL_TO_ALL_USERS,
  payload: {
      subject,
      content,
      fromAdmin,
  }
});

export const sendEmailToAllRequest = () => ({
  type: actionType.SEND_EMAIL_TO_ALL_USERS_REQUEST,
  payload: {}
});

export const sendEmailToAllSuccess = () => ({
    type: actionType.SEND_EMAIL_TO_ALL_USERS_SUCCESS,
    payload: {}
  });