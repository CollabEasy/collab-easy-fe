import React, { useEffect, useState } from 'react'
import { FooterColumn } from 'types/model/footer';
import Link from 'next/link';
import { useRoutesContext } from "../components/routeContext";
import { IsLandingPage } from 'helpers/helper';
import { useRouter } from "next/router";
import { routeToHref } from "config/routes";
import {
  SettingOutlined,
  HomeOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
} from "@ant-design/icons";

export interface FooterProps {
  footerLinkColumns: FooterColumn[]
}

export const Footer: React.FC<FooterProps> = ({
  footerLinkColumns
}) => {
  const [windowWidth, setWindowWidth] = useState(-1);
  const [isActive, setIsActive] = useState(true);
  const { toWondorHome, toArtistProfile, toEditProfile, toRewardsInfoPage, toGetInspired, toAllContestPage, toAllCategoryPage, toAboutUs, toTutorial, toTerms, toPrivacy, toContactUs } = useRoutesContext()

  const router = useRouter();

  useEffect(() => {
    var navItems = document.querySelectorAll(".bottom-nav-item");

    navItems.forEach(function (e, i) {
      e.addEventListener("click", function (e) {
        navItems.forEach(function (e2, i2) {
          e2.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
    setWindowWidth(window.innerWidth);
  }, []);

  const GetFooter = () => {
    return <div className="container-fluid footer-cnt">
      <div className="footer-card">
        <div className="row mb-4">
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
  const reloadPage = (page) => {
    if (page === "discover") {
      router.push("/");
    } else if (page === "collab-request") {
      router.push("/artist/settings/profole?tab=collab-request");
    } else if (page === "profile") {
      router.push("/artist/profile/wondor-wondor-1");
    } else if (page === "rewards") {
      router.push("/artist/settings/profile?tab=rewards");
    } else if (page === "account") {
      router.push("/artist/settings/profile?tab=basic-information");
    }
  }

  const getMobileNavbar = () => {
    return (<>
      <header className="navbar">
        <div className="navbarContainer">
          <nav className="bottom-nav">
            <div className="bottom-nav-item active" onClick = {(e) => reloadPage("discover")}>
              <div className="bottom-nav-link">
                <HomeOutlined />
                <span className="f-12 common-text-style">Discover</span>
              </div>
            </div>
            <div className="bottom-nav-item" onClick = {(e) => reloadPage("collab-request")}>
              <div className="bottom-nav-link">
                    <CalendarOutlined />
                    <span className="f-12 common-text-style">Collab</span>
              </div>
            </div>
            <div className="bottom-nav-item">
              <div className="bottom-nav-link" onClick = {(e) => reloadPage("profile")}>
                    <UserOutlined />
                    <span className="f-12 common-text-style">Profile</span>
              </div>
            </div>
            <div className="bottom-nav-item">
              <div className="bottom-nav-link" onClick = {(e) => reloadPage("rewards")}>

                    <DollarOutlined />
                    <span className="f-12 common-text-style">Rewards</span>

              </div>
            </div>
            <div className="bottom-nav-item" onClick = {(e) => reloadPage("account")}>
              <div className="bottom-nav-link">
                    <SettingOutlined />
                    <span className="f-12 common-text-style">Account</span>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>);
  };

  return (
    <>
      {windowWidth > 500 ? (
        <>
          {IsLandingPage(router.pathname) ? (
            <footer style={{ background: "#F8F9FA" }} className="footer-body">
              {GetFooter()}
            </footer>
          ) : (
            <footer style={{ background: "#F8F9FA" }} className="footer-body">
              {GetFooter()}
            </footer>
          )}
        </>
      ) : (
        <>
          {getMobileNavbar()}
        </>
      )}
    </>
  )
}

export default Footer
