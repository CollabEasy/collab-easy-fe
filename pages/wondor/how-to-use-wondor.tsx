import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import { Card } from 'antd';
import Image from 'next/image';
import LoginModal from '../../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import NewUserModal from '../../components/modal/newUserModal';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/asset/genericBreadcrumb";
import GenericActionBanner from "@/components/asset/genericActionBanner";
import GenericPageBanner from "@/components/asset/genericPageBanner";

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


const Tutorial = ({
  isLoggedIn,
  updateLoggedInData,
  loginModalDetails,
  user,
  artistListData
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

  const { toArtistPortal, toAllCategoryPage, toAllProposalsPage } = useRoutesContext();

  return (
    < Layout

      title={"How to use Wondor?"}
      name={"description"}
      content={"Find singers, photograhers etc to collaborate. Create account, send collab request, manage collaboration requests. Find ideas and themes for your work. Win money from winning art contests. Earn rewards by reffering your friends."}

    >


      <div className="genericPageLayout_container">
        {windowWidth > 500 &&
          <GenericBreadcrumb
            page={"Tutorial"}
          />
        }

        <div className="row">
          <GenericPageBanner
            heading="You are just 4 steps away from your next collaboration 🤗"
            paragraph="Are you ready to take your skills to the next level and collaborate with others on exciting projects? Then it's time to create your profile and join a community of like-minded individuals!"
          />
        </div>

        <div style={{paddingTop: "2%"}}>
          <ul className="timeline">
            <li>
              <div className="timeline-badge info">
                <h2 className="common-h2-style">1</h2>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h2 className="common-h2-style timeline-title">Create Complete Profile</h2>
                  <div className="divider mb-4"> </div>
                  <p className="common-p-style">
                    Sign up and create your profile. Complete these steps to
                    showcase your skills and readiness to collaborate
                    <ul>
                      <li> - Add basic information</li>
                      <li> - Link your social media accounts which has your work samples</li>
                      <li> - Indicate collaboration interest</li>
                    </ul>
                    Take the first step towards your next hit 🥳
                  </p>
                </div>
                <div className="tutorial-button-group">
                  
                  <Button
                    type="primary"
                    className="common-btn-dimension tutorial-button"
                  >
                    <Link
                      href={routeToHref(toArtistPortal("basic-information"))}
                      passHref
                    >
                      Complete Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </li>

            <li className="timeline-inverted">
              <div className="timeline-badge info">
                <h2 className="common-h2-style">2</h2>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h2 className="common-h2-style timeline-title">Find Collaborator</h2>
                  <div className="divider mb-4"> </div>
                  <p className="common-p-style">
                    Use our search tool to find a collaborator who is available to collaborate. You can do so
                    <ul>
                      <li> - Simply browse the collab category of your choice to see artists who are available to collaborate</li>
                      <li> - You can also search directly by an artist&apos;s name</li>
                      <li> - Choose from the existing collaboration proposals from other artists</li>
                    </ul>
                    <div className="tutorial-button-group">
                      <Button
                        type="primary"
                        className="common-btn-dimension tutorial-button"
                      >
                        <Link
                          href={routeToHref(toAllProposalsPage("all"))}
                          passHref
                        >Collab Proposals</Link>
                      </Button>
                      <Button className="common-btn-dimension tutorial-button">
                        <Link
                          href={routeToHref(toAllCategoryPage())}
                          passHref
                        >Collab Catgeories</Link>
                      </Button>
                    </div>
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="timeline-badge info">
                <h2 className="common-h2-style">3</h2>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h2 className="common-h2-style timeline-title">Send Collaboration Request</h2>
                  <div className="divider mb-4"> </div>
                  <p className="common-p-style">
                    Once you have selected the collaborator whose work inspires you, send them a collaboration request 😎. <br></br>
                    In your collaboration request, mention
                    <ul>
                      <li>- Theme or topic for art</li>
                      <li>- Provide additional details, tentative completion date, and milestones etc</li>
                    </ul>
                  </p>
                </div>
              </div>
            </li>

            <li className="timeline-inverted">
              <div className="timeline-badge info">
                  <h2 className="common-h2-style">4</h2>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h2 className="common-h2-style timeline-title">Work on your masterpiece</h2>
                  <div className="divider mb-4"> </div>
                  <p className="common-p-style">
                    Congratulations on finding an artist to collaborate with 🥳.
                    Once the request is accepted, start using the collaboration request detail page for communication.
                    Share your work with the rest of the world once completed, and yes, don&apos;t forget to give credit to each other 🙏🏻
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="timeline-badge info">
                <h2 className="common-h2-style">1</h2>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h2 className="common-h2-style timeline-title">Repeat</h2>
                  <div className="divider mb-4"> </div>
                  <p className="common-p-style">
                    Yes, creating together is fun. Continue to work with more artists and upscale your skills.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="row">
          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  )
}

export default connector(Tutorial);