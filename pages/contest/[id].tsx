import { Tabs, Input, Button, Comment } from "antd";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { routeToHref } from "config/routes";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import SamplePage from "@/components/samplePage";
import { Card, notification } from 'antd';
import Image from 'next/image';
import { Modal } from 'antd';
import sampleImage from '../../public/images/mobile-landing.svg';
import detailsImage from '../../public/images/contestDetails.svg';
import { FireOutlined, FireFilled, ReadOutlined } from '@ant-design/icons';
import * as action from "../../state/action";
import Loader from "@/components/loader";
import { GetContestStatus, GetDateString } from "helpers/contest";
import { IsAdmin } from "helpers/helper";
import UploadContestArtworkPage from "@/components/contestArtworkPage";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { ContestSubmission } from "types/model/contest";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const contest = state.contest;
    const allSubmissions = state.contestSubmission.allSubmissions;
    const allSubmissionsVotes = state.contestSubmissionVote.artistSubmissionVotes;
    const isFetchingContest = state.contest.isFetchingContest;
    const isFetchingSubmissions = state.contestSubmission.isFetchingSubmissions;
    const isFetchingSubmissionVotes = state.contestSubmissionVote.isFetchingSubmissionVotes;
    return { user, isLoggedIn, artistListData, loginModalDetails, contest, allSubmissions, allSubmissionsVotes, isFetchingContest, isFetchingSubmissions, isFetchingSubmissionVotes }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchContestAction: (slug: string) => dispatch(action.fetchContest(slug)),
    fetchContestSubmissions: (slug: string) => dispatch(action.fetchContestSubmissions(slug)),
    fetchContestSubmissionArtistVotes: (slug: string) => dispatch(action.fetchContestSubmissionArtistVotes(slug)),
    upvoteContestSubmission: (data: any) => dispatch(action.upvoteContestSubmission(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ContestPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    contest,
    allSubmissions,
    allSubmissionsVotes,
    isFetchingContest,
    isFetchingSubmissions,
    isFetchingSubmissionVotes,
    artistListData,
    fetchContestAction,
    fetchContestSubmissions,
    fetchContestSubmissionArtistVotes,
    upvoteContestSubmission,
}: Props) => {

    const emptyContestSubmissionDetails: ContestSubmission = {
        imageUrl: "",
        description: "",
    };

    const router = useRouter();
    const { toContestPage } = useRoutesContext();

    const { id: slug, tab: tab } = router.query;

    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isContestModalOpen, setIsContestModalOpen] = useState(false);
    const [contestSubmissionDetails, setContestSubmissionDetails] = useState(
        emptyContestSubmissionDetails
    );

    useEffect(() => {
        fetchContestAction(slug as string);
        fetchContestSubmissions(slug as string);
        fetchContestSubmissionArtistVotes(slug as string);
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

    const showContestModal = (imageUrl, description) => {
        let obj = {
            imageUrl: imageUrl,
            description: description
        }
        setContestSubmissionDetails(obj);
        setIsContestModalOpen(true);
    };

    const handleCancel = () => {
        setIsContestModalOpen(false);
    };

    const getActiveTab = () => {
        let active = "1";
        if (tab === "details") {
            active = "1";
        }
        if (tab === "submit") {
            active = "2";
        } else if (tab === "leaderboard") {
            active = "3";
        }
        return active;
    };

    const redirect = (tabIndex: string) => {
        let tab = "details";
        if (tabIndex == "1") {
            // do nothing
        }
        if (tabIndex === "2") {
            tab = "submit";
        } else if (tabIndex === "3") {
            tab = "leaderboard";
        }
        router.push("/contest/" + slug + "?tab=" + tab);
    };

    const prismicLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`;
    };

    const showNotification = (title, message) => {
        notification.open({
            message: title,
            description: message,
        });
    }
    const upvoteArtwork = (id, slug, status) => {
        let obj = {
            "submissionId": id,
            "contestSlug": slug,
            "vote": true,
        }
        if (status === "Past") {
            showNotification(
                "Contest has finished!",
                "Sorry but this contest has finished. You can not make changes to the vote 😕"
            );
        } else {
            if (!isLoggedIn) {
                showNotification(
                    "Please login to upvote!",
                    "We really appreciate you for supporting the artists by your votes 🙏🏻"
                );
            } else {
                upvoteContestSubmission(obj);
            }
        }
    }

    const getSubmissions = (status) => {
        const resultArtists: JSX.Element[] = [];
        let data = allSubmissions.length != 0 ? allSubmissions[0].data : [];
        let artistVotesData = allSubmissionsVotes.length != 0 ? allSubmissionsVotes[0].data : []
        let artistVotes = []
        artistVotesData.forEach(votes => {
            if (votes.artistId === user.artist_id && votes.vote === true) {
                artistVotes.push(votes.submissionId);
            }
        });

        data.forEach(submission => {
            resultArtists.push(
                <div className='sampleTile__imageTileContainer' >
                    <Card
                        className="sampleTile__imageTile"
                        cover={
                            <Image
                                loader={prismicLoader}
                                src={submission.artworkUrl}
                                alt="cards"
                                height={250}
                                width={250}
                                priority
                            />
                        }
                        actions={[
                            <>
                                {artistVotes.includes(submission.id) ? (
                                    <FireFilled key="upvote"
                                        style={{ color: "red" }}
                                        onClick={() => upvoteArtwork(submission.id, slug, status)}
                                    />
                                ) : (
                                    <FireOutlined key="downvote"
                                        onClick={() => upvoteArtwork(submission.id, slug, status)}
                                    />
                                )}

                            </>,
                            <ReadOutlined key="details"
                                onClick={() => showContestModal(submission.artworkUrl, submission.description)}
                            />
                        ]}
                    >
                        <Meta className="common-text-style" title={<span> {submission.description}</span>} />
                    </Card>
                </div>
            )
        })
        return resultArtists;
    };

    const now = new Date();
    return (
        <>
            <>
                {loginModalDetails.openModal && !user.new_user && (
                    <LoginModal />
                )
                }
                {showProfileModal && (
                    <NewUserModal />
                )
                }
                {isFetchingContest && isFetchingSubmissions && isFetchingSubmissionVotes ? (
                    <Loader />
                ) : (
                    <>
                        <div className="contestDetailPage_container">
                            <Tabs
                                type="card"
                                centered
                                onChange={(key: string) => {
                                    redirect(key);
                                }}
                                activeKey={getActiveTab()}
                            >
                                <TabPane tab="Contest details" key="1">

                                    <div className="responsive-two-column-grid">
                                        <div>
                                            <Image
                                                alt="Image Alt"
                                                src={detailsImage}
                                                layout="responsive"
                                                objectFit="contain" // Scale your image down to fit into the container
                                            />
                                        </div>
                                        <div className="contestDetailPage_tabContainer">
                                            <b className="common-text-style">
                                                Unleash your inner artist on Wonder - the platform for collaborative culture among artists.
                                                Connect and express yourself with fellow art enthusiasts, and participate
                                                in our monthly contests for inspiration to create something new and exciting.
                                                Join us and discover the power of art to bring people together.
                                            </b>
                                            <br></br><br></br>

                                            <h2 className="common-h1-style">
                                                Contest Details
                                            </h2>
                                            <p className="common-p-style">
                                                <b>Theme:</b> {contest.contest[0]?.data.title}
                                            </p>
                                            <p className="common-p-style">
                                                <b>Description:</b> {contest.contest[0]?.data.description}
                                            </p>
                                            <p className="common-p-style">
                                                <b>Start date:</b> {GetDateString(contest.contest[0]?.data.startDate)}
                                            </p>
                                            <p className="common-p-style">
                                                <b>End date:</b> {GetDateString(contest.contest[0]?.data.endDate)}
                                            </p>
                                            <p className="common-p-style">
                                                <b>Duration:</b> {(contest.contest[0]?.data.endDate - contest.contest[0]?.data.startDate) / (1000 * 86400) + 1} days
                                            </p>

                                            <h2 className="common-h2-style">Rules and Regulations:</h2>
                                            <ul className="common-text-style">
                                                <li>Any artist with a valid account on Wondor is eligible to participate.</li>
                                                <li>Post about the contest on social media such as instagram.</li>
                                                <li>Your work should be inspired from the theme of the contest.</li>
                                                <li>Submit an image of your artwork. You can submit only one piece for the contest.</li>
                                                <li>You work will be judged by the number of votes you have recieved. Share with your friends and get votes.</li>
                                                <li>Final decision will include things like creativity, technique, adherence to the theme, and overall impact.</li>
                                                <li>You will be disqualified from the contest for plagiarism, offensive content, or failure to adhere to the rules and guidelines</li>
                                                <li>You can also send in your queries in an email to admin@wondor.com, during the contest.</li>
                                            </ul>

                                            <h2 className="common-h2-style">Prize</h2>
                                            <p className="common-p-style">We believe anyone who participates is a winner. However, we will give an
                                                amazon gift card to 2 artists whose work is most upvoted. Gift card will be sent to their registered email id</p>
                                            <p className="common-p-style">
                                                <b>1st winner:</b> USD 15
                                            </p>
                                            <p className="common-p-style">
                                                <b>2nd winner</b> USD 10
                                            </p>
                                            <b className="common-text-style">Are you ready? Let your imagination soar and join the ultimate art showdown!</b>
                                        </div>
                                    </div>
                                </TabPane>

                                {GetContestStatus(now.getTime(), contest.contest[0]?.data.startDate, contest.contest[0]?.data.endDate) === "Ongoing" && (
                                    <TabPane tab="Submit your work" key="2">
                                        <div className="contestDetailPage_tabContainer">
                                            <div style={{ alignItems: "center" }}>
                                                <UploadContestArtworkPage />
                                            </div>
                                        </div>
                                    </TabPane>
                                )}

                                {GetContestStatus(now.getTime(), contest.contest[0]?.data.startDate, contest.contest[0]?.data.endDate) !== "Upcoming" && (
                                    <TabPane tab="Leaderboard" key="3">
                                        <div className="contestDetailPage_tabContainer">
                                            {allSubmissions.length != 0 && (
                                                <h2 className="common-h2-style" style={{ textAlign: "center" }}>

                                                    {GetContestStatus(now.getTime(), contest.contest[0]?.data.startDate, contest.contest[0]?.data.endDate) === "Ongoing" ? (
                                                        <>
                                                            <b>{allSubmissions[0].data.length}</b> artists have submitted their work! Dont miss out and
                                                            <Link href={routeToHref(toContestPage(slug as string, "submit"))} passHref> submit</Link> your work if you have not already!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <b>{allSubmissions[0].data.length}</b> artists participated in the contest.
                                                        </>
                                                    )}
                                                </h2>
                                            )}
                                            <div className="leaderboard__grid">
                                                {getSubmissions(GetContestStatus(now.getTime(), contest.contest[0]?.data.startDate, contest.contest[0]?.data.endDate))}
                                            </div>
                                        </div>
                                    </TabPane>
                                )}
                            </Tabs>
                        </div>
                    </>
                )}
            </>
            <div>
                {isContestModalOpen &&
                    <Modal closable
                        onCancel={handleCancel}
                        visible={isContestModalOpen}
                        footer={null}

                    >
                        <div style={{ overflow: "hidden", height: "100%" }}>
                            {/* <Image
                                alt="sample"
                                height= "100%"
                                width= "100%"
                                src={contestSubmissionDetails.imageUrl}
                            /> */}
                            <Image
                                loader={prismicLoader}
                                src={contestSubmissionDetails.imageUrl}
                                alt="cards"
                                height={250}
                                width={250}
                                priority
                            />
                        </div>
                        <p style={{ textAlign: "center" }} className='common-text-style'>
                            {contestSubmissionDetails.description}
                        </p>

                    </Modal>
                }
            </div>
        </>
    );
};

export default connector(ContestPage);
