import { connect, ConnectedProps } from "react-redux";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Image from "next/image";
import profileImageImg from "..//public/images/profile.png";
import { closeLoginModalAction, fetchLoginData, routeToMyWondor } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/states";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useRoutesContext } from "@/components/routeContext";
import { useRouter } from "next/router";

export const AMPLIFY_GOOGLE_CLIENT_ID = process.env.AMPLIFY_GOOGLE_CLIENT_ID
export const AMPLIFY_GA_TRACKING_ID = process.env.AMPLIFY_GA_TRACKING_ID

const mapStateToProps = (state: AppState) => {
  const user = state.user;
  const loginModalDetails = state.home.loginModalDetails;
  const routeToMyWondor = state.home.routeToMyWondor;
  return { loginModalDetails, user, routeToMyWondor};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeLoginModalAction: () => dispatch(closeLoginModalAction()),
  fetchLoginData: (token: string) => dispatch(fetchLoginData(token)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = {previousPath: string} & ConnectedProps<typeof connector>;

const Login = ({ user, routeToMyWondor, closeLoginModalAction, fetchLoginData }: Props) => {
  const [visible, setVisible] = useState(true);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const closeLoginModal = () => {
    setVisible(false);
    closeLoginModalAction();
  };

  const router = useRouter();

  const OnSuccessCallback = (response) => {
    let tokenId  = response.credential;
    fetchLoginData(tokenId);
    console.log("route to woindor : ", routeToMyWondor)
    if (routeToMyWondor) {
        router.push("/my-wondor");
    } else {
        router.back();
    }
    
  };

  const OnFailureCallback = (response) => {
    setErrorMessageVisible(true);
  };

  const { toTerms, toPrivacy } = useRoutesContext()

  return (
    <div className="padding20">
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
                <span className="f-25 md-cop000 common-text-style">Welcome to <span className="common-wondor-style">Wondor</span></span>
              </div>
              <div className="heading-info-container">
                <span className="f-14 md-cop000 common-text-style">
                  Unlock new avenues for creativity, collaboration, and success in the world of creators!
                </span>
              </div>
              <div className="signup-container">
                <GoogleOAuthProvider clientId={AMPLIFY_GOOGLE_CLIENT_ID}>
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
    </div>
  );
};

export default connector(Login);
