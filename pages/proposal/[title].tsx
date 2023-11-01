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
import { GetDateString, GetProposalTags, HasShownInterest } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";
import ProposalDetailCard from "@/components/proposalDetailCard";

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

    const [showProfileModal, setShowProfileModal] = useState(false);
    const router = useRouter();
    const { title, proposalId } = router.query;

    useEffect(() => {
        getProposalByIdAction(proposalId as string);
        getProposalsInterests(proposalId as string);
    }, [user]);

    return (
        <Layout
            title={"Proposal | Wondor "}
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
                <div className="allProposalsPage_listingPagecontainer">
                    {isfetchingProposal || isfetchingProposalInterest ? (
                        <Loader />
                    ) : (
                        <>
                            <ProposalDetailCard
                                proposal={proposal}
                                proposalInterest={proposalInterest}
                                showEditButton={false}
                                showActionButton={true}
                            />
                        </>
                    )}
                </div>
            </>
        </Layout>
    );
};

export default connector(ProposalPage);
