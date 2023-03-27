import * as actionType from "../actionTypes/notificationActionTypes";
import { NotificationState } from "types/states/notificationState";

const initialState: NotificationState = {
  isSuccess: false,
  showNotification: false,
  message: '',
  toastId: '',
};

const notificationReducer = (
  state = initialState,
  action
): NotificationState => {
  switch (action.type) {
    case actionType.SHOW_NOTIFICATION:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        showNotification: true,
        message: action.payload.message,
      };
    case actionType.HIDE_NOTIFICATION:
      return {
        ...state,
        isSuccess: false,
        showNotification: false,
        message: '',
      };
    default:
      return state;
  }
};

export default notificationReducer;
