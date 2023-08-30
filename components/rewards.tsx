import { Button, Col, Row, Statistic, Space, Table, Tag } from 'antd';
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

  

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    return { user, isLoggedIn, artistListData, loginModalDetails }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const RewardsPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
}: Props) => {
    const router = useRouter();
    const [showProfileModal, setShowProfileModal] = useState(false);

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
    }, [user, artistListData])

    const columns = [
        { title: "description", dataIndex: "description", key: "description" },
        { title: "date", dataIndex: "date", key: "date" },
        { title: "type", dataIndex: "type", key: "type" },
        { title: "points", dataIndex: "points", key: "points" },
    ];

    const getPointsActivity = () => {
        let updatedData = []
        let fake = {
            "description": "fake transaction",
            "date": "12/01/23",
            "type": "earned",
            "points": 123,
        }
        for (var i = 0; i < 5; i++) {
            updatedData.push(fake);
        }
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

                {false ? (
                    <Loader />
                ) : (
                    <>
                        <div className="rewardsPage_container">
                            <div style={{marginTop: "20px"}}>
                                <h5>Statistics</h5>
                            </div>
                            <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic title="Current Points" value={112893} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic title="Lifetime Earned Points" value={112893} />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic title="Redeemed Points" value={112893} />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <h5>Points earned by category</h5>
                            </div>
                            <div>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic
                                            title="Successful refferals"
                                            value={11}
                                            valueStyle={{ color: '#3f8600' }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic
                                            title="Collaboration requests"
                                            value={93}
                                            valueStyle={{ color: '#3f8600' }}
                                            />
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card bordered={true}>
                                            <Statistic
                                            title="Montly contests"
                                            value={9}
                                            valueStyle={{ color: '#3f8600' }}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{marginTop: "20px"}}>
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
