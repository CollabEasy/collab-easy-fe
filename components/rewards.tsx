import { Col, Row, Statistic, Table, Alert } from "antd";
import { AppState } from "state";
import React, { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import { Card } from "antd";
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetDateString } from "helpers/contest";
import Layout from "@/components/layout";
import {
  GetRewardsEarningSummary,
  GetPointsByCategory,
  GetRewardTableMessage,
} from "helpers/rewardsHelper";
import {CopyFilled} from "@ant-design/icons";

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const artistListData = state.home.artistListDetails;
  const isFetchingRewardsActivity =
    state.rewardsActivity.isFetchingRewardsActivity;
  const isFetchingRewardPoints = state.rewardsActivity.isFetchingRewardsPoints;
  const rewardsActivity = state.rewardsActivity.rewardsActivity;
  const rewardPoints = state.rewardsActivity.rewardPoints;

  return {
    user,
    isLoggedIn,
    artistListData,
    loginModalDetails,
    isFetchingRewardsActivity,
    isFetchingRewardPoints,
    rewardsActivity,
    rewardPoints,
  };
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
  fetchRewardsActivity,
}: Props) => {
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const textRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

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
  }, [user, artistListData]);

  const columns = [
    { title: "Category", dataIndex: "description", key: "description" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Points", dataIndex: "points", key: "points" },
  ];

  const getPointsActivity = () => {
    let updatedData = [];
    let data = rewardsActivity.length != 0 ? rewardsActivity[0].data : [];

    data.forEach((element) => {
      const description = GetRewardTableMessage(element["action"], element);
      let entry = {
        description: description,
        date: GetDateString(element["createdAt"]),
        type: element["added"] ? "Earned points" : "Redeemed points",
        points: element["points"],
      };
      updatedData.push(entry);
    });

    return <Table columns={columns} dataSource={updatedData} />;
  };

  const handleCopyClick = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <Layout
      title={"Rewards | Wondor"}
      name={"description"}
      content={"Your rewards"}
    >
      <>
        {loginModalDetails.openModal && !user.new_user && <LoginModal />}
        {showProfileModal && <NewUserModal />}

        {isFetchingRewardsActivity && isFetchingRewardPoints ? (
          <Loader />
        ) : (
          <>
            <div className="rewardsPage_container">
              <div className="points-earn-container">
                <div className="points-part-heading">
                  Ways to Earn Points
                </div>
                <div className="points-info-cnt">
                  <div className="points-list-cnt">
                    <ol style={{marginBottom: 0, listStyleType: 'disc'}}>
                      <li>
                        Share code {" "}
                        <div className="clipboard-text-cnt">
                          <span className="clipboard-text">{user["referral_code"]}</span>
                          <div className="copy-btn" onClick={handleCopyClick}>
                            {isCopied ? 'Copied!' : 'Copy'}
                          </div>
                        </div>
                        {" "} with your friends to earn 100 points for successful refferal.
                      </li>
                      <li>Earn 50 points for completing your profile.</li>
                    </ol>
                  </div>
                  <input
                    type="text"
                    ref={textRef}
                    defaultValue={user["referral_code"]}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                {/* <div className="close-icon"></div> */}
              </div>
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
                      <Statistic
                        title="Current points"
                        value={rewardPoints["totalPoints"]}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={true}>
                      <Statistic
                        title="Lifetime earned points"
                        value={rewardPoints["lifetimePoints"]}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={true}>
                      <Statistic
                        title="Redeemed points"
                        value={
                          rewardPoints["lifetimePoints"] -
                          rewardPoints["totalPoints"]
                        }
                      />
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
                        value={GetPointsByCategory(
                          rewardsActivity,
                          "REFERRAL_USER"
                        )}
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={true}>
                      <Statistic
                        title="Collaboration requests"
                        value={GetPointsByCategory(
                          rewardsActivity,
                          "SUCCESSFUL_COLLAB"
                        )}
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={true}>
                      <Statistic
                        title="Montly contests"
                        value={GetPointsByCategory(
                          rewardsActivity,
                          "MONTHLY_CONTEST"
                        )}
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "20px" }}>
                <h5>Recent points activity</h5>
              </div>
              <div>{getPointsActivity()}</div>
            </div>
          </>
        )}
      </>
    </Layout>
  );
};

export default connector(RewardsPage);
