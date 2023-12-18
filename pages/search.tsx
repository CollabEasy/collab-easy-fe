import { Col, Row, Statistic, Table, Alert } from "antd";
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
import headerImage from '../public/images/reward.svg';
import * as actions from "state/action";
import Layout from "@/components/layout";
import Link from "next/link";
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import GenericActionBanner from "@/components/genericActionBanner";
import Search from "@/components/search";

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
    const { toArtistPortal } = useRoutesContext();
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
                    {windowWidth > 500 &&
                        <GenericBreadcrumb
                            page={"Search on Wondor"}
                        />
                    }
                    <div className="searchPageContent">
                        <div className="heroContent">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="section-title text-md-center">
                                        <h2 className="common-h2-style">
                                            Just a step away from your perfect creative collaboration!
                                        </h2>
                                        <p className="common-p-style" style={{ width: "100%" }}>
                                            Our platform is committed to your growth. Discover fellow artists, improved collaboration experience,
                                            monthly art challenges, inspiration hub – all designed to uplift your skills.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h5>Discover</h5>

                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Open Imagination">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/87CEFA/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Open Imagination</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Locked Steel Gate">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/008B8B/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Locked Steel Gate</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Mac Sunglasses">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/9932CC/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Mac Sunglasses</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Morning Dew">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/1E90FF/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Morning Dew</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Console Activity">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/FF69B4/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Console Activity</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Shake It!">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/87CEFA/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Shake It!</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Backpack Content">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/D3D3D3/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Backpack Content</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Sunset Bulb Glow">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/90EE90/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Sunset Bulb Glow</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Open Imagination">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/87CEFA/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Open Imagination</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Console Activity">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/20B2AA/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Console Activity</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Open Imagination">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/87CEFA/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Open Imagination</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <div className="col-md-3 col-sm-6">
                                    <a href="#" className="gallery-popup" title="Shake It!">
                                        <div className="project-item">
                                            <div className="overlay-container">
                                                <img src="https://www.bootdey.com/image/350x180/B0C4DE/000000" alt="img" className="gallery-thumb-img" />
                                                <div className="project-item-overlay">
                                                    <h4>Shake It!</h4>
                                                    <p>
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" className="thumb-sm rounded-circle" />
                                                        <span className="ml-2">Curtis Marion</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>

                        <h5>Explore Collab Categories</h5>
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
