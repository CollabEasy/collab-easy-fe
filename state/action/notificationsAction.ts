import * as actionType from '../actionTypes/notificationsActionTypes';

export const fetchNotifications = () => ({
  type: actionType.FETCH_NOTIFICATIONS_REQUEST,
});

export const fetchNotificationsSuccess = (result: any) => ({
  type: actionType.FETCH_NOTIFICATIONS_SUCCESS,
  payload: {
    result
  }
});

export const markNotificationsRead = (data: any) => ({
  type: actionType.MARK_NOTIFICATIONS_READ,
  payload: {}
});