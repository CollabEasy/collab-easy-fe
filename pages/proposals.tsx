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
import * as actions from "state/action";
import Loader from "@/components/loader";
import { GetContestStatus, GetDateString } from "helpers/contest";
import Layout from "@/components/layout";
import detailsImage from "../public/images/proposal.svg";
import GenericBreadcrumb from "@/components/genericBreadcrumb";
import CreateProposalModal from "@/components/modal/createProposalModal";
import { ProposalData } from "types/model/proposal";
import moment from "moment";
import { GetUserSkillsTags } from "helpers/proposalHelper";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Meta } = Card;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const artistListData = state.home.artistListDetails;
    const proposal = state.proposal;
    const isFetchingAllProposals = state.proposal.isFetchingAllProposals;
    const showCreateOrEditProposalModal = state.proposal.showCreateOrUpdateProposalModal;
    return { user, isLoggedIn, artistListData, loginModalDetails, proposal, isFetchingAllProposals, showCreateOrEditProposalModal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllProposals: () =>
        dispatch(actions.getAllProposals()),
    setShowCreateOrUpdateProposalModal: (show: boolean) => dispatch(actions.setShowCreateOrUpdateProposalModal(show)),

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalsPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    proposal,
    showCreateOrEditProposalModal,
    isFetchingAllProposals,
    fetchAllProposals,
    setShowCreateOrUpdateProposalModal,
}: Props) => {

    const emptyProposalData: ProposalData = {
        title: "",
        description: "",
        artistId: "",
        status: "",
        proposalId: "",
        collabType: "",
        categories: [],
    };

    const [proposalData, setProposalData] = useState(emptyProposalData);
    const { toArtistProfile, toProposalPage } = useRoutesContext();
    const [allProposals, setAllProposals] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchAllProposals();
    }, [user]);

    useEffect(() => {
        if (user) {
            if (user.new_user) {
                setShowProfileModal(true);
            }
        }
        if (artistListData.status === "success") {
            setShowProfileModal(false);
        }
        setAllProposals(proposal.proposals);
    }, [user, artistListData, proposal.proposals]);

    // https://bootsnipp.com/snippets/5MqgR
    const getAllProposals = (allProposals) => {
        const resultArtists: JSX.Element[] = [];
        let data = allProposals.length != 0 ? allProposals[0].data : [];
        data.sort((a, b) => b.proposal.createdAt - a.proposal.createdAt);
        data.forEach(proposal => {
            resultArtists.push(
                <div className="ui-block">
                    <article className="hentry post">
                        <div className="m-link">
                            <a href={toProposalPage(proposal.proposal.proposalId).as} target="_blank" rel="noreferrer">
                                <h4 className="common-h4-style">{proposal.proposal.title}</h4>
                            </a>
                        </div>
                        <div className="post__author author vcard inline-items">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={proposal.creatorProfilePicUrl} alt="author" />
                            <div className="author-date">
                                <a className="h6 post__author-name fn" href={toArtistProfile(proposal.creatorSlug).as} target="_blank" rel="noreferrer">
                                    {proposal.creatorFirstName} {proposal.creatorLastName}
                                </a>
                                <div className="post__date">
                                    <time className="published common-p-style ">
                                        Created at  {GetDateString(proposal.proposal.createdAt)}
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
                            {proposal.proposal.description}

                        </p>
                        <div className="post-additional-info inline-items">
                            <p>
                                {GetUserSkillsTags(proposal.proposal.categories)}
                                {/* <a href="#" className="btn btn-sm btn-light"><span className="fa fa-pencil"></span> Answer</a>
                                <a href="#" className="btn btn-sm btn-light"> Pass</a> */}
                            </p>
                            <p className="social-icons">
                                {proposal.proposal.proposalStatus === "ACTIVE" ? (
                                    <Tag color="green">{proposal.proposal.proposalStatus}</Tag>
                                ) : (
                                    <Tag color="grey">{proposal.proposal.proposalStatus}</Tag>
                                )}
                                <Tag color="orange">{proposal.proposal.collabType}</Tag>  
                            </p>
                        </div>
                    </article>
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

            {isFetchingAllProposals ? (
                <Loader />
            ) : (
                <>
                    <div className="allProposalsPage_listingPagecontainer">
                        <GenericBreadcrumb
                            page={"All Proposals"}
                        />
                        <div className="allProposalsPage__listingPageCoverContainer">
                            <div className="row ">
                                <div className="col-sm-8" style={{ backgroundColor: "#FFF3C9" }}>
                                    <div className="allProposalsPage_desktopCoverTextContainer">
                                        <h1 className="common-h1-style">
                                            Artists, your next collaboration opportunity is here 😎
                                        </h1>
                                        <h3 className="common-h3-style">
                                            Checkout these amazing proposals by fellow artists and show interest!
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-sm-4 " style={{ backgroundColor: "#FFF3C9" }}>
                                    <Image
                                        alt="Image Alt"
                                        src={detailsImage}
                                        layout="responsive"
                                        objectFit="contain" // Scale your image down to fit into the container
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 listingContainer">
                            <div>
                                <Button 
                                    type="text"
                                    className="createProposalButton common-medium-btn"
                                    onClick={() => {
                                        setShowCreateOrUpdateProposalModal(true);
                                    }}
                                >
                                Add Proposal
                                </Button>
                            </div>
                            {getAllProposals(allProposals)}
                        </div>
                    </div>
                </>
            )}
            {showCreateOrEditProposalModal && (
                <CreateProposalModal
                    onCancel={() => {
                        setShowCreateOrUpdateProposalModal(false);
                    }}
                    isViewMode={true}
                    isEditMode={false}
                    proposalDetails={proposalData}
                />
            )}
        </Layout>
    );
};

export default connector(ProposalsPage);