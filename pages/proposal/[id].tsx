import React from "react";
import { Input, Button, Comment, Card, Tag, Modal } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { Dispatch } from "redux";
import { CollabRequestData, ProposalData } from "types/model";
import { useEffect, useState } from "react";
import * as action from "../../state/action";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { ConvertTimestampToDate } from 'helpers/collabCardHelper';
import Layout from "@/components/layout";
import Loader from "@/components/loader";
import CreateProposalModal from "@/components/modal/createProposalModal";
import ProposalInterestedArtistModal from "@/components/modal/proposalInterestedArtist";
import { GetDateString, GetUserSkillsTags, HasShownInterest } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;

    const proposal = state.proposal;
    const proposalInterest = state.proposalInterest;

    const showCreateOrEditProposalModal = state.proposal.showCreateOrUpdateProposalModal;
    const showProposalInterestedArtistModal = state.proposalInterest.showProposalInterestedArtistModal;
    // const proposalComments = state.proposalComments;
    const isfetchingProposal = state.proposal.isfetchingProposal;
    const isfetchingProposalInterest = state.proposalInterest.isFetchingProposalsInterests;
    // const isAddingProposalComment = state.proposalComments.isAddingProposalComment;
    return { user, isLoggedIn, loginModalDetails, proposal, proposalInterest, isfetchingProposal, isfetchingProposalInterest, showCreateOrEditProposalModal, showProposalInterestedArtistModal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getProposalByIdAction: (id: string) => dispatch(action.fetchProposalById(id)),
    updateProposal: (proposalId: string, data: any) => dispatch(action.updateProposal(proposalId, data)),

    addProposalInterest: (proposalId: string, data: any) => dispatch(action.addProposalInterest(proposalId, data)),
    getProposalsInterests: (proposalId: string) => dispatch(action.getProposalsInterests(proposalId)),
    // fetchProposalCommentById: (proposalId: string) => dispatch(action.fetchProposalCommentByProposalId(proposalId)),
    // addProposalComment: (data: any) => dispatch(action.addProposalComment(data)),

    setShowCreateOrUpdateProposalModal: (show: boolean) => dispatch(action.setShowCreateOrUpdateProposalModal(show)),
    setShowProposalInterestedArtistModal: (show: boolean) => dispatch(action.setShowProposalInterestedArtistModal(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    isfetchingProposal,
    isfetchingProposalInterest,
    proposal,
    proposalInterest,
    showCreateOrEditProposalModal,
    showProposalInterestedArtistModal,
    // isAddingProposalComment,
    getProposalByIdAction,
    getProposalsInterests,
    updateProposal,
    addProposalInterest,
    setShowCreateOrUpdateProposalModal,
    setShowProposalInterestedArtistModal,
    // fetchProposalCommentById,
    // addProposalComment,
}: Props) => {

    const { toArtistProfile } = useRoutesContext();

    const { confirm } = Modal;
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [proposalData, setProposalData] = useState();
    const [interestedArtists, setInterestedArtists] = useState();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();
    const { id: proposalId } = router.query;

    useEffect(() => {
        getProposalByIdAction(proposalId as string);
        getProposalsInterests(proposalId as string);
    }, []);

    const confirmCloseProposal = (proposalData) => {
        confirm({
            title: 'Are you sure you want to close this proposal?',
            onOk() {
                let obj = {
                    "proposal_title": proposalData.title,
                    "proposal_description": proposalData.description,
                    "category_ids": Object.keys(proposalData.categories),
                    "collab_type": proposalData.collabType,
                    "proposal_status": "CLOSED",
                }
                updateProposal(proposalData.proposalId, obj);
            },
            onCancel() {
                // Do nothing
            },
        });
    };

    const confirmShowInterest = (proposalData) => {
        confirm({
            title: 'We are glad to know that you are intersted',
            content: 'Please click OK to confirm!',
            onOk() {
                let obj = {
                    // for now we have harcoded, in future, we can ask artist
                    // to type in custom message.
                    "message": "I'm interested",
                }
                addProposalInterest(proposalData.proposalId, obj);
            },
            onCancel() {
                // Do nothing
            },
        });
    };

    const getProposalCard = () => {
        let interests = proposalInterest.proposalInterests.length != 0 ? proposalInterest.proposalInterests[0].data : [];
        let data = proposal.proposal.length != 0 ? proposal.proposal[0].data : [];
        let hasShownInterest = HasShownInterest(interests, user.artist_id);
        return (
            <div className="ui-block">
                <>
                    {data.proposal.proposalStatus === "ACTIVE" ? (
                        <div
                            style={{
                                backgroundColor: "#E2F0CB",
                                paddingBottom: ".5px",
                                paddingTop: "1%",
                                textAlign: "center",
                            }}
                        >
                            <p>
                                This proposal is active 🎉. Show interest now and take the first step
                                towards a powerful collab!
                            </p>
                        </div>
                    ) : (
                        <div
                            style={{
                                backgroundColor: "#EDC5CD",

                                paddingBottom: ".5px",

                                paddingTop: "1%",

                                textAlign: "center",
                            }}
                        >
                            <p>
                                Looks like this is a closed proposal. But you can still reach out to
                                the creator for a collab!
                            </p>
                        </div>
                    )}{" "}
                </>
                <article className="hentry post">
                    <div className="m-link" style={{ display: "flex", flexDirection: "row" }}>
                        <span><h4 className="common-h4-style">{data.proposal.title}</h4></span>
                        {user.artist_id === data.proposal.createdBy && data.proposal.proposalStatus !== "CLOSED" && (
                            <span style={{ marginLeft: "20px" }}>
                                <EditOutlined style={{ fontSize: "20px" }}
                                    onClick={() => {
                                        setProposalData(data.proposal);
                                        setShowCreateOrUpdateProposalModal(true);
                                    }}
                                />
                            </span>
                        )}
                    </div>
                    <div className="post__author author vcard inline-items">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={data.creatorProfilePicUrl} alt="author" />
                        <div className="author-date">
                            <a className="h6 post__author-name fn" href={toArtistProfile(data.creatorSlug).as} target="_blank" rel="noreferrer">
                                {data.creatorFirstName} {data.creatorLastName}
                            </a>
                            <div className="post__date">
                                <time className="published common-p-style ">
                                    Created at  {GetDateString(data.proposal.createdAt)}
                                </time>
                            </div>
                        </div>
                        <div className="more">
                            <a href="#">
                                <i className="fa fa-ellipsis-v"></i>
                            </a>
                        </div>
                    </div>
                    <p className="common-p-style">
                        {data.proposal.description}
                    </p>
                    <p>
                        {GetUserSkillsTags(data.proposal.categories)}
                    </p>
                    <div className="post-additional-info inline-items">
                        <p>
                            {user.artist_id === data.proposal.createdBy ? (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setInterestedArtists(interests);
                                        setShowProposalInterestedArtistModal(true);
                                    }}
                                >
                                    Interested Artists
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        disabled={data.proposal.proposalStatus === "CLOSED" || hasShownInterest}
                                        onClick={() => {
                                            setProposalData(data.proposal);
                                            confirmShowInterest(data.proposal);
                                        }}
                                    >
                                        {hasShownInterest ? "You Marked Interested" : "Show Interest"}
                                    </Button>
                                </>
                            )}

                            {user.artist_id === data.proposal.createdBy && (
                                <Button
                                    disabled={data.proposal.proposalStatus === "CLOSED"}
                                    onClick={() => {
                                        setProposalData(data.proposal);
                                        confirmCloseProposal(data.proposal);
                                    }}
                                >
                                    {data.proposal.proposalStatus === "CLOSED" ? "Closed Proposal" : "Mark Closed"}
                                </Button>
                            )}
                        </p>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <Layout
            title={"Collab request | Wondor "}
            name={"description"}
            content={
                "Manage your collab request on Wondor!"
            }
        >
            <>
                {loginModalDetails.openModal && !user.new_user && (
                    <LoginModal />
                )}
                {showProfileModal && (
                    <NewUserModal />
                )
                }
                {!isLoggedIn ? (
                    <>
                        <NotAuthorised
                            error={"Please login to see details of this collaboration request!"}
                        />
                    </>
                ) : (
                    <div className="collabDetailsPage_container">
                        {isfetchingProposal || isfetchingProposalInterest ? (
                            <Loader />
                        ) : (
                            <>
                                {getProposalCard()}
                            </>
                        )}
                    </div>
                )}

                {showCreateOrEditProposalModal && (
                    <CreateProposalModal
                        onCancel={() => {
                            setShowCreateOrUpdateProposalModal(false);
                        }}
                        isViewMode={true}
                        isEditMode={true}
                        proposalDetails={proposalData}
                    />
                )}

                {showProposalInterestedArtistModal && (
                    <ProposalInterestedArtistModal
                        onCancel={() => {
                            setShowProposalInterestedArtistModal(false);
                        }}
                        isViewMode={true}
                        interestedArtists={interestedArtists}
                    />
                )}
            </>
        </Layout>
    );
};

export default connector(ProposalPage);
