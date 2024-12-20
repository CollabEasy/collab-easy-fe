/* eslint-disable react/jsx-key */

import router, { useRouter } from "next/router";
import Layout from "../components/layout";
import Link from "next/link";
import { Collapse } from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Image from "next/image";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "components/routeContext";
import { updateLoginData } from "state/action";
import React, { useEffect, useState } from "react";
import { LoginModalDetails, User } from "types/model";
import { AppState } from "types/states";
import { openLoginModalAction } from "state/action";
import { Carousel } from 'antd';
import { GetCategoryArtistTitle } from "helpers/categoryHelper";
import * as actions from "state/action";
import CreateProposalModal from "@/components/modal/createProposalModal";
import { ProposalData } from "types/model/proposal";
import { getPopularCategoryImage, getPopularProposalCategory } from "helpers/homePageHelper";
import {
  popularCollabCategories,
  mainContent,
  artistsForCollab,
  popularCollabProposals,
  blogCard,
  testimonialContent,
  generalFaqContent,
  contestSubmissions,
} from "../constants/home";
import { GetBlogUrl, GetProposalUrl } from "helpers/routeHelper";
import AnimatedList from "@/components/pages/home/animatedList";
import { CURRENT_THEMES } from "constants/inspirationIdeas";
import HeroContent from "@/components/pages/home/heroContent";
import HomePopularCatAndArtists from "@/components/pages/home/homePopularCatAndArtists";
import HomePopularInspoCards from "@/components/pages/home/homePopularInspo";

