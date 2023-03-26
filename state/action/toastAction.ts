import * as actionType from "../actionTypes/toastActionTypes";

export const showToast = (isSuccess: boolean, message: string) => ({
  type: actionType.SHOW_NOTIFICATION,
  payload: {
    isSuccess,
    message,
  },
});

export const hideToast = () => ({
  type: actionType.HIDE_NOTIFICATION,
});
