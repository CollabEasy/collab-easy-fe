import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import { connect } from "react-redux";
import styles from "../styles/navbar.module.scss";
import React, { useEffect, useState } from "react";
import { Form, Switch, Modal, Button, Select } from 'antd';
import Image from 'next/image';
import profileImageImg from '../public/images/profile.png';
import { closeLoginModalAction } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/core";

export interface LoginModalProps {
  closeLoginModalAction: () => void;
}

const LoginModal: React.FC<NavBarProps> = ({
  closeLoginModalAction
}) => {
	const [visible, setVisible] = useState(true);
	
  const closeLoginModal = () => {
		setVisible(false);
    closeLoginModalAction();
	};

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      onCancel={closeLoginModal}
      footer={null}
			width={900}
			bodyStyle={{height: '500px', padding: '0px'}}
    >
      <div className="login-modal-container">
				<div className="login-signup-container">
					<div className="login-image">
						<Image className="profile-image" src={profileImageImg} alt="Landing page" />
					</div>
					<div className="login-info-container">
						<div className="login-wrapper">
							<div className="heading-container">
								<span className="f-25 md-cop000">Sign up to Wondor</span>
							</div>
							<div className="heading-info-container">
								<span className="f-14 md-cop000">a door to the world where artists collaborate</span>
							</div>
							<div className="signup-container">
								<button
									type="button"
									id="btn-google"
									className="btn btn-default btn-danger btn-block"
								>
										<a href="/api/auth/login">Log In with Google</a>
								</button>
							</div>
							<div className="policy-container">
								<span className="f-14 md-cop000">
									By continuing, you agree to WonDor’s Terms of Service and acknowledge you've read our Privacy Policy.
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
  loginModalDetails: state.home.loginModalDetails
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeLoginModalAction: () => dispatch(closeLoginModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
