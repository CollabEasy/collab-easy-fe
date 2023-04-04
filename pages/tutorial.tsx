import { NextPage } from 'next'
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";

import LoginModal from '../components/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../components/modal/newUserModal';
import createProfileGif from "public/images/createProfile.gif";
import contactUsImage from "public/images/contactUs.svg";
import Title from '../components/title';

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


const Tutorial = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
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
      <Title title="About Wondor" />
      <div className="footer_tutorialContainer">
        <div className="footer_tutorialHeadingContainer">
          <h3 className="common-h3-style">You are just 4 steps away from your next collaboration 🤗</h3>
        </div>

        <div className='footer_tutorialStepsContainer'>
          <div className="footer_tutorialStepText">
            <h4 className="common-h4-style">1. Set up your profile</h4>
            <p className="common-h6-style">
              Login with Gmail to create your profile. Don't forget to
              <ul>
                <li>Add basic information</li>
                <li>Set preferences to indicate your skills</li>
                <li>Set if you are up for collaboration</li>
                <li>Add other social media account under social prospectus</li>
              </ul>
              You are now one step close to collaborate for you next hit 🥳
            </p>
          </div>
          <div className="footer_tutorialStepImage">
            <Image
              src={createProfileGif}
              alt="Landing page"
              priority
            />
          </div>
        </div>

        <div className='footer_tutorialStepsContainer'>
          <div className="footer_tutorialStepImage">
            <Image
              src={createProfileGif}
              alt="Landing page"
              priority
            />
          </div>
          <div className="footer_tutorialStepText">
            <h4 className="common-h4-style">2. Find artists</h4>
            <p className="common-h6-style">
              Simply start by browsing artists in the art category of your choice
              or search directly by artist&apos;s name.
            </p>
          </div>
        </div>
        <div className="footer_tutorialStepsContainer">
          <div className="footer_tutorialStepText">
            <h4 className="common-h5-style">3. Send collaboration request</h4>
            <p className="common-p-style">
              Before you send a colloboration request, Make sure they are <i><b>up for collaboration</b></i>.
              Their collaboration status is visible on their profile 😎<br></br><br></br>
              In your collaboration request, mention
              <ul>
                <li>Theme or topic for art</li>
                <li>Details about the theme, how and where you want to post it and when etc</li>
              </ul>
            </p>
          </div>
          <div className="footer_tutorialStepImage">
            <Image
              src={createProfileGif}
              alt="Landing page"
              priority
            />
          </div>
        </div>
        <div className="footer_tutorialStepsContainer">
          <div className="footer_tutorialStepImage">
            <Image
              src={createProfileGif}
              alt="Landing page"
              priority
            />
          </div>
          <div className="footer_tutorialStepText">
            <h5 className="common-h5-style">4. Work on your masterpiece</h5>
            <p className="common-p-style">
              Once the artist accept your request, start working with them on your masterpiece.
              Discuss details by sending message to each other. Once it is ready, post it together.
              And yes, don&apos;t forget to give credit to each other.<br></br><br></br>
            </p>
          </div>
        </div>
        <div>
          <div className="footer_contactUsButtonContainer">
            <Button type="primary" className="common-btn-dimension">
              <Link
                href={routeToHref(toDiscover())}
                passHref
              >Explore Wondor</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(Tutorial);