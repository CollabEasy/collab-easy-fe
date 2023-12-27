import { Tabs, Input, List, Button, Space } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import { Card, Tag } from "antd";
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Image from "next/image";
import headerImage from "../public/images/contest.svg";
import * as actions from "state/action";
import Loader from "@/components/loader";
import {
  GetContestMetaDescription,
  GetContestStatusTag,
	GetContestStatus
} from "helpers/contest";
import Layout from "@/components/layout";
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import GenericActionBanner from "@/components/genericActionBanner";
import { GetDateString } from "helpers/proposalHelper";
import { ContestEntry } from "types/model";
import Link from "next/link";
import { ClockCircleFilled, FileImageFilled, ArrowRightOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const artistListData = state.home.artistListDetails;
  const contests = state.contest;
  const isFetchingContest = state.contest.isFetchingContest;
  return {
    user,
    isLoggedIn,
    artistListData,
    loginModalDetails,
    contests,
    isFetchingContest,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllContests: () => dispatch(actions.fetchAllContests()),
	openLoginModalAction: () => dispatch(actions.openLoginModalAction())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const AllContestPage = ({
  user,
  isLoggedIn,
  loginModalDetails,
  contests,
  artistListData,
  isFetchingContest,
  fetchAllContests,
	openLoginModalAction,
}: Props) => {
  const { toContestPage, toFAQ } = useRoutesContext();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [allContests, setAllContests] = useState([]);
  const [windowWidth, setWindowWidth] = useState(-1);

  const router = useRouter();

  useEffect(() => {
    fetchAllContests();
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
    setAllContests(contests.contest);
    setWindowWidth(window.innerWidth);
  }, [user, artistListData, contests]);	

  const getAllContests = (allContests) => {
    const resultArtists: JSX.Element[] = [];
    const now = new Date();
    let data = allContests.length != 0 ? allContests[0].data : [];
    data.sort((a, b) => b.startDate - a.startDate);
    return (
			<div className="allcontest-list">
				{ data.map((contestObj, idx) => (
						<div className="content-listing__item" key={contestObj.id}>
							<Link
								href={routeToHref(
									toContestPage(contestObj.contestSlug, "details")
								)}
							>
								<div className="listings-list__item">
									<div className="listing-preview">
										{ contestObj?.winner?.profilePicUrl ? (
												<img alt="listing-image" src={contestObj?.winner?.profilePicUrl}></img>
											) : (
												<img alt="listing-image" src="https://wondor-profile-pictures.s3.amazonaws.com/thumbnails/e96ffdf72dd5213.png?updatedAt=1700939273528"></img>
											)
										}
										
									</div>
									<div className="listing-details">
										<div className="row">
											<div className="col-sm-9">
												<div className="contest-details">
													<h3 className="">
														{contestObj.title}
													</h3>
													<h5 className="">
														{contestObj.description}
													</h5>
												</div>
												{ contestObj?.winner?.artCategories?.length > 0 &&
													<div className="contest-tags-cnt">
														{ contestObj?.winner?.artCategories.map((artObj, idx) => (
																<div className="tag-cnt" key={idx}>
																	<span className="tag-text">{artObj.artName}</span>
																</div>
															))
														}
													</div>
												}
											</div>
											<div className="col-sm-3">
												<div className="total-designs">
													<FileImageFilled style={{ fontSize: "12px" }} />
													<span className="">{data.length}</span>
												</div>
												<div className="contest-timing">
													<ClockCircleFilled style={{ fontSize: "12px" }} />
													<span className="">{GetContestStatus(new Date().getTime(),contestObj.startDate,contestObj.endDate)}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Link>
						</div>
					))
				}
			</div>
    );
  };

	const openLoginModal = () => {
		openLoginModalAction();
	};

  return (
    <Layout
      title={"Monthly Art Contest | Wondor"}
      name={"description"}
      content={
        "Participate in the Wondor monthly art contests and earn exclusive prizes for winning. Get all the information about the contests hosted every month. Earn reward points for participation. Join now!"
      }
    >
      {loginModalDetails.openModal && !user.new_user && <LoginModal />}
      {showProfileModal && <NewUserModal />}

      {isFetchingContest ? (
        <Loader />
      ) : (
        <>
          <div className="allContestPage_listingPagecontainer">
            {windowWidth > 500 && <GenericBreadcrumb page={"Art Contests"} />}
            <div className="allContestPage__listingPageCoverContainer">
              <div className="row">
                {/* <div className="col-sm-12"> */}
                  <div className="contest-heading-cnt col-sm-6">
                    <h1 className="common-h1-style">
											Artists, this is the place to show off your talent
										</h1>
										<div className="heading-line"></div>
										<div className="">
											<h3 className="common-h3-style">
												Join our art contests and let your creativity be the judge!
											</h3>
										</div>
										<div className="current-contest-btn-cnt">
											{ !isLoggedIn && 
												<button className="current-contest-btn" onClick={openLoginModal}>
													Get Started now
												</button>
											}
											<div className="how-it-works-cnt">
												<Link
														href={routeToHref(toFAQ())}
														passHref
												>
													<div className="how-cnt">
														<span>How it Works</span>
														<ArrowRightOutlined />
													</div>
												</Link>
											</div>
										</div>
                  </div>
									<div className="contest-main-image col-sm-6">
										{/* <img alt="contest image" src={headerImage} /> */}
										<Image
												alt="Image Alt"
												src={headerImage}
												layout="responsive"
												objectFit="contain" // Scale your image down to fit into the container
										/>
									</div>
              </div>
            </div>
          </div>
					<div className="col-md-12 listingContainer">
						{getAllContests(allContests)}
					</div>
					<div className="row">
						<GenericActionBanner />
					</div>
        </>
      )}
    </Layout>
  );
};

export default connector(AllContestPage);
