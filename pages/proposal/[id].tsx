import React from "react";
import { Input, Button, Comment, Card, Tag, Modal } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
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

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const proposals = state.proposal;
    const proposalComments = state.proposalComments;
    // const isfetchingProposal = state.proposal.isfetchingProposal;
    // const isAddingProposalComment = state.proposalComments.isAddingProposalComment;
    return { user, isLoggedIn, loginModalDetails, proposals, proposalComments }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getProposalByIdAction: (id: string) => dispatch(action.fetchProposalById(id)),
    fetchProposalCommentById: (proposalId: string) => dispatch(action.fetchProposalCommentByProposalId(proposalId)),
    addProposalComment: (data: any) => dispatch(action.addProposalComment(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    proposalComments,
    // isfetchingProposal,
    // isAddingProposalComment,
    getProposalByIdAction,
    fetchProposalCommentById,
    addProposalComment,
}: Props) => {
    const { confirm } = Modal;

    const emptyProposalData: ProposalData = {
        artistId: "rahul-gupta-1",
        title: "This is a dummy title",
        description: "This is a dummy description",
        skills: ["writing", "dancing"]
    };

    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [comment, setComment] = useState("");
    const [collabConversationComments, setProposalComments] = useState<any>([]);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();
    const { id: proposalId } = router.query;

    useEffect(() => {
        getProposalByIdAction(proposalId as string);
        fetchProposalCommentById(proposalId as string);
    }, []);

    useEffect(() => {
        setProposalComments(proposalComments);
    }, [proposalComments]);

    const saveComment = () => {
        let obj = {
            "proposal_id": proposalId,
            "content": comment,
        }
        addProposalComment({
            obj
        });
        setComment("");
    }

    const showConfirm = () => {
        confirm({
            title: 'Are you sure you want to show inteerst?',
            content: 'This will start an email thread between you two',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getProposalCard = (emptyProposalData) => {
        return (
            <div className="row p-2 bg-white rounded contest-card">
                <Card
                    title={"This is a dummy title"}
                    style={{ height: '100%' }}
                    extra={
                        <>
                            <Tag color="green">Open</Tag>
                        </>
                    }
                >
                    <div>
                        This is a dummy descirption.
                    </div>
                    <div>
                        These are comma separated dummy skills
                    </div>
                    <div>
                        These is dummy author name
                    </div>
                    <div>
                        These is created time.
                    </div>
                    <div>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowProposalModal(true);
                            }}
                        >
                            Edit only visible to creator
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowProposalModal(true);
                            }}
                        >
                            See interested people - buton only seen to creator
                        </Button>
                        <Button onClick={showConfirm}>Show Interest</Button>
                    </div>
                </Card>
            </div>
        );
    }

    const getCollabConversationElement = () => {
        const collabComments: JSX.Element[] = [];
        // let data = collabConversationComments.length != 0 ? collabConversationComments[0].data : [];
        let data = [
            {
                "author": "rahul-gupta-1",
                "content": "this is a dummy comment",
                "createdAt": "12-01-2302",
            }
        ];
        data.forEach(element => {
            collabComments.push(
                <div>
                    <Comment
                        author={element["author"]}
                        content={
                            <p>{element["content"]}</p>
                        }
                        datetime={
                            <span>{ConvertTimestampToDate(element["createdAt"]).toLocaleDateString("en-US")}</span>
                        }
                    />
                </div>
            )
        });
        return collabComments;
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
                )
                }
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
                        {/* {isfetchingProposal ? (
                            <Loader />
                            ) : ( */}
                        {getProposalCard(emptyProposalData)}
                        {/* )} */}

                        {/* {isAddingProposalComment ? (
                            <Loader />
                        ) : ( */}
                        <div className="collabDetailsPage_newCommentContainer">
                            {getCollabConversationElement()}
                        </div>
                        {/* )} */}

                        <div className="collabDetailsPage_newCommentContainer">
                            <div>
                                <TextArea
                                    rows={4}
                                    placeholder="What is in your mind?"
                                    maxLength={500}
                                    showCount
                                    onChange={(e) =>
                                        setComment(e.target.value)}
                                    value={comment}
                                />
                                <Button type="primary" className="collabDetailsPage_buttonContainer" onClick={saveComment}>Send</Button>
                            </div>
                        </div>
                    </div>
                )}

                {showProposalModal && (
                    <CreateProposalModal
                        onCancel={() => {
                            setShowProposalModal(false);
                        }}
                        isViewMode={true}
                        proposalDetails={emptyProposalData}
                    />
                )}
            </>
        </Layout>
    );
};

export default connector(ProposalPage);
