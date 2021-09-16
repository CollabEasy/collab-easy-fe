import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Form, Switch, Modal, Button, Select } from "antd";
import Image from "next/image";
import profileImageImg from "../public/images/profile.png";
import { closeLoginModalAction, fetchLoginData } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/states";
import { GoogleLogin } from "react-google-login";

export interface LoginModalProps {
	closeLoginModalAction: () => void;
	fetchLoginData: (token: string) => void;
}

const LoginModal: React.FC<NavBarProps> = ({ closeLoginModalAction, fetchLoginData }) => {
  const [visible, setVisible] = useState(true);

  const closeLoginModal = () => {
    setVisible(false);
    closeLoginModalAction();
  };

  const OnSuccessCallback = (response) => {
    let { tokenId } = response;
		console.log("responseGoogle: ", response);
		console.log("tokenId: ", tokenId);
		fetchLoginData(tokenId);
	};
	
	const OnFailureCallback = (response) => {
		console.log("failed: ", response);
	}

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
                <span className="f-25 md-cop000">Sign up to Wondor</span>
              </div>
              <div className="heading-info-container">
                <span className="f-14 md-cop000">
                  a door to the world where artists collaborate
                </span>
              </div>
              <div className="signup-container">
                {/* <button
									type="button"
									id="btn-google"
									className="btn btn-default btn-danger btn-block"
								>
										<a href="/api/auth/login">Log In with Google</a>
								</button> */}
                <GoogleLogin
                  clientId="265324139647-lv38dkdpnqq06e66mkt9a6ab6i4r1cik.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={OnSuccessCallback}
                  onFailure={OnFailureCallback}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div className="policy-container">
                <span className="f-14 md-cop000">
                  By continuing, you agree to WonDor’s Terms of Service and
                  acknowledge you've read our Privacy Policy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	closeLoginModalAction: () => dispatch(closeLoginModalAction()),
	fetchLoginData: (token: string) => dispatch(fetchLoginData(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
