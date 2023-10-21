import { Tabs, Input } from "antd";
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
import headerImage from '../public/images/contest.svg';
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetContestStatus } from "helpers/contest";
import Layout from "@/components/layout";
import GenericBreadcrumb from "@/components/genericBreadcrumb";

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
    return { user, isLoggedIn, artistListData, loginModalDetails, contests, isFetchingContest }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllContests: () =>
        dispatch(actions.fetchAllContests()),
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
}: Props) => {
    const { toContestPage } = useRoutesContext();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [allContests, setAllContests] = useState([]);

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
    }, [user, artistListData, contests]);

    const getAllContests = (allContests) => {
        const resultArtists: JSX.Element[] = [];
        const now = new Date();
        let data = allContests.length != 0 ? allContests[0].data : [];
        data.sort((a, b) => b.startDate - a.startDate);
        data.forEach(contest => {
            let status = GetContestStatus(now.getTime(), contest.startDate, contest.endDate);
            resultArtists.push(
                <div className="row p-2 bg-white rounded contest-card">
                    <Card
                        title={contest.title}
                        style={{ height: '100%' }}
                        extra={
                            <>
                                {status === "Ongoing" && (
                                    <Tag color="green">{status}</Tag>
                                )}
                                {status === "Upcoming" && (
                                    <Tag color="yellow">{status}</Tag>
                                )}
                                {status === "Past" && (
                                    <Tag color="grey">{status}</Tag>
                                )}
                                {status === "Ongoing" ? (
                                    <a href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Enter</a>
                                ) : (
                                    <a href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Check details</a>
                                )}
                            </>
                        }
                    >
                        <div>
                            {contest.description}
                        </div>
                    </Card>
                </div>
            )
        });
        return resultArtists;
    };

    return (
        <Layout
            title={"Monthly Art Contest | Wondor"}
            name={"description"}
            content={"Participate in the Wondor monthly art contests and earn exclusive prizes for winning. Get all the information about the contests hosted every month. Earn reward points for participation. Join now!"}

        >
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )
            }
            {showProfileModal && (
                <NewUserModal />
            )
            }

            {isFetchingContest ? (
                <Loader />
            ) : (
                <>
                    <div className="allContestPage_listingPagecontainer">
                        <GenericBreadcrumb 
                            page={"All Contests"}
                        />
                        <div className="allContestPage__listingPageCoverContainer">
                            <div className="row ">
                                <div className="col-sm-8" style={{ backgroundColor: "#F8F5E7" }}>
                                    <div className="allContestPage_desktopCoverTextContainer">
                                        <h1 className="common-h1-style">
                                            Artists, unite! Enter our contest and let the world see your talent 😎
                                        </h1>
                                        <h3 className="common-h3-style">
                                            Join our contest and let your creativity be the judge!
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-4" style={{ backgroundColor: "#F8F5E7" }}>
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
                        <div className="col-md-12 listingContainer">
                            {getAllContests(allContests)}
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default connector(AllContestPage);
