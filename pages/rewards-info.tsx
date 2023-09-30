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

const RewardsInfoPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    isFetchingContest,
    fetchAllContests,
}: Props) => {
    const { toDiscover } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);

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
    }, [user, artistListData]);

    return (
        <Layout
            title={"How to earn rewards on Wondor? | Wondor"}
            name={"description"}
            content={"Learn how to earn reward points and redeem them for real money. Join Wondor now to start earning."}

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
                <div className="allContestPage_listingPagecontainer">
                    <div className="allContestPage__listingPageCoverContainer">
                        <div className="row ">
                            <div className="col-sm-8" style={{ backgroundColor: "#D1C4E9" }}>
                                <div className="allContestPage_desktopCoverTextContainer">
                                    <h1 className="common-h1-style">
                                        Earn rewards points for everything you do on Wondor, big or small 😎
                                    </h1>
                                    <h3 className="common-h3-style">
                                        Yes, we reward our amazing artists for being awesome members of Wondor.
                                        These points can be redeem for exclusive prizes.
                                    </h3>
                                </div>
                            </div>
                            <div className="col-sm-4" style={{ backgroundColor: "#D1C4E9" }}>
                                <Image
                                    alt="Image Alt"
                                    className="discoverArtists_desktopCoverImageContainer"
                                    src={headerImage}
                                    layout="responsive"
                                    objectFit="contain" // Scale your image down to fit into the container
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rewardsPage_container">
                        <section className="bg-light-primary">
                            <h5 className="common-h5-style">Ways to earn points</h5>
                            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6">
                                <div className="col my-3">
                                    <div className="card border-hover-primary">
                                        <div className="card-body">
                                            <h4 className="font-weight-bold mb-3">150 points</h4>
                                            <h6 className="font-weight-bold mb-3">Sign up</h6>
                                            <p className="text-muted mb-0">Create an account and enter code WONDOR-ART to earn 150 points.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <h4 className="font-weight-bold mb-3">150 points</h4>
                                            <h6 className="font-weight-bold mb-3">Referral</h6>
                                            <p className="text-muted mb-0">Refer your friends to wondor by sharing your code and you both earn 150 points each.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <h4 className="font-weight-bold mb-3">50 points</h4>
                                            <h6 className="font-weight-bold mb-3">Complete Profile</h6>
                                            <p className="text-muted mb-0">Complete your profile by adding bio, skills, samples, and social accounts to earn 50 points.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <h4 className="font-weight-bold mb-3">50 points</h4>   
                                            <h6 className="font-weight-bold mb-3">Successful Collaboration</h6>
                                            <p className="text-muted mb-0">Collaborate with artists and all of the involved parties get 50 points each for finishing a collaboration.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <h4 className="font-weight-bold mb-3">50 points</h4>
                                            <h6 className="font-weight-bold mb-3">Monhtly Contest</h6>
                                            <p className="text-muted mb-0">Enter in out monthly contests to earn 50 points.</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <div className="text-primary mb-5">

                                            </div>
                                            <h6 className="font-weight-bold mb-3">Graphics and Logo Design</h6>
                                            <p className="text-muted mb-0">Embed holistics charts directly to your application</p>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <div className="text-primary mb-5">

                                            </div>
                                            <h6 className="font-weight-bold mb-3">Project Management</h6>
                                            <p className="text-muted mb-0">Embed holistics charts directly to your application</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col my-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <div className="text-primary mb-5">

                                            </div>
                                            <h6 className="font-weight-bold mb-3">Task management</h6>
                                            <p className="text-muted mb-0">Embed holistics charts directly to your application</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col mb-0 mt-3 mb-lg-3">
                                    <div className="card border-hover-primary hover-scale">
                                        <div className="card-body">
                                            <div className="text-primary mb-5">

                                            </div>
                                            <h6 className="font-weight-bold mb-3">Client Dashboards</h6>
                                            <p className="text-muted mb-0">Embed holistics charts directly to your application</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </section>
                    </div>
                    <div className="rewardsPage_container">
                        <section className="bg-light-primary">
                            <h5 className="common-h5-style">Ways to redeem points</h5>
                            <p>You can redeem your points for real money. 
                                In order to redeem, you have to have minimum of 1000 points.
                                1000 points = $10
                            </p>
                        </section>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default connector(RewardsInfoPage);
