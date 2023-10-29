import React from "react";
import { Input, Button, Comment, Card, Tag, Modal, Collapse } from "antd";
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
import { GetDateString, GetUserSkillsTags } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const proposal = state.proposal;
    const proposalQuestionAnswer = state.proposalQuestionAnswer;
    const isfetchingProposal = state.proposal.isfetchingProposal;
    const isFetchingPrpoposalQuestionAnswer = state.proposalQuestionAnswer.isFetchingPrpoposalQuestionAnswwer;
    return { user, isLoggedIn, loginModalDetails, proposal, proposalQuestionAnswer, isfetchingProposal, isFetchingPrpoposalQuestionAnswer }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getProposalByIdAction: (id: string) => dispatch(action.fetchProposalById(id)),
    updateProposal: (proposalId: string, data: any) => dispatch(action.updateProposal(proposalId, data)),
    fetchProposalQuestionAnswerByProposalId: (proposalId: string) => dispatch(action.fetchProposalQuestionsByProposalId(proposalId)),
    addProposalQuestion: (proposalId: string, data: any) => dispatch(action.addProposalQuestion(proposalId, data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    isfetchingProposal,
    proposal,
    proposalQuestionAnswer,
    isFetchingPrpoposalQuestionAnswer,
    getProposalByIdAction,
    fetchProposalQuestionAnswerByProposalId,
    addProposalQuestion,
    updateProposal,
}: Props) => {

    const { Panel } = Collapse;
    const { confirm } = Modal;
    const { toArtistProfile } = useRoutesContext();

    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [comment, setQuestion] = useState("");
    const [proposalData, setProposalData] = useState();
    const [collabConversationComments, setProposalComments] = useState<any>([]);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();
    const { id: proposalId } = router.query;

    useEffect(() => {
        getProposalByIdAction(proposalId as string);
        fetchProposalQuestionAnswerByProposalId(proposalId as string);
    }, []);

    const saveComment = () => {
        let obj = {
            "question": comment,
        }
        console.log(obj);
        addProposalQuestion(proposalId as string, obj);
        setQuestion("");
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

    const getProposalCard = () => {
        let data = proposal.proposal.length != 0 ? proposal.proposal[0].data : [];
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
                                        setShowProposalModal(true);
                                    }}
                                />
                            </span>
                        )}
                    </div>
                    <div className="post__author author vcard inline-items">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={data.creatorProfilePicUrl} alt="author" />
                        <div className="author-date">
                            <a className="h6 post__author-name fn" href={toArtistProfile(data.creatorSlug).as} target="_blank">
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
                                >
                                    Interested Artists
                                </Button>
                            ) : (
                                <>
                                    {data.proposal.proposalStatus !== "CLOSED" && (
                                        <Button>
                                            Show Interest
                                        </Button>
                                    )}
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
                                    {data.proposal.proposalStatus === "CLOSED" ? "Closed Proposal" : "Close Proposal"}
                                </Button>
                            )}
                        </p>
                    </div>
                </article>
            </div>
        );
    }

    const getNewQuestionBox = () => {
        let data = proposal.proposal.length != 0 ? proposal.proposal[0].data : [];
        return (
            <>
                {data.proposal.proposalStatus === "ACTIVE" ? (
                    <div className="proposalQuestionAnswerPage_newCommentContainer">
                        <div>
                            <TextArea
                                rows={4}
                                placeholder="What is in your mind?"
                                maxLength={500}
                                showCount
                                onChange={(e) =>
                                    setQuestion(e.target.value)}
                                value={comment}
                            />
                            <Button type="primary" className="proposalQuestionAnswerPage_buttonContainer" onClick={saveComment}>Ask a Question</Button>
                        </div>
                    </div>
                ) : (
                    <>
                    </>
                )}
            </>
        )
    }

    const getQuestionAnswer = (element) => {
        <div>
            <Comment
                // author={element["author"]}
                content={
                    <p>{element["content"]}</p>
                }
                datetime={
                    <span>{ConvertTimestampToDate(element["createdAt"]).toLocaleDateString("en-US")}</span>
                }
            />
        </div>



    }

    const getProposalQuestionAnswerElement = () => {
        let data = proposalQuestionAnswer.proposalQuestionAnswers.length != 0 ? proposalQuestionAnswer.proposalQuestionAnswers[0].data : [];

        return (
            <Collapse defaultActiveKey={["0"]} accordion>
                {data.map((question, index) => (
                    <Panel header={question.question} key={index}>
                        <p className="common-p-style">{question.answer}</p>
                    </Panel>
                ))}
            </Collapse>
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
                    <div>
                        {isfetchingProposal || isFetchingPrpoposalQuestionAnswer ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="proposalQuestionAnswerPage_container">
                                    {getProposalCard()}
                                </div>
                                <div className="proposalQuestionAnswerPage_questionContainer">
                                    {getProposalQuestionAnswerElement()}
                                </div>
                                <div className="proposalQuestionAnswerPage_newQuestionContainer">
                                    {getNewQuestionBox()}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {showProposalModal && (
                    <CreateProposalModal
                        onCancel={() => {
                            setShowProposalModal(false);
                        }}
                        isViewMode={true}
                        isEditMode={true}
                        proposalDetails={proposalData}
                    />
                )}
            </>
        </Layout>
    );
};

export default connector(ProposalPage);
