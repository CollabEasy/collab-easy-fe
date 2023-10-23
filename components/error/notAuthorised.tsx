import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Button, Result } from "antd";
import Layout from "../layout";
import { AppState } from "state";
import LoginModal from "../modal/loginModal";
import NewUserModal from "../modal/newUserModal";
import { LoginModalDetails } from "types/model";
import { openLoginModalAction } from "state/action";

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  return { user, isLoggedIn, loginModalDetails };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openLoginModalAction: () => dispatch(openLoginModalAction()),
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
  openLoginModalAction,
}: Props) => {

  const [showProfileModal, setShowProfileModal] = useState(false);

  const openLoginModal = () => {
    openLoginModalAction();
  };

  let message = error.length !== 0 ? error : "Create a new account or log in to your existing account to get the most from wondor!";
  return (
    <Layout
      title={"Join Wondor now!"}
      name={"description"}
      content="Create a new account or log in to your existing account to get the most from wondor!"
    >
      {loginModalDetails.openModal && !user.new_user && <LoginModal />}
      {showProfileModal && <NewUserModal />}

      <div className="fluid discoverArtists__listingPageContainer" style={{ marginTop: "20%", marginBottom: "15%" }}>
        <div className="discoverArtists__listingPageCoverContainer common-text-style">
          <Result
            title={message}
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
    </Layout>
  );
};

export default connector(NotAuthorised);
