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
import { useRoutesContext } from "components/routeContext";
import {
  GetRewardsEarningSummary,
  GetPointsByCategory,
  GetRewardTableMessage,
} from "helpers/rewardsHelper";
import { CopyFilled } from "@ant-design/icons";
import Link from "next/link";
import { routeToHref } from "config/routes";

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

  const { toRewardsInfoPage } = useRoutesContext();

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

  const deviceColumns = [
    {
      // eslint-disable-next-line react/display-name
      render: (activity, key, index) => {
        const description = activity.description;
        const date = GetDateString(activity["date"]);
        const type = activity["added"] ? "Earned points" : "Redeemed points";
        const points = activity.points;
        return (
          <div>
            <span>
              <p><b>Description:</b> {description}</p>
            </span>
            <span>
              <p><b>Date:</b> {date}</p>
            </span>
            <span>
              <p><b>Type:</b> {type}</p>
            </span>
            <span>
              <p><b>Points:</b> {points}</p>
            </span>
          </div>
        )
      }
    }
  ];

  const getPointsActivity = () => {
    let updatedData = [];
    let data = rewardsActivity.length != 0 ? rewardsActivity[0].data : [];
    data.sort((a, b) => b.createdAt - a.createdAt);
    data.forEach((activity) => {
      const description = GetRewardTableMessage(activity["action"], activity);
      let entry = {
        description: description,
        date: GetDateString(activity["createdAt"]),
        type: activity["added"] ? "Earned points" : "Redeemed points",
        points: activity["points"],
      };
      updatedData.push(entry);
    });

    return <Table columns={ window.innerWidth < 500 ? deviceColumns : columns } dataSource={updatedData} />;
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
              <div className="points-earn-container" style={{ backgroundColor: "#FFFBE6", border: "1px solid #f2a114" }}>
                <div className="points-info-cnt">
                  <div className="points-list-cnt">
                    Hello {user.first_name}, learn how to earn and redeem points here
                    <Link href={routeToHref(toRewardsInfoPage())} passHref> here.</Link>
                  </div>
                </div>
                {/* <div className="close-icon"></div> */}
              </div>
              <div className="points-earn-container">
                <div className="points-info-cnt">
                  <div className="points-list-cnt">
                    Share code {" "}
                    <div className="clipboard-text-cnt">
                      <span className="clipboard-text">{user["referral_code"]}</span>
                      <div className="copy-btn" onClick={handleCopyClick}>
                        {isCopied ? 'Copied!' : 'Copy'}
                      </div>
                    </div>
                    {" "} with your friends to earn 100 points for successful refferal.
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
              <div style={{ marginTop: "20px" }}>
                <h5>Summary</h5>
              </div>
              <div className="rewardsPage_container" style={{marginTop: "0%"}}>
                <section className="bg-light-primary">
                  <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center px-xl-6">
                    <div className="col my-3">
                      <div className="card border-hover-primary">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3" style={{ color: "green" }}>{rewardPoints["totalPoints"]}</h4>
                          <h6 className="font-weight-bold mb-3" >Current points</h6>
                          <p className="text-muted mb-0">Currently available points in your account.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col my-3">
                      <div className="card border-hover-primary hover-scale">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3" style={{ color: "green" }}>{rewardPoints["lifetimePoints"]}</h4>
                          <h6 className="font-weight-bold mb-3">Lifetime earned points</h6>
                          <p className="text-muted mb-0">Total points earned since you joined Wondor.</p>
                        </div>
                      </div>
                    </div>
                    <div className="col my-3">
                      <div className="card border-hover-primary hover-scale">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3" style={{ color: "red" }}>{
                            rewardPoints["lifetimePoints"] -
                            rewardPoints["totalPoints"]}</h4>
                          <h6 className="font-weight-bold mb-3">Redeemed points</h6>
                          <p className="text-muted mb-0">Total points which you have redeemed so far.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div style={{ marginTop: "20px" }}>
                <h5>Points earned by category</h5>
              </div>
              <div className="rewardsPage_container" style={{marginTop: "0%"}}>
                <section className="bg-light-primary">
                  <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center  px-xl-6">
                    <div className="col my-3">
                      <div className="card border-hover-primary">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3">
                            {GetPointsByCategory(
                              rewardsActivity,
                              "REFERRAL_USER"
                            ) +
                              GetPointsByCategory(
                                rewardsActivity,
                                "REFERRAL_SHARER"
                              )
                            }
                          </h4>
                          <h6 className="font-weight-bold mb-3">Successful refferals</h6>
                          <p className="text-muted mb-0">Share your refferal code with your friends and when they join Wondor you both get 150 rewards points!</p>
                        </div>
                      </div>
                    </div>
                    <div className="col my-3">
                      <div className="card border-hover-primary hover-scale">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3">
                            {GetPointsByCategory(
                              rewardsActivity,
                              "SUCCESSFUL_COLLAB"
                            )}
                          </h4>
                          <h6 className="font-weight-bold mb-3">Collaboration requests</h6>
                          <p className="text-muted mb-0">Successfully collaborate with an artist to earn 50 points. Start making collaborations now!</p>
                        </div>
                      </div>
                    </div>
                    <div className="col my-3">
                      <div className="card border-hover-primary hover-scale">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3"> {
                            GetPointsByCategory(
                              rewardsActivity,
                              "MONTHLY_CONTEST")
                          }
                          </h4>
                          <h6 className="font-weight-bold mb-3">Montly contests</h6>
                          <p className="text-muted mb-0">
                            Participate in our monthly contests and earn 50 points for your submission.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col my-3">
                      <div className="card border-hover-primary hover-scale">
                        <div className="card-body">
                          <h4 className="font-weight-bold mb-3"> {
                            GetPointsByCategory(
                              rewardsActivity,
                              "PROFILE_COMPLETION"
                            )}
                          </h4>
                          <h6 className="font-weight-bold mb-3">Complete profile</h6>
                          <p className="text-muted mb-0">Complete your profile by adding bio, skills, samples, and social accounts to earn 50 points.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
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
