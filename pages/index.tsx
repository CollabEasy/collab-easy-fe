import NewUserModal from "../components/modal/newUserModal";
import LoginModal from "../components/modal/loginModal";
import Layout from "../components/layout";
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "components/routeContext";
import { updateLoginData } from "state/action";
import React, { useEffect, useState } from "react";
import { LoginModalDetails, User } from "types/model";
import { AppState } from "types/states";
import { openLoginModalAction, resetUserLoggedIn } from "state/action";
import api from "api/client";
import { GetCategoryArtistTitle } from "helpers/categoryHelper";
import * as actions from "state/action";
import CreateProposalModal from "@/components/modal/createProposalModal";
import { ProposalData } from "types/model/proposal";
import { getPopularCategoryImage, getPopularProposalCategory } from "helpers/homePageHelper";
import {popularCollabCategories, mainContent, artistsForCollab, popularCollabProposals, blogCard, testimonialContent} from "../constants/home";
import { Button } from "antd";

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn,
  showCreateOrEditProposalModal: state.proposal.showCreateOrUpdateProposalModal
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) =>
    dispatch(updateLoginData(loginDetails)),
  openLoginModalAction: () => dispatch(openLoginModalAction()),
  setShowCreateOrUpdateProposalModal: (show: boolean) => dispatch(actions.setShowCreateOrUpdateProposalModal(show)),
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
  showCreateOrEditProposalModal,
  openLoginModalAction,
  setShowCreateOrUpdateProposalModal,

  // Below is Content
  mainContent,
  popularCollabCategories,
  popularCollabProposals,
  artistsForCollab,
  blogCard,

}) => {
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [showRefferalCodeModal, setShowRefferalCodeModal] = useState(false);
  const {
    toCategoryArtistList,
    toAllProposalsPage,
    toAllCategoryPage,
    toGetInspired,
    toTutorial,
    toAllBlogs,
    toAllContestPage,
    toRewardsInfoPage,
    toUserCollabPage,
  } = useRoutesContext();

  // useEffect(() => {
  //   if (artistListData.status === "success") {
  //     setShowProfileModal(false);
  //     setShowRefferalCodeModal(false);
  //   }
  // }, [artistListData]);

  const emptyProposalData: ProposalData = {
    title: "",
    description: "",
    artistId: "",
    status: "",
    proposalId: "",
    collabType: "",
    categories: [],
  };

  const [proposalData, setProposalData] = useState(emptyProposalData);

  const openLoginModal = () => {
    openLoginModalAction();
  };

  const GetBlogUrl = (url) => {
    return (typeof window !== "undefined" && window.location.origin
      ? window.location.origin + url
      : "");
  }

  const GetProposalUrl = (url) => {
    return (typeof window !== "undefined" && window.location.origin
      ? window.location.origin + url
      : "");
  }

  const getMainContent = () => {
    return (
      <div className="hero-text-container">
        <div className="text-content">
          <div>
            <p className="common-p-style">
              {mainContent["actionText"]}
            </p>
            <h1 className="common-h1-style">
              Go From Solo to Team, Find
            </h1>
            {/* https://codepen.io/EricPorter/pen/JjPmOOb */}
            <h1 className="animation-content">
              <ul className="flip5">
                <li className="common-h1-style">Painters</li>
                <li className="common-h1-style">Photographers</li>
                <li className="common-h1-style">Dancers</li>
                <li className="common-h1-style">Poets</li>
                <li className="common-h1-style">Journalers</li>
                <li className="common-h1-style">Sketchers</li>
              </ul>
            </h1>
            <h1 className="common-h1-style">
              For Your Next Collaboration!
            </h1>
          </div>
          <p style={{ paddingTop: "2vh" }}>
            {mainContent["paragraph"]}
          </p>
          <div className="hero-text-cnt-wrapper">
            <button className="homepage-button" style={{ backgroundColor: "#41A8F7", color: "white" }} onClick={openLoginModal}>
              Join for Free!
            </button>
            <Link href={routeToHref(toTutorial())} passHref >
              <button className="homepage-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                How it works?
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const getLCPImage = () => {
    return (
      <div
        className="col-sm-2 col-md-2 col-lg-2 col-xl-2 scroll-list-item cursor-pointer"
      >
        <div >
          <div
            className="d-flex justify-content-center align-items-center p-2 category-icon"
          >
            <Image
              src={getPopularCategoryImage("writing")}
              layout="fixed"
              height={50}
              width={100}
              unoptimized={true}
              alt="Creative writers collaborating on a creative writing project. Send collab request."
              // className="category-icon"
              priority
            />
          </div>
          <div className="d-flex justify-content-center text-align-center p-2">
            <h5
              className="common-h5-style"
            >
              Writing
            </h5>
          </div>
          <div className="overlay-cnt"></div>
          <div className="d-flex justify-content-center card-btn-info-cnt" style={{ textAlign: "center", whiteSpace: "pre-line" }}>
            <p
              className="common-p-style"
            >
              Find writers available to 
            </p>
            <Button ghost>
              <Link href={toCategoryArtistList("writing", GetCategoryArtistTitle("writing")).as} passHref>
                <span style={{fontWeight: 500}}>Collab Now</span>
              </Link>
            </Button>
          </div>
        </div>

      </div>
    );
  }
  // https://jsfiddle.net/abhitalks/o3mxb4x9/1/
  const getPopularCollabCategories = () => {
    return (
      <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
        <div className="scroll-container">
          <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
            <div className="col-12">
              <div className="scroll-list">
                <>
                  {getLCPImage()}
                  {popularCollabCategories.map((item) => (
                    <div
                      className="col-sm-2 col-md-2 col-lg-2 col-xl-2 scroll-list-item cursor-pointer"
                      key={item.id}
                    >

                      <div >
                        <div
                          className="d-flex justify-content-center align-items-center p-2 category-icon"
                        >
                          <Image
                            src={getPopularCategoryImage(item.slug)}
                            layout="fixed"
                            height={50}
                            width={100}
                            alt={item.imgAltTag}
                            unoptimized={true}
                            // className="category-icon"
                            loading="lazy"
                          />
                        </div>
                        <div className="d-flex justify-content-center text-align-center p-2">
                          <h5
                            className="common-h5-style"
                          >
                            {item.title}
                          </h5>
                        </div>
                        <div className="overlay-cnt"></div>
                        <div className="d-flex justify-content-center card-btn-info-cnt" style={{ textAlign: "center", whiteSpace: "pre-line" }}>
                          <p
                            className="common-p-style"
                          >
                            {item.para}
                          </p>
                          <Button ghost>
                            <Link href={toCategoryArtistList(item.slug, GetCategoryArtistTitle(item.slug)).as} passHref>
                              <span style={{fontWeight: 500}}>{item.buttonText}</span>
                            </Link>
                          </Button>
                        </div>
                      </div>

                    </div>
                  ))}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getPopularCollaborators = () => {
    return (
      <div className="row centered-div">
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <div className="scroll-container">
            <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
              <div className="col-12">
                <div className="scroll-list">
                  {artistsForCollab.map((item) => (
                    <div
                      className="col-sm-2 col-md-2 col-lg-2 col-xl-2 scroll-list-item-popular cursor-pointer"
                      key={item.id}
                    >
                      <div >
                        <div
                          className="d-flex justify-content-center align-items-center p-2 category-icon"
                        >
                          <Image
                            unoptimized
                            src={item.url}
                            height={200}
                            width={200}
                            className="collaborator-icon"
                            alt={"Send collaboration request to " + item.artist}
                            priority={true}
                          />
                        </div>
                        <div className="d-flex justify-content-center text-align-center p-2">
                          <h5
                            className="common-h5-style"
                          >
                            {item.artist}
                          </h5>
                        </div>
                        <div className="d-flex justify-content-center" style={{ textAlign: "center", whiteSpace: "pre-line" }}>
                          <p
                            className="common-p-style"
                          >
                            {/* eslint-disable react/jsx-key */}
                            {item["category"].map((category) => (
                              <span
                                style={{ background: "#EAEBED", color: "black" }}
                                className="badge bg-soft-secondary fs-14 mt-1"
                              >
                                {category}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="d-flex justify-content-center">
                          <a href={routeToHref(toUserCollabPage(item.slug))}>
                            send collab request
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getPopularCollabProposals = () => {
    return (
      <div className="popular-proposal-container" style={{ paddingTop: "2%" }}>
        <div className="row-fluid" style={{ padding: "0px 20px 0px 0px" }}>
          <div className="col-12">
            <div className="popular-proposal-list">
              <>
                {popularCollabProposals.map((proposal) => (
                  <div
                    className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 popular-proposal-list-item cursor-pointer"
                    key={proposal.id}
                  >
                    <Link href={GetProposalUrl(proposal.url)} passHref>
                      <div style={{ textAlign: "left", whiteSpace: "pre-line" }}>
                        <h5 className="common-h5-style">
                          {proposal.title}
                        </h5>
                        <p className="common-p-style text-muted mb-2">{proposal.artist}</p>
                        <ul className="list-inline text-muted">
                          <div className="d-flex flex-wrap align-items-start gap-1">
                            {getPopularProposalCategory(proposal.category)}
                          </div>
                        </ul>
                      </div>
                    </Link>
                  </div>
                ))}
                <div
                  className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 popular-proposal-list-item cursor-pointer"
                >
                  <Link href={routeToHref(toAllProposalsPage())} passHref >
                    <div style={{ textAlign: "center", whiteSpace: "pre-line" }}>
                      <p className="common-p-style mb-2">See more interesting collaboration proposals from other artists on Wondor</p>
                      <div className="align-text-center">
                        <p className="common-p-style" style={{ color: "blue" }}> See more</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getPopularBlogCard = () => {
    return (
      <>
        {blogCard.map((item) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 cursor-pointer"
            key={item.id}
          >
            <Link href={GetBlogUrl(item.url)} passHref>
              <div className="home-card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    <h6
                      className="common-h6-style font-bold"
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      {item.heading}
                    </h6>
                    <text className="common-p-style truncate-line-clamp"
                      style={{ paddingLeft: "10px", paddingRight: "10px" }}
                    >
                      {item.paragraph}
                    </text>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </>
    );
  };

  const getWondorOfferings = () => {
    return (
      <div className="wondor-offerings-container" style={{ paddingTop: "0px", paddingBottom: "4%" }}>
        <Link href={routeToHref(toAllCategoryPage())} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#FDF6F6" }}>
              <Image
                unoptimized
                src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/m66U_jdH9k2kLtryfPldyw/Workshop.svg"}
                height={140}
                width={250}
                alt="More than 35+ categories - photography, singing, journaling, music etc for collaboration."
                priority={true}
              />
            </div>
            <div className="card-text">
              <h5 className="common-h5-style">Diverse Collaboration Categories</h5>
              <p className="common-p-style">Connect with available artists from 40+ categories</p>
            </div>
          </div>
        </Link>
        <Link href={routeToHref(toAllProposalsPage())} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#FEF7EF" }}>
              <Image
                unoptimized
                src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/jpJE1BdwHkC31xMmhCxSmA/List_is_empty.svg"}
                height={140}
                width={250}
                alt="Collab proposals for singers, dancers, musicians. Checkout now"
                priority={true}
              />
            </div>
            <div className="card-text">
              <h5 className="common-h5-style">Exciting Proposals for Collaboration</h5>
              <p className="common-p-style">Collaborate on proposals from other artists</p>
            </div>
          </div>
        </Link>
        <Link href={routeToHref(toGetInspired())} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#FFFEF1" }}>
              <Image
                unoptimized
                src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/zIGF_3oJAk6uj11ByHJshA/Education.svg"}
                height={140}
                width={250}
                alt="Find the Perfect Theme for Your Next Blog Post, Video, or Artwork - Start Now!"
                priority={true}
              />
            </div>
            <div className="card-text">
              <h5 className="common-h5-style">Inspiration Hub</h5>
              <p className="common-p-style">Latest art ideas and themes posted every week</p>
            </div>
          </div>
        </Link>
        <Link href={routeToHref(toAllContestPage())} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#F7FEF3" }}>
              <Image
                unoptimized
                src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/FFvCaeFyPEKpyzYgQf8Nzg/Running_competition.svg"}
                height={140}
                width={250}
                alt="Monthly Photography, writing, Design, Music, Video and more Contest with Prizes - Start Now!"
                priority={true}
              />
            </div>
            <div className="card-text">
              <h5 className="common-h5-style">Creative Art Challenges</h5>
              <p className="common-p-style">Participate every month and win $$</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  const getSignUpCard = () => {
    return (
      <div className="row">
        <div className="signup-container">
          <div className="row d-flex justify-content-center text-align-center">
            <h1 className="common-h1-style">
              Ready for your next collaboration opportunity?
            </h1>
            <p className="common-p-style">
              Embark on a creative adventure by connecting and
              collaborating with fellow artists today!
            </p>
            <div>
              <Link href={routeToHref(toAllCategoryPage())} passHref>
                <button className="homepage-button" style={{ backgroundColor: "#41A8F7", color: "white" }}>

                  Collab Categories

                </button>
              </Link>
              <Link href={routeToHref(toAllProposalsPage())} passHref >
                <button className="homepage-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                  Collab Proposals
                </button>
              </Link>
            </div>
            <p className="common-p-style">Are you an artist? <a onClick={openLoginModal} style={{ textDecoration: "underline" }}>Join Wondor!</a></p>
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

      <div className="row centered-div" style={{ backgroundColor: "#FFFFF" }}>
        {getPopularCollabCategories()}
      </div>

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div className="popular-collaborator-container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="section-title text-md-center">
                <h2 className="common-h2-style">
                  Together, You Create Better!
                </h2>
                <p className="common-p-style" style={{ width: "100%" }}>
                  Collaboration brings together artists with diverse backgrounds, skills, and perspectives,
                  fostering innovation and satisfaction beyond what&apos;s achieved individually.
                </p>
              </div>
            </div>
          </div>
        </div>
        {getPopularCollaborators()}
      </div>

      <div className="row popular-blog-section">
        <div className="row align-items-end">
          <div className="col-md-8">
            <div className="section-title text-md-start">
              <h2 className="common-h2-style">
                Collaboration Attracts a Wider Audience!
              </h2>
              <p className="common-p-style" style={{ width: "80%" }}>
                Millions of artists are collaborating on Instagram, YouTube, TikTok,
                and other platforms, propelling themselves to new heights of success.
              </p>
              <a onClick={() => {
                setShowCreateOrUpdateProposalModal(true);
              }}>
                <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                  Add Collab Proposal
                </button>
              </a>
            </div>
          </div>
        </div>
        <div>
          {getPopularCollabProposals()}
        </div>
      </div>

      {/* <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getTestimonialContent()}
      </div> */}

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <div className="wondor-offerings-container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="section-title text-md-center">
                  <h2 className="common-h2-style">
                    Wondor Helps You Take Your Artistic Journey to the Next Level!
                  </h2>
                  <p className="common-p-style" style={{ width: "100%" }}>
                    Our platform is committed to your growth. Discover fellow artists, improved collaboration experience,
                    monthly art challenges, inspiration hub – all designed to uplift your skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {getWondorOfferings()}
      </div>

      <div className="row popular-blog-section">
        <div className="row align-items-end">
          <div className="col-md-8">
            <div className="section-title text-md-start">
              <h2 className="common-h2-style">
                Go Beyond Your Comfort Zones, Try Cross-discipline Collaboration!
              </h2>
              <p className="common-p-style">
                Gain insights into the practical aspects of other disciplines, contributing to your overall artistic growth
              </p>
              <a href={routeToHref(toAllBlogs())}>
                <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                  Read More
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-2 g-4">{getPopularBlogCard()}</div>
      </div>

      {getSignUpCard()}

      {showCreateOrEditProposalModal && (
        <CreateProposalModal
          onCancel={() => {
            setShowCreateOrUpdateProposalModal(false);
          }}
          isViewMode={true}
          isEditMode={false}
          proposalDetails={proposalData}
        />
      )}

    </Layout>
  );
};



export async function getStaticProps({ params }) {

  // Pass post data to the page via props
  return { props: { popularCollabCategories, mainContent, artistsForCollab, popularCollabProposals, blogCard, testimonialContent } }
}

export default connector(Home);