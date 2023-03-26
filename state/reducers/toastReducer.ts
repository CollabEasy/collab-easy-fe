import * as actionType from "../actionTypes/toastActionTypes";
import { ToastState } from "types/states/toastState";

const initialState: ToastState = {
  isSuccess: false,
  showToast: false,
  message: '',
  toastId: '',
};

const toastReducer = (
  state = initialState,
  action
): ToastState => {
  switch (action.type) {
    case actionType.SHOW_NOTIFICATION:
      return {
        ...state,
        isSuccess: action.payload.isSuccess,
        showToast: true,
        message: action.payload.message,
      };
    case actionType.HIDE_NOTIFICATION:
      return {
        ...state,
        isSuccess: false,
        showToast: false,
        message: '',
      };
    default:
      return state;
  }
};

export default toastReducer;
