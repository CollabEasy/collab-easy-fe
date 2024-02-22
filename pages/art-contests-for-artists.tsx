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
import * as actions from "state/action";
import Loader from "@/components/loader";
import {
	GetContestMetaDescription,
	GetContestMetadata,
	GetContestStatus
} from "helpers/contest";
import Layout from "@/components/layout";
import GenericBreadcrumb from "@/components/asset/genericBreadcrumb";
import GenericActionBanner from "@/components/asset/genericActionBanner";
import Link from "next/link";
import {
	ClockCircleFilled,
	FileImageFilled,
	ArrowRightOutlined,
	TrophyFilled,
	WalletFilled,
} from '@ant-design/icons';

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
	openLoginModalAction: () => dispatch(actions.openLoginModalAction()),
	setCurrentPathName: (path: string) => dispatch(actions.setCurrentPathName(path)),
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
	setCurrentPathName,
}: Props) => {
	const { toContestPage, toArtistProfile, toAboutWondorArtContests } = useRoutesContext();
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
				{data.map((contestObj, idx) => (
					<div className="content-listing__item" key={contestObj.id}>
						<Link
							href={routeToHref(
								toContestPage(contestObj.contestSlug, "details")
							)}
						>
							<div className="listings-list__item">
								{/* <div className="listing-preview">
									{contestObj?.winner?.profilePicUrl ? (
										<img alt="listing-image" src={contestObj?.winner?.profilePicUrl}></img>
									) : (
										<img alt="listing-image" src="https://wondor-profile-pictures.s3.amazonaws.com/thumbnails/e96ffdf72dd5213.png?updatedAt=1700939273528"></img>
									)
									}

								</div> */}
								<div className="listing-details">
									<div className="row">
										<div className="col-md-9 col-sm-12">
											<div className="contest-details">
												<h3 className="common-h3-style">
													{contestObj.title}
												</h3>
												<h5 className="common-h5-style">
													{contestObj.description}
												</h5>
											</div>
											<div className="contest-tags-cnt">
												{GetContestMetadata(contestObj.contestSlug)["category"].map((artObj, idx) => (
													<div className="tag-cnt" key={idx}>
														<span className="tag-text">{artObj}</span>
													</div>
												))
												}
											</div>
										</div>
										<div className="col-md-3 col-sm-12">
											{GetContestStatus(new Date().getTime(), contestObj.startDate, contestObj.endDate) === "Past" &&
												<div className="total-designs">
													<FileImageFilled style={{ fontSize: "12px" }} />
													<span className="">{GetContestMetadata(contestObj.contestSlug)["participants"]} participants</span>
												</div>
											}
											<div className="contest-timing">
												<ClockCircleFilled style={{ fontSize: "12px" }} />
												<span className="">{GetContestMetaDescription(now.getTime(), contestObj.startDate, contestObj.endDate)}</span>
											</div>
											{GetContestStatus(new Date().getTime(), contestObj.startDate, contestObj.endDate) === "Past" &&
												<div className="contest-winner">
													<TrophyFilled style={{ fontSize: "12px" }} />
													<Link
														href={routeToHref(toArtistProfile(contestObj.winner.artistSlug))}
													>
														<span className="">{contestObj.winner.artistName}</span>
													</Link>
												</div>
											}
											<div className="contest-prize">
												<WalletFilled style={{ fontSize: "12px" }} />
												<span className="">${GetContestMetadata(contestObj.contestSlug)["prize"]}</span>
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
		setCurrentPathName(router.asPath);
		router.push("/login");
	};

	return (
		<Layout
			title={"Monthly Art Contest | Wondor"}
			name={"description"}
			content={
				"Participate in the Wondor monthly art contests and earn exclusive prizes for winning. Get all the information about the contests hosted every month. Earn reward points for participation. Join now!"
			}
		>
			{isFetchingContest ? (
				<Loader />
			) : (
				<>
					<div className="allContestPage_listingPagecontainer">
						{windowWidth > 500 && <GenericBreadcrumb page={"Art Contests"} />}
						<div className="allContestPage__listingPageCoverContainer">
							<div className="row">
								{/* <div className="col-sm-12"> */}
								<div className="contest-heading-cnt col-xl-8 col-lg-8 col-md-10 col-sm-12">
									<h1 className="common-h1-style">
										Artists, this is the place to show off your talent
									</h1>
									<div className="contest-heading-line"></div>
									<div className="">
										<h3 className="common-h3-style">
											Join our art contests and let your creativity be the judge!
										</h3>
									</div>
									<div className="current-contest-btn-cnt">
										{!isLoggedIn &&
											<button className="current-contest-btn" onClick={openLoginModal}>
												Get Started now
											</button>
										}
										<div className="how-it-works-cnt">
											<Link
												href={routeToHref(toAboutWondorArtContests())}
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
								<div className="col-sm-4 d-none d-lg-flex align-items-center justify-content-center">
									<Image
										alt="Participate in the Wondor monthly art contests and earn exclusive prizes for winning. Get all the information about the contests hosted every month"
										src={"https://cdn-us.icons8.com/_k_capJRbUyqgGdB-hyXSA/6_NUZgxCjUKBWNDWUuhpxA/Winning_a_prize.svg"}
										height={300}
										width={400}
										objectFit="contain" // Scale your image down to fit into the container
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-12 allContestListingContainer">
						{getAllContests(allContests)}
					</div>
					{/* <div className="row allContestListingContainer">
						<GenericActionBanner />
					</div> */}
				</>
			)}
		</Layout>
	);
};

export default connector(AllContestPage);
