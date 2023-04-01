import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../state/action";
import { connect, ConnectedProps } from "react-redux";
import { ToastContainer, ToastOptions } from "react-toastify";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideNotification: () => dispatch(actions.hideNotification()),
});

const connector = connect(null, mapDispatchToProps);

type Props = {
  showNotification: boolean;
  isSuccess: boolean;
  message: string;
} & ConnectedProps<typeof connector>;

const Notification = ({
  showNotification,
  isSuccess,
  message,
  hideNotification,
}: Props) => {
  const [toastId, _] = useState(Date.now());
  const notificationParams: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    toastId: toastId,
    onClose: () => {
      hideNotification()
    },
  };

  if (message === "" || !showNotification || toast.isActive(toastId)) {
    return <div></div>;
  }

  if (isSuccess) {
    toast.success(message, notificationParams);
  } else {
    toast.error(message, notificationParams);
  }

  return <ToastContainer />;
};

export default connector(Notification);
