import React from "react";
import { Input, Button, Comment, Card, Tag, Modal } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { Dispatch } from "redux";
import { CollabRequestData, ProposalData } from "types/model";
import { useEffect, useState } from "react";
import * as action from "./../state/action";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { ConvertTimestampToDate } from 'helpers/collabCardHelper';
import Layout from "@/components/layout";
import Loader from "@/components/loader";
import CreateProposalModal from "@/components/modal/createProposalModal";
import ProposalInterestedArtistModal from "@/components/modal/proposalInterestedArtist";
import { GetDateString, GetProposalTags, HasShownInterest } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;

    const showCreateOrEditProposalModal = state.proposal.showCreateOrUpdateProposalModal;
    const showProposalInterestedArtistModal = state.proposalInterest.showProposalInterestedArtistModal;

    return { user, isLoggedIn, loginModalDetails, showCreateOrEditProposalModal, showProposalInterestedArtistModal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateProposal: (proposalId: string, data: any) => dispatch(action.updateProposal(proposalId, data)),
    addProposalInterest: (proposalId: string, data: any) => dispatch(action.addProposalInterest(proposalId, data)),

    setShowCreateOrUpdateProposalModal: (show: boolean) => dispatch(action.setShowCreateOrUpdateProposalModal(show)),
    setShowProposalInterestedArtistModal: (show: boolean) => dispatch(action.setShowProposalInterestedArtistModal(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    proposal: any,
    proposalInterest: any,
    showEditButton: boolean,
    showActionButton: boolean,
} & ConnectedProps<typeof connector>;

const ProposalDetailCard = ({
    user,
    isLoggedIn,
    loginModalDetails,
    proposal,
    proposalInterest,
    showEditButton,
    showActionButton,
    showCreateOrEditProposalModal,
    showProposalInterestedArtistModal,
    updateProposal,
    addProposalInterest,
    setShowCreateOrUpdateProposalModal,
    setShowProposalInterestedArtistModal,
}: Props) => {

    const { toArtistProfile } = useRoutesContext();

    const { confirm } = Modal;
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [proposalData, setProposalData] = useState();
    const [interestedArtists, setInterestedArtists] = useState();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();


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
        if (proposal.proposal.length === 0) {
            return <></>;
        }
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
                        <span><h5 className="common-h4-style">{data.proposal.title}</h5></span>
                        {user.artist_id === data.proposal.createdBy && data.proposal.proposalStatus !== "CLOSED" && showEditButton && (
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
                            <a className="post__author-name fn" href={toArtistProfile(data.creatorSlug).as} target="_blank" rel="noreferrer">
                                {data.creatorFirstName} {data.creatorLastName}
                            </a>
                            <p className="common-p-style">
                                Created at  {GetDateString(data.proposal.createdAt)}
                            </p>
                        </div>
                    </div>
                    <p className="common-p-style">
                        {data.proposal.description}
                    </p>
                    <p>
                        {GetProposalTags(data.proposal)}
                    </p>
                    {showActionButton && (
                        <div className="post-additional-info inline-items" style={{ padding: "20px 0 0" }}>
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
                                        {!isLoggedIn && (
                                            <div className="login-message">
                                                <p>Please, login to send a show interest</p>
                                            </div>
                                        )}
                                        <Button
                                            disabled={data.proposal.proposalStatus === "CLOSED" || hasShownInterest || !isLoggedIn}
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
                    )}
                </article>
            </div>
        );
    }

    return (
        <>
            {getProposalCard()}
        </>

    );
};

export default connector(ProposalDetailCard);
