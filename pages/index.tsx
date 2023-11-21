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

import exploreImage from "../public/images/artistConnect.svg";
import connectImage from "../public/images/connect.svg";
import manageImage from "../public/images/calendar.svg";

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
  faqContent,
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
            <div className="wondor-offerings-container-card">
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
            <div className="wondor-offerings-container-card">
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
            <div className="wondor-offerings-container-card">
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
            <div className="wondor-offerings-container-card">
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
            <div className="wondor-offerings-container-card">
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
                    className="popular-catgeory-list-item cursor-pointer"
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
                            loading="lazy"
                          />
                        </div>
                        <div className="d-flex justify-content-center align-items-center p-2">
                          <p
                            className="common-p-style font-bold"
                          >
                            {item.title}
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

  const getProposalCard = () => {
    return (
      <div className="row" style={{ backgroundColor: "#F8F9FA" }}>
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
                      alt="Collab proposals for singers, dancers, musicians. Checkout now"
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="inspire-cnt">
                    <div className="inspire-text text-center">
                      <h3 className="common-h3-style">
                        Searching for a collaboration opportunity
                        with like-minded artists?
                      </h3>
                      <p className="common-p-style">
                        Unleash your artistic potential together.
                        Collaborate and create something extraordinary with fellow artists.
                        Checkout these amazing collab proposals.
                      </p>
                    </div>
                    <div className="mt-4 mb-4 inspire-btn">
                      <div className="cursor-pointer">
                        <Button>
                          <Link href={routeToHref(toAllProposalsPage())} passHref>
                            Show Interest
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

  const getInspirationAndContestCard = () => {
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
                      height={350}
                      width={350}
                      alt={inspirationAndContestCard["inspiration-card"]["imgAltTag"]}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="common-h3-style">
                      {inspirationAndContestCard["inspiration-card"]["heading"]}
                    </h3>
                    <p className="common-p-style">
                      {inspirationAndContestCard["inspiration-card"]["paragraph"]}
                    </p>
                    <div className="inspire-btn">
                      <div>
                        <Button type="primary">
                          <Link href={routeToHref(toGetInspired())} passHref>
                            Inspiration Hub
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
                      height={350}
                      width={350}
                      alt={inspirationAndContestCard["contest-card"]["imgAltTag"]}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="common-h3-style">
                      {inspirationAndContestCard["contest-card"]["heading"]}
                    </h3>
                    <p className="common-p-style">
                      {inspirationAndContestCard["contest-card"]["paragraph"]}
                    </p>
                    <div className="inspire-btn">
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
        <div style={{ width: "100%" }}>
          <div className="row d-flex justify-content-center rewards-box">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <Image
                      src={rewardsInfoImage}
                      height={350}
                      width={350}
                      alt={rewardsCard["imgAltTag"]}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="inspire-cnt">
                    <div className="inspire-text text-center">
                      <h3 className="common-h3-style">
                        {rewardsCard["heading"]}
                      </h3>
                      <p className="common-p-style">
                        {rewardsCard["paragraph"]}
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

  const getFAQCard = () => {
    return (
      <div className="row">
        <div style={{ width: "100%" }}>
          <div className="row d-flex justify-content-center faq-box">
            <div className="col-md-12" >
              <h5 className="common-h5-style">Frequently asked questions </h5>
              <Collapse ghost accordion>
                {faqContent.map((question, index) => (
                  <Panel header={question.question} key={index}>
                    <p className="common-p-style">{question.answer}</p>
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getLearnAboutCard = () => {
    return (
      <div className="row" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="container">
          <div className="row d-flex justify-content-left " style={{ margin: "5%" }}>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <h3 className="common-h3-style">
                      Collaboration attracts a wider audience
                    </h3>
                    <p className="common-p-style">
                      Learn how to collaborate for increased visibility and recognition
                    </p>
                    <div className="mt-4 mb-4 inspire-btn cursor-pointe">
                      <Button>
                        <Link href={routeToHref(toAllProposalsPage())} passHref>
                          Show Interest
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 cursor-pointer" >
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                      >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                      </Card>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 cursor-pointer" >
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                      >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                      </Card>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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



      {/* <div className="row" style={{ padding: "50px 20px", display: "flex" }}>
        {getCollabCards()}
      </div> */}

      {/* Inspiration */}
      {getProposalCard()}


      <div className="row popular-section">
        <div className="text-center">
          <h5 className="common-h5-style popular-text">
            Want to collaborate? Checkout what&apos;s
          </h5>
          <h3
            style={{ color: "black", marginBottom: "1px" }}
            className="common-h3-style"
          >
            {" "}
            Popular Among Artists
          </h3>
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

      {/* Contest and Scratchpad */}
      {getInspirationAndContestCard()}

      {/* rewards D4C7E8 */}
      {getRewardsCard()}

      {getLearnAboutCard()}


      {getSignUpCard()}

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

const faqContent = [
  {
    question: "What is Wondor.art?",
    answer: "Wondor.art is a platform that connects artists with other artists who are available for collaboration, provides a space for artists to create collaboration proposals, participate in monthly contests, and find inspiration for their work. Wether you are painter, singer, musician, writer etc, Wondor serves for all of your artsy needs."
  },
  {
    question: "Why should I use Wondor.art?",
    answer: "Wondor is a one-stop destination for all of your artsy needs. There are many benefits to using Wondor, including seemless process for discovering artists up for collaboration to managing collaboration requests. If you are stuck in creativity block, you can use Inspiration Hub where latest trending themes, ideas are shared on weekly basis. You can pariticpate in our monthly art challenges to showcase your skill and win exclusive prizes. There are offering and you can learn about them as you start exploring Wondor's wonderful world."
  },
  {
    question: "How can I find artists to collaborate with?",
    answer: "You can simply use our search feature to find artists by their name or listed for a specific collab catgeory that you are interested in. Browse through the list and send collab requests using the easy-to-use collab tool."
  },
  {
    question: "What types of projects are suitable for collaboration?",
    answer: "Any artist with a set of skills can collaborate with other. Visual arts, music, literature, multimedia, design, cross-disciplinary, community art, performance, educational, and social impact projects are suitable for collaboration, fostering creativity across diverse creative fields."
  },
  {
    question: "How can I create a collaboration proposal?",
    answer: "To create a collaboration proposal, artists can simply fill out a form on the Wondor.art website. The form will ask artists to provide information about their project, such as the title, a brief description, the skills required etc. Interested artists can then show interest. Once you have enough interest, you can start collaboration with interested artists within seconds."
  },
  {
    question: "How can I participate in monthly contests?",
    answer: "To participate in monthly contests, artists can simply submit their work to the Wondor.art website. The deadline for submitting entries will be posted on the website."
  },
  {
    question: "What is the Inspiration Hub?",
    answer: "The Inspiration Hub is a collection of resources that is designed to help artists find inspiration for their work. Here, we post latest content creation ideas to help artists move past their creativity block and start their next creative project."
  },
  {
    question: "What is Wondor's loyalty program?",
    answer: "The loyalty program is a program that rewards artists for helping to build the Wondor.art community. Artists can earn points by participating in contests, creating collaboration proposals, and referring other artists to the platform. Points can be redeemed for prizes, such as gift cards and discounts on Wondor.art services."
  },
  {
    question: "How much does Wondor.art cost?",
    answer: "Wondor.art is a free platform to use. There are no fees to create a profile, submit proposals, or participate in contests."
  },
  {
    question: "Who can use Wondor.art?",
    answer: "Wondor.art is open to all artists, content creators, regardless of their experience level."
  },
  {
    question: "How can I get started using Wondor.art?",
    answer: "To get started using Wondor.art, simply create a profile on the website. Once you have a profile, you can start connecting with other artists, creating collaboration proposals, and participating in contests."
  },
  {
    question: "Does Wondor.art have a mobile app?",
    answer: "No, Wondor.art does not have a mobile app. However, our website is mobile-responsive, which means you can easily access all collaboration tools on your smartphone or tablet."
  }
]
export async function getStaticProps({ params }) {

  // Pass post data to the page via props
  return { props: { popularArtist, mainContent, collabCard, inspirationAndContestCard, rewardsCard, faqContent } }
}

export default connector(Home);
