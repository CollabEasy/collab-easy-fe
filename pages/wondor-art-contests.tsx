import { Button } from "antd";
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

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContentIdeaSubmissionModal, setShowContentIdeaSubmissionModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(-1);

  const [filteredThemes, setFilteredThemes] = useState([]);

  const { toGetInspired } = useRoutesContext()
  const router = useRouter();
  const { category } = router.query;

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

  return (
    <Layout
      title={
        "New Topics, Themes, and Quotes for Creators: Inspire Your Next Content"
      }
      name={"description"}
      content={
        "Discover new and trending content ideas instantly for your next blog post, video, or artwork every week. Start now and find the perfect theme to engage your audience and grow your reach."
      }
    >
      <div className="genericPageLayout_container">
        {windowWidth > 500 &&
          <GenericBreadcrumb
            page={"Inspiration Hub"}
          />
        }
        <HeroSection
          heading={"Showcase Your Skills And Win $$"}
          paragaraph={"We are here for you. Participate in our monthy challenges to compete, and win! Join for a chance to showcase your talent, learn from peers, and claim exclusive prizes"}
        />

        <div className="row">
          <GenericActionBanner />
        </div>
      </div>
    </Layout>
  );
};

export default connector(ContestLandingPage);
