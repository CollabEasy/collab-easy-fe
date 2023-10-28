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
import { GetContestStatus } from "helpers/contest";
import Layout from "@/components/layout";
import detailsImage from "../public/images/proposal.svg";
import GenericBreadcrumb from "@/components/genericBreadcrumb";
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
    const proposal = state.proposal;
    const isFetchingAllProposals = state.proposal.isFetchingAllProposals;
    return { user, isLoggedIn, artistListData, loginModalDetails, proposal, isFetchingAllProposals }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllProposals: () =>
        dispatch(actions.getAllProposals()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalsPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    artistListData,
    proposal,
    isFetchingAllProposals,
    fetchAllProposals,
}: Props) => {

    const emptyProposalData: ProposalData = {
        title: "",
        description: "",
        artistId: "",
        status: ""
    };

    const [proposalData, setProposalData] = useState(
        emptyProposalData
    );

    const { toProposalPage } = useRoutesContext();
    const [allProposals, setAllProposals] = useState([]);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showProposalModal, setShowProposalModal] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchAllProposals();
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
        setAllProposals(proposal.proposals);
    }, [user, artistListData, proposal.proposals]);

    const getAllProposals = (allProposals) => {
        const resultArtists: JSX.Element[] = [];
        const now = new Date();
        let data = allProposals.length != 0 ? allProposals[0].data : [];
        data.sort((a, b) => b.proposal.createdDate - a.proposal.createdDate);
        data.forEach(proposal => {
            resultArtists.push(
                <div className="row p-2 bg-white rounded contest-card">
                    <Card
                        title={proposal.proposal.title}
                        style={{ height: '100%' }}
                        extra={
                            <>
                                <Tag color="green">Open</Tag>
                                <a href={routeToHref(toProposalPage(proposal.id))}>Check details</a>
                            </>
                        }
                    >
                        <div>
                            {proposal.proposal.description}
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
                        <div style={{ paddingTop: "10px" }}>
                            <button
                                className="createProposalButton common-medium-btn"
                                onClick={() => {
                                    setShowProposalModal(true);
                                }}
                            >
                                Create Proposal
                            </button>
                        </div>
                        <div className="col-md-12 listingContainer">
                            {getAllProposals(allProposals)}
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
