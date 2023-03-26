import * as actionType from "../actionTypes/notificationsActionTypes";
import { NotificationState } from "types/states/notificationsState";

const initialState: NotificationState = {
  notifications: [],
  isFetchingNotifications: false,
};

const notificationReducer = (state = initialState, action): NotificationState => {
  switch (action.type) {
    case actionType.FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetchingNotifications: true,
      };
    case actionType.FETCH_NOTIFICATIONS_SUCCESS:
      const data = action.payload.result.data;
      return {
        ...state,
        notifications: data,
        isFetchingNotifications: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