const { Panel } = Collapse;

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
  setCurrentPathName: (path: string) => dispatch(actions.setCurrentPathName(path)),
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
  setCurrentPathName,

  // Below is Content
  mainContent,
  popularCollabCategories,
  popularCollabProposals,
  artistsForCollab,
  blogCard,
  testimonialContent,
  generalFaqContent,
}) => {
  const router = useRouter();

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
    toMySearchPage,
    toUserCollabPage,
    toFAQ,
    toContactUs,
    toArtistProfile,
    toContestSubmissionPage,
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
    setCurrentPathName(router.asPath);
    router.push("/login");
  };

  const getfaqCard = (faqContent) => {
    return (
      <div className="row">
        <div style={{ width: "100%" }}>
          <div
            className="row"
            style={{ paddingLeft: "2%", paddingRight: "2%" }}
          >
            <div className="col-md-12">
              <Collapse
                ghost
                accordion
                expandIconPosition="right"
                expandIcon={({ isActive }) => <CaretDownOutlined rotate={isActive ? 180 : 0} />}
              >
                {faqContent.map((question, index) => (
                  <Panel
                    header={
                      <h6
                        className="common-h6-style"
                        style={{ textAlign: "left" }}
                      >
                        {question.question}
                      </h6>
                    }
                    key={index}
                    className="faq-header-card"
                  // style={{ borderBottom: "1px solid #e8e8e8" }}
                  >
                    <p className="common-p-style" style={{ textAlign: "left" }}>
                      {question.answer}
                    </p>
                  </Panel>
                ))}
              </Collapse>
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
                  <Link href={routeToHref(toAllProposalsPage("all"))} passHref >
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

  const getWondorOfferings = () => {
    return (
      <div className="wondor-offerings-container" style={{ paddingTop: "0px", paddingBottom: "4%" }}>
        <Link href={routeToHref(toAllCategoryPage())} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#F5F5DC" }}>
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
        <Link href={routeToHref(toAllProposalsPage("all"))} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#D9D4CA" }}>
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
        <Link href={routeToHref(toGetInspired("all"))} passHref>
          <div className="wondor-offerings-container-card cursor-pointer">
            <div className="card-img" style={{ backgroundColor: "#CFDDE8" }}>
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
            <div className="card-img" style={{ backgroundColor: "#ECE1E9" }}>
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

  const getWondorStory = () => {
    return (
      <div>
        <p className="common-p-style" style={{ width: "100%" }}>
          Do you remember the time you spent hours scouring online platforms in an
          attempt to find a collaborator who shared your vision? {" "}
          <b style={{ color: "black" }}>Each click felt like a dead end, every scroll made you hopeless, and your vision seemed to fade away!</b>
        </p>
        <p className="common-p-style" style={{ width: "100%" }}>
          Art journaling saved me during the pandemic, but as a solo creator, staying consistent
          became challenging. <b style={{ color: "black" }}>Sometimes I lacked new ideas, and at other times, motivation was
            the missing piece.</b>
        </p>
        <p className="common-p-style" style={{ width: "100%" }}>
          <i>Finding collaborators on existing platforms was a herculean task –
            an ocean of profiles with confusing collaboration preferences.{" "}</i>
          It felt like searching
          for a needle in a haystack. On top of that, juggling between tools and managing
          communication across time zones became a daunting mess.
        </p>
        <p className="common-p-style" style={{ width: "100%" }}>
          That&apos;s when I decided to work on Wondor – to create a space where we could find
          like-minded individuals, spark new ideas, and bring them to life.{" "}
          <b style={{ color: "black" }}>Here, collaboration wasn&apos;t just possible; it was effortless.</b>
        </p>
        <p className="common-p-style" style={{ width: "100%" }}>
          Designed for artists by an artist, Wondor is more than a platform;{" "}
          <b style={{ color: "black" }}>it&apos;s a global community connecting creative minds.</b>
          {" "}Forget juggling multiple tools! Wondor seamlessly integrates proposal creation,
          communication, and time-zone management, making collaboration a breeze.
        </p>
        <p className="common-p-style" style={{ width: "100%" }}>
          <span style={{ borderBottom: '1px solid black' }}>Our journey has just begun</span>, and Wondor invites you to join and shape the community
          you&apos;ve always envisioned.
        </p>
        <p className="common-p-style" style={{ width: "100%" }}>
          <b style={{ color: "black" }}><i>Stop wasting time and effort {" "}</i></b>.
          Discover seamless collaboration, boundless creativity,
          and {" "}<span style={{ borderBottom: '1px solid black' }}>a community you can proudly call your own!</span>
        </p>
        <br />
      </div>
    );
  };

  const getTestimonialCard = (testimonial) => {
    return (
      <div className="basic-testimonial-text">
        <div
          className="d-flex justify-content-center align-items-center p-2 testimony-img"
        >
          <Image
            unoptimized
            src={testimonial["img"]}
            height={75}
            width={75}
            className="testimony-img-dim"
            alt={"Send collaboration request to " + testimonial["user_name"]}
            priority={true}
          />
        </div>
        <p className="common-p-style">{testimonial["testimonial"]}</p>
        <Link href={routeToHref(toArtistProfile(testimonial["user_slug"]))} passHref>
          <h5 className="common-h5-style cursor-pointer">{testimonial["user_name"]}</h5>
        </Link>
      </div>
    );
  }

  const getBlogPosts = () => {
    return (
      <div className="col-12 popular-blog-post" style={{ paddingTop: "0px", paddingBottom: "4%" }}>
        <div className="row container">
          {blogCard.map((blog) => (
            <div className="col-12 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="widget single-news">
                <div className="image">
                  {/* eslint-disable @next/next/no-img-element */}
                  <img src="https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/KVSqk1x-kEuZo9pMZLBaGw/Group.svg" className="img-responsive" />
                  <span className="gradient"></span>
                </div>
                <div className="details">
                  <div className="category"><a href="">Blog</a></div>
                  <h3 className="common-h3-style" ><a href={GetBlogUrl(blog["url"])}>{blog["heading"]}</a></h3>
                  <time className="common-p-style">Read More</time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getBasicFAQSection = () => {
    return (
      <div className="basic-faq-section">
        <div>
          <div className="row justify-content-center mt-4">
            <div className="col-12">
              <div className="section-title">
                <h2 className="common-h3-style">
                  Frequently Asked Questions and Resources
                  <div className="heading-line"></div>
                </h2>
                <p className="common-p-style ">
                  Do you have a question about Wondor? See the list of
                  our most frequenty asked question. If your question is not listed
                  here, then please checkout our FAQ page or contact us directly.
                </p>
                <div className="hero-text-cnt-wrapper">
                  <Link href={routeToHref(toFAQ())} passHref>
                    <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                      FAQs
                    </button>
                  </Link>
                  <Link href={routeToHref(toContactUs())} passHref >
                    <button className="homepage-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="col-xl-6 col-lg-8 col-md-10 col-sm-10 col-xs-10">
              {getfaqCard(generalFaqContent)}
            </div>
          </div>
        </div>
      </div>
    )

  }

  const getSignUpCard = () => {
    return (
      <div className="row" style={{ background: '#EFF0F1', backgroundImage: 'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(239, 240, 241, 1), rgba(255, 255, 255, 1))' }}>
        <div className="signup-container">
          <div className="row d-flex justify-content-center text-align-center">
            
            {/* eslint-disable @next/next/no-img-element */}
            <img 
              src="https://cdn-in.icons8.com/OTxSoZ_Oc0qX2Dl2t7iv7Q/WWNrOkEZfUePOPMAKL9ZNQ/Car_rental.png" 
              alt="" 
            />
            
            <h1 className="common-h1-style">
              Are you ready to create your best work, together?
              <div className="heading-line"></div>
            </h1>
            <p className="common-p-style">
              Try Wondor to unlock your creative potential by connecting and
              collaborating with like-minded artists today.
            </p>
            <div className="hero-text-cnt-wrapper">
              <Link href={routeToHref(toMySearchPage())} passHref>
                <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                  Collab Opportunities
                </button>
              </Link>
              <Link href={routeToHref(toAllContestPage())} passHref >
                <button className="homepage-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                  Art Challenges
                </button>
              </Link>
              <Link href={routeToHref(toGetInspired("all"))} passHref>
                <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                  Inspiration Hub
                </button>
              </Link>
            </div>
            <p className="common-p-style">Are you an artist? <a onClick={openLoginModal} style={{ textDecoration: "underline" }}>Join Wondor!</a></p>
          </div>
        </div>
      </div>
    );
  }

  const [activeOption, setActiveOption] = useState(0);

  const handleOptionClick = (index) => {
    setActiveOption(index);
  };


  // ..... main code.....

  return (
    <Layout
      title={"Wondor - Connect with Artists, Manage Collabs, Create Proposals, and More. Join Now!"}
      name={"description"}
      content={
        "Wondor is your one-stop solution for all artsy needs. Find artists to collaborate with, manage your collabs, create proposals, find art ideas, and join monthly art competitions—all on Wondor, the all-in-one platform for singers, painters, graphic designers, and more. Sign up for free today and start exploring!"
      }
    >

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <HeroContent isLoggedIn={undefined} setCurrentPathName={undefined} />
      </div>

      <div className="row">
        <div className="popular-collaborator-container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="section-title text-md-center">
                <h2 className="common-h2-style">
                  Advance Your Artistic Journey, Together
                  <div className="heading-line"></div>
                </h2>

                <p className="common-p-style" style={{ width: "100%" }}>
                  Always wanted to start a creative project with a friend? Now you can. Meet with like-minded artists on Wondor and grow your skill sets together.
                </p>
                <div className="hero-text-cnt-wrapper">
                  <Link href={routeToHref(toMySearchPage())} passHref>
                    <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                      Discover Collaborations
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HomePopularCatAndArtists/>
      </div>

      <div className="row" style={{ backgroundColor: "#F5F5DC" }}>
        <HomePopularInspoCards />
      </div>

      {/* <div className="row">
        <div className="curved-div upper">
          <svg viewBox="0 0 1440 319">
            <path fill="#9CBCE2" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="curved-div" style={{ background: "#9CBCE2" }}>
          <h1 style={{color: "#071C75"}}>
            Wondor, A Community You Can Call Yours
          </h1>
          <p className="common-p-style" style={{color: "#071C75"}}>
            Designed for artists by an artist, Wondor is more than a platform; it&apos;s a global community connecting creative minds.
          </p>
          <svg viewBox="0 0 1440 319">
            <path fill="#fff" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div> */}

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <div className="wondor-story-container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="section-title text-md-center">
                  <h2 className="common-h2-style">
                    The Wondor Story, A Story of Artists, for Artists - By an Artist.
                    <div className="heading-line"></div>
                  </h2>
                  {getWondorStory()}
                  <div>
                    <button
                      className="homepage-button"
                      style={{ backgroundColor: "black", color: "white" }}
                      onClick={openLoginModal}
                    >
                      Be a part of this journey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="curved-div upper">
        <svg viewBox="0 0 1440 319">
          <path fill="#F3EDDF" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div> */}
      <div className="row" style={{ backgroundColor: "#F3EDDF" }}>
        <div className="basic-testimonial-container">
          <div>
            <div className="row justify-content-center mt-4">
              <div className="col-12">
                <div className="section-title">
                  <h2 className="common-h3-style">
                    What Artists Have to Say About Us
                    <div className="heading-line"></div>
                  </h2>
                  <p className="common-p-style">
                    On the way to building trust with artists around the globe. Discover how Wondor has positively impacted the
                    lives of it users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Carousel autoplay>

            {testimonialContent.map((testimonial) => (
              <>
                {getTestimonialCard(testimonial)}
              </>
            ))}

          </Carousel>
        </div>
      </div>

      <div className="row">
        {getBasicFAQSection()}
      </div>
        
      {getSignUpCard()}

      {/* <div className="row" style={{ borderBottom: '1px solid #e8e8e8' }}>
      </div> */}

      {/* <div className="row">
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <div className="wondor-offerings-container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="section-title text-md-center">
                  <h2 className="common-h2-style" style={{ color: "black" }}>
                    Understand the Power of Collaboration Among Artists
                    <div className="heading-line"></div>
                  </h2>
                  <p className="common-p-style" style={{ width: "100%", color: "black" }}>
                    Collaboration multiplies creativity, fosters innovation, and amplifies shared success.
                    Gain insights into the practical aspects of various kind of collaboration for your artistic growth.
                  </p>
                  <a href={routeToHref(toAllBlogs())}>
                    <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                      All Blogs
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {getBlogPosts()}
      </div> */}

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
  return {
    props: {
      popularCollabCategories,
      mainContent,
      artistsForCollab,
      popularCollabProposals,
      blogCard,
      testimonialContent,
      generalFaqContent,
      contestSubmissions,
    }
  }
}

export default connector(Home);