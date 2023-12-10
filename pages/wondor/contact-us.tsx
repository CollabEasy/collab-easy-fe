import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import contactUsImage from "public/images/contactUs.svg";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

import LoginModal from '../../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../../components/modal/newUserModal';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/genericBreadcrumb";

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
  const [windowWidth, setWindowWidth] = useState(-1);

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
    setWindowWidth(window.innerWidth);
  }, [user])

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
  }, [artistListData]);

  return (
    <Layout
      title={"Contact Us | Wondor"}
      name={"description"}
      content={"We are happy to help you with any concern you may have or suggestions you would like to share. Here are the ways to connect with us. Contact us for any questions."}
    >
      

      <div className="genericPageLayout_container">
        {windowWidth > 500 &&
            <GenericBreadcrumb
              page={"Contact Us"}
            />
        }
        <div className="contact-us-section-container">
          <h3 className="common-h3-style">Need help? Contact us</h3>
          <p className="common-p-style">
            We can be reached at:
            <strong> admin@wondor.com</strong>
            <br></br>
            Please classify your email in one of the categories, and we will gladly get back to you.
            <br></br>
          </p >
          <div className="question">
            <h5 className="card-text common-h5-style">- Bug Report</h5>
            <p className="card-text common-p-style">If you want to report any bug on the website.</p>
          </div>
          <div className="question">
            <h5 className="card-text common-h5-style">- Wrong Information</h5>
            <p className="card-text common-p-style">If you see any outdated information.</p>
          </div>
          <div className="question">
            <h5 className="card-text common-h5-style">- General</h5>
            <p className="card-text common-p-style">If you want to say Hi or anything else.</p>
          </div>
          <div className="contact-us-section-button">
            <Button type="primary" className="common-btn-dimension">
              <Link
                href={routeToHref(toDiscover())}
                passHref
              >Explore Wondor</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default connector(ContactUs);