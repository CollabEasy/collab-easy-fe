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

import { routeToHref } from "config/routes";

import { Button, Card } from "antd";
import { useRoutesContext } from "components/routeContext";
import { updateLoginData } from "state/action";
import React, { useEffect, useState } from "react";
import { LoginModalDetails } from "types/model";
import { AppState } from "types/states";

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
  user: any;
  artistListData: any;
} & ConnectedProps<typeof connector>;

const Home = ({
  isLoggedIn,
  updateLoggedInData,
  loginModalDetails,
  user,
  artistListData,
}: Props) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const {
    toArtist,
    toEditProfile,
    toGetInspired,
    toAllContestPage,
    toAllCategoryPage,
  } = useRoutesContext();

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
  }, [artistListData]);

  return (
    <Layout
      title={
        "Wondor | Collaborate with Artists, Manage your Schedule, Join Monthly Art Contests!"
      }
      name={"description"}
      content={
        "Meet with artists, schedule & manage your collaboration requests, join monthly contests, find themes and ideas for your next work on Wondor!"
      }
    >
      {loginModalDetails.openModal && !user.new_user && <LoginModal />}
      {showProfileModal && <NewUserModal />}
      <div className="row" style={{ backgroundColor: "#FFFFF" }}>
        <div className="header-text">
          <div className="text-content">
            <h1 className="common-h1-style">Connect. Collaborate. Conquer.</h1>
            <h6 className="common-p-style">
              Unlock new avenues for creativity, collaboration, and success in
              the world of creators 🤝 💡 🎉
            </h6>
          </div>
        </div>
      </div>

      <div className="row" style={{ padding: "20px", display: "flex" }}>
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
                priority
              />
              <div>
                <h3 className="common-h3-style">Discover New Opportunities</h3>
                <p className="common-p-style">
                  Join vibrant community of artists, networking and interact
                  with peers. Explore the profiles of fellow creators, discover
                  new talent, exchange ideas, and initiate collaborations
                  directly within the platform.
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
                <Image src={connectImage} height={250} width={250} priority />
              </div>
            </div>
            <div className="small-card" style={{ background: "#FBF0C4" }}>
              <div className="small-card-text">
                <h3 className="common-h3-style">Streamlined Workflows</h3>
                <p className="common-p-style">
                  Easy-to-use workflow to send requests to collab and an
                  organized calendar to keep track of upcoming collaboration and
                  project deadlines.{" "}
                </p>
              </div>
              <div style={{ paddingRight: "5px" }}>
                <Image src={calendarImage} height={250} width={250} priority />
              </div>
            </div>
          </div>
        </div>
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
          <Link href={routeToHref(toAllCategoryPage())} passHref>
            <em
              style={{ textDecoration: "underline" }}
              className="cursor-pointer"
            >
              {" "}
              show more categories
            </em>
          </Link>
        </div>
        <div className="row mt-2 g-4">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "creative-writing"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">
                      Creative Writing
                    </p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image src={writingImage} height={130} width={130} />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "photography"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Photography</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image src={cameramanImage} height={130} width={130} />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6  col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "dancing"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Dancing</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image src={dancingImage} height={130} width={130} />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "digital-art"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Digital Art</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image
                      src={illustratorImage}
                      height={130}
                      width={130}
                    />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "music"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Music</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image src={musicImage} height={130} width={130} />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "journaling"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Journaling</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image
                      src={handLetteringImage}
                      height={130}
                      width={130}
                    />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "singing"} passHref>
              <div className="card" style={{ backgroundColor: "#FFFFF" }}>
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Singing</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image src={singingImage} height={130} width={130} />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 cursor-pointer">
            <Link href={toArtist().href + "painting"} passHref>
              <div className="card">
                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="flex-column lh-1">
                    {" "}
                    <p className="common-p-style font-bold">Painting</p>{" "}
                  </div>
                  <div>
                    {" "}
                    <Image src={paintingImage} height={130} width={130} />{" "}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Inspiration */}
      <div className="row">
        <div className="container">
          <div className="row d-flex justify-content-center inspire-box">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="text-center">
                    <Image src={inspireImage} height={400} width={400} />
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

      {/* Contest and Scratchpad */}
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
                    <Image src={ideaImage} height={300} width={300} />
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
                              toEditProfile("profile", "scratchpad")
                            )}
                            passHref
                          >
                            Take notes
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
                    <Image src={allContestImage} height={300} width={300} />
                  </div>
                  <div className="p-4 text-center">
                    <div className="mt-4 mb-3">
                      <h3 className="common-h3-style">
                        Want to win a prize? enter Wondor monthly contests 🤑
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
                          <Link href={routeToHref(toAllContestPage())} passHref>

                            Enter now
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
    </Layout>
  );
};

export default connector(Home);
