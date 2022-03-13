import { NextPage } from 'next'
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import headerImg from "public/images/contactUs.png";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

import LoginModal from '../components/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../components/newUserModal';

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails,
  user: any,
  artistListData: any
} & ConnectedProps<typeof connector>;


const ContactUs = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toDiscover } = useRoutesContext();

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
  }, [user])

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
  }, [artistListData]);

  console.log("loginModalDetails ", loginModalDetails);
  return (
    <>
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
      <div className="footer_contactUsContainer">
        <div className="footer_contactUsSectionContainer">
          <div className="footer_contactUsImage">
            <Image
              src={headerImg}
              alt="Landing page"
            />
          </div>
        </div>
        <div className="footer_contactUsSectionContainer">
          <div className="footer_contactUsTextContainer">
            <h3>Contact us</h3>
            <p>
              We can be reached at:
              <strong> collabeasyforyou@gmail.com</strong>
              <br></br>
              Please classify your email in one of the categories, and we will gladly get back to you.
              <br></br>
            </p>
            <div className="question">
              <h5 className="card-text">- Bug Report</h5>
              <p className="card-text">If you want to report any bug on the website.</p>
            </div>
            <div className="question">
              <h5 className="card-text">- Wrong Information</h5>
              <p className="card-text">If you see any outdated information.</p>
            </div>
            <div className="question">
              <h5 className="card-text">- General</h5>
              <p className="card-text">If you want to say Hi or anything else.</p>
            </div>
            <div className="footer_contactUsButtonContainer">
              <Button type="primary">
                <Link
                  href={routeToHref(toDiscover())}
                  passHref
                >Explore Wondor</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(ContactUs);