import Title from '../components/title'
import NewUserModal from '../components/modal/newUserModal';
import LoginModal from '../components/loginModal';
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from 'next/image';
import connectImg from '../public/images/connect.svg';
import calendarImg from '../public/images/calendar.svg';
import socialImg from '../public/images/social.svg';
import cameramanImg from '../public/images/popularCategories/cameraman.svg'
import { routeToHref } from "config/routes";

import inspireImg from '../public/images/inspirebg.svg';
import { Button, Card } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { updateLoginData } from 'state/action';
import React, { useEffect, useState } from 'react';
import { LoginModalDetails } from 'types/model';
import { AppState } from 'types/states';

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
            <h6 className="common-p-style">
              Unlock new avenues for creativity, collaboration, and success in the world of creators 🤝 💡 🎉
            </h6>
            <b id="text-content-tagline" className="common-p-style"><i>Together you create better 🤝 💡 🎉</i></b>
          </div>
        </div>
      </div>

      <div className="row" style={{ padding: "20px", display: "flex" }}>
        <div className="container">
          <div className="column" style={{ padding: "10px" }}>
            <div className="large-card text-center" style={{ background: "#E2F0CB" }}>
              <Image
                src={socialImg}
                height={300}
                width={300}
                priority
              />
              <div>
                <h3 className="common-h3-style">Discover New Opportunities</h3>
                <p className="common-p-style">Join vibrant community of artists, networking and interact with peers.
                  Explore the profiles of fellow creators, discover new talent, exchange ideas,
                  and initiate collaborations directly within the platform.</p>
              </div>
            </div>
          </div>
          <div className="column" style={{ padding: "10px" }}>
            <div className="small-card" style={{ background: "#DBECFD" }}>
              <div className="small-card-text">
                <h3 className="common-h3-style">Connect to Collaborate</h3>
                <p className="common-p-style">Create a centralized profile,
                  link all social platforms, demonstrate collaboration readiness and unlock art
                  world opportunities with fellow artists.</p>
              </div>
              <div style={{ paddingRight: "5px" }}>
                <Image
                  src={connectImg}
                  height={250}
                  width={250}
                  priority
                />
              </div>
            </div>
            <div className="small-card" style={{ background: "#FBF0C4" }}>
              <div className="small-card-text">
                <h3 className="common-h3-style">Stremline Workflows</h3>
                <p className="common-p-style">Easy-to-use workflow to send
                  requests to collab and an organized calendar to keep track of upcoming
                  collaboration and project deadlines. </p>
              </div>
              <div style={{ paddingRight: "5px" }}>
                <Image
                  src={calendarImg}
                  height={250}
                  width={250}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* popular categories */}
      <div className="row" style={{backgroundColor: "#E0EFEC", padding: "30px 20px", display: "flex" }}>
        <div className='text-center'>
          <h3 className="common-h3-style popular-text">Popular Categories for Collaboration</h3>
        </div>
        <div className="row mt-2 g-4">
          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Creative Writing</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Doodling</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1" >
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Hand Lettering</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Illustration</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1" >
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Photography</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1" style={{ backgroundColor: "#FFFFF" }}>
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Sketching</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Painting</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 cursor-pointer">
            <Link href={toArtist().href + 'creative-writing'} passHref>
              <div className="card p-1">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1 imagename"> <p className="common-p-style font-bold">Dancing</p> </div>
                  <div> <Image src={cameramanImg} height={130} width={130} /> </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Inspiration */}
      <div className="row" >
        <div className="container">
          <div className="row d-flex justify-content-center inspire-box">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center p-4">
                    <Image
                      src={inspireImg}
                      height={400}
                      width={400}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="inspire-cnt">
                    <div className="inspire-text text-center">
                      <h3 className="common-h3-style">Searching for an idea for your next hit? We got you covered 🥳</h3>
                      <p className="common-p-style">
                        We provide invaluable support to artists in times of need by publishing curated
                        lists of themes and topics, serving as inspiration for their next creative masterpiece.
                      </p>
                    </div>
                    <div className="mt-4 inspire-btn">
                      <div className='cursor-pointer'>
                        <Button
                          type="primary"
                          className='animate__animated'
                        >
                          <Link href={routeToHref(toGetInspired())} passHref > Get Inspired </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contest and Scratchpad */}
      <div className="row" style={{backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 contest-scratchpad">
              <div className="row">
                <div className="col-md-6 contest-scratchpad-box" style={{backgroundColor: "#EAEED8"}}>
                  <div className="text-center p-4">
                    <Image
                      src={inspireImg}
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="mt-4 mb-3">
                      <h3 className="common-h3-style">Searching for an idea for your next hit? We got you covered 🥳</h3>
                      <p className="common-p-style">
                        We provide invaluable support to artists in times of need by publishing curated
                        lists of themes and topics, serving as inspiration for their next creative masterpiece.
                      </p>
                    </div>
                    <div className="mt-4 inspire-btn">
                      <div>
                        <Button
                          type="primary"
                        >
                          <Link href={routeToHref(toGetInspired())} passHref > Get Inspired </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 contest-scratchpad-box" style={{backgroundColor: "#D8EBF7"}}>
                  <div className="text-center p-4">
                    <Image
                      src={inspireImg}
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="mt-4 mb-3">
                      <h3 className="common-h3-style">Searching for an idea for your next hit? We got you covered 🥳</h3>
                      <p className="common-p-style">
                        We provide invaluable support to artists in times of need by publishing curated
                        lists of themes and topics, serving as inspiration for their next creative masterpiece.
                      </p>
                    </div>
                    <div className="mt-4 inspire-btn">
                      <div>
                        <Button
                          type="primary"
                        >
                          <Link href={routeToHref(toGetInspired())} passHref > Get Inspired </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default connector(Home);
