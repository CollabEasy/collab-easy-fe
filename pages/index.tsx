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
  generalFaqContent
} from "../constants/home";
import { GetBlogUrl, GetProposalUrl } from "helpers/routeHelper";

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

  const getLCPImage = () => {
    return (
      <Link href={toCategoryArtistList("writing", GetCategoryArtistTitle("writing")).as} passHref>
        <div
          className="col-sm-2 col-md-2 col-lg-2 col-xl-2 popular-category-container cursor-pointer"
        >
          <div className="popular-category-card popular-category-colors">
            <div className="popular-category-overlay"></div>
            <div className="popular-category-circle">
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
            <h5 className="common-h5-style">
              Writing
            </h5>
          </div>
        </div>
      </Link>
    )
  }

  const getMainContent = () => {
    return (
      <div className="hero-text-container">
        <div className="text-content">
          <div>
            <p className="common-p-style" style={{ marginTop: "30px" }}>
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
            {/* <h1 className="common-h1-style">
              For Your Next Collaboration
            </h1> */}
          </div>
          <p style={{ paddingTop: "2vh" }}>
            {mainContent["paragraph"]}
          </p>
          <div className="hero-text-cnt-wrapper">
            {!isLoggedIn ?
              (
                <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }} onClick={openLoginModal}>
                  Join for Free
                </button>
              ) : (
                <Link href={routeToHref(toMySearchPage())} passHref >
                  <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                    Let&apos;s Collaborate
                  </button>
                </Link>
              )
            }
            <Link href={routeToHref(toTutorial())} passHref >
              <button className="homepage-button" style={{ backgroundColor: "white", color: "black" }}>
                How it works?
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // https://jsfiddle.net/abhitalks/o3mxb4x9/1/
  const getPopularCollabCategories = () => {
    return (
      <div className="row centered-div">
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <p className="common-p-style" style={{ textAlign: "center"}}>
            Popular Collaboration Categories
            <div className="paragraph-line"></div>
          </p>
          <div className="scroll-container">
            <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
              <div className="col-12">
                <div className="scroll-list">
                  <>
                    {getLCPImage()}
                    {popularCollabCategories.map((item) => (
                      <Link href={toCategoryArtistList(item.slug, GetCategoryArtistTitle(item.slug)).as} passHref>
                        <div
                          className="col-sm-2 col-md-2 col-lg-2 col-xl-2 popular-category-container cursor-pointer"
                          key={item.id}
                        >

                          <div className="popular-category-card popular-category-colors">
                            <div className="popular-category-overlay"></div>
                            <div className="popular-category-circle">
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
                            <div className="">
                              <h5
                                className="common-h5-style"
                              >
                                {item.title}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                </div>
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
          <p className="common-p-style" style={{ textAlign: "center" }}>
            Available Collaborators
            <div className="paragraph-line"></div>
          </p>
          <div className="scroll-container">
            <div className="row-fluid" style={{ padding: "0px 20px 20px 20px" }}>
              <div className="col-12">
                <div className="scroll-list">
                  {artistsForCollab.map((item) => (
                    <Link href={routeToHref(toUserCollabPage(item.slug))}>
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
                                  style={{ background: "white", color: "black" }}
                                  className="badge bg-soft-secondary fs-14 mt-1"
                                >
                                  {category}
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
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
        <Link href={routeToHref(toAllProposalsPage("all"))} passHref>
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
        <Link href={routeToHref(toGetInspired("all"))} passHref>
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
                <h2 className="common-h3-style">Frequently Asked Questions and Resources</h2>
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
                    <button className="homepage-button" style={{ backgroundColor: "white", color: "black" }}>
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-5">
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
      <div className="row">
        <div className="signup-container">
          <div className="row d-flex justify-content-center text-align-center">
            <h1 className="common-h1-style">
              Ready for your next collaboration opportunity?
            </h1>
            <p className="common-p-style">
              Embark on a creative adventure by connecting and
              collaborating with fellow artists today.
            </p>
            <div className="hero-text-cnt-wrapper">
              <Link href={routeToHref(toAllCategoryPage())} passHref>
                <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>

                  Collab Categories

                </button>
              </Link>
              <Link href={routeToHref(toAllProposalsPage("all"))} passHref >
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

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        {getMainContent()}
      </div>

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div className="popular-collaborator-container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="section-title text-md-center">
                <h2 className="common-h2-style">
                  Together, You Create Better
                  <div className="heading-line"></div>
                </h2>
                
                <p className="common-p-style" style={{ width: "100%" }}>
                  Collaboration unites diverse artists, fostering innovation and satisfaction beyond what achieved individually.
                </p>
                <div className="hero-text-cnt-wrapper">
                  <Link href={routeToHref(toMySearchPage())} passHref >
                    <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                      Let&apos;s Collaborate
                    </button>
                  </Link>
                  <Link href={routeToHref(toAllCategoryPage())} passHref>
                    <button className="homepage-button" style={{ backgroundColor: "#E1E4E7", color: "black" }}>
                      Collab Categories
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {getPopularCollabCategories()}
        {getPopularCollaborators()}
      </div>

      <div className="row popular-proposal-section">
        <div className="row align-items-end">
          <div className="col-md-8">
            <div className="section-title text-md-start">
              <h2 className="common-h2-style">
                Have a project you want to work on together?
              </h2>
              <p className="common-p-style" style={{ width: "80%" }}>
                Millions of artists are collaborating on Instagram, YouTube, TikTok,
                and other platforms, propelling themselves to new heights of success. Start your success story by adding your project today.
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

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <div className="wondor-offerings-container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="section-title text-md-center">
                  <h2 className="common-h2-style">
                    Take Your Artistic Journey to the Next Level with Us
                    <div className="heading-line"></div>
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

      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div style={{ paddingTop: "2%", paddingBottom: "2%" }}>
          <div className="wondor-story-container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="section-title text-md-center">
                  <h2 className="common-h2-style">
                    The Wondor Story, A Story of Artists, for Artists - By an Artist.
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

      <div className="row" style={{ backgroundColor: "#D6EBE7" }}>
        <div className="basic-testimonial-container">
          <div>
            <div className="row justify-content-center mt-4">
              <div className="col-12">
                <div className="section-title">
                  <h2 className="common-h3-style">What Artists Have to Say About Us</h2>
                  <p className="common-p-style ">
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
      {getSignUpCard()}

      <div className="row">
        {getBasicFAQSection()}
      </div>

      {/* <div className="row" style={{ borderBottom: '1px solid #e8e8e8' }}>
      </div> */}

      <div className="row">
        <div style={{ paddingTop: "2%", paddingBottom: "2%"}}>
          <div className="wondor-offerings-container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="section-title text-md-center">
                  <h2 className="common-h2-style">
                    Understand the Power of Collaboration Among Artists
                  </h2>
                  <p className="common-p-style" style={{ width: "100%" }}>
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
      </div>

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
    }
  }
}

export default connector(Home);