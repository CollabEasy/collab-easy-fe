import NewUserModal from "../components/modal/newUserModal";
import LoginModal from "../components/modal/loginModal";
import Layout from "../components/layout";
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";

import collabOfferImage from "../public/images/collab-offer.svg";
import proposalOfferImage from "../public/images/proposal-offer.svg";
import themeOfferImage from "../public/images/theme-offer.svg";
import rewardsOfferImage from "../public/images/rewards-offer.svg";
import contestOfferImage from "../public/images/content-offer.svg";

import writingDesktopImage from "../public/images/popularCategories/writing-desktop.svg";
import photographyDesktopImage from "../public/images/popularCategories/photo-desktop.svg";
import dancingDesktopImage from "../public/images/popularCategories/dance-desktop.svg";
import singingDesktopImage from "../public/images/popularCategories/singing-desktop.svg";
import illustratorDesktopImage from "../public/images/popularCategories/illustrator.svg";
import journalingDesktopImage from "../public/images/popularCategories/journaling-desktop.svg";
import paintingDesktopImage from "../public/images/popularCategories/painting-desktop.svg";
import musicDesktopImage from "../public/images/popularCategories/musician-dekstop.svg";

import exploreImage from "../public/images/artistConnect.svg";
import connectImage from "../public/images/connect.svg";
import manageImage from "../public/images/calendar.svg";


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
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { openLoginModalAction, resetUserLoggedIn } from "state/action";
import RefferalCodeModal from "@/components/modal/RefferalCodeModal";
import api from "api/client";
import { GetCategoryArtistTitle } from "helpers/categoryHelper";

