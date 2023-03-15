import { NextPage } from 'next'
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import headerImg from "../public/images/aboutUsHeader.png";
import { routeToHref } from "config/routes";

import LoginModal from '../components/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../components/modal/newUserModal';

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


const AboutUs = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
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

      <div className="footer_aboutUsContainer">
        <div className="footer_aboutUsBodyTextContainer">
          <h3 className="common-h5-style">Through Wondor, we are brining artists together everyday!</h3>
          <div>
            <h5 className="common-h5-style">What is Wondor?</h5>
            <p className="common-p-style">
              Artists are spread out on various social media platforms - some on instagram, others on youtube,
              and we are here to help you discover these artists so that you can work with them on your next big thing.
              Search for the art category to find the artists whose work most inpire you to work with them.<br></br><br></br>
              Take your time, explore the site, checkout different artists,
              and in the end, feel confident in the content you create by collaborating with them.
              This site is an attempt to help all of the artists in their journey to find the artists they would want to collaborate with.
              We’ll continually strive to offer tools that serve you towards this end.
              Why? For lots of reasons, but mainly and simply, because when it comes to you - <strong>we care</strong>.
            </p>
          </div>
          <div>
            <h5 className="common-h5-style">Why Wondor?</h5>
            <p className="common-p-style">When you are a artist creating content every day, the quality of your content is one of the most important things but
              so is collaborting with other artists. By collaborating, you learn from each other and at the same time
              increase your reach. <br></br><br></br>
              Today, with artists being ubiquitous, it can be challenging to find the perfect collaborator 
              to bring your vision to life. This is because artists are scattered across multiple platforms, 
              making it difficult to identify them all in one place. However, we have taken up the challenge 
              to bring all artists ready for collaboration in one convenient location. On our platform, 
              you can explore each artist's sample work, social media presence, and availability for 
              collaboration with ease. By having all this information in one user-friendly interface, 
              you can make a wise decision about who inspires you the most to collaborate with and bring
              your creative vision to fruition. So what are you waiting for? Work with like minded people from around 
              the globe to convert your idea into a masterpiece because we believe <b><i>together you create better!</i></b></p>
          </div>
        </div>
        <div className="footer_aboutUsButtonContainer">
          <Button type="primary" className="common-btn-dimension common-text-style">
            <Link
              href={routeToHref(toDiscover())}
              passHref
            >Let&apos;s collaborate</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default connector(AboutUs);
