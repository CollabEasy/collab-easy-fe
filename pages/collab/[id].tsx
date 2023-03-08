import React from "react";
import { Tabs, Input, Button } from "antd";
import { AppState } from "state";
import { connect, ConnectedProps } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import * as action from "../../state/action";
import { useEffect, useState } from "react";
import CollabDetailCard from "../../components/collabDetailCard";
import Loader from "../../components/loader";

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const collab = state.collab;
  const collabConversation = state.collabConversation;
  const isFetchingCollabs = state.collab.isFetchingCollabDetails;
  const isFetchingCollabConversation = state.collabConversation.isFetchingCollabConversation;
  const isAddingCollabConversationComment = state.collabConversation.isAddingCollabConversationComment;
  return { user, collab, collabConversation, isFetchingCollabs, isFetchingCollabConversation, isAddingCollabConversationComment}
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCollabRequestsAction: (data: SearchCollab) => dispatch(action.getCollabRequestsAction(data)),
  fetchCollabConversationById: (collabId: string) => dispatch(action.fetchCollabConversationByCollabId(collabId)),
  addCollabConversationComment: (data: any) => dispatch(action.addCollabConversationComment(data)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const CollabPage = ({
  user,
  collab,
  isFetchingCollabs,
  isAddingCollabConversationComment,
  collabConversation,
  getCollabRequestsAction,
  fetchCollabConversationById,
  addCollabConversationComment,
}: Props) => {
  const [comment, setComment] = useState("");
  const [collabConversationComments, setCollabConversation] = useState([]);

  const router = useRouter();
  const { id: collabId } = router.query;

  useEffect(() => {
    getCollabRequestsAction({
      collabRequestId: collabId as string,
    });
    fetchCollabConversationById(collabId as string);

  }, [getCollabRequestsAction, fetchCollabConversationById, collabId]);

  useEffect(() => {
    setCollabConversation(collabConversation.collabConversation);
  }, [collabConversation])

  const getCollabRequest = (collabData) => {
    if (collabData["collabDetails"]["sent"]["all"].length > 0) {
      return collabData["collabDetails"]["sent"]["all"][0];
    } else if (collabData["collabDetails"]["received"]["all"].length > 0) {
      return collabData["collabDetails"]["received"]["all"][0];
    }
    return {};
  }
  const handleChange = (event) => {
    setComment(event.target.textContent);
  }

  const saveComment = () => {
    let obj = {
      "collab_id": collabId,
      "content": comment,
    }
    console.log("saving the comment ", obj);

    addCollabConversationComment({
      obj
    });
  }

  const hideNewCommentBox = (status) => {
    if (status == "REJECTED" || status == "EXPIRED" || status == "COMPLETED") {
      return false;
    }
    return true;
  }

  const getCollabConversationElement = () => {
    const collabComments: JSX.Element[] = [];
    let data = collabConversationComments.length != 0 ? collabConversationComments[0].data : [];
    console.log("comment length is ", data.length);
    data.forEach(element => {
      console.log("comment is ", element["content"]);
      collabComments.push(
        <div>
          <p>{element["content"]}</p>
        </div>
      )
    });
    return collabComments;
  }

  return (
    <>
      <div className="collabDetailsPage_container">
        <CollabDetailCard showUser={true} collabDetails={getCollabRequest(collab)} />

        {isFetchingCollabs ? (
          <Loader />
        ) : (
          <div>
            {getCollabConversationElement()}
          </div>
        )}

        <div className="collabDetailsPage_newCommentContainer">
          {hideNewCommentBox(getCollabRequest(collab)["status"]) && (
            <>
              <TextArea rows={4} placeholder="What is in your mind." maxLength={500} onChange={(e) => {
                handleChange(e)
              }} />
              <Button type="primary" className="collabDetailsPage_buttonContainer" onClick={saveComment}>Send</Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default connector(CollabPage);
