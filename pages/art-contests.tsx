import { Breadcrumb, Button } from "antd";
import Link from "next/link";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "../components/routeContext";
import LoginModal from '../components/modal/loginModal';
import { AppState } from 'types/states';
import { Dispatch } from "redux";
import { updateLoginData } from 'state/action';
import { connect, ConnectedProps } from "react-redux";
import { LoginModalDetails } from 'types/model';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import GenericBreadcrumb from "@/components/asset/genericBreadcrumb";
import GenericActionBanner from "@/components/asset/genericActionBanner";
import { useRouter } from "next/router";
import * as actions from "state/action";
import HeroSection from "@/components/asset/pageHeroSection";
import { contestSubmissions } from "constants/home";

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails,
  user: state.user.user,
  artistListData: state.home.artistListDetails,
  isLoggedIn: state.user.isLoggedIn,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedInData: (loginDetails: any) => dispatch(updateLoginData(loginDetails)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  loginModalDetails: LoginModalDetails;
  user: any;
  artistListData: any;
} & ConnectedProps<typeof connector>;

const ContestLandingPage = ({
  isLoggedIn,
  updateLoggedInData,
  loginModalDetails,
  user,
  artistListData,
}: Props) => {

  const router = useRouter();
  const {
    toDiscover,
    toContestSubmissionPage,
    toAllContestPage
  } = useRoutesContext();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContentIdeaSubmissionModal, setShowContentIdeaSubmissionModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(-1);
  const [activeOption, setActiveOption] = useState(0);

  const handleOptionClick = (index) => {
    setActiveOption(index);
  }

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (user) {
      if (user.new_user) {
        setShowProfileModal(true);
      }
    }
  }, [user])

  useEffect(() => {
    if (artistListData.status === "success") {
      setShowProfileModal(false);
    }
    setWindowWidth(window.innerWidth);
  }, [artistListData]);

  const getBreadcrum = (title: string) => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toAllContestPage().href}> Art Contests</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {title}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  return (
    <Layout
      title={
        "Learn About Art Contests on Wondor | Wondor"
      }
      name={"description"}
      content={
        "Join Art Contest on Wondor to let your imagination run wild and win exclusive prizes."
      }
    >
      <div className="genericPageLayout_container">
        {windowWidth > 500 &&
          <div style={{ paddingBottom: "10px" }}>
            {getBreadcrum("About")}
          </div>
        }
        <HeroSection
          heading={"Epic Art Contests to Showcase What You Got"}
          paragaraph={"Join Art Contest on Wondor to let your imagination run wild and win exclusive prizes $$"}
        />

        <div className="row">
          <div className="hero-text-cnt-wrapper">
            <Link href={routeToHref(toAllContestPage())} passHref >
              <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                Art Contests
              </button>
            </Link>
          </div>

          <div className="contest-gallery">
            <div className="options" style={{ margin: "auto" }}>
              {contestSubmissions.map((option, index) => (
                <div
                  key={index}
                  className={`option ${index === activeOption ? 'active' : ''}`}
                  style={{
                    background: option.url,
                    backgroundSize: 'cover',
                  }}
                  onClick={() => handleOptionClick(index)}
                >
                  <div className="shadow" style={{ background: "rgba(64, 73, 73, 0.5)" }}></div>
                  <div className="label">
                    <div className="info">
                      <Link href={routeToHref(toContestSubmissionPage(option.contestSlug, option.slug))}>
                        <div className="main text-decoration-underline">{option.artist}</div>
                      </Link>
                      <div className="sub">{option.category[0]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  );
};

export default connector(ContestLandingPage);
