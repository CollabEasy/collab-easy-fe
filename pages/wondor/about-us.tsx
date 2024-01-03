import { GetServerSideProps, NextPage, NextPageContext } from 'next'
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import headerImg from "../public/images/aboutUsHeader.png";
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
import GenericBreadcrumb from '@/components/asset/genericBreadcrumb';
import GenericActionBanner from '@/components/asset/genericActionBanner';
import GenericPageBanner from '@/components/asset/genericPageBanner';

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
  artistListData: any,
} & ConnectedProps<typeof connector>;


const AboutUs = ({
  isLoggedIn,
  updateLoggedInData,
  loginModalDetails,
  user,
  artistListData,
}: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(-1);

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
    setWindowWidth(window.innerWidth);
  }, [artistListData]);

  return (
    <Layout
      title={"Wondor - a platform to bring artists together!"}
      name={"description"}
      content={"Wondor is one-stop platform for all artists. We connect artists with each other and promote collaboration among artists. Win money for wining monthly contest. Earn rewards point by referring friends!"}
    >

      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
      <div className="genericPageLayout_container">
        {windowWidth > 500 &&
          <GenericBreadcrumb
            page={"About Us"}
          />
        }
        <div className="row">
          <GenericPageBanner
            heading="Wondor is brining artists together everyday 🤗"
            paragraph="Are you ready to take your skills to the next level and collaborate with others on exciting projects? Then it's time to join the growing community of like-minded artists. We are just getting started!"
          />
        </div>
        <div className="about-us-text-container">
          <div>
            <h5 className="common-h5-style">What is Wondor?</h5>
            <p className="common-p-style">
              Artists are spread out on various social media platforms - some on instagram, others on youtube,
              and we are here to help you discover these artists so that you can work with them on your next big thing.
            </p>
            <p className="common-p-style">
              Wondor is an ultimate platform that
              empowers artists to showcase their talent, create a comprehensive profile,
              and link all their social platforms in one convenient place.
              Showcase your readiness to collaborate on other social platforms,
              manage your schedule effortlessly, and unlock new opportunities to conquer the art world.


            </p>
            <p className="common-p-style">
              <b>Join wondor today to take your artistic journey to new heights.</b>
            </p>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <h5 className="common-h5-style">Why Wondor?</h5>
            <p className="common-p-style">When you are a artist creating content every day, the quality of your content is one of the most important things but
              so is collaborting with other artists. By collaborating, you learn from each other and at the same time
              increase your reach. <br></br><br></br>
              Today, with artists being ubiquitous, it can be challenging to find the perfect collaborator
              to bring your vision to life. This is because artists are scattered across multiple platforms,
              making it difficult to identify them all in one place. However, we have taken up the challenge
              to bring all artists ready for collaboration in one convenient location. On our platform,
              you can explore each artist&apos;s sample work, social media presence, and availability for
              collaboration with ease. By having all this information in one user-friendly interface,
              you can make a wise decision about who inspires you the most to collaborate with and bring
              your creative vision to fruition.
            </p>
          </div>

          <div style={{ paddingTop: "10px" }}>
            <h5 className="common-h5-style">Join Wondor Today!</h5>
            <p className="common-p-style">
              What are you waiting for? Work with like minded people from around
              the globe to convert your idea into a masterpiece because we believe <b><i>together you create better!</i></b>
            </p>
          </div>
        </div>
        <div className="row">
          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  )
}

export default connector(AboutUs);
