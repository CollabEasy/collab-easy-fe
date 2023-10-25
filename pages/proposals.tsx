import { Tabs, Input, Button } from "antd";
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
import { User } from "types/model";
import CreateProposalModal from "@/components/modal/createProposalModal";
import { ProposalData } from "types/model/proposal";

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

const ProposalsPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    contests,
    artistListData,
    isFetchingContest,
    fetchAllContests,
}: Props) => {

    const emptyProposalData: ProposalData = {
        title: "",
        description: "",
        artistId: ""
    };

    const [proposalData, setProposalData] = useState(
        emptyProposalData
    );

    const { toContestPage } = useRoutesContext();
    const [allContests, setAllContests] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showProposalModal, setShowProposalModal] = useState(false);

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
            title={"Popular collaboration proposals | Wondor"}
            name={"description"}
            content={"Check out all of the interesting proposals for collaboration by artists around the world. Show interest and unlock the opportunity for working on a masterpeiece with a fellow artist. Join now!"}

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
                    <div className="allProposalsPage_listingPagecontainer">
                        <GenericBreadcrumb
                            page={"All Proposals"}
                        />
                        <div className="allProposalsPage__listingPageCoverContainer">
                            <div className="row ">
                                <div className="col-sm-8" style={{ backgroundColor: "#F8F5E7" }}>
                                    <div className="allProposalsPage_desktopCoverTextContainer">
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
                                        src={headerImage}
                                        layout="responsive"
                                        objectFit="contain" // Scale your image down to fit into the container
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="allProposalsPage-createProposalButton">
                            <Button
                                block
                                className="common-medium-btn"
                                onClick={() => {
                                    setShowProposalModal(true);
                                }}
                            >
                                Create Proposal
                            </Button>
                        </div>
                        <div className="col-md-12 listingContainer">
                            {getAllContests(allContests)}
                        </div>
                    </div>
                </>
            )}
            {showProposalModal && (
                <CreateProposalModal
                    onCancel={() => {
                        setShowProposalModal(false);
                    }}
                    isViewMode={true}
                    proposalDetails={proposalData}
                />
            )}
        </Layout>
    );
};

export default connector(ProposalsPage);
