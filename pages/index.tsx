import NewUserModal from "../components/modal/newUserModal";
import LoginModal from "../components/modal/loginModal";
import Layout from "../components/layout";
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";
import artistConnectImage from "../public/images/artistConnect.svg";
import connectImage from "../public/images/connect.svg";
import calendarImage from "../public/images/calendar.svg";

import writingImage from "../public/images/popularCategories/writing.svg";
import cameramanImage from "../public/images/popularCategories/camera.svg";
import illustratorImage from "../public/images/popularCategories/illustrator.svg";
import dancingImage from "../public/images/popularCategories/dancing.svg";
import handLetteringImage from "../public/images/popularCategories/handLettering.svg";
import paintingImage from "../public/images/popularCategories/painting.svg";
import singingImage from "../public/images/popularCategories/singing.svg";
import musicImage from "../public/images/popularCategories/music.svg";

import inspireImage from "../public/images/inspire.svg";
import ideaImage from "../public/images/idea.svg";
import allContestImage from "../public/images/competition.svg";
import rewardsInfoImage from "../public/images/rewards.svg";

import { routeToHref } from "config/routes";

import { Button, Card } from "antd";
import { useRoutesContext } from "components/routeContext";
import { updateLoginData } from "state/action";
import React, { useEffect, useState } from "react";
import { LoginModalDetails, User } from "types/model";
import { AppState } from "types/states";
import RefferalCodeModal from "@/components/modal/RefferalCodeModal";
import api from "api/client";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) =>
    dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails;
  user: User;
  artistListData: any;
} & ConnectedProps<typeof connector>;

