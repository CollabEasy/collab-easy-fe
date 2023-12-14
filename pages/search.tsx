import { Button } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import * as actions from "state/action";
import Layout from "@/components/layout";
import Link from "next/link";
import GenericActionBanner from "@/components/genericActionBanner";
import CollabLinkClipBoard from "@/components/asset/collabLinkClipBoard";
import RewardCodeClipBoard from "@/components/asset/rewardCodeClipBoard";
import ProfilePicture from "@/components/profilePicture";
import Search from "@/components/search";

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    return { user, isLoggedIn, artistListData, loginModalDetails }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openLoginModalAction: () => dispatch(actions.openLoginModalAction()),
    resetUserLoggedIn: () => dispatch(actions.resetUserLoggedIn()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const MySearchPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    openLoginModalAction,
    resetUserLoggedIn,
}: Props) => {

    const router = useRouter();
    const { toDiscover, toArtistProfile, toAllBlogs, toAllProposalsPage, toRewardsInfoPage, toArtistPortal, toAboutUs, toTutorial, toTerms, toPrivacy } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(-1);

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
    }, [user]);

    const openLoginModal = () => {
        openLoginModalAction();
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        resetUserLoggedIn();
    };

    const getWelcomeHeading = () => {
        if (isLoggedIn) {
            return "Welcome, " + user.first_name + " " + user.last_name;
        } else {
            return "Welcome";
        }
    }

    return (
        <Layout
            title={"Search for popular categories, artists, proposals for collaboration."}
            name={"description"}
            content={"Search for photographers, singers, musicians to start your next collaboration."}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }
            {/* https://bootdey.com/snippets/view/bs4-social-profile-header#html */}
            <div className="my-search-page">
                <Search />
                <div className="container bootstrap snippets bootdey">
                    <section id="portfolio" className="gray-bg padding-top-bottom">
                        <div className="container bootstrap snippets bootdey">
                            <div className="projects-container scrollimation in">
                                <div className="row">
                                    <article className="col-md-4 col-sm-6 portfolio-item web-design apps psd">
                                        <div className="portfolio-thumb in">
                                            <a href="#" className="main-link">
                                                <img className="img-responsive img-center" src="https://www.bootdey.com/image/350x280/FFB6C1/000000" alt="" />
                                                <h2 className="project-title">Billing</h2>
                                                <span className="overlay-mask"></span>
                                            </a>
                                            <a className="enlarge cboxElement" href="#" title="Bills Project"><i className="fa fa-expand fa-fw"></i></a>
                                            <a className="link" href="#"><i className="fa fa-eye fa-fw"></i></a>
                                        </div>
                                    </article>

                                    <article className="col-md-4 col-sm-6 portfolio-item apps">
                                        <div className="portfolio-thumb in">
                                            <a href="#" className="main-link">
                                                <img className="img-responsive img-center" src="https://www.bootdey.com/image/350x280/87CEFA/000000" alt="" />
                                                <h2 className="project-title">Augmented Tourist</h2>
                                                <span className="overlay-mask"></span>
                                            </a>
                                            <a className="link centered" href=""><i className="fa fa-eye fa-fw"></i></a>
                                        </div>
                                    </article>

                                    <article className="col-md-4 col-sm-6 portfolio-item web-design psd">
                                        <div className="portfolio-thumb in">
                                            <a href="#" className="main-link">
                                                <img className="img-responsive img-center" src="https://www.bootdey.com/image/350x280/FF7F50/000000" alt="" />
                                                <h2 className="project-title">Get Colored</h2>
                                                <span className="overlay-mask"></span>
                                            </a>
                                            <a className="enlarge centered cboxElement" href="#" title="Get Colored"><i className="fa fa-expand fa-fw"></i></a>
                                        </div>
                                    </article>

                                    <article className="col-md-4 col-sm-6 portfolio-item apps">
                                        <div className="portfolio-thumb in">
                                            <a href="#" className="main-link">
                                                <img className="img-responsive img-center" src="https://www.bootdey.com/image/350x280/20B2AA/000000" alt="" />
                                                <h2 className="project-title">Holiday Selector</h2>
                                                <span className="overlay-mask"></span>
                                            </a>
                                            <a className="enlarge cboxElement" href="#" title="Holiday Selector"><i className="fa fa-expand fa-fw"></i></a>
                                            <a className="link" href="#"><i className="fa fa-eye fa-fw"></i></a>
                                        </div>
                                    </article>

                                    <article className="col-md-4 col-sm-6 portfolio-item web-design psd">
                                        <div className="portfolio-thumb in">
                                            <a href="#" className="main-link">
                                                <img className="img-responsive img-center" src="https://www.bootdey.com/image/350x280/9400D3/000000" alt="" />
                                                <h2 className="project-title">Scavenger Hunt</h2>
                                                <span className="overlay-mask"></span>
                                            </a>
                                            <a className="enlarge cboxElement" href="#" title="Scavenger Hunt"><i className="fa fa-expand fa-fw"></i></a>
                                            <a className="link" href="#"><i className="fa fa-eye fa-fw"></i></a>
                                        </div>
                                    </article>

                                    <article className="col-md-4 col-sm-6 portfolio-item web-design apps">
                                        <div className="portfolio-thumb in">
                                            <a href="#" className="main-link">
                                                <img className="img-responsive img-center" src="https://www.bootdey.com/image/350x280/87CEFA/000000" alt="" />
                                                <h2 className="project-title">Sonor</h2>
                                                <span className="overlay-mask"></span>
                                            </a>
                                            <a className="enlarge cboxElement" href="#" title="Sonor"><i className="fa fa-expand fa-fw"></i></a>
                                            <a className="link" href="#"><i className="fa fa-eye fa-fw"></i></a>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default connector(MySearchPage);
