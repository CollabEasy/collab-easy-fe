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
import GenericActionBanner from "@/components/asset/genericActionBanner";
import { GetSearchPageCategories, GetSearchPageProposals, GetSearchPageCollaborators, GetUserMightLikeCategories } from "helpers/searchPageHelper";

const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const isFetchingUser = state.user.isFetchingUser;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const contests = state.contest;
    const isFetchingContest = state.contest.isFetchingContest;
    return { user, isLoggedIn, artistListData, loginModalDetails, contests, isFetchingContest }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openLoginModalAction: () => dispatch(actions.openLoginModalAction()),
    setCurrentPathName: (path: string) => dispatch(actions.setCurrentPathName(path)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const MySearchPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    openLoginModalAction,
    setCurrentPathName,
}: Props) => {

    const {
        toAllProposalsPage,
        toAllCategoryPage,
        toGetInspired,
        toTutorial,
        toMySearchPage,
    } = useRoutesContext();

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(-1);
    const [mightLikeCategories, setUserMightLikeCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) {
            setUserMightLikeCategories(GetUserMightLikeCategories(user.skills));
        }
    }, [user]);

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

    const openLoginModal = () => {
        setCurrentPathName(router.asPath);
        router.push("/login");
    };

    const getMainContent = () => {
        return (
            <div className="hero-text-container">
                <div className="text-content">
                    <div>
                        <p className="common-p-style" style={{ marginTop: "30px" }}>
                            Join the Growing Community of 100+ Artists Today!
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
                    </div>
                    <p style={{ paddingTop: "2vh" }}>
                        Wondor connects like-minded artists for hassle-free collaboration around the world 🌎 🤝 🎉
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

    return (
        <Layout
            title={"Search on Wondor"}
            name={"description"}
            content={"Search artists who are available to collaborate, exiciting collaboration proposals etc on Wondor."}

        >
            <>
                {getMainContent()}
                <div className="searchPageContainer">

                    <div className="searchPageContent">
                        <div className="container">
                            <div className="searchPage-sectionHeading">
                                <h5 className="common-h5-style">Collab categories</h5>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                {GetSearchPageCategories(mightLikeCategories)}
                            </div>
                        </div>

                        <div className="container">
                            <div className="searchPage-sectionHeading">
                                <h5 className="common-h5-style">Explore proposals</h5>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                {GetSearchPageProposals(mightLikeCategories)}
                            </div>
                        </div>

                        <div className="container">
                            <div className="searchPage-sectionHeading">
                                <h5 className="common-h5-style">Active collaborators</h5>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                {GetSearchPageCollaborators(mightLikeCategories)}
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