const Home = ({
  isLoggedIn,
  updateLoggedInData,
  loginModalDetails,
  user,
  artistListData,
}: Props) => {
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [showRefferalCodeModal, setShowRefferalCodeModal] = useState(false);
  const {
    toArtist,
    toEditProfile,
    toGetInspired,
    toAllContestPage,
    toRewardsInfoPage,
  } = useRoutesContext();

  const popularArtist = [
    {
      id: 1,
      title: "Creative Writing",
      link: `${toArtist().href}creative-writing`,
      imgUrl: writingImage,
    },
    {
      id: 2,
      title: "Photography",
      link: `${toArtist().href}photography`,
      imgUrl: cameramanImage,
    },
    {
      id: 3,
      title: "Dancing",
      link: `${toArtist().href}dancing`,
      imgUrl: dancingImage,
    },
    {
      id: 4,
      title: "Digital Art",
      link: `${toArtist().href}digital-art`,
      imgUrl: illustratorImage,
    },
    {
      id: 5,
      title: "Music",
      link: `${toArtist().href}music`,
      imgUrl: musicImage,
    },
    {
      id: 6,
      title: "Journaling",
      link: `${toArtist().href}journaling`,
      imgUrl: handLetteringImage,
    },
    {
      id: 7,
      title: "Singing",
      link: `${toArtist().href}singing`,
      imgUrl: singingImage,
    },
    {
      id: 8,
      title: "Painting",
      link: `${toArtist().href}painting`,
      imgUrl: paintingImage,
    },
  ];

  // useEffect(() => {
  //   if (artistListData.status === "success") {
  //     setShowProfileModal(false);
  //     setShowRefferalCodeModal(false);
  //   }
  // }, [artistListData]);

  const getMainContent = () => {
    return (
      <div className="header-text">
        <div className="text-content">
          <div className="main-content-container">
            <div className="common-h1-style heading">
              Connect and Collaborate with{" "}
            </div>
            {/* https://codepen.io/EricPorter/pen/JjPmOOb */}
            <div className="animation-content">
              <ul className="flip5">
                <li className="heading common-h1-style">Painters!</li>
                <li className="heading common-h1-style">Photographers!</li>
                <li className="heading common-h1-style">Singers!</li>
                <li className="heading common-h1-style">Dancers!</li>
                <li className="heading common-h1-style">Poets !</li>
              </ul>
            </div>
          </div>
          <h6 className="common-p-style">
            Unlock new avenues for creativity, collaboration, and success in the
            world of creators 🤝 💡 🎉
          </h6>
        </div>
      </div>
    );
  };

  const getCollabCards = () => {
    return (
      <div className="container">
        <div className="column" style={{ padding: "10px" }}>
          <div
            className="large-card text-center"
            style={{ background: "#E2F0CB" }}
          >
            <Image
              src={artistConnectImage}
              height={300}
              width={300}
              alt="landing page"
              loading="lazy"
            />
            <div>
              <h3 className="common-h3-style">Discover New Opportunities</h3>
              <p className="common-p-style">
                Join vibrant community of artists, network and interact with
                peers. Explore the profiles of fellow creators, discover new
                talent, exchange ideas, and initiate collaborations directly
                within the platform.
              </p>
            </div>
          </div>
        </div>
        <div className="column" style={{ padding: "10px" }}>
          <div className="small-card" style={{ background: "#DBECFD" }}>
            <div className="small-card-text">
              <h3 className="common-h3-style">Connect to Collaborate</h3>
              <p className="common-p-style">
                Create a centralized profile, link all social platforms,
                demonstrate collaboration readiness and unlock art world
                opportunities with fellow artists.
              </p>
            </div>
            <div style={{ paddingRight: "5px" }}>
              <Image
                src={connectImage}
                height={250}
                width={250}
                alt="landing page"
                loading="lazy"
              />
            </div>
          </div>
          <div className="small-card" style={{ background: "#FBF0C4" }}>
            <div className="small-card-text">
              <h3 className="common-h3-style">Streamlined Workflows</h3>
              <p className="common-p-style">
                Easy-to-use workflow to send requests to collab and an organized
                calendar to keep track of upcoming collaboration and project
                deadlines.{" "}
              </p>
            </div>
            <div style={{ paddingRight: "5px" }}>
              <Image
                src={calendarImage}
                height={250}
                width={250}
                alt="landing page"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getPopularArtist = () => {
    return (
      <>
        {popularArtist.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer"
            key={item.id}
          >
            <Link href={item.link} passHref>
              <div className="home-card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p
                      className="common-p-style font-bold"
                      style={{ paddingLeft: "10px" }}
                    >
                      {item.title}
                    </p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image
                      src={item.imgUrl}
                      height={130}
                      width={130}
                      alt="landing page"
                      loading="lazy"
                    />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </>
    );
  };

  const getInspirationCard = () => {
    return (
      <div className="row">
        <div className="container">
          <div className="row d-flex justify-content-center inspire-box">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <Image
                      src={inspireImage}
                      height={400}
                      width={400}
                      alt="landing page"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="inspire-cnt">
                    <div className="inspire-text text-center">
                      <h3 className="common-h3-style">
                        Searching for an idea for your next hit? We got you
                        covered 🥳
                      </h3>
                      <p className="common-p-style">
                        We provide invaluable support to artists in times of
                        need by publishing curated lists of themes and topics,
                        serving as inspiration for their next creative
                        masterpiece.
                      </p>
                    </div>
                    <div className="mt-4 mb-4 inspire-btn">
                      <div className="cursor-pointer">
                        <Button>
                          <Link href={routeToHref(toGetInspired())} passHref>
                            Get Inspiration
                          </Link>
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
    );
  };

  const getContentScratchPad = () => {
    return (
      <div className="row" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 contest-scratchpad">
              <div className="row">
                <div
                  className="col-md-6 contest-scratchpad-box"
                  style={{ backgroundColor: "#EAEED8" }}
                >
                  <div className="text-center">
                    <Image
                      src={ideaImage}
                      height={300}
                      width={300}
                      alt="landing page"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="mt-4 mb-3">
                      <h3 className="common-h3-style">
                        Got an idea? Add it to your scratchpad before you forget
                        😎
                      </h3>
                      <p className="common-p-style">
                        We provide invaluable support to artists in times of
                        need by publishing curated lists of themes and topics,
                        serving as inspiration for their next creative
                        masterpiece.
                      </p>
                    </div>
                    <div className="mt-4 inspire-btn">
                      <div>
                        <Button type="primary">
                          <Link
                            href={routeToHref(
                              toEditProfile("scratchpad")
                            )}
                            passHref
                          >
                            Take Notes
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 contest-scratchpad-box"
                  style={{ backgroundColor: "#D8EBF7" }}
                >
                  <div className="text-center">
                    <Image
                      src={allContestImage}
                      height={300}
                      width={300}
                      alt="landing page"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="mt-4 mb-3">
                      <h3 className="common-h3-style">
                        Want to earn real money? Enter Wondor monthly contests
                        🤑
                      </h3>
                      <p className="common-p-style">
                        Join our monthly contest and let your creativity be the
                        judge. For your participation, you will get reward
                        points which can be redeemed for real money. Winner of
                        the contests get more!
                      </p>
                    </div>
                    <div className="mt-4 inspire-btn">
                      <div>
                        <Button type="primary">
                          <Link href={routeToHref(toAllContestPage())} passHref>
                            Enter Now
                          </Link>
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
    );
  };

  const getRewardsCard = () => {
    return (
      <div className="row">
        <div className="container">
          <div className="row d-flex justify-content-center rewards-box">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <Image
                      src={rewardsInfoImage}
                      height={400}
                      width={400}
                      alt="landing page"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="inspire-cnt">
                    <div className="inspire-text text-center">
                      <h3 className="common-h3-style">
                        Get rewarded for almost everything you do on Wondor! 🥳
                      </h3>
                      <p className="common-p-style">
                        Big or small, every action you take gets you points that
                        can be redeemed for real money, and the best part is,
                        there&apos;s no limit on how many points you can earn.
                        So what are you waiting for? Hurry up and start earning!
                      </p>
                    </div>
                    <div className="mt-4 mb-4 inspire-btn">
                      <div className="cursor-pointer">
                        <Button>
                          <Link
                            href={routeToHref(toRewardsInfoPage())}
                            passHref
                          >
                            Earn Rewards
                          </Link>
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
    );
  };

  return (
    <Layout
      title={"Wondor | Discover artists to collaborate!"}
      name={"description"}
      content={
        "Discover artists to collaborate. Join vibrant community of artists, network and interact. Exchange ideas and collaborate on Wondor. Try for free now!"
      }
    >
      {loginModalDetails.openModal && !user.new_user && <LoginModal />}

      {isLoggedIn && <NewUserModal />}

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getMainContent()}
      </div>

      <div className="row" style={{ padding: "50px 20px", display: "flex" }}>
        {getCollabCards()}
      </div>

      {/* popular categories */}
      <div className="row popular-section">
        <div className="text-center">
          <h5 className="common-h5-style popular-text">
            Want to collaborate? Checkout what&apos;s
          </h5>
          <h1
            style={{ color: "black", marginBottom: "1px" }}
            className="common-h1-style"
          >
            {" "}
            <b>Popular Among Artists</b>
          </h1>
          {/* <Link href={routeToHref(toAllCategoryPage())} passHref>
            <em
              style={{ textDecoration: "underline" }}
              className="cursor-pointer"
            >
              {" "}
              show more categories
            </em>
          </Link> */}
        </div>
        <div className="row mt-2 g-4">{getPopularArtist()}</div>
      </div>

      {/* Inspiration */}
      {getInspirationCard()}

      {/* Contest and Scratchpad */}
      {getContentScratchPad()}

      {/* rewards D4C7E8 */}
      {getRewardsCard()}
    </Layout>
  );
};

export default connector(Home);
