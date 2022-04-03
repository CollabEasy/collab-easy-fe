import { NextPage } from 'next'
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import headerImg from "public/images/aboutUsheader.png";
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
        <div className="footer_aboutUsHeaderPictureContainer">
          <Image
            layout="responsive"
            objectFit="contain"
            src={headerImg}
            alt="Landing page" />

        </div>
        <div className="footer_aboutUsBodyTextContainer">
          <div>
            <h5>What is Wondor?</h5>
            <p>
              Content creators are spread out on various social media platforms - some on instagram, others on youtube,
              and we are here to help you discover these creators so that you can work with them on your next big thing.
              Search for the art category to find the artists whose work most inpire you to work with them.<br></br><br></br>
              Take your time, explore the site, checkout different artists,
              and in the end, feel confident in the content you create by collaborating with them.
              This site is an attempt to help all of the artists in their journey to find the artists they would want to collaborate with.
              We’ll continually strive to offer tools that serve you towards this end.
              Why? For lots of reasons, but mainly and simply, because when it comes to you - <strong>we care</strong>.
            </p>
          </div>
          <div>
            <h5>Why Wondor?</h5>
            <p>When you are a content creator, the quality of your content is one of the most important things but
              so is collaborting with other artists. By collaborating, you learn from each other and at the same time
              increase your reach. <br></br><br></br>
              Today, artists are everywhere and it makes it difficult to find the right one for yourself to collaborate
              because there are so many platform artists are scattered over. Currently, there is no one place where you
              can see all of the artists from all of the platforms. We have tried to gather, in one place, all of the artists
              ready to collaborate with others. For each artists, you can see their sample work, their presence on various social
              platforms and if they are available to collaborate, and all this information is shared freely, in a convenient user
              interface. Thus, artists can see all their possible options in one view, and ultimately make a wise decision about who inspires
              them the most to collaborate with on their next big hit. </p>
          </div>
        </div>
        <div className="footer_aboutUsButtonContainer">
          <Button type="primary" className="common-btn-dimension">
            <Link
              href={routeToHref(toDiscover())}
              passHref
            >Lets Collaborate</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default connector(AboutUs);
