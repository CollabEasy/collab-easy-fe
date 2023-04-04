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
              You have landed on the right place! An updated list of themes and quotes will be published on this page
              <strong> every week.</strong>
              Therefore, do not forget to come back again.
              <br></br>
            </p >
            <div className="theme">
              <h5 className="card-text common-h5-style">Themes for the week</h5>
              <p className="card-text common-p-style">
                1. World Health Day - April 7th, 2023: This is an international awareness day
                sponsored by the World Health Organization. It is a day to raise awareness
                about global health issues and to encourage people to take action to improve
                their health and well-being.
              </p>
              <p className="card-text common-p-style">
                2. Climate Change: With the increasing awareness and concern for climate change,
                many artists are creating works that reflect this issue. This can range from pieces
                that raise awareness about the environmental impact of human activity to those
                that explore the beauty of nature.
              </p>
              <p className="card-text common-p-style">
                3. Politics: With the recent political upheavals in many countries, artists are
                creating works that reflect on these events. This can include pieces that comment
                on the state of democracy, freedom of speech, or the role of the media in
                shaping public opinion.
              </p>
              <p className="card-text common-p-style">
                4. Social Justice: Many artists are creating work that responds to current events
                related to social justice and human rights issues. This can include pieces that
                comment on police brutality, racism, sexism, or other forms of oppression.
              </p>
            </div>
            <div className="theme">
              <h5 className="card-text common-h5-style">Quotes for the week</h5>
              <p className="card-text common-p-style">
                1. The best way to predict your future is to create it. - Abraham Lincoln
              </p>
              <p className="card-text common-p-style">
                2. The only way to do great work is to love what you do - Steve Jobs
              </p>
              <p className="card-text common-p-style">
                3. Your time is limited, don&apos;t waste it living someone else&apos;s life - Steve Jobs
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