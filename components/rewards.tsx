import { Col, Row, Statistic, Table, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { routeToHref } from "config/routes";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card, notification } from 'antd';
import Image from 'next/image';
import { Modal } from 'antd';
import { FireOutlined, FireFilled, ReadOutlined } from '@ant-design/icons';
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetContestStatus, GetDateString } from "helpers/contest";
import { IsAdmin } from "helpers/helper";
import UploadContestArtworkPage from "@/components/contestArtworkPage";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { ContestSubmission } from "types/model/contest";
import { Config } from "config/config";
import Layout from "@/components/layout";
import { GetRewardsEarningSummary, GetPointsByCategory } from 'helpers/rewardsHelper';



const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const isFetchingRewardsActivity = state.rewardsActivity.isFetchingRewardsActivity;
    const isFetchingRewardPoints = state.rewardsActivity.isFetchingRewardsPoints;
    const rewardsActivity = state.rewardsActivity.rewardsActivity;
    const rewardPoints = state.rewardsActivity.rewardPoints;

    return { user, isLoggedIn, artistListData, loginModalDetails, isFetchingRewardsActivity, isFetchingRewardPoints, rewardsActivity, rewardPoints }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRewards: () => dispatch(actions.fetchRewards()),
    fetchRewardsActivity: () => dispatch(actions.fetchRewardsActivity()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const RewardsPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    isFetchingRewardsActivity,
    isFetchingRewardPoints,
    rewardsActivity,
    rewardPoints,
    fetchRewards,
    fetchRewardsActivity
}: Props) => {
    const router = useRouter();
    const [showProfileModal, setShowProfileModal] = useState(false);

    useEffect(() => {
        fetchRewards();
        fetchRewardsActivity();
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
    }, [user, artistListData])

    const columns = [
        { title: "Category", dataIndex: "description", key: "description" },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Type", dataIndex: "type", key: "type" },
        { title: "Points", dataIndex: "points", key: "points" },
    ];

    const buildLink = (obj: {text: string, link: string, linkText: string}) => {
        console.log("obj : ", obj);
        return(
           <p>
             {obj.text}<a href={obj.link}>{obj.linkText}</a>
           </p>
         );
     }

    const getPointsActivity = () => {
        let updatedData = []
        let data = rewardsActivity.length != 0 ? rewardsActivity[0].data : [];

        data.forEach(element => {
            const details = JSON.parse(element['details']);
            const text = ('referred_by' in details) ? 'You were referred by ' :  'You referred '
            const linkText = ('referred_by' in details) ? details['referred_by_name'] : details['referred_to_name'];
            const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
            const link = origin + '/artist/profile/' + (('referred_by' in details) ?  details['referred_by_slug'] : details['referred_to_slug']);
            let entry = {
                "description": buildLink({text: text, linkText: linkText, link: link}),
                "date": GetDateString(element["createdAt"]),
                "type": element["added"] ? "Earned points" : "Redeemed points",
                "points": element["points"],
            }
            updatedData.push(entry);
        });

        return <Table columns={columns} dataSource={updatedData} />;
    };

    return (
        <Layout
            title={"Rewards | Wondor"}
            name={"description"}
            content={"Your rewards"}
        >
            <>
                {loginModalDetails.openModal && !user.new_user && (
                    <LoginModal />
                )
                }
                {showProfileModal && (
                    <NewUserModal />
                )
                }

                {isFetchingRewardsActivity && isFetchingRewardPoints ? (
                    <Loader />
                ) : (
                    <>
                        <div className="rewardsPage_container">
                            <Alert
                                message="Ways to Earn Points"
                                description={GetRewardsEarningSummary(user["referral_code"])}
                                type="info"
                                className="display-linebreak"
                                showIcon
                                closable
                            />
                            <Alert
                                message="Ways to Reedem Points"
                                description="100 points are equivalent to $1. You can redeem these points for an amazon coupons after you have 1000 or more points."
                                type="warning"
                                className="display-linebreak"
                                showIcon
                                closable
                            />
                            <div style={{ marginTop: "20px" }}>
                                <h5>Summary</h5>
                            </div>
                            <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic title="Current points" value={rewardPoints["totalPoints"]} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic title="Lifetime earned points" value={rewardPoints["lifetimePoints"]} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic title="Redeemed points" value={rewardPoints["lifetimePoints"] - rewardPoints["totalPoints"]} />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <h5>Points earned by category</h5>
                            </div>
                            <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic
                                                title="Successful refferals"
                                                value={GetPointsByCategory(rewardsActivity, "REFERRAL_USER")}
                                                valueStyle={{ color: '#3f8600' }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic
                                                title="Collaboration requests"
                                                value={GetPointsByCategory(rewardsActivity, "SUCCESSFUL_COLLAB")}
                                                valueStyle={{ color: '#3f8600' }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic
                                                title="Montly contests"
                                                value={GetPointsByCategory(rewardsActivity, "MONTHLY_CONTEST")}
                                                valueStyle={{ color: '#3f8600' }}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <h5>Recent points activity</h5>
                            </div>
                            <div>
                                {getPointsActivity()}
                            </div>
                        </div>
                    </>
                )}
            </>
        </Layout>
    );
};

export default connector(RewardsPage);
