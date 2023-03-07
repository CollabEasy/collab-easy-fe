import Title from '../components/title'
import NewUserModal from '../components/modal/newUserModal';
import LoginModal from '../components/loginModal';
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from 'next/image';
import landingDesktopImg from '../public/images/desktop-landing.svg';
import landingMobileImg from '../public/images/mobile-landing.svg';
import photographerImg from '../public/images/popularCategories/photographer.svg'
import paintersImg from '../public/images/popularCategories/painter.svg';
import musiciansImg from '../public/images/popularCategories/musician.svg';
import dancerImg from '../public/images/popularCategories/dancer.svg';
import singersImg from '../public/images/popularCategories/singer.svg';
import writerImg from '../public/images/popularCategories/writer.svg';

import inspireImg from '../public/images/inspire.png';
import howtoImg from '../public/images/howto.png';
import { Card } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { data } from 'copy';
import { updateLoginData } from 'state/action';
import React, { useEffect, useState } from 'react';
import { LoginModalDetails } from 'types/model';
import { AppState } from 'types/states';
import { getLoginDetails } from 'helpers/helper';

const { Meta } = Card;

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

const Home = ({ isLoggedIn, updateLoggedInData, loginModalDetails, user, artistListData }: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toArtist } = useRoutesContext();

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
      <Title title="Wondor - a doorway to meet creatives around you" />
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
      <div className="row">
        <div id="landing-desktop-img" className="col-md-12 m-0 p-0">
          <Image src={landingDesktopImg} layout="responsive" alt="Landing page" priority/>
        </div>
        <div id="landing-mobile-img" className="col-md-12 m-0 p-0">
          <Image src={landingMobileImg} alt="Landing page" priority />
        </div>
        <div id="text-content">
          <h1 className="common-h1-style">Meet artists to collaborate with on your next big idea!</h1>
          <p className="common-p-style">Work with like minded people from around the globe to convert your idea into a masterpiece because we believe <b><i>together you create better!</i></b></p>
        </div>
      </div>

      <div className="row card-rw">
        <div>
          <h2 className="custom-padding common-h2-style">Popular categories</h2>
          <div className="row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 scrolling-wrapper">
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'writer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={writerImg} alt="cards" />}>
                  <Meta className="common-text-style" title="Writer" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'choreographer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancerImg} alt="cards" />}>
                  <Meta className="common-text-style" title="Choreographer" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'singer'} passHref >
                <Card hoverable style={{ height: '100%' }} cover={<Image src={singersImg} alt="cards" />}>
                  <Meta className="common-text-style" title="Singer" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'photographer'} passHref>
                <Card hoverable style={{ width: '100%' }} cover={<Image src={photographerImg} alt="cards" />}>
                  <Meta className="common-text-style" title="Photographer" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'musician'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={musiciansImg} alt="cards" />}>
                  <Meta className="common-text-style" title="Musician" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'painter'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={paintersImg} alt="cards" />}>
                  <Meta className="common-text-style" title="Painter" />
                </Card>
              </Link>
            </div>
          </div>
        </div>
        {/* <div>
          <div className="row custom-padding">
            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <Link href={toArtist().href + 'music'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={howtoImg} alt="cards" />}>
                </Card>
              </Link>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-6">
              <Link href={toArtist().href + 'music'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={inspireImg} alt="cards" />}>
                </Card>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default connector(Home);
