import * as actionType from "../actionTypes/notificationActionTypes";

export const showNotification = (isSuccess: boolean, message: string) => ({
  type: actionType.SHOW_NOTIFICATION,
  payload: {
    isSuccess,
    message,
  },
});

export const hideNotification = () => ({
  type: actionType.HIDE_NOTIFICATION,
});
