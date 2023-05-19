import { NextPage } from 'next'
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { routeToHref } from "config/routes";
import happyImage from "public/images/happy.svg";
import { useRoutesContext } from "../components/routeContext";
import Title from 'components/title'
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

const GetInspired = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toDiscover } = useRoutesContext()

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
      <Title title="Ideas for your next hit" />
      <div className="getInspired-parentContainer">
        <div className="getInspired-sectionContainer">
          <div className="getInspired-happyImage">
            <Image
              src={happyImage}
              alt="Landing page"
              priority
            />
          </div>
        </div>
        <div className="getInspired-sectionContainer">
          <div className="getInspired-textContainer">
            <h3 className="common-h3-style">Looking for insipiration?</h3>
            <p className="common-p-style">
              This page is the perfect destination for you. Here, we update our list of themes
              and quotes on a <strong>weekly basis</strong>, so be sure to check back often.
              You won&apos;t want to miss out!
              <br></br>
            </p >
            <div className="theme">
              <h5 className="card-text common-h5-style">Important events of the month</h5>
              <p className="card-text common-p-style">
                1. World Day for Cultural Diversity for Dialogue and Development - May 21st
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Themes for the week</h5>
              <p className="card-text common-p-style">
                1. <b>Emotions in Motion</b>: Use various artistic mediums to depict emotions in motion.
                Capture the essence of joy, sadness, anger.
              </p>
              <p className="card-text common-p-style">
                2. <b>Dreamscapes</b>: Let your imagination wander and create dreamlike landscapes or scenes.
                Combine elements of reality and fantasy to depict surreal and whimsical environments
                that evoke a sense of wonder and intrigue
              </p>
              <p className="card-text common-p-style">
                3. <b>Human Connection</b>: Explore the theme of human connection and relationships.
                Depict various forms of connections, such as friendships, family bonds, or
                the universal ties that bring people together, emphasizing the significance of
                interpersonal connections in our lives.
              </p>
              <p className="card-text common-p-style">
                4. <b>Environmental Consciousness</b>: Address environmental issues through your artwork.
                Shed light on topics like climate change, sustainability, or conservation. Encourage
                viewers to reflect on their relationship with the natural world and the importance of
                taking care of our planet.
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Quotes for the week</h5>
              <p className="card-text common-p-style">
                1. Believe you can, and you are halfway there! - Abraham Lincoln
              </p>
              <p className="card-text common-p-style">
                2. The only way to do great work is to love what you do! - Steve Jobs
              </p>
              <p className="card-text common-p-style">
                3. Every day may not be good, but there is something good in every day!
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Think you got enough to get your creative juices going?</h5>
              <p className="card-text common-p-style">
                Send a collab request to a fellow artist on one of these topics
                because we do believe <b><i>together you create better!</i></b>
              </p>
            </div>
            <div style={{ paddingTop: "30px", paddingBottom: "30px" }} className="getInspired-buttonContainer">
              <Button type="primary" className="common-btn-dimension">
                <Link
                  href={routeToHref(toDiscover())}
                  passHref
                >Let&apos;s collaborate</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(GetInspired);