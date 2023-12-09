import React from "react";
import { Tabs, Input, Button, Comment, Breadcrumb } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import * as action from "../../../state/action";
import { useEffect, useState } from "react";
import CollabDetailCard from "../../../components/collabDetailCard";
import Loader from "../../../components/loader";
import NotAuthorised from "@/components/error/notAuthorised";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import { ConvertTimestampToDate } from "helpers/collabCardHelper";
import {
  GetCollabRequest,
  GetCollaboratorInfoFromCollab,
  DoHideNewCommentBox,
} from "helpers/collabPageHelper";
import Layout from "@/components/layout";
import { useRoutesContext } from "../../../components/routeContext";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const isLoggedIn = state.user.isLoggedIn;
  const loginModalDetails = state.home.loginModalDetails;
  const collab = state.collab;
  const collabConversation = state.collabConversation;
  const isFetchingCollabs = state.collab.isFetchingCollabDetails;
  const isFetchingCollabConversation =
    state.collabConversation.isFetchingCollabConversation;
  const isAddingCollabConversationComment =
    state.collabConversation.isAddingCollabConversationComment;
  return {
    user,
    collab,
    isLoggedIn,
    loginModalDetails,
    collabConversation,
    isFetchingCollabs,
    isFetchingCollabConversation,
    isAddingCollabConversationComment,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCollabRequestsAction: (data: SearchCollab) =>
    dispatch(action.getCollabRequestsAction(data)),
  fetchCollabConversationById: (collabId: string) =>
    dispatch(action.fetchCollabConversationByCollabId(collabId)),
  addCollabConversationComment: (data: any) =>
    dispatch(action.addCollabConversationComment(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const CollabPage = ({
  user,
  collab,
  isLoggedIn,
  loginModalDetails,
  isFetchingCollabs,
  isAddingCollabConversationComment,
  collabConversation,
  getCollabRequestsAction,
  fetchCollabConversationById,
  addCollabConversationComment,
}: Props) => {
  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: "",
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined,
    proposalId: null,
  };

  const [comment, setComment] = useState("");
  const [windowWidth, setWindowWidth] = useState(-1);
  const [collabConversationComments, setCollabConversation] = useState([]);
  const [collabDetails, setCollabRequestDetails] =
    useState<CollabRequestData>(emptyCollabDetails);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isNewRequest, setIsNewRequest] = useState(false);

  const { toDiscover, toArtistPortal } = useRoutesContext();

  const router = useRouter();
  const { id: collabId } = router.query;
  

  useEffect(() => {
    getCollabRequestsAction({
      collabRequestId: collabId as string,
    });
    fetchCollabConversationById(collabId as string);
    setWindowWidth(window.innerWidth);
  }, [getCollabRequestsAction, fetchCollabConversationById, collabId]);

  useEffect(() => {
    if (
      collab.collabDetails.sent.all.length > 0
    ) {
      setCollabRequestDetails(collab.collabDetails.sent.all[0]);
    } else if (
      collab.collabDetails.sent.all.length > 0
    ) {
      setCollabRequestDetails(collab.collabDetails.received.all[0]);
    } else {
      setCollabRequestDetails(emptyCollabDetails);
      setIsNewRequest(true);
    }
  }, [collab]);

  useEffect(() => {
    setCollabConversation(collabConversation.collabConversation);
  }, [collabConversation])

  const saveComment = () => {
    let obj = {
      collab_id: collabId,
      content: comment,
    };
    addCollabConversationComment({
      obj,
    });
    setComment("");
  };

  const collaboratorDetails = GetCollaboratorInfoFromCollab(collab);

  const getCollabConversationElement = () => {
    const collabComments: JSX.Element[] = [];
    let data =
      collabConversationComments.length != 0
        ? collabConversationComments[0].data
        : [];
    data.forEach((element) => {
      collabComments.push(
        <div>
          <Comment
            author={collaboratorDetails.get(element["artistId"])}
            content={<p>{element["content"]}</p>}
            datetime={
              <span>
                {ConvertTimestampToDate(
                  element["createdAt"]
                ).toLocaleDateString("en-US")}
              </span>
            }
          />
        </div>
      );
    });
    return collabComments;
  };

  const getBreadcrum = (page: string) => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toArtistPortal("collab-request").as}>Portal</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{page}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  if (isFetchingCollabs) {
    return <Loader />
  }

  return (
    <Layout
      title={"Collab request | Wondor "}
      name={"description"}
      content={"Manage your collab request on Wondor!"}
    >
      {collabDetails.id === "" || collabDetails.id === undefined ? (
        <p>No such collab request</p>
      ) : (
        <>
          {loginModalDetails.openModal && !user.new_user && <LoginModal />}
          {showProfileModal && <NewUserModal />}
          {!isLoggedIn ? (
            <>
              <NotAuthorised
                error={
                  "Please login to see details of this collaboration request!"
                }
              />
            </>
          ) : (
            <div className="collabDetailsPage_container">
              {isFetchingCollabs ? (
                <Loader />
              ) : (
                <>
                  {windowWidth > 500 && <>{getBreadcrum("Collab Requests")}</>}

                  <CollabDetailCard
                    showUser={true}
                    collabDetails={GetCollabRequest(collab)}
                  />
                </>
              )}

              {isAddingCollabConversationComment ? (
                <Loader />
              ) : (
                <div className="collabDetailsPage_newCommentContainer">
                  {getCollabConversationElement()}
                </div>
              )}

              <div className="collabDetailsPage_newCommentContainer">
                {DoHideNewCommentBox(GetCollabRequest(collab)["status"]) && (
                  <div>
                    <TextArea
                      rows={4}
                      placeholder="What is in your mind?"
                      maxLength={500}
                      showCount
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                    <Button
                      type="primary"
                      className="collabDetailsPage_buttonContainer"
                      onClick={saveComment}
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default connector(CollabPage);
