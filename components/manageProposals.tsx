import React from "react";
import { Input, Button, Comment, Card, Tag, Modal, List, Skeleton, Table } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { EditOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import { Dispatch } from "redux";
import { CollabRequestData, ProposalData } from "types/model";
import { useEffect, useState } from "react";
import * as action from "./../state/action";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { ConvertTimestampToDate } from 'helpers/collabCardHelper';
import Loader from "@/components/loader";
import { routeToHref } from "config/routes";
import CreateProposalModal from "@/components/modal/createProposalModal";
import ProposalInterestedArtistModal from "@/components/modal/proposalInterestedArtist";
import { GetDateString, GetProposalTags, InterestStatus } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";
import Link from "next/link";

// https://ant.design/components/card/
const { TextArea } = Input;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;

    const proposal = state.proposal;
    const showCreateOrEditProposalModal = state.proposal.showCreateOrUpdateProposalModal;
    const isfetchingUserProposals = state.proposal.isfetchingUserProposals;
    return { user, isLoggedIn, loginModalDetails, proposal, isfetchingUserProposals, showCreateOrEditProposalModal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchProposalByArtistSlug: (slug: string) => dispatch(action.fetchProposalByArtistSlug(slug)),
    updateProposal: (proposalId: string, data: any) => dispatch(action.updateProposal(proposalId, data)),
    setShowCreateOrUpdateProposalModal: (show: boolean) => dispatch(action.setShowCreateOrUpdateProposalModal(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ManageProposals = ({
    user,
    isLoggedIn,
    loginModalDetails,
    isfetchingUserProposals,
    proposal,
    showCreateOrEditProposalModal,
    fetchProposalByArtistSlug,
    updateProposal,
    setShowCreateOrUpdateProposalModal,
}: Props) => {

    const { toAllProposalsPage, toProposalPage } = useRoutesContext();

    const { confirm } = Modal;
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [proposalData, setProposalData] = useState();
    const [interestedArtists, setInterestedArtists] = useState();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [proposalStatus, setProposalStatus] = useState("false");

    useEffect(() => {
        fetchProposalByArtistSlug(user.slug as string);
    }, [user]);

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

    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            // eslint-disable-next-line react/display-name
            render: (_text: any, record: any) => (
                <>
                    {GetProposalTags(proposal)}
                </>
            ),
        },
        {
            title: "Action",
            key: "key",
            dataIndex: "key",
            // eslint-disable-next-line react/display-name
            render: (_text: any, proposal: any) => (
                <>
                    {user.artist_id === proposal.createdBy &&
                        <Button type="primary"
                            onClick={() => {
                                setProposalData(proposal);
                                setShowCreateOrUpdateProposalModal(true);
                            }}
                        >
                            Update
                        </Button>
                    }
                    <Button >
                        <Link
                            href={toProposalPage(proposal.title.replace(/\s+/g, '-').toLowerCase(), proposal.proposalId).as}
                            passHref
                        >
                            Details
                        </Link>
                    </Button>
                </>
            ),
        },
    ];

    const deviceColumns = [
        {
            // eslint-disable-next-line react/display-name
            render: (proposal, key, index) => {
                return (
                    <div>
                        <span>
                            <p>{proposal.title}</p>
                        </span>
                        <span>
                            <p>{GetProposalTags(proposal)}</p>
                        </span>
                        {user.artist_id === proposal.createdBy &&
                            <Button type="primary"
                                onClick={() => {
                                    setProposalData(proposal);
                                    setShowCreateOrUpdateProposalModal(true);
                                }}
                            >
                                Update
                            </Button>
                        }
                        <Button >
                            <Link
                                href={toProposalPage(proposal.title.replace(/\s+/g, '-').toLowerCase(), proposal.proposalId).as}
                                passHref
                            >
                                Details
                            </Link>
                        </Button>
                    </div>
                )
            }
        }
    ];


    const getProposalsList = (proposals: any[]) => {
        let updatedData = [];
        proposals.forEach((proposal) => {
            updatedData.push(proposal.proposal);
        });
        updatedData.sort((a, b) => b.createdAt - a.createdAt);
        return (
            <Table
                showHeader={false}
                columns={window.innerWidth < 500 ? deviceColumns : columns}
                dataSource={updatedData}
            />
        );
    }

    const getMyProposalsList = () => {
        console.log(proposal);
        if (proposal.userProposals.length === 0) {
            return <></>;
        }
        let data = proposal.userProposals.length != 0 ? proposal.userProposals[0].data : [];
        return (
            <>
                <Tabs defaultActiveKey="1" type="card" size={"middle"} >
                    <TabPane tab="Created" key="1">
                        {getProposalsList(data["created"])};
                    </TabPane>
                    <TabPane tab="Interested" key="2">
                        {getProposalsList(data["interested"])}
                    </TabPane>
                </Tabs>
            </>
        );
    }

    return (
        <>
            {loginModalDetails.openModal && !user.new_user && (
                <LoginModal />
            )}
            {showProfileModal && (
                <NewUserModal />
            )
            }

            {isfetchingUserProposals ? (
                <Loader />
            ) : (
                <div className="proposalInfo_container">
                    <div className="banner-container" style={{ backgroundColor: "#FFFBE6", border: "1px solid #f2a114" }}>
                        Hello {user.first_name}, find all of the proposals
                        <Link href={routeToHref((toAllProposalsPage()))} passHref> here.</Link>
                        You can also use this to
                        <Button>
                            add proposals
                        </Button>
                    </div>
                    <div className="rewardsInfo_container" style={{ marginTop: "0%" }}>
                        {getMyProposalsList()}
                    </div>
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
        </>
    );
};

export default connector(ManageProposals);