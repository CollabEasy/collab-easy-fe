import { Tabs, Input, List, Button, Space } from "antd";
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
import { GetContestMetaDescription, GetContestStatusTag } from "helpers/contest";
import Layout from "@/components/layout";
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import GenericActionBanner from "@/components/genericActionBanner";
import { GetDateString } from "helpers/proposalHelper";
import { ContestEntry } from "types/model";
import Link from "next/link";

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
            <List
                size="large"
                style={{ width: "100%" }}
                bordered
                itemLayout={windowWidth > 700 ? "horizontal" : "vertical"}
                dataSource={data}
                renderItem={(contest: ContestEntry) => (
                    <List.Item
                        key={contest.title}
                        actions={
                            [
                                <>
                                    {GetContestStatusTag(now.getTime(), contest.startDate, contest.endDate)}
                                </>,
                                <>
                                    <Link href={routeToHref(toContestPage(contest.contestSlug, "details"))}>Details</Link>
                                </>
                            ]
                        }
                    >
                        <List.Item.Meta
                            title={contest.title}
                            description={GetContestMetaDescription(now.getTime(), contest.startDate, contest.endDate)}
                        />
                    </List.Item>
                )}
            />);
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
                        {windowWidth > 500 &&
                            <GenericBreadcrumb
                                page={"Art Contests"}
                            />
                        }
                        <div className="allContestPage__listingPageCoverContainer">
                            <div className="row ">
                                <div className="col-sm-8" style={{ backgroundColor: "#F8F5E7" }}>
                                    <div className="allContestPage_desktopCoverTextContainer">
                                        <h1 className="common-h1-style">
                                            Artists, this is the place to show off your talent 😎
                                        </h1>
                                        <h3 className="common-h3-style">
                                            Join our art contests and let your creativity be the judge!
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-4" style={{ backgroundColor: "#F8F5E7" }}>
                                    <Image
                                        alt="Image Alt"
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
                        <div className="row">
                            <GenericActionBanner />
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default connector(AllContestPage);
