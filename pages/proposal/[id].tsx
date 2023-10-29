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
import { GetDateString, GetUserSkillsTags } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
    const user = state.user.user;
    const isLoggedIn = state.user.isLoggedIn;
    const loginModalDetails = state.home.loginModalDetails;
    const proposal = state.proposal;
    // const proposalComments = state.proposalComments;
    const isfetchingProposal = state.proposal.isfetchingProposal;
    // const isAddingProposalComment = state.proposalComments.isAddingProposalComment;
    return { user, isLoggedIn, loginModalDetails, proposal, isfetchingProposal }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getProposalByIdAction: (id: string) => dispatch(action.fetchProposalById(id)),
    // fetchProposalCommentById: (proposalId: string) => dispatch(action.fetchProposalCommentByProposalId(proposalId)),
    // addProposalComment: (data: any) => dispatch(action.addProposalComment(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ProposalPage = ({
    user,
    isLoggedIn,
    loginModalDetails,
    isfetchingProposal,
    proposal,
    // isAddingProposalComment,
    getProposalByIdAction,
    // fetchProposalCommentById,
    // addProposalComment,
}: Props) => {

    const { toArtist, toArtistProfile } = useRoutesContext();

    const { confirm } = Modal;
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [comment, setComment] = useState("");
    const [collabConversationComments, setProposalComments] = useState<any>([]);
    const [showProfileModal, setShowProfileModal] = useState(false);

    const router = useRouter();
    const { id: proposalId } = router.query;

    useEffect(() => {
        getProposalByIdAction(proposalId as string);
        // fetchProposalCommentById(proposalId as string);
    }, []);

    const saveComment = () => {
        let obj = {
            "proposal_id": proposalId,
            "content": comment,
        }
        // addProposalComment({
        //     obj
        // });
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

    const getProposalCard = () => {
        let data = proposal.proposal.length != 0 ? proposal.proposal[0].data : [];
        return (
            <div className="ui-block">
                <article className="hentry post">
                    <div className="m-link" style={{display: "flex", flexDirection: "row"}}>
                        <span><h4 className="common-h4-style">{data.proposal.title}</h4></span>
                        <span style={{marginLeft: "20px"}}><EditOutlined style={{ fontSize: "20px" }}/></span>
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
                    <div className="post-additional-info inline-items">
                        <p>
                            {GetUserSkillsTags(data.proposal.categories)}
                            {/* <a href="#" className="btn btn-sm btn-light"><span className="fa fa-pencil"></span> Answer</a>
                                <a href="#" className="btn btn-sm btn-light"> Pass</a> */}
                        </p>
                    </div>
                </article>
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
                        {isfetchingProposal ? (
                            <Loader />
                        ) : (
                            <>
                                {getProposalCard()}
                            </>
                        )}

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

                {/* {showProposalModal && (
                    <CreateProposalModal
                        onCancel={() => {
                            setShowProposalModal(false);
                        }}
                        isViewMode={true}
                        proposalDetails={emptyProposalData}
                    />
                )} */}
            </>
        </Layout>
    );
};

export default connector(ProposalPage);
