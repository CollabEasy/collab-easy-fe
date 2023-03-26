import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import "react-toastify/dist/ReactToastify.css";
import * as actions from "../../state/action";
import { connect, ConnectedProps } from "react-redux";
import { ToastContainer, ToastOptions } from "react-toastify";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideToast: () => dispatch(actions.hideToast()),
});

const connector = connect(null, mapDispatchToProps);

type Props = {
  showToast: boolean;
  isSuccess: boolean;
  message: string;
} & ConnectedProps<typeof connector>;

const Toast = ({
  showToast,
  isSuccess,
  message,
  hideToast,
}: Props) => {
  const [toastId, _] = useState(Date.now());
  const toastParams: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    toastId: toastId,
    onClose: () => {
      hideToast()
    },
  };

  if (message === "" || !showToast || toast.isActive(toastId)) {
    return <div></div>;
  }

  if (isSuccess) {
    toast.success(message, toastParams);
  } else {
    toast.error(message, toastParams);
  }

  return <ToastContainer />;
};

export default connector(Toast);
