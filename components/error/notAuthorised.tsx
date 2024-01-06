import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Button, Result } from "antd";
import { AppState } from "state";
import { LoginModalDetails } from "types/model";
import { openLoginModalAction, setCurrentPathName } from "state/action";
import router from "next/router";

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  return { user, isLoggedIn, loginModalDetails };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openLoginModalAction: () => dispatch(openLoginModalAction()),
  setCurrentPathName: (path: string) => dispatch(setCurrentPathName(path))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  error,
  loginModalDetails: LoginModalDetails,
  user: any,
} & ConnectedProps<typeof connector>;

const NotAuthorised = ({
  error,
  user,
  loginModalDetails,
  setCurrentPathName,
  openLoginModalAction,
}: Props) => {

  const [showProfileModal, setShowProfileModal] = useState(false);

  const openLoginModal = () => {
    setCurrentPathName(router.asPath);
    router.push("/login");
  };

  let message = error.length !== 0 ? error : "Create a new account or log in to your existing account to get the most from wondor!";
  return (
    <>
      <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "10%", marginBottom: "15%" }}>
        <div className="common-text-style">
          <Result
            title={message}
            status="403"
            extra={
              <Button
                className="common-text-style"
                type="primary"
                onClick={openLoginModal}
              >
                Log in
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
};

export default connector(NotAuthorised);
