import { connect, ConnectedProps } from "react-redux";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import profileImageImg from "../public/images/profile.png";
import { closeLoginModalAction, fetchLoginData } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/states";
import { User } from "types/model";
import { useRoutesContext } from "../components/routeContext";
import Link from 'next/link';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

const mapStateToProps = (state: AppState) => {
  const user = state.user;
  const loginModalDetails = state.home.loginModalDetails;
  return { loginModalDetails, user };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeLoginModalAction: () => dispatch(closeLoginModalAction()),
  fetchLoginData: (token: string) => dispatch(fetchLoginData(token)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = {} & ConnectedProps<typeof connector>;

const LoginModal = ({ user, closeLoginModalAction, fetchLoginData }: Props) => {
  const [visible, setVisible] = useState(true);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const closeLoginModal = () => {
    setVisible(false);
    closeLoginModalAction();
  };

  const OnSuccessCallback = (response) => {
   //  console.log("You are in success ", response);
    let  tokenId  = response.credential;
    fetchLoginData(tokenId);
  };

  const OnFailureCallback = (response) => {
   //  console.log("You are in failure ", response);
    setErrorMessageVisible(true);
  };

  const { toTerms, toPrivacy } = useRoutesContext()

  // console.log("Rabbal ", user);

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onCancel={closeLoginModal}
      footer={null}
      width={900}
      bodyStyle={{ height: "500px", padding: "0px" }}
    >
      <div className="login-modal-container">
        <div className="login-signup-container">
          <div className="login-image">
            <Image
              className="profile-image"
              src={profileImageImg}
              alt="Landing page"
            />
          </div>
          <div className="login-info-container">
            <div className="login-wrapper">
              <div className="heading-container">
                <span className="f-25 md-cop000 common-text-style">Sign up to <span className="common-wondor-style">Wondor</span></span>
              </div>
              <div className="heading-info-container">
                <span className="f-14 md-cop000 common-text-style">
                  a door to the world where artists collaborate
                </span>
              </div>
              <div className="signup-container">
                <GoogleOAuthProvider clientId="896694875793-05dp2a045lu38ki42dbb1t010rmr5hr9.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={OnSuccessCallback}
                    onError={() => {
                      // console.log('Login Failed');
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
              {(Object.keys(user.errors).length !== 0) && (
                <p className="error-message common-text-style">
                  Something&apos;s not right. Please try after sometime.
                </p>
              )}
              <div className="policy-container">
                <span className="f-14 md-cop000 common-text-style">
                  By continuing, you agree to Wondor’s
                  <a target="_blank" href={toTerms().href} rel="noopener noreferrer"> Terms of Service</a> and
                  acknowledge you&apos;ve read our <a target="_blank" href={toPrivacy().href} rel="noopener noreferrer">Privacy Policy</a>.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default connector(LoginModal);
