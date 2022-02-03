import Title from '../components/title'
import ProfileModal from '../components/profilePage';
import LoginModal from '../components/loginModal';
import Link from "next/link";
import Script from 'next/script';
import Head from 'next/head';
import { connect } from "react-redux";
import Image from 'next/image';
import landingDesktopImg from '../public/images/landing-desktop.png';
import landingMobileImg from '../public/images/landing-mobile.png';
import musiciansImg from '../public/images/musicians.png';
import singersImg from '../public/images/singers.png';
import paintersImg from '../public/images/painters.png';
import dancersImg from '../public/images/dancers.png';
import inspireImg from '../public/images/inspire.png';
import { Card } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { data } from 'copy';
import React, { useEffect, useState } from 'react';
import { LoginModalDetails } from 'types/model';
import { AppState } from 'types/states';

const { Meta } = Card;

export interface HomeProps {
 // homeDetails: any
  loginModalDetails: LoginModalDetails,
  userLoginData: any,
  artistListData: any
}

const Home: React.FC<HomeProps> = ({ loginModalDetails, userLoginData, artistListData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { toArtist } = useRoutesContext();

  useEffect(() => {
    if (loginModalDetails.openModal){
      setShowModal(true);
    }else{
      setShowModal(false);
    }
  }, [loginModalDetails]);

  useEffect(() => {
    console.log("userLoginData: ", userLoginData);
    if ( userLoginData ){
      if ( userLoginData.new_user ){
        setShowModal(false);
        setShowProfileModal(true);
      }else{
        setShowModal(false);
      }
    }
  }, [userLoginData])

  useEffect(() => {
    console.log("artistListData****: ", artistListData);
    if ( artistListData.status === "success" ){
      setShowProfileModal(false);
    }
  }, [artistListData])
  
  return (
    <>
      <Title title="Wondor | meet the artists" />
      { showModal && (
          <LoginModal></LoginModal>
        )
      }
      { showProfileModal && (
          <ProfileModal></ProfileModal>
        )
      }
      <div className="row">
        <div id="landing-desktop-img" className="col-md-12 m-0 p-0">
          <Image src={landingDesktopImg} layout="responsive" alt="Landing page" />
        </div>
        <div id="landing-mobile-img" className="col-md-12 m-0 p-0">
          <Image src={landingMobileImg} alt="Landing page" />
        </div>
        <div id="text-content">
          <h1>Meet artists to collaborate with on your next big idea.</h1>
          <p>Wondor connects you with artists from around the globe.  Work with them to convert your idea into a masterpiece because we believe together we create better!</p>
        </div>
      </div>

      <div className="row card-rw">
        <div>
          <h2 className="custom-padding">Popular categories</h2>
          <div className="row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 scrolling-wrapper">
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'musician'} passHref>
                <Card hoverable style={{ width: '100%', borderRadius: '20px' }} cover={<Image src={musiciansImg} alt="cards" />}>
                  <Meta title="Musicians" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'singer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={singersImg} alt="cards" />}>
                  <Meta title="Singers" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'painter'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={paintersImg} alt="cards" />}>
                  <Meta title="Painters" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'dancer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'dancer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'dancer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  userLoginData: state.user.userLoginData,
  artistListData: state.home.artistListDetails
})

export default connect(mapStateToProps, null)(Home);
