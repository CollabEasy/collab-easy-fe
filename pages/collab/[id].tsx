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

// https://ant.design/components/card/
const { TextArea } = Input;

const mapStateToProps = (state: AppState) => {
  const user = state.user.user;
  const collab = state.collab;
  const isFetchingCollabs = state.collab.isFetchingCollabDetails;
  return { user, collab, isFetchingCollabs }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCollabRequestsAction: (data: SearchCollab) => dispatch(action.getCollabRequestsAction(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const CollabPage = ({
  collab,
  isFetchingCollabs,
  getCollabRequestsAction,
}: Props) => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { id: collabId } = router.query;
  useEffect(() => {
    getCollabRequestsAction({
      collabRequestId: collabId as string,
    });
  }, [getCollabRequestsAction, collabId]);

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
    console.log("saving the comment ", comment);
    window.alert(comment);
  }

  const hideNewCommentBox = (status) => {
    if (status == "REJECTED" || status == "EXPIRED" || status == "COMPLETED") {
      return false;
    }
    return true;
  }
  return (
    <>
      <div className="collabDetailsPage_container">
        <CollabDetailCard showUser={true} collabDetails={getCollabRequest(collab)} />
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
