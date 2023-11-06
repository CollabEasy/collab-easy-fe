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
  popularArtist,
}) => {
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [showRefferalCodeModal, setShowRefferalCodeModal] = useState(false);
  const {
    toArtist,
    toArtistPortal,
    toGetInspired,
    toAllContestPage,
    toRewardsInfoPage,
  } = useRoutesContext();

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
            <h1 className="common-h1-style heading">
              Connect and Collaborate with{" "}
            </h1>
            {/* https://codepen.io/EricPorter/pen/JjPmOOb */}
            <h1 className="animation-content">
              <ul className="flip5">
                <li className="heading common-h1-style">Painters!</li>
                <li className="heading common-h1-style">Photographers!</li>
                <li className="heading common-h1-style">Singers!</li>
                <li className="heading common-h1-style">Dancers!</li>
                <li className="heading common-h1-style">Poets !</li>
              </ul>
            </h1>
          </div>
          <p className="f-16 common-p-style">
            Unlock New Avenues for Creativity, Collaboration, and Success in the World of Art 🤝 💡 🎉
          </p>
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
              alt="Join artist community to collab, create collab proposals, find new themes examples and arty ideas."
              loading="eager"
            />
            <div>
              <h3 className="common-h3-style">Discover Collaboration Opportunities</h3>
              <p className="common-p-style">
                Join a vibrant community of artists, explore fellow creators&pos; profiles,
                and discover new collaboration opportunities, including proposals and
                ideas for your art projects. Collaborate directly within the platform.
              </p>
            </div>
          </div>
        </div>
        <div className="column" style={{ padding: "10px" }}>
          <div className="small-card" style={{ background: "#DBECFD" }}>
            <div className="small-card-text">
              <h3 className="common-h3-style">Connect to Collaborate</h3>
              <p className="common-p-style">
                Create a centralized creator profile, link all your social media
                platforms, showcase your collaboration readiness, and take the
                first step towards achieving your creative goals.
              </p>
            </div>
            <div style={{ paddingRight: "5px" }}>
              <Image
                src={connectImage}
                height={250}
                width={250}
                alt="Creator profile with linked social media platforms and collaboration readiness"
                loading="eager"
              />
            </div>
          </div>
          <div className="small-card" style={{ background: "#FBF0C4" }}>
            <div className="small-card-text">
              <h3 className="common-h3-style">Manage collaborations Effortlessly</h3>
              <p className="common-p-style">
                easy-to-use collaboration management tools help artists send collaboration
                requests and track upcoming collaborations and project deadlines with ease.{" "}
              </p>
            </div>
            <div style={{ paddingRight: "5px" }}>
              <Image
                src={calendarImage}
                height={250}
                width={250}
                alt="Collaboration management tools to help artists work together more efficiently"
                loading="eager"
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
            <Link href={toArtist().href + item.slug} passHref>
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
                      alt={item.imgAltTag}
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
                              toArtistPortal("scratchpad")
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
      title={"Wondor - Connect with Artists, Manage Collabs, Create Proposals, and More. Join Now!"}
      name={"description"}
      content={
        "Wondor is your one-stop solution for all artsy needs. Find artists to collaborate with, manage your collabs, create proposals, find art ideas, and join monthly art competitions—all on Wondor, the all-in-one platform for singers, painters, graphic designers, and more. Sign up for free today and start exploring!"
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

const popularArtist = [
  {
    id: 1,
    title: "Writing",
    slug: "writing",
    imgUrl: writingImage,
    imgAltTag: "Creative writers collaborating on a creative writing project. Send collab request.",
  },
  {
    id: 2,
    title: "Photography",
    slug: "photography",
    imgUrl: cameramanImage,
    imgAltTag: "Photographers collaborating on creative photography. Send collab request.",
  },
  {
    id: 3,
    title: "Dancing",
    slug: "dancing",
    imgUrl: dancingImage,
    imgAltTag: "Dancers collaborating on a creative dance project. Send collab request.",
  },
  {
    id: 4,
    title: "Illustration",
    slug: "illustration",
    imgUrl: illustratorImage,
    imgAltTag: "Digital illustrators collaborating on a creative digital art project. Send collab request.",
  },
  {
    id: 5,
    title: "Music",
    slug: "musician",
    imgUrl: musicImage,
    imgAltTag: "Musicians collaborating on a creative music project. Send collab request.",
  },
  {
    id: 6,
    title: "Journaling",
    slug: "journaling",
    imgUrl: handLetteringImage,
    imgAltTag: "Photographers collaborating on creative photography. Send collab request.",
  },
  {
    id: 7,
    title: "Singing",
    slug: "singing",
    imgUrl: singingImage,
    imgAltTag: "Singers collaborating on a creative singing project. Send collab request.",
  },
  {
    id: 8,
    title: "Painting",
    slug: "painting",
    imgUrl: paintingImage,
    imgAltTag: "Painters collaborating on a creative painting project. Send collab request.",
  },
];

export async function getStaticProps({ params }) {

  // Pass post data to the page via props
  return { props: { popularArtist } }
}

export default connector(Home);
