import { Tabs, Input, Button } from "antd";
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
import { UserOutlined } from "@ant-design/icons";
import ProfilePicture from "@/components/profilePicture";
import Link from "next/link";
import GenericActionBanner from "@/components/genericActionBanner";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    return { user, isLoggedIn, artistListData, loginModalDetails }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openLoginModalAction: () => dispatch(actions.openLoginModalAction()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const MyWondorPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    openLoginModalAction,
}: Props) => {

    const router = useRouter();
    const { toDiscover, toArtistProfile, toArtistPortal, toProposalPage } = useRoutesContext();
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

    const getWelcomeHeading = () => {
        if (isLoggedIn) {
            return "Welcome, " + user.first_name + " " + user.last_name;
        } else {
            return "Welcome to myWondor";
        }
    }

    return (
        <Layout
            title={"My Wondor | Wondor"}
            name={"description"}
            content={"My wondor is your go to place to find everything you can need to make your experience on wondor friction less."}

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
            <div className="my-wondor-container">
                <div className="bg-white">
                    <div className="text-center">
                        <img src={isLoggedIn ? user.profile_pic_url : "https://bootdey.com/img/Content/avatar/avatar6.png"} className="ui-w-100 rounded-circle" />
                        <div className="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">
                            <h4 className="common-h4-style font-weight-bold my-3">{getWelcomeHeading()}</h4>
                            <div className="common-p-style mb-2">
                                This is your private page designed to make your journey on Wondor better and easier.
                            </div>
                            {!isLoggedIn && (
                                <Button
                                    type="primary"
                                    className="common-btn-dimension"
                                    onClick={openLoginModal}
                                >
                                    Join Now
                                </Button>
                            )}
                        </div>
                    </div>
                    <hr className="mb-2" />
                    <div className="row my-wondor-cards-container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Search Artists</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                100+ artists are available for collaboration.
                                                Search the one whose work inspires you.
                                                Send them a collaboration request and start working on your next masterpiece.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension"
                                            >
                                                <Link
                                                    href={routeToHref(toDiscover())}
                                                >
                                                    Start Search
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Update Profile</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                Your profile is your first impression on other artists.
                                                Make sure to keep your information up-to-date to enhance
                                                visibility and collaboration opportunities.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension gap-2"
                                            >
                                                <Link
                                                    href={routeToHref(toArtistProfile(user.slug))}
                                                >
                                                    Public Profile
                                                </Link>
                                            </Button>
                                            <Button
                                                className="common-btn-dimension gap-2"
                                            >
                                                <Link
                                                    href={routeToHref(toArtistPortal("basic-information"))}
                                                >
                                                    Update Profile
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Manage Collaboration Requests</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                To make your collaboration experience smooth, we provide you with easy to use
                                                tools to manage outgoing and incoming requests. Checkout latest activity on your
                                                collab requests.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension gap-2"
                                            >
                                                <Link
                                                    href={routeToHref(toArtistPortal("collab-requests"))}
                                                >
                                                    Manage Requests
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Portal</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                Portal is your one stop place for managing your Wondor account efficiently.
                                                Use it to manage your basic information, collaboration preferences,
                                                collaboration requests, proposals, other settings.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension"
                                            >
                                                <Link
                                                    href={routeToHref(toArtistPortal("preferences"))}
                                                >
                                                    Go to my portal
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Search Artists</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                100+ artists are available for collaboration.
                                                Search the one whose work inspires you.
                                                Send them a collaboration request and start working on your next masterpiece.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension"
                                            >
                                                <Link
                                                    href={routeToHref(toDiscover())}
                                                >
                                                    Start Search
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Update Profile</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                Your profile is your first impression on other artists.
                                                Make sure to keep your information up-to-date to enhance
                                                visibility and collaboration opportunities.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension gap-2"
                                            >
                                                <Link
                                                    href={routeToHref(toArtistProfile(user.slug))}
                                                >
                                                    Public Profile
                                                </Link>
                                            </Button>
                                            <Button
                                                className="common-btn-dimension gap-2"
                                            >
                                                <Link
                                                    href={routeToHref(toArtistPortal("basic-information"))}
                                                >
                                                    Update Profile
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ top: "3%" }}>
                    <GenericActionBanner />
                </div>

            </div>
        </Layout>
    );
};

export default connector(MyWondorPage);
