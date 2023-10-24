import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { FooterColumn } from 'types/model/footer';
import Link from 'next/link';
import { useRoutesContext } from "../components/routeContext";
import { IsCollabRequestPage, IsContestPage, IsInspirationPage, IsLandingPage, IsProfilePage, IsRewardsPage, IsSettingPage } from 'helpers/helper';
import { useRouter } from "next/router";
import { routeToHref } from "config/routes";
import {
  SettingFilled,
  SettingOutlined,
  HomeFilled,
  HomeOutlined,
  CalendarFilled,
  CalendarOutlined,
  SmileFilled,
  SmileOutlined,
  TrophyFilled,
  TrophyOutlined,
  DollarOutlined,
  BulbFilled,
  BulbOutlined,
  WalletFilled,
  WalletOutlined,
  DollarTwoTone,
} from "@ant-design/icons";
import { AppState } from 'state';
import { ConnectedProps, connect } from 'react-redux';
import { User } from 'types/model/user';

export interface FooterProps {
  footerLinkColumns: FooterColumn[]
}

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const connector = connect(mapStateToProps, null);
type Props = {
  footerLinkColumns: FooterColumn[],
  user: User;
  isLoggedIn: boolean;
} & ConnectedProps<typeof connector>;

const Footer = ({
  isLoggedIn,
  user,
}: Props) => {
  const [windowWidth, setWindowWidth] = useState(-1);
  const [pathname, setPathname] = useState("");
  const { toEditProfile, toRewardsInfoPage, toGetInspired, toAllContestPage, toAllCategoryPage, toAboutUs, toTutorial, toTerms, toPrivacy, toContactUs } = useRoutesContext()

  const router = useRouter();

  useEffect(() => {
    var fullUrl = window.location.href;
    var hostname = window.location.hostname;
    setPathname(fullUrl.split(hostname).pop());
    setWindowWidth(window.innerWidth);
  }, []);

  const reloadPage = (page) => {
    if (page === "discover") {
      router.push("/");
    } else if (page === "collab-request") {
      router.push("/artist/settings/profile?tab=collab-request");
    } else if (page === "profile") {
      if (isLoggedIn) {
        router.push("/artist/profile/" + user.slug);
      }
    } else if (page === "rewards") {
      if (isLoggedIn) {
        router.push("/artist/settings/profile?tab=rewards");
      } else {
        router.push("/rewards-info");
      }
    } else if (page === "account") {
      router.push("/artist/settings/profile?tab=basic-information");
    } else if (page === "inspiration") {
      router.push("/get-inspired");
    } else if (page === "contest") {
      router.push("/all-contest");
    }
  }

  const getWebFooter = () => {
    return <div className="container-fluid footer-cnt">
      <div className="footer-card">
        <div className="row">
          <div className="col-md-4 col-sm-4 col-xs-4">
            <div className="footer-text pull-left">
              <div className="d-flex">
                <h1 style={{ color: "#404040", fontFamily: "pacifico", fontSize: "30px" }}>Wondor</h1>
              </div>
              <p className="common-p-style">Unlock new avenues for creativity, collaboration, and success in the world of creators 🤝 💡 🎉</p>
              <p><i className="fa fa-copyright"></i> 2023. All rights reserved.</p>
              {/* <div className="social mt-2 mb-3"> <i className="fa fa-facebook-official fa-lg"></i> <i className="fa fa-instagram fa-lg"></i> <i className="fa fa-twitter fa-lg"></i> <i className="fa fa-linkedin-square fa-lg"></i> <i className="fa fa-facebook"></i> </div> */}
            </div>
          </div>
          <div className="col-md-2 col-sm-2 col-xs-2"></div>
          <div className='col-md-6'>
            <div className='row'>
              <div className="col-md-4 col-4">
                <h6 className="common-h6-style">Company</h6>
                <ul className="common-text-style">
                  <li><a href={toAboutUs().href} >About Us</a></li>
                  <li><a href={toTerms().href} >Terms & Conditions</a></li>
                  <li><a href={toPrivacy().href} >Privacy Policy</a></li>
                  <li><a href={toTutorial().href} >Tutorial</a></li>
                </ul>
              </div>
              <div className="col-md-4 col-4">
                <h6 className="common-h6-style">For artists</h6>
                <ul className="common-text-style">
                  <li><a href={toEditProfile("profile", "basic-information").href} >Portal</a></li>
                  <li><a href={toGetInspired().href} >Inspiration</a></li>
                  <li><a href={toAllContestPage().href} >Contests</a></li>
                  <li><a href={toAllCategoryPage().href} >Categories</a></li>
                  <li><a href={toRewardsInfoPage().href} >Rewards</a></li>
                </ul>
              </div>
              <div className="col-md-4 col-4">
                <h6 className="common-h6-style">Contact</h6>
                <ul className="common-text-style">
                  <li><a href={toContactUs().href}>Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="divider mb-4"> </div> */}
      </div>
    </div>
  };

  const getMobileFooter = () => {
    return (<>
      <header className="navbar">
        <div className="navbarContainer">
          <nav className="bottom-nav">
            <div className="bottom-nav-item active" onClick={(e) => reloadPage("discover")}>
              <div className="bottom-nav-link">
                {IsLandingPage(router.pathname) ? (
                  <>
                    <HomeOutlined style={{ color: "black" }} />
                    <span className="f-10 common-text-style" style={{ color: "black" }}>Discover</span>
                  </>
                ) : (
                  <>
                    <HomeOutlined style={{ color: "grey" }} />
                    <span className="f-10 common-text-style" style={{ color: "grey" }}>Discover</span>
                  </>
                )}

              </div>
            </div>
            {isLoggedIn && (
              <div className="bottom-nav-item" onClick={(e) => reloadPage("collab-request")}>
                <div className="bottom-nav-link">
                  {IsCollabRequestPage(pathname) ? (
                    <>
                      <CalendarOutlined style={{ color: "black" }} />
                      <span className="f-10 common-text-style" style={{ color: "black" }}>Collab</span>
                    </>
                  ) : (
                    <>
                      <CalendarOutlined style={{ color: "grey" }} />
                      <span className="f-10 common-text-style" style={{ color: "grey" }}>Collab</span>
                    </>
                  )}
                </div>
              </div>
            )}
            {isLoggedIn && (
              <div className="bottom-nav-item">
                <div className="bottom-nav-link" onClick={(e) => reloadPage("profile")}>
                  {IsProfilePage(pathname) ? (
                    <>
                      <SmileOutlined style={{ color: "black" }} />
                      <span className="f-10 common-text-style" style={{ color: "black" }}>Profile</span>
                    </>
                  ) : (
                    <>
                      <SmileOutlined style={{ color: "grey" }} />
                      <span className="f-10 common-text-style" style={{ color: "grey" }}>Profile</span>
                    </>
                  )}

                </div>
              </div>
            )}
            {!isLoggedIn && (
              <div className="bottom-nav-item">
                <div className="bottom-nav-link" onClick={(e) => reloadPage("inspiration")}>
                  {IsInspirationPage(pathname) ? (
                    <>
                      <BulbOutlined style={{ color: "black" }} />
                      <span className="f-10 common-text-style" style={{ color: "black" }}>Inspiration</span>
                    </>
                  ) : (
                    <>
                      <BulbOutlined style={{ color: "grey" }} />
                      <span className="f-10 common-text-style" style={{ color: "grey" }}>Inspiration</span>
                    </>
                  )}

                </div>
              </div>
            )}
            {!isLoggedIn && (
              <div className="bottom-nav-item">
                <div className="bottom-nav-link" onClick={(e) => reloadPage("contest")}>
                  {IsContestPage(pathname) ? (
                    <>
                      <TrophyOutlined style={{ color: "black" }} />
                      <span className="f-10 common-text-style" style={{ color: "black" }}>Contest</span>
                    </>
                  ) : (
                    <>
                      <TrophyOutlined style={{ color: "grey" }} />
                      <span className="f-10 common-text-style" style={{ color: "grey" }}>Contest</span>
                    </>
                  )}

                </div>
              </div>
            )}
            <div className="bottom-nav-item">
              <div className="bottom-nav-link" onClick={(e) => reloadPage("rewards")}>
                {IsRewardsPage(pathname) ? (
                  <>
                    <DollarOutlined style={{ color: "black" }} />
                    <span className="f-10 common-text-style" style={{ color: "black" }}>Rewards</span>
                  </>
                ) : (
                  <>
                    <DollarOutlined style={{ color: "grey" }} />
                    <span className="f-10 common-text-style" style={{ color: "grey" }}>Rewards</span>
                  </>
                )}

              </div>
            </div>
            <div className="bottom-nav-item" onClick={(e) => reloadPage("account")}>
              <div className="bottom-nav-link">
                {IsSettingPage(pathname) ? (
                  <>
                    <SettingOutlined style={{ color: "black" }} />
                    <span className="f-10 common-text-style" style={{ color: "black" }}>Account</span>
                  </>
                ) : (
                  <>
                    <SettingOutlined style={{ color: "grey" }} />
                    <span className="f-10 common-text-style" style={{ color: "grey" }}>Account</span>
                  </>
                )}

              </div>
            </div>
          </nav>
        </div>
      </header>
    </>);
  };

  return (
    <>
      {windowWidth < 500 ? (
        <>
          {getMobileFooter()}
        </>
      ) : (
        <>
          <footer style={{ background: "#F8F9FA" }} className="footer-body">
            {getWebFooter()}
          </footer>
        </>
      )}
    </>
  )
}

export default Footer
