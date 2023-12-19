import { Carousel } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card, Tag } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Image from 'next/image';
import * as actions from "state/action";
import Layout from "@/components/layout";
import Link from "next/link";
import GenericActionBanner from "@/components/genericActionBanner";
import { GetSearchPageCategories, GetSearchPageProposals, GetSearchPageCollaborators } from "helpers/searchPageHelper";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const contests = state.contest;
    const isFetchingContest = state.contest.isFetchingContest;
    return { user, isLoggedIn, artistListData, loginModalDetails, contests, isFetchingContest }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllContests: () =>
        dispatch(actions.fetchAllContests()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const MySearchPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    isFetchingContest,
    fetchAllContests,
}: Props) => {

    const {
        toCategoryArtistList,
        toAllProposalsPage,
        toAllCategoryPage,
        toGetInspired,
        toTutorial,
        toAllBlogs,
        toAllContestPage,
        toRewardsInfoPage,
        toUserCollabPage,
        toFAQ,
        toContactUs,
        toArtistProfile,
    } = useRoutesContext();

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(-1);

    const router = useRouter();

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
        setWindowWidth(window.innerWidth);
    }, [user, artistListData]);

    return (
        <Layout
            title={"Search on Wondor"}
            name={"description"}
            content={"Search artists who are available to collaborate, exiciting collaboration proposals etc on Wondor."}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            <>
                <div className="searchPageContainer">
                    <div className="searchPageContent">
                        <div className="searchPage-carousel">
                            <Carousel autoplay>
                                <div className="heroContent">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="section-title text-md-center">
                                                <h2 className="common-h2-style">
                                                    Perfect Creative Collaboration is a Step Away!
                                                </h2>
                                                <p className="common-p-style" style={{ width: "100%" }}>
                                                    We've got just the perfect setup to help you start.
                                                </p>
                                                <div>
                                                    <Link href={routeToHref(toTutorial())} passHref>
                                                        <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                                                            Get Started
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="heroContent">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="section-title text-md-center">
                                                <h2 className="common-h2-style">
                                                    Connect, Create, and Inspire Together!
                                                </h2>
                                                <p className="common-p-style" style={{ width: "100%" }}>
                                                    Artists of every skill and experience level, start your creative journey today.
                                                </p>
                                                <div>
                                                    <Link href={routeToHref(toAllCategoryPage())} passHref>
                                                        <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                                                            Collab Categories
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="heroContent">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="section-title text-md-center">
                                                <h2 className="common-h2-style">
                                                    Collaboration Proposals that Sparks Creative Enthusiasm!
                                                </h2>
                                                <p className="common-p-style" style={{ width: "100%" }}>
                                                    Express interest in amazing collaboration proposals from other artists
                                                </p>
                                                <div>
                                                    <Link href={routeToHref(toAllProposalsPage())} passHref >
                                                        <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                                                            Collab Proposals
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="heroContent">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="section-title text-md-center">
                                                <h2 className="common-h2-style">
                                                    Stuck in Creative Block? We got your back!
                                                </h2>
                                                <p className="common-p-style" style={{ width: "100%" }}>
                                                    Explore fresh art ideas for your next masterpiece
                                                </p>
                                                <div>
                                                    <Link href={routeToHref(toGetInspired())} passHref >
                                                        <button className="homepage-button" style={{ backgroundColor: "black", color: "white" }}>
                                                            Inspiration Hub
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel>
                        </div>

                        <div className="container">
                            <h5 className="searchPage-sectionHeading common-h5-style">You might like</h5>
                        </div>
                        <div className="container">
                            <div className="row">
                                {GetSearchPageCategories()}
                            </div>
                        </div>

                        <div className="container">
                            <h5 className="searchPage-sectionHeading common-h5-style">Explore proposals</h5>
                        </div>
                        <div className="container">
                            <div className="row">
                                {GetSearchPageProposals()}
                            </div>
                        </div>

                        <div className="container">
                            <h5 className="searchPage-sectionHeading common-h5-style">Top Collaborators</h5>
                        </div>
                        <div className="container">
                            <div className="row">
                                {GetSearchPageCollaborators()}
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <GenericActionBanner />
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default connector(MySearchPage);