const { Meta } = Card;
const { Panel } = Collapse;

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) =>
    dispatch(updateLoginData(loginDetails)),
  openLoginModalAction: () => dispatch(openLoginModalAction()),
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
  openLoginModalAction,
  popularArtist,
  mainContent,
  collabCard,
  inspirationAndContestCard,
  rewardsCard,
}) => {
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [showRefferalCodeModal, setShowRefferalCodeModal] = useState(false);
  const {
    toCategoryArtistList,
    toAllProposalsPage,
    toAllCategoryPage,
    toGetInspired,
    toTutorial,
    toAllContestPage,
    toRewardsInfoPage,
  } = useRoutesContext();

  // useEffect(() => {
  //   if (artistListData.status === "success") {
  //     setShowProfileModal(false);
  //     setShowRefferalCodeModal(false);
  //   }
  // }, [artistListData]);

  const openLoginModal = () => {
    openLoginModalAction();
  };

  const getMainContent = () => {
    return (
      <div className="hero-text-container">
        <div className="text-content">
          <div className="main-content-container">
            <h1 className="common-h1-style heading">
              {mainContent["heading"]}{" "}
            </h1>
            {/* https://codepen.io/EricPorter/pen/JjPmOOb */}
            <h1 className="animation-content">
              <ul className="flip5">
                <li className="heading common-h1-style">Painters!</li>
                <li className="heading common-h1-style">Photographers!</li>
                <li className="heading common-h1-style">Singers!</li>
                <li className="heading common-h1-style">Dancers!</li>
                <li className="heading common-h1-style">Poets !</li>
                <li className="heading common-h1-style">Journalers !</li>
                <li className="heading common-h1-style">Sketchers !</li>
              </ul>
            </h1>
          </div>
          <p className="f-16 common-p-style">
            {mainContent["paragraph"]}
          </p>
          <div>
            <a onClick={openLoginModal}>
              <button className="hero-text-container-button" style={{ backgroundColor: "#41A8F7", color: "white" }}>
                Join Today
              </button>
            </a>
            <Link href={routeToHref(toTutorial())} passHref >
              <button className="hero-text-container-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                How it works?
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const getWondorOfferings = () => {
    return (
      <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
        <div className="wondor-offerings-container">
          <Link href={routeToHref(toAllCategoryPage())} passHref>
            <div className="wondor-offerings-container-card cursor-pointer">
              <div className="card-img" style={{}}>
                <Image
                  src={collabOfferImage}
                  height={140}
                  width={250}
                  alt="abc"
                  loading="lazy"
                />
              </div>
              <div className="card-text">
                <h5 className="common-h5-style">Diverse Collaboration Categories</h5>
                <p className="common-p-style">Connect with artists from 40+ categories</p>
              </div>
            </div>
          </Link>
          <Link href={routeToHref(toAllProposalsPage())} passHref>
            <div className="wondor-offerings-container-card cursor-pointer">
              <div className="card-img" style={{}}>
                <Image
                  src={proposalOfferImage}
                  height={140}
                  width={250}
                  alt="abc"
                  loading="lazy"
                />
              </div>
              <div className="card-text">
                <h5 className="common-h5-style">Exciting Collaboration Proposals</h5>
                <p className="common-p-style">Collaborate on proposals from other artists</p>
              </div>
            </div>
          </Link>
          <Link href={routeToHref(toGetInspired())} passHref>
            <div className="wondor-offerings-container-card cursor-pointer">
              <div className="card-img" style={{}}>
                <Image
                  src={themeOfferImage}
                  height={140}
                  width={250}
                  alt="abc"
                  loading="lazy"
                />
              </div>
              <div className="card-text">
                <h5 className="common-h5-style">Inspiration Hub</h5>
                <p className="common-p-style">Latest art ideas and themes every week</p>
              </div>
            </div>
          </Link>
          <Link href={routeToHref(toAllContestPage())} passHref>
            <div className="wondor-offerings-container-card cursor-pointer">
              <div className="card-img" style={{}}>
                <Image
                  src={contestOfferImage}
                  height={140}
                  width={250}
                  alt="abc"
                  loading="lazy"
                />
              </div>
              <div className="card-text">
                <h5 className="common-h5-style">Art Challenges</h5>
                <p className="common-p-style">Participate every month and win $$</p>
              </div>
            </div>
          </Link>
          <Link href={routeToHref(toRewardsInfoPage())} passHref>
            <div className="wondor-offerings-container-card cursor-pointer">
              <div className="card-img" style={{}}>
                <Image
                  src={rewardsOfferImage}
                  height={140}
                  width={250}
                  alt="abc"
                  loading="lazy"
                />
              </div>
              <div className="card-text">
                <h5 className="common-h5-style">Endless Rewards</h5>
                <p className="common-p-style">Collect rewards points for every action you take</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  // https://jsfiddle.net/abhitalks/o3mxb4x9/1/
  const getPopularCollabCategories = () => {
    return (
      <div>
        <div className="container fluid">
          <div className="row text-left">
            <div className="col-12">
              <h2 className="common-h2-style popular-catgeory-h1">Popular Collab Categories</h2>
            </div>
          </div>
        </div>
        <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
          <div className="col-lg-12 col-md-10 ">
            <div className="popular-catgeory-list">
              <>
                {popularArtist.map((item) => (
                  <div
                    className="col-2 popular-catgeory-list-item cursor-pointer"
                    key={item.id}
                  >
                    <Link href={toCategoryArtistList(item.slug, GetCategoryArtistTitle(item.slug)).as} passHref>
                      <div >
                        <div className="d-flex justify-content-center align-items-center p-2">
                          <Image
                            src={item.imgUrl}
                            height={130}
                            width={130}
                            alt={item.imgAltTag}
                            priority
                          />
                        </div>
                        <div className="d-flex justify-content-center text-align-center p-2">
                          <h6
                            className="common-h6-style"
                          >
                            {item.title}
                          </h6>
                        </div>
                        <div className="d-flex justify-content-center p-2" style={{ textAlign: "center", whiteSpace: "pre-line" }}>
                          <p
                            className="common-p-style"
                          >
                            {item.para}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getPopularArtist = () => {
    return (
      <>
        {popularArtist.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer"
            key={item.id}
          >
            <Link href={toCategoryArtistList(item.slug, GetCategoryArtistTitle(item.slug)).as} passHref>
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

  const getCollabCards = () => {
    return (
      <div className="container">
        <div className="column" style={{ padding: "10px" }}>
          <div
            className="large-card text-center"
            style={{ background: "#E2F0CB" }}
          >
            <Image
              src={exploreImage}
              height={300}
              width={300}
              alt={collabCard["explore-card"]["imgAltTag"]}
              loading="eager"
            />
            <div>
              <h3 className="common-h3-style">{collabCard["explore-card"]["heading"]}</h3>
              <p className="common-p-style">
                {collabCard["explore-card"]["paragraph"]}
              </p>
            </div>
          </div>
        </div>
        <div className="column" style={{ padding: "10px" }}>
          <div className="small-card" style={{ background: "#DBECFD" }}>
            <div className="small-card-text">
              <h3 className="common-h3-style">{collabCard["connect-card"]["heading"]}</h3>
              <p className="common-p-style">
                {collabCard["connect-card"]["paragraph"]}
              </p>
            </div>
            <div style={{ paddingRight: "5px" }}>
              <Image
                src={connectImage}
                height={250}
                width={250}
                alt={collabCard["connect-card"]["imgAltTag"]}
                loading="eager"
              />
            </div>
          </div>
          <div className="small-card" style={{ background: "#FBF0C4" }}>
            <div className="small-card-text">
              <h3 className="common-h3-style">{collabCard["manage-card"]["heading"]}</h3>
              <p className="common-p-style">
                {collabCard["manage-card"]["paragraph"]}
              </p>
            </div>
            <div style={{ paddingRight: "5px" }}>
              <Image
                src={manageImage}
                height={250}
                width={250}
                alt={collabCard["manage-card"]["imgAltTag"]}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getSignUpCard = () => {
    return (
      <div className="row">
        <div className="signup-container">
          <div className="row d-flex justify-content-center text-align-center">
            <h1 className="signup-container-h1">
              Ready for your next collaboration opportunity?
            </h1>
            <p className="signup-container-p">
              Embark on a creative adventure by connecting and
              collaborating with fellow artists today!
            </p>
            <div>
              <Link href={routeToHref(toAllCategoryPage())} passHref>
                <button className="signup-container-button" style={{ backgroundColor: "#41A8F7", color: "white" }}>

                  Collab Categories

                </button>
              </Link>
              <Link href={routeToHref(toAllProposalsPage())} passHref >
                <button className="signup-container-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                  Collab Proposals
                </button>
              </Link>
            </div>
            <p className="signup-container-p">Are you an artist? <a onClick={openLoginModal} style={{ textDecoration: "underline" }}>Join Wondor</a></p>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getWondorOfferings()}
      </div>

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getPopularCollabCategories()}
      </div>

      <div style={{ backgroundColor: "#F8F7F4" }}>
        <div className="row popular-section">
          <div className="row align-items-end mb-4 pb-2">
            <div className="col-md-8">
              <div className="section-title text-center text-md-start">
                <h4 className="title mb-4">Find the perfect jobs</h4>
                <p className="text-muted mb-0 para-desc">Start work with Leaping. Build responsive, mobile-first projects on the web with the world's most popular front-end component library.</p>
              </div>
            </div>

            <div className="col-md-4 mt-4 ">
              <div className="text-center text-md-end">
                <a href="#" className="text-primary">View more Jobs <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-right fea icon-sm"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
              </div>
            </div>
          </div>
          <div className="row mt-2 g-4">{getPopularArtist()}</div>
        </div>
      </div>

      {/* <div className="row" style={{ padding: "50px 20px", display: "flex" }}>
        {getCollabCards()}
      </div> */}

      {getSignUpCard()}

    </Layout>
  );
};

const popularArtist = [
  {
    id: 1,
    title: "Writing",
    slug: "writing",
    imgUrl: writingDesktopImage,
    imgAltTag: "Creative writers collaborating on a creative writing project. Send collab request.",
    para: "Find writers available to collab now",
  },
  {
    id: 2,
    title: "Photography",
    slug: "photography",
    imgUrl: photographyDesktopImage,
    imgAltTag: "Photographers collaborating on creative photography. Send collab request.",
    para: "Find photographer available to collab now",
  },
  {
    id: 3,
    title: "Dancing",
    slug: "dancing",
    imgUrl: dancingDesktopImage,
    imgAltTag: "Dancers collaborating on a creative dance project. Send collab request.",
    para: "Find Dancers available to collab now",
  },
  {
    id: 4,
    title: "Illustration",
    slug: "illustration",
    imgUrl: illustratorDesktopImage,
    imgAltTag: "Digital illustrators collaborating on a creative digital art project. Send collab request.",
    para: "Find Illustrators available to collab now",
  },
  {
    id: 5,
    title: "Music",
    slug: "musician",
    imgUrl: musicDesktopImage,
    imgAltTag: "Musicians collaborating on a creative music project. Send collab request.",
    para: "Find Musicians available to collab now",
  },
  {
    id: 6,
    title: "Journaling",
    slug: "journaling",
    imgUrl: journalingDesktopImage,
    imgAltTag: "Photographers collaborating on creative photography. Send collab request.",
    para: "Find Journalers available to collab now",
  },
  {
    id: 7,
    title: "Singing",
    slug: "singing",
    imgUrl: singingDesktopImage,
    imgAltTag: "Singers collaborating on a creative singing project. Send collab request.",
    para: "Find Singers available to collab now",

  },
  {
    id: 8,
    title: "Painting",
    slug: "painting",
    imgUrl: paintingDesktopImage,
    imgAltTag: "Painters collaborating on a creative painting project. Send collab request.",
    para: "Find Painters available to collab now",
  },
];

const mainContent = {
  heading: "Connect and Collaborate with",
  paragraph: "Achieve Your Creativity Goals by Collaborating with Like-Minded Artists.",
  actionText: "Join our Thriving Community Today!"
}

const collabCard = {
  "explore-card": {
    imgAltTag: "Join artist community to collab, create collab proposals, find new themes examples and arty ideas.",
    heading: "Discover Collaboration Opportunities",
    paragraph: "Join a vibrant community of artists, explore fellow creators' profiles, and discover new collaboration opportunities, including proposals and ideas for your art projects. Collaborate directly within the platform",
  },
  "connect-card": {
    imgAltTag: "Creator profile with linked social media platforms and collaboration readiness.",
    heading: "Connect to Collaborate",
    paragraph: "Create a centralized creator profile, link all your social media platforms, showcase your collaboration readiness, and take the first step towards achieving your creative goals",
  },
  "manage-card": {
    imgAltTag: "Collaboration management tools to help artists work together more efficiently for increased productivity.",
    heading: "Manage collaborations Effortlessly",
    paragraph: "easy-to-use collaboration management tools help artists send collaboration requests and track upcoming collaborations and project deadlines with ease",
  }
}

const inspirationAndContestCard = {
  "inspiration-card": {
    imgAltTag: "Find the Perfect Theme for Your Next Blog Post, Video, or Artwork - Start Now!",
    heading: "Are you Stuck in Creativity Block?",
    paragraph: "Discover new and trending content ideas instantly for your next blog post, video, or artwork every week. Start now and find the perfect theme to engage your audience and grow your reach",
  },
  "contest-card": {
    imgAltTag: "Monthly Photography, writing, Design, Music, Video and more Contest with Prizes - Start Now!",
    heading: "Ready to Unleash Your Inner Artist?",
    paragraph: "Calling all content creators to show us your creativity to win big! Enter our monthly content creator contest for a chance to win cash prizes and more. We're looking for the best work in all categories",
  },
}

const rewardsCard = {
  imgAltTag: "Get Rewarded for Your Loyalty and Participation",
  heading: "Get rewarded for almost everything you do on Wondor!",
  paragraph: "Big or small, every action you take gets you reward points that can be redeemed for real money. So what are you waiting for? Join now, start exploring and earn points on the way",
}

export async function getStaticProps({ params }) {

  // Pass post data to the page via props
  return { props: { popularArtist, mainContent, collabCard, inspirationAndContestCard, rewardsCard } }
}

export default connector(Home);
