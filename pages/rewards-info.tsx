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
                        <p className="common-p-style">Ways to earn point</p>
                        <div>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Card bordered={true}>
                                        <Statistic
                                            title="Refer you friends and you both earn"
                                            value={100}
                                            valueStyle={{ color: "#3f8600" }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card bordered={true}>
                                        <Statistic
                                            title="Collaborate with artists to get"
                                            value={50}
                                            valueStyle={{ color: "#3f8600" }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card bordered={true}>
                                        <Statistic
                                            title="Collaborate with artists to get"
                                            value={50}
                                            valueStyle={{ color: "#3f8600" }}
                                        />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card bordered={true}>
                                        <Statistic
                                            title="Participate in montly contests to get"
                                            value={50}
                                            valueStyle={{ color: "#3f8600" }}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
};

export default connector(RewardsInfoPage);
