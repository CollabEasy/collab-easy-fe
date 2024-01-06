import { Button } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import * as actions from "state/action";
import Layout from "@/components/layout";
import Link from "next/link";
import GenericActionBanner from "@/components/asset/genericActionBanner";
import CollabLinkClipBoard from "@/components/asset/collabLinkClipBoard";
import RewardCodeClipBoard from "@/components/asset/rewardCodeClipBoard";
import ProfilePicture from "@/components/profilePicture";

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
    routeToMyWondor: (route: boolean) => dispatch(actions.routeToMyWondor(route)),
    setCurrentPathName: (path: string) => dispatch(actions.setCurrentPathName(path)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const MyWondorPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    routeToMyWondor,
    openLoginModalAction,
    resetUserLoggedIn,
    setCurrentPathName,
}: Props) => {

    const router = useRouter();
    const { 
        toDiscover, 
        toArtistProfile, 
        toAllBlogs, 
        toAllProposalsPage, 
        toRewardsInfoPage, 
        toArtistPortal, 
        toAboutUs, 
        toTutorial, 
        toTerms, 
        toPrivacy,
        toMySearchPage,
    } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(-1);

    useEffect(() => {
        routeToMyWondor(false);
        setWindowWidth(window.innerWidth);
    }, [user]);

    const openLoginModal = () => {
        setCurrentPathName(router.asPath);
        router.push("/login")
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
            title={"My Wondor | Wondor"}
            name={"description"}
            content={"My wondor is your go to place to find everything you can need to make your experience on wondor friction less."}

        >
            {/* https://bootdey.com/snippets/view/bs4-social-profile-header#html */}
            <div className="my-wondor-container">
                <div className="bg-white">
                    <div className="text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}

                        <div className="artistProfile__profileCoverContainer">
                            <div className="profileCoverContainer">
                                <div className="graph"></div>
                            </div>

                            <ProfilePicture isSelf={true} userProfileOpened={user} />
                        </div>

                        <div className="col-md-8 col-lg-6 col-xl-5 p-0 mx-auto">
                            <h4 className="common-h4-style font-weight-bold my-3">{getWelcomeHeading()}</h4>
                            <div className="common-p-style mb-2">
                                This is your private page designed to make your journey on Wondor better and easier.
                            </div>
                            {!isLoggedIn ? (
                                <Button
                                    type="primary"
                                    className="common-btn-dimension"
                                    onClick={openLoginModal}
                                >
                                    Sign In
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    className="common-btn-dimension"
                                >
                                    <Link
                                        href={routeToHref(toArtistProfile(user.slug))}
                                    >
                                        My Profile
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <hr className="mb-2" />
                    <div className="row my-wondor-cards-container">
                        {isLoggedIn && (<div className="row">
                            <div className="col-md-6">
                                <RewardCodeClipBoard
                                    code={user["referral_code"]}
                                />
                            </div>

                            <div className="col-md-6">
                                <CollabLinkClipBoard
                                    slug={user.slug}
                                />
                            </div>
                        </div>
                        )}

                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-wondor-card mt-4 p-4">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h5 className="common-h5-style f-19 mb-2">Update Profile</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                Your profile is your first impression on other artists.
                                                Make sure to keep your information up-to-date to enhance
                                                visibility and collaboration opportunities. Go make your
                                                profile the best one yet!
                                            </p>
                                            <Button
                                                type="primary"
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
                                                    href={routeToHref(toArtistPortal("collab-request"))}
                                                >
                                                    Manage Requests
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
                                                It is never too late to take the first step.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension"
                                            >
                                                <Link
                                                    href={routeToHref(toMySearchPage())}
                                                >
                                                    Find Collaborator
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
                                            <h5 className="common-h5-style f-19 mb-2">Search Collaboration Proposals</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                Artists on Wondor have added exciting proposals for collaborations.
                                                Checkout them now and start your collaboration journey on ideas
                                                from other creative minds around you.
                                            </p>
                                            <Button
                                                type="primary"
                                                className="common-btn-dimension gap-2"
                                            >
                                                <Link
                                                    href={routeToHref(toAllProposalsPage("all"))}
                                                >
                                                    Find Proposal
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
                                                    Go to Portal
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
                                            <h5 className="common-h5-style f-19 mb-2">Earn Reward Points</h5>
                                            <div className="divider mb-2"> </div>
                                            <p className="common-p-style mb-2">
                                                Members of Wondor earn rewards point for their contribution to the community -
                                                be it by participating in contests, collaborating with other artists etc.
                                                There is always a little to appreciate you and your work!
                                            </p>
                                            {isLoggedIn ? (
                                                <Button
                                                    type="primary"
                                                    className="common-btn-dimension"
                                                >
                                                    <Link
                                                        href={routeToHref(toArtistPortal("rewards"))}
                                                    >
                                                        My Earned Points
                                                    </Link>
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="primary"
                                                    className="common-btn-dimension gap-2"
                                                >
                                                    <Link
                                                        href={routeToHref(toRewardsInfoPage())}
                                                    >
                                                        How to Earn
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {windowWidth < 500 &&
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="my-wondor-card mt-4 p-4">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h5 className="common-h5-style f-19 mb-2">Other Important Links</h5>
                                                <div className="divider mb-2"> </div>
                                                <p className="common-p-style mb-2">
                                                    <ul className="common-text-style">
                                                        <li><a href={toAboutUs().href} >About Us</a></li>
                                                        <li><a href={toTerms().href} >Terms & Conditions</a></li>
                                                        <li><a href={toPrivacy().href} >Privacy Policy</a></li>
                                                        <li><a href={toTutorial().href} >How Wondor Works</a></li>
                                                        <li><a href={toAllBlogs().href} >Blog</a></li>
                                                    </ul>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isLoggedIn && (
                                    <div className="col-md-6 p-4" style={{ display: "flex", justifyContent: "center" }}>
                                        <Button
                                            danger
                                            onClick={logoutUser}
                                        >
                                            Log out
                                        </Button>
                                    </div>
                                )}
                            </div>
                        }
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