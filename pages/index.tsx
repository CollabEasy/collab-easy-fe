import NewUserModal from "../components/modal/newUserModal";
import LoginModal from "../components/modal/loginModal";
import Layout from "../components/layout";
import Link from "next/link";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";

// import collabOfferImage from "../public/images/collab-offer.svg";
// import proposalOfferImage from "../public/images/proposal-offer.svg";
// import themeOfferImage from "../public/images/theme-offer.svg";
// import rewardsOfferImage from "../public/images/rewards-offer.svg";
// import contestOfferImage from "../public/images/content-offer.svg";

// import writingDesktopImage from "../public/images/categories/pencil.svg";
// import photographyDesktopImage from "../public/images/categories/camera.svg";
// import dancingDesktopImage from "../public/images/categories/dance.svg";
// import singingDesktopImage from "../public/images/categories/microphone.svg";
// import illustratorDesktopImage from "../public/images/categories/tablet.svg";
// import journalingDesktopImage from "../public/images/categories/journal.svg";
// import paintingDesktopImage from "../public/images/categories/painting.svg";
// import musicDesktopImage from "../public/images/categories/music.svg";

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
import {popularCollabCategories, mainContent, popularCollabProposals, blogCard, testimonialContent} from "../constants/home";

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
              {mainContent["heading"]}
            </h1>
            {/* https://codepen.io/EricPorter/pen/JjPmOOb */}
            <h1 className="animation-content">
              <ul className="flip5">
                <li className="common-h1-style">Painters!</li>
                <li className="common-h1-style">Photographers!</li>
                <li className="common-h1-style">Singers!</li>
                <li className="common-h1-style">Dancers!</li>
                <li className="common-h1-style">Poets!</li>
                <li className="common-h1-style">Journalers!</li>
                <li className="common-h1-style">Sketchers!</li>
              </ul>
            </h1>
          </div>
          <p className="signup-container-p">
            {mainContent["paragraph"]}
          </p>
          <div className="button-wrapper">
            <button className="hero-text-container-button" style={{ backgroundColor: "#41A8F7", color: "white" }} onClick={openLoginModal}>
              Join for Free!
            </button>
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
          <Link href={routeToHref(toRewardsInfoPage())} passHref>
            <div className="wondor-offerings-container-card cursor-pointer">
              <div className="card-img" style={{ backgroundColor: "#FDF6F6" }}>
                <Image
                  unoptimized
                  src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/UcwVlZdYwkm7qoLnfsA1VA/Woman_with_coin_near_piggy_bank.svg"}
                  height={140}
                  width={250}
                  alt="Get bonus points for Your Loyalty and Participation in Wondor community"
                  priority={true}
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

  const getPopularCategoryImage = (category) => {
    if (category === "dancing") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/eoRpjgHYYEqr0co87nwCDQ/disco_ball.svg";
    }
    else if (category === "singing") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/M5PSbrMWSU63OF34y-Dfyg/microphone.svg";
    }
    else if (category === "photography") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/C58hR0F-tkm9ZpPfkFkPUw/camera.svg";
    }
    else if (category === "writing") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/OEju2Qj12EC6OPDH0FfgAw/pencil.svg";
    }
    else if (category === "illustration") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/LtNSPsj3SkKpUYCG7NfRQg/tablet_front_view.svg";
    }
    else if (category === "musician") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/-sc9WCeBikKhhXnjAe5ePA/piano_side_view.svg";
    }
    else if (category === "journaling") {
      return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/tMlgnq4rsk-7qQLI6GtH4w/open_book.svg";
    }
    return "https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/HdM_z7rZXE-ZNeWoyJgHIA/palette.svg";
  }

  // https://jsfiddle.net/abhitalks/o3mxb4x9/1/
  const getPopularCollabCategories = () => {
    return (
      <div className="popular-category-container">
        <div className="container fluid">
          <div className="row text-left">
            <div className="col-12">
              <h2 className="common-h2-style">Popular Collaboration Categories</h2>
            </div>
          </div>
        </div>
        <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
          <div className="col-12">
            <div className="popular-catgeory-list">
              <>
                {popularCollabCategories.map((item) => (
                  <div
                    className="col-sm-2 col-md-2 col-lg-2 col-xl-2 popular-catgeory-list-item cursor-pointer"
                    key={item.id}
                  >
                    <Link href={toCategoryArtistList(item.slug, GetCategoryArtistTitle(item.slug)).as} passHref>
                      <div >
                        <div
                          className="d-flex justify-content-center align-items-center p-2 category-icon"

                        >
                          <Image
                            src={getPopularCategoryImage(item.slug)}
                            height={50}
                            width={50}
                            alt={item.imgAltTag}
                            unoptimized
                            loading="lazy"
                            className="category-icon"
                          />
                        </div>
                        <div className="d-flex justify-content-center text-align-center p-2">
                          <h5
                            className="common-h5-style"
                          >
                            {item.title}
                          </h5>
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

  const getPopularProposalCategory = (category) => {
    const skills: JSX.Element[] = [];
    category.forEach((skill: string) => {
      skills.push(
        <span className="badge bg-soft-secondary mt-1">{skill}</span>
      );
    });
    return skills;
  };

  const getPopularCollabProposals = () => {
    return (
      <div className="popular-proposal-container" style={{ paddingTop: "2%", paddingBottom: "2%" }}>
        <div className="container fluid">
          <div className="row text-left">
            <div className="col-12">
              <h2 className="common-h2-style">Popular Collaboration Proposals</h2>
            </div>
          </div>
        </div>
        <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
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


  const getTestimony = () => {
    const testimonies: JSX.Element[] = [];
    testimonialContent.forEach((testimony) => {
      testimonies.push(
        <div className="slider__contents">
          <i className="slider__image fa fa-codepen"></i>
          <h2 className="slider__caption">{testimony["user_name"]}</h2>
          <p className="slider__txt">{testimony["testimonial"]}</p>
        </div>
      );
    })
    return testimonies;
  }

  const getTestimonialContent = () => {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="item carousel-item active">

            <p className="testimonial">Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsan tincidunt. Phasellus risus risus, volutpat vel tellus ac, tincidunt fringilla massa. Etiam hendrerit dolor eget rutrum.</p>
            <p className="overview"><b>Paula Wilsons</b>Seo Analyst </p>
            <div className="star-rating"> </div>
          </div>
          <div className="item carousel-item">

            <p className="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Vestibulum idac nisl bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
            <p className="overview"><b>Paula Wilson</b>Media Analyst </p>
            <div className="star-rating"> </div>
          </div>
          <div className="item carousel-item">
            <p className="testimonial">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Utmtc tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio. Phasellus auctor velit.</p>
            <p className="overview"><b>Antonio Moreno</b>Web Developer</p>
            <div className="star-rating"> </div>
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
            <h1 className="common-h1-style">
              Ready for your next collaboration opportunity?
            </h1>
            <p className="common-p-style">
              Embark on a creative adventure by connecting and
              collaborating with fellow artists today!
            </p>
            <div className="button-wrapper">
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

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getWondorOfferings()}
      </div>

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getPopularCollabCategories()}
      </div>

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getPopularCollabProposals()}
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
                <button className="popular-blog-container-button" style={{ backgroundColor: "black", color: "white" }}>
                  Add Collab Proposal
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-2 g-4">{getPopularBlogCard()}</div>
      </div>

      {/* <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getTestimonialContent()}
      </div> */}

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
  return { props: { popularCollabCategories, mainContent, popularCollabProposals, blogCard, testimonialContent } }
}

export default connector(Home);
