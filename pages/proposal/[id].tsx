import React from "react";
import { Input, Button, Comment } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData } from "types/model";
import { useEffect, useState } from "react";
import * as action from "../../state/action";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from '@/components/modal/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { ConvertTimestampToDate } from 'helpers/collabCardHelper';
import Layout from "@/components/layout";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const proposals = state.proposal.proposals;
  const proposalComments = state.proposalComments;
  return { user, isLoggedIn, loginModalDetails,  proposals, proposalComments }
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
  getProposalByIdAction,
  fetchProposalCommentById,
  addProposalComment,
}: Props) => {
  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: ""
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined
  };

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

  const getCollabConversationElement = () => {
    const collabComments: JSX.Element[] = [];
    let data = collabConversationComments.length != 0 ? collabConversationComments[0].data : [];
    data.forEach(element => {
      collabComments.push(
        <div>
          <Comment
            author={""}
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
            {isFetchingCollabs ? (
              <Loader />
            ) : (
              <CollabDetailCard showUser={true} collabDetails={GetCollabRequest(collab)} />
            )}

            {isAddingCollabConversationComment ? (
              <Loader />
            ) : (
              <div className="collabDetailsPage_newCommentContainer">
                {getCollabConversationElement()}
              </div>
            )}

            <div className="collabDetailsPage_newCommentContainer">
              {DoHideNewCommentBox(GetCollabRequest(proposal)["status"]) && (
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
              )}
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default connector(ProposalPage);
