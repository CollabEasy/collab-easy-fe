// import Link from "next/link";
import { connect, ConnectedProps } from "react-redux";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Search from "./searchBar";
import { Dispatch } from "redux";
import { useRouter } from "next/router";
import { Alert, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AppState } from "types/states";
import Image from "next/image";
import titleDesktopImg from "../public/images/title-desktop.svg";
import titleMobileImg from "../public/images/logo.svg";
import titleMobileBlueImg from "../public/images/mobile-blue.jpg";
import { useRoutesContext } from "../components/routeContext";
import { routeToHref } from "config/routes";
import {
  openLoginModalAction,
  resetUserLoggedIn,
  routeToMyWondor,
  setCurrentPathName,
} from "state/action";
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
  routeToMyWondor: (route: boolean) => dispatch(routeToMyWondor(route)),
  setCurrentPathName: (path: string) => dispatch(setCurrentPathName(path)),
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
  routeToMyWondor,
  setCurrentPathName,
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
  const [windowWidth, setWindowWidth] = useState(-1);
  const [showBanner, setShowBanner] = useState(true);

  const router = useRouter();

  const openLoginModal = () => {
    setCurrentPathName(router.asPath);
    router.push("/login");
  };

  const checkDevice = () => {
    return window.matchMedia("only screen and (max-width: 767px)").matches;
  };

  const {
    toWondorHome,
    toArtistPortal,
    toMyWondorPage,
    toAnalyticsPage,
    toMySearchPage,
  } =
    useRoutesContext();
  const { toGetInspired } = useRoutesContext();

  useEffect(() => {
    const navBarElement = !checkDevice()
      ? document.querySelector("#desktop-p-h")
      : document.querySelector("#p-h");
    if (!inView && entry !== undefined) {
      navBarElement.classList.add("scroll-effect");
      navBarElement.classList.add("animate__fadeInDown");
      setShowSearchBar(true);
      setShowBanner(false);
    }

    if (inView && entry !== undefined) {
      navBarElement.classList.remove("scroll-effect");
      navBarElement.classList.remove("animate__fadeInDown");
      setShowSearchBar(false);
      setShowBanner(true);
    }
    setWindowWidth(window.innerWidth);
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
    router.push("/");
    localStorage.removeItem("token");
    resetUserLoggedIn();
    setHideSignUp(false);
    setShowLoginOptions(false);
  };

  const isIntroFlow = router.asPath === "/basic-information";

  const getMobileNavbar = () => {
    return (
      <div className="row">
        <div id="p-h" className="nv-f-t animate__animated">
          <div id="app-logo-mobile">
            <Link href={routeToHref(toWondorHome())} passHref>
              <Image
                src={titleMobileBlueImg}
                alt="Wondor - Join now to collab with painters, singers, musicians and more."
                onClick={() => setShowLoginOptions(false)}
              />
            </Link>
          </div>

          <div className="navbar-search">
            <>
              <Search />
            </>
          </div>
        </div>
        <div ref={ref} className="dummy-div"></div>
      </div>
    );
  };

  const getIntroFlowNavbarMobile = () => {
    return (
      <div className="row">
        <div id="p-h" className="nv-f-t animate__animated">
          <div id="app-logo-mobile">
            <Image
              src={titleMobileBlueImg}
              alt="Wondor - Join now to collab with painters, singers, musicians and more."
              onClick={() => setShowLoginOptions(false)}
            />
          </div>
        </div>
        <div ref={ref} className="dummy-div"></div>
      </div>
    );
  };

  const getIntroFlowNavbarWeb = () => {
    return (
      <div className="row">
        <div id="desktop-p-h" className="nv-f-t animate__animated">
          <div id="app-logo-desktop">
            <Image
              src={titleDesktopImg}
              alt="Wondor - Join now to collab with painters, singers, musicians and more."
              onClick={() => setShowLoginOptions(false)}
              priority
            />
          </div>
          <div id="app-logo-mobile">
            <Image
              src={titleMobileBlueImg}
              alt="Wondor - Join now to collab with painters, singers, musicians and more."
              onClick={() => setShowLoginOptions(false)}
              priority
            />
          </div>
        </div>
      </div>
    );
  };

  const getWebNavbar = () => {
    return (
      <div className="row">
        <div id="desktop-p-h" className="nv-f-t animate__animated">
          <div id="app-logo-desktop">
            <Link href={routeToHref(toWondorHome())} passHref>
              <Image
                src={titleDesktopImg}
                alt="Wondor - Join now to collab with painters, singers, musicians and more."
                onClick={() => setShowLoginOptions(false)}
                priority
              />
            </Link>
          </div>
          <div id="app-logo-mobile">
            <Link href={routeToHref(toWondorHome())} passHref>
              <Image
                src={titleMobileBlueImg}
                alt="Wondor - Join now to collab with painters, singers, musicians and more."
                onClick={() => setShowLoginOptions(false)}
                priority
              />
            </Link>
          </div>
          <div className="navbar-search">
            <>
              <Search />
            </>
          </div>
          {!hideSignUp ? (
            <div className="login-signup-cnt">
              <Button
                className="common-text-style"
                id="sign-up-desktop"
                type="primary"
                onClick={openLoginModal}
              >
                Sign Up
              </Button>
              <Button
                className="common-text-style login-btn"
                id="sign-up-desktop"
                type="primary"
                onClick={openLoginModal}
              >
                Log in
              </Button>
              <Button
                id="sign-up-mobile"
                shape="circle"
                onClick={openLoginModal}
              >
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
              {showLoginOptions && (
                <div
                  className={`login-options-container ${checkDevice()
                      ? "animate__animated animate__slideInRight"
                      : ""
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
                  </div>
                  <div className="common-login-option">
                    <Link
                      href={routeToHref(toMySearchPage())}
                      passHref
                    >
                      <div
                        className="selected-option-shadow settings-option"
                        onClick={() => setShowLoginOptions(false)}
                      >
                        <span className="f-14 common-text-style">Search</span>
                      </div>
                    </Link>
                    <Link
                      href={routeToHref(toArtistPortal("profile"))}
                      passHref
                    >
                      <div
                        className="selected-option-shadow settings-option"
                        onClick={() => setShowLoginOptions(false)}
                      >
                        <span className="f-14 common-text-style">Profile</span>
                      </div>
                    </Link>
                    <Link href={routeToHref(toMyWondorPage())} passHref>
                      <div
                        className="selected-option-shadow settings-option"
                        onClick={() => setShowLoginOptions(false)}
                      >
                        <span className="f-14 common-text-style">myWondor</span>
                      </div>
                    </Link>
                    {IsAdmin(user.email) && (
                      <Link href={routeToHref(toAnalyticsPage())} passHref>
                        <div
                          className="selected-option-shadow settings-option"
                          onClick={() => setShowLoginOptions(false)}
                        >
                          <span className="f-14 common-text-style">Admin</span>
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

  return (
    <>
      <div id="mobile-nav">
        {isIntroFlow ? getIntroFlowNavbarMobile() : getMobileNavbar()}
      </div>
      <div id="desktop-nav">
        {showBanner && (
          <Space
            direction="vertical"
            style={{ width: "100%", textAlign: "center" }}
          >
            <Alert
              showIcon={false}
              banner
              closable
              style={{ backgroundColor: 'black' }}
              message={
                <span style={{ color: 'white' }}>
                  Checkout latest themes and ideas for your upcoming content{" "}
                  <a href={routeToHref(toGetInspired("all"))}>now!</a>
                </span>
              }
            />
          </Space>
        )}
        {isIntroFlow ? getIntroFlowNavbarWeb() : getWebNavbar()}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
