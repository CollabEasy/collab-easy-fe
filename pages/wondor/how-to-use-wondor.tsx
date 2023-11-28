import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import { Card } from 'antd';
import Image from 'next/image';
import LoginModal from '../../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { openLoginModalAction, updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../../components/modal/newUserModal';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import pageBannerImage from 'public/images/mobile-landing.svg';
import notFoundImage from '../../public/images/not-found.svg';
import ActionBanner from "@/components/actionBanner";

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openLoginModalAction: () => dispatch(openLoginModalAction()),
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails,
  user: any,
  artistListData: any
} & ConnectedProps<typeof connector>;


const Tutorial = ({
  isLoggedIn,
  updateLoggedInData,
  openLoginModalAction,
  loginModalDetails,
  user,
  artistListData
}: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toContactUs, toDiscover, toFAQ } = useRoutesContext();

  const openLoginModal = () => {
    openLoginModalAction();
  };

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
    < Layout

      title={"How to use Wondor?"}
      name={"description"}
      content={"Find singers, photograhers etc to collaborate. Create account, send collab request, manage collaboration requests. Find ideas and themes for your work. Win money from winning art contests. Earn rewards by reffering your friends."}

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
        <GenericBreadcrumb
          page={"Tutorial"}
        />
        <div className="row">
          <div style={{ width: "100%" }}>
            <div className="row d-flex justify-content-center pageBanner-cover">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-4 col-sm-4">
                    <div className="text-center">
                      <Image
                        src={pageBannerImage}
                        layout="responsive"
                        alt="4 steps to start using wondor for your next collaboration"
                        priority
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-sm-8">
                    <div className="pageBanner-cnt">
                      <div className="pageBanner-text text-center">
                        <h3 className="common-h3-style">
                          You are just 4 steps away from your next collaboration 🤗
                        </h3>
                        <p className="common-p-style">
                          Are you ready to take your skills to the next level and collaborate with others on exciting projects? Then it&apos;s time to create your profile and join a community of like-minded individuals!
                        </p>
                      </div>
                      <div className="pageBanner-button-group">
                        <Button
                          type="primary"
                          className="common-btn-dimension pageBanner-button"
                          onClick={openLoginModal}
                        >
                          Join Now
                        </Button>
                        <Button className="common-btn-dimension pageBanner-button">
                          <Link
                            href={routeToHref(toContactUs())}
                            passHref
                          >Ask Question</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tutorial-text-row">
          <div className="tutorial-text-column">
            <Card title="1. Set up your profile" style={{ width: '100%', height: '100%' }}>
              <p className="common-h6-style">
                Create your profile by logging in with your Gmail account.
                Complete these steps to showcase your skills and collaborate
                <ul>
                  <li>Add basic information</li>
                  <li>Add work samples</li>
                  <li>Link your social media accounts</li>
                  <li>Set preferences</li>
                  <li>Indicate collaboration interest</li>
                </ul>
                Take the first step towards your next hit 🥳
              </p>
            </Card>
          </div>
          <div className="tutorial-text-column">
            <Card title="2. Find an artist" style={{ width: '100%', height: '100%' }}>
              <p className="common-h6-style">
                Simply browse the collab category of your choice to see a variety of artists and their creations.
                To narrow down your search even further, you can also search directly by an artist&apos;s name 😉
              </p>
            </Card>
          </div>
          <div className="tutorial-text-column">
            <Card title="3. Send a collaboration request" style={{ width: '100%', height: '100%' }}>
              <p className="common-p-style">
                Ready to collaborate? Confirm the artist is open to it on their profile 😎<br></br>
                In your collaboration request, mention
                <ul>
                  <li>Theme or topic for art</li>
                  <li>Provide details such as social platform, deadlines, and milestones</li>
                </ul>
                Let&apos;s work together to create something unique and inspiring 😇
              </p>
            </Card>
          </div>
          <div className="tutorial-text-column">
            <Card title="4. Work on your masterpiece" style={{ width: '100%', height: '100%' }}>
              <p className="common-p-style">
                Congratulations on finding an artist to collaborate with 🥳.
                Once accepted, discuss details by messaging each other. Post your work together on the due date.
                And yes, don&apos;t forget to give credit to each other 🙏🏻<br></br><br></br>
              </p>
            </Card>
          </div>
        </div>
        <div className="row">
          <ActionBanner />
        </div>
      </div>
    </Layout>
  )
}

export default connector(Tutorial);