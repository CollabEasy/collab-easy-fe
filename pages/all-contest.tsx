import { Tabs, Input, Button, Comment } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import LoginModal from '@/components/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { Card, Tag } from 'antd';
import { useRoutesContext } from "components/routeContext";
import { routeToHref } from "config/routes";
import Link from "next/link";
import Image from 'next/image';
import headerImage from '../public/images/contest.svg';
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetContestStatus, GetDateString } from "helpers/contest";
import { IsAdmin } from "helpers/helper";

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
    if (!IsAdmin(user.email)) {
        router.push("/");
    }

    useEffect(() => {
        fetchAllContests();
    }, []);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
    }, [user])

    useEffect(() => {
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
    }, [artistListData]);


    useEffect(() => {
        setAllContests(contests.contest);
    }, [contests])

    const getAllContests = (allContests) => {
        const resultArtists: JSX.Element[] = [];
        const now = new Date();
        let data = allContests.length != 0 ? allContests[0].data : [];
        data.forEach(contest => {
            console.log(contest);
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
                                <a href={routeToHref(toContestPage(contest.contestSlug))}>Enter</a>
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
        <>
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
        </>
    );
};

export default connector(AllContestPage);
