// import Link from "next/link";
import { connect, ConnectedProps } from "react-redux";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Search from "./search";
import { Dispatch } from "redux";
import { useRouter } from "next/router";
import { /* Menu, Dropdown, */ Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AppState } from "types/states";
import Image from "next/image";
import titleDesktopImg from "../public/images/title-desktop.svg";
import titleMobileImg from "../public/images/logo.svg";
import hamburgerImg from "../public/images/hamburger.png";
import { useRoutesContext } from "../components/routeContext";
import { routeToHref } from "config/routes";
import { openLoginModalAction, resetUserLoggedIn } from "state/action";
import { IsAdmin, IsLandingPage } from "helpers/helper";
import * as actions from "state/action";

const mapStateToProps = (state: AppState) => {
  const isLoggedIn = state.user.isLoggedIn;
  const userModel = state.user;
  const isFetchingRewardPoints = state.rewardsActivity.isFetchingRewardsPoints;
  const rewardPoints = state.rewardsActivity.rewardPoints;
  return { isLoggedIn, userModel, rewardPoints, isFetchingRewardPoints };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRewards: () => dispatch(actions.fetchRewards()),
  openLoginModalAction: () => dispatch(openLoginModalAction()),
  resetUserLoggedIn: () => dispatch(resetUserLoggedIn()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const NavBar = ({
  isLoggedIn,
  userModel,
  isFetchingRewardPoints,
  rewardPoints,
  fetchRewards,
  resetUserLoggedIn,
  openLoginModalAction,
}: Props) => {
  const [ref, inView, entry] = useInView({
    root: null,
    rootMargin: "-20px 0px 0px 0px",
  });

  const user = userModel.user;
  const [hideSignUp, setHideSignUp] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  // const [isMobileVersion, setIsMobileVersion] = useState(false);

  const router = useRouter();

  const openLoginModal = () => {
    openLoginModalAction();
  };

  const checkDevice = () => {
    return window.matchMedia("only screen and (max-width: 767px)").matches;
  };

  const { toWondorHome, toArtistProfile, toEditProfile, toAnalyticsPage } =
    useRoutesContext();
  const { toAllCategoryPage, toGetInspired, toAllContestPage, toTutorial } = useRoutesContext();

  useEffect(() => {
    const navBarElement = document.querySelector("#p-h");
    if (!inView && entry !== undefined) {
      navBarElement.classList.add("scroll-effect");
      navBarElement.classList.add("animate__fadeInDown");
      setShowSearchBar(true);
    }

    if (inView && entry !== undefined) {
      navBarElement.classList.remove("scroll-effect");
      navBarElement.classList.remove("animate__fadeInDown");
      setShowSearchBar(false);
    }
  }, [inView, entry]);

  useEffect(() => {
    if (isLoggedIn) {
      setHideSignUp(true);
      fetchRewards();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user?.profile_pic_url) setProfilePic(user.profile_pic_url);
  }, [user]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    resetUserLoggedIn();
    setHideSignUp(false);
    setShowLoginOptions(false);
  };

  return (
    <div className="row">
      <div
        id="p-h"
        className="col-lg-12 col-md-12 col-sm-12 nv-f-t animate__animated"
      >
        <div id="app-logo-desktop">
          <Link href={routeToHref(toWondorHome())} passHref>
            <Image
              src={titleDesktopImg}
              alt="Landing page"
              onClick={() => setShowLoginOptions(false)}
            />
          </Link>
        </div>
        <div id="app-logo-mobile">
          <Link href={routeToHref(toWondorHome())} passHref>
            <Image
              src={titleMobileImg}
              alt="Landing page"
              onClick={() => setShowLoginOptions(false)}
            />
          </Link>
        </div>

        <div className="navbar-search">
          <>
            {!IsLandingPage(router.pathname) || showSearchBar ? (
              <Search />
            ) : (
              <div className="navbar-links">
                <ul>
                  <li>
                    <p className="common-p-style nav-text">
                      <a href={routeToHref(toGetInspired())}>Inspiration</a>
                    </p>
                  </li>
                  <li>
                    <p className="common-p-style nav-text">
                      <a href={routeToHref(toAllContestPage())}>Contests</a>
                    </p>
                  </li>
                  <li>
                    <p className="common-p-style nav-text">
                      <a href={routeToHref(toTutorial())}>Tutorial</a>
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </>
        </div>
        {!hideSignUp ? (
          <div className="login-signup-cnt">
            <Button
              className="common-text-style login-btn"
              id="sign-up-desktop"
              type="primary"
              onClick={openLoginModal}
            >
              Log in
            </Button>
            <Button
              className="common-text-style"
              id="sign-up-desktop"
              type="primary"
              onClick={openLoginModal}
              style={{ paddingTop: "6px" }}
            >
              Sign Up
            </Button>
            <Button id="sign-up-mobile" shape="circle" onClick={openLoginModal}>
              <UserOutlined />
            </Button>
          </div>
        ) : (
          <div className="login-menu-container">
            <div
              className={`menu-icon ${showLoginOptions ? "hide-icon" : ""}`}
              onClick={() => setShowLoginOptions(!showLoginOptions)}
            >
              {user?.profile_pic_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profilePic} alt="profile-pic" />
              ) : (
                <div className="default-profile">
                  <UserOutlined className="user-icon" />
                </div>
              )}
            </div>
            {checkDevice() && showLoginOptions && (
              <div
                className="sidebar-mask"
                onClick={() => setShowLoginOptions(false)}
              ></div>
            )}
            {showLoginOptions && (
              <div
                className={`login-options-container ${checkDevice() ? "animate__animated animate__slideInRight" : ""
                  }`}
              >
                <div className={"login-mobile-userdetails"}>
                  {user?.profile_pic_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profilePic} alt="profile-pic" />
                  ) : (
                    <div className="default-profile">
                      <UserOutlined className="user-icon" />
                    </div>
                  )}
                  <div className="login-mobile-username">
                    <h3> {user.first_name} </h3>
                    <hr></hr>
                  </div>
                </div>
                <div className="common-login-option">
                  <Link
                    href={routeToHref(
                      toEditProfile("profile", "rewards")
                    )}
                    passHref
                  >
                    <div
                      className="selected-option-shadow settings-option"
                      onClick={() => setShowLoginOptions(false)}
                    >
                      <span className="f-14 common-text-style">
                        Reward Points
                      </span>
                    </div>
                  </Link>
                  <Link href={routeToHref(toArtistProfile(user.slug))} passHref>
                    <div
                      className="selected-option-shadow profile-option"
                      onClick={() => setShowLoginOptions(false)}
                    >
                      <span className="f-14 common-text-style">Profile</span>
                    </div>
                  </Link>
                  <Link
                    href={routeToHref(
                      toEditProfile("profile", "basic-information")
                    )}
                    passHref
                  >
                    <div
                      className="selected-option-shadow settings-option"
                      onClick={() => setShowLoginOptions(false)}
                    >
                      <span className="f-14 common-text-style">
                        Portal
                      </span>
                    </div>
                  </Link>
                  {IsAdmin(user.email) && (
                    <Link href={routeToHref(toAnalyticsPage())} passHref>
                      <div
                        className="selected-option-shadow settings-option"
                        onClick={() => setShowLoginOptions(false)}
                      >
                        <span className="f-14 common-text-style">
                          Admin
                        </span>
                      </div>
                    </Link>
                  )}
                  <div
                    className="selected-option-shadow logout-option"
                    onClick={logoutUser}
                  >
                    <span className="f-14 common-text-style">Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div ref={ref} className="dummy-div"></div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
