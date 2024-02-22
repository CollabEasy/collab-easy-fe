import { Breadcrumb, Button, Collapse } from "antd";
import Link from "next/link";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "../components/routeContext";
import LoginModal from '../components/modal/loginModal';
import { CaretDownOutlined } from '@ant-design/icons';
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
import { contestFaqContent } from "constants/faqs";

const { Panel } = Collapse;

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
    toContestPage,
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

  const getContestFAQSection = () => {
    return (
      <div className="basic-faq-section">
        <div>
          <HeroSection
            heading={"Frequently Asked Questions and Resources"}
            paragaraph={"If your question is not listed here, then please checkout our FAQ page or contact us directly"}
          />
          <div className="row justify-content-center ">
            <div className="col-xl-6 col-lg-8 col-md-10 col-sm-10 col-xs-10">
              {getfaqCard(contestFaqContent)}
            </div>
          </div>
        </div>
      </div>
    )

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
                      <Link href={routeToHref(toContestPage(option.contestSlug, "details"))}>
                        <div className="sub">{option.contestSlug}</div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row">
            {getContestFAQSection()}
          </div>

          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  );
};

export default connector(ContestLandingPage);
