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
import discoverImg from '../public/images/discover.svg';
import calendarImg from '../public/images/calendar.svg';
import socialImg from '../public/images/social.svg';
import photographerImg from '../public/images/popularCategories/photographer.svg'
import paintersImg from '../public/images/popularCategories/painter.svg';
import doodlingImage from '../public/images/popularCategories/doodling.svg';
import writerImg from '../public/images/popularCategories/writer.svg';
import sketchingImage from '../public/images/popularCategories/sketching.svg';
import handLetteringImage from '../public/images/popularCategories/handLettering.svg';
import contestTileImage from '../public/images/contestTile.svg';
import { routeToHref } from "config/routes";

import inspireImg from '../public/images/inspire.svg';
import ideaImg from '../public/images/idea.svg';
import { Card } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { data } from 'copy';
import { updateLoginData } from 'state/action';
import React, { useEffect, useState } from 'react';
import { LoginModalDetails } from 'types/model';
import { AppState } from 'types/states';
import { getLoginDetails } from 'helpers/helper';
import Search from '@/components/search';

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
  const { toArtist, toEditProfile, toGetInspired, toAllContestPage } = useRoutesContext();

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
      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div className="header-text">
          <div className="text-content">
            <h1 className="common-h1-style">Connect. Collaborate. Conquer.</h1>
            <h6 className="common-p-style">Work with like minded people from around the globe to convert your idea into a masterpiece because we believe <b className="common-text-style"><i>together you create better</i></b> 🤝 💡 🎉</h6>
            <b id="text-content-tagline" className="common-p-style"><i>together you create better 🤝 💡 🎉</i></b>
          </div>
        </div>
      </div>

      <div className="row" style={{ padding: "20px", display: "flex" }}>
        <div className="container">
          <div className="column" style={{ padding: "10px" }}>
            <div style={{ height: "100%", background: "#E2F0CB", borderRadius: "10px", justifyContent: "space-around", alignItems: "center", padding: "5px" }}>
              <Image
                src={socialImg}
                height={400}
                width={400}
                priority
              />
              <h3 className="common-h3-style">Connect with artists to collaborate</h3>
              <p className="common-p-style" style={{ width: "60%" }}>Connect with artists on various social media like instagram, youtube, tiktok etc </p>
            </div>
          </div>
          <div className="column" style={{ padding: "10px" }}>
            <div style={{ height: "49%", background: "#DBECFD", marginBottom: "10px", alignItems: "center", borderRadius: "10px", display: "flex", justifyContent: "space-around" }}>
              <div style={{ padding: "20px" }}>
                <h3 className="common-h3-style">User Journey</h3>
                <p className="common-p-style" style={{ width: "60%" }}>Connect with artists on various social media like instagram, youtube, tiktok etc </p>
              </div>
              <div style={{ padding: "5px" }}>
                <Image
                  src={calendarImg}
                  height={350}
                  width={350}
                  priority
                />
            </div>
            </div>
            <div style={{ height: "49%", background: "#FBF0C4", marginTop: "10px", alignItems: "center", borderRadius: "10px", display: "flex", justifyContent: "space-around" }}>
              <div style={{ padding: "20px" }}>
                <h3 className="common-h3-style">User Journey</h3>
                <p className="common-p-style" style={{ width: "60%" }}>Connect with artists on various social media like instagram, youtube, tiktok etc </p>
              </div>
              <div style={{ padding: "5px" }}>
                <Image
                  src={socialImg}
                  height={350}
                  width={350}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ height: "500px", backgroundColor: "#FAFCFE", padding: "20px", display: "flex" }}>
        <div style={{ width: "30%", wordWrap: "break-word" }}>
          <h3 className="common-h3-style">Popular Categories for Collaboration</h3>
        </div>
        <div className="row mt-2 g-4">
          <div className="col-md-3">
            <div className="card p-1">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Mobile</span> <span>Phones</span> </div>
                <div> <img src="https://i.imgur.com/b9zkoz0.jpg" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Head</span> <span>Phones</span> </div>
                <div> <img src="https://i.imgur.com/SHWASPG.png" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Smart</span> <span>Watches</span> </div>
                <div> <img src=" https://i.imgur.com/Ya0OXCv.png" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Air</span> <span>Purifiers</span> </div>
                <div> <img src="https://i.imgur.com/2gvGwbh.png" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2tr5">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Vacuum</span> <span>Cleaners</span> </div>
                <div> <img src="https://i.imgur.com/UMQJpSG.png" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Washing</span> <span>Machines</span> </div>
                <div> <img src="https://i.imgur.com/e9CyhXR.png" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Smart</span> <span>Televisions</span> </div>
                <div> <img src=" https://i.imgur.com/Zq8VigZ.png" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="flex-column lh-1 imagename"> <span>Laptops</span> </div>
                <div> <img src="https://i.imgur.com/6pK5oZl.jpg" height="100" width="100" /> </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card-rw'>
        <h2 className="custom-padding common-h2-style">Popular Collab Categories</h2>
        <div className="row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 scrolling-wrapper">
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <Card hoverable style={{ height: '100%' }} cover={<Image src={writerImg} alt="cards" />}>
                <Meta className="common-text-style" title="Creative Writing" />
              </Card>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Link href={toArtist().href + 'doodling'} passHref>
              <Card hoverable style={{ height: '100%' }} cover={<Image src={doodlingImage} alt="cards" />}>
                <Meta className="common-text-style" title="Doodling" />
              </Card>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Link href={toArtist().href + 'hand-lettering'} passHref >
              <Card hoverable style={{ height: '100%' }} cover={<Image src={handLetteringImage} alt="cards" />}>
                <Meta className="common-text-style" title="Hand Lettering" />
              </Card>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Link href={toArtist().href + 'photography'} passHref>
              <Card hoverable style={{ width: '100%' }} cover={<Image src={photographerImg} alt="cards" />}>
                <Meta className="common-text-style" title="Photography" />
              </Card>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Link href={toArtist().href + 'sketching'} passHref>
              <Card hoverable style={{ height: '100%' }} cover={<Image src={sketchingImage} alt="cards" />}>
                <Meta className="common-text-style" title="Sketching" />
              </Card>
            </Link>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Link href={toArtist().href + 'painting'} passHref>
              <Card hoverable style={{ height: '100%' }} cover={<Image src={paintersImg} alt="cards" />}>
                <Meta className="common-text-style" title="Painting" />
              </Card>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="row custom-padding">
          <div style={{ cursor: 'pointer' }} className="col-12 col-sm-12 col-md-4 col-xl-4">
            <Link href={routeToHref(toGetInspired())} passHref>
              <Card style={{ height: '100%' }} cover={<Image src={inspireImg} alt="cards" />}>
                <Meta className="common-text-style" title={<span style={{ whiteSpace: 'initial' }}>Searching for an idea for your next hit? We got you covered 🥳 </span>} />
              </Card>
            </Link>
          </div>
          <div style={{ cursor: 'pointer' }} className="col-12 col-sm-12 col-md-4 col-xl-4">
            <Link href={routeToHref(toEditProfile("profile", "scratchpad"))} passHref>
              <Card style={{ height: '100%' }} cover={<Image src={ideaImg} alt="cards" sizes="small" />}>
                <Meta className="common-text-style" title={<span style={{ whiteSpace: 'initial' }}>Got an idea? Add it to your scratchpad before you forget 😎 </span>} />
              </Card>
            </Link>
          </div>
          <div style={{ cursor: 'pointer' }} className="col-12 col-sm-12 col-md-4 col-xl-4">
            <Link href={routeToHref(toAllContestPage())} passHref>
              <Card style={{ height: '100%' }} cover={<Image src={contestTileImage} alt="cards" />}>
                <Meta className="common-text-style" title={<span style={{ whiteSpace: 'initial' }}>Want to win a prize? enter Wondor monthly contests 🤑 </span>} />
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(Home);
