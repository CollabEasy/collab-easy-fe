/* eslint-disable @next/next/no-img-element */
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
} from "@ant-design/icons";
import { CollabRequestData } from "types/model";
import { Button} from "antd";
import * as actions from "./../state/action";
import { useRouter } from "next/router";
import SendCollabRequestModal from "./modal/sendCollabRequestModal";
import {
  ConvertTimestampToDate,
  GetScheduledDate,
} from "helpers/collabCardHelper";
import { GetDateString } from "helpers/proposalHelper";
import { useRoutesContext } from "components/routeContext";

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    isAcceptingRequest: state.collab.isAcceptingRequest,
    isRejectingRequest: state.collab.isRejectingRequest,
    isCancellingRequest: state.collab.isCancellingRequest,
    isCompletingRequest: state.collab.isCompletingRequest,
    showCollabModal: state.collab.showCollabModal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptCollabRequest: (id: string) =>
    dispatch(actions.acceptCollabRequestAction(id)),
  rejectCollabRequest: (id: string) =>
    dispatch(actions.rejectCollabRequestAction(id)),
  cancelCollabRequest: (id: string) =>
    dispatch(actions.cancelCollabRequestAction(id)),
  completeCollabRequest: (id: string) =>
    dispatch(actions.completeCollabRequestAction(id)),
  setShowCollabModalState: (show: boolean, id: string) =>
    dispatch(actions.setShowCollabModalState(show, id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  showUser: boolean;
  collabDetails: CollabRequestData;
} & ConnectedProps<typeof connector>;

const CollabDetailCard = ({
  user,
  collabDetails,
  showUser,
  isAcceptingRequest,
  isRejectingRequest,
  isCancellingRequest,
  showCollabModal,
  acceptCollabRequest,
  rejectCollabRequest,
  cancelCollabRequest,
  setShowCollabModalState,
  isCompletingRequest,
  completeCollabRequest,
}: Props) => {
  const router = useRouter();
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
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);

  useEffect(() => {
    setCollabRequestDetails(collabDetails);
  }, [collabDetails]);

  const { toArtistProfile } = useRoutesContext();

  const collabStatusComponentForSender = () => {
    return (
      <div>
        {collabDetails.status === "PENDING" && (
          <Button
            loading={isCancellingRequest}
            onClick={(e) => {
              cancelCollabRequest(collabDetails.id);
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    );
  };

  const collabStatusComponentForReceiver = () => {
    if (collabDetails.status !== "PENDING")
      return collabStatusComponentForSender();

    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            acceptCollabRequest(collabDetails.id);
          }}
          disabled={isRejectingRequest}
          loading={isAcceptingRequest}
        >
          Accept
        </Button>

        <Button
          onClick={() => {
            rejectCollabRequest(collabDetails.id);
          }}
          disabled={isAcceptingRequest}
          loading={isRejectingRequest}
        >
          Reject
        </Button>
      </>
    );
  };

  const getCollabCard = () => {
    return (
      <div className="ui-block">
        <article className="hentry post">
          <div className="m-link" style={{ display: "flex", flexDirection: "row" }}>
            <span><h5 className="common-h4-style">{collabDetails.requestData.collabTheme}</h5></span>
            {user.artist_id === collabDetails.senderId && (collabDetails.status === "PENDING" || collabDetails.status === "ACTIVE") && (
              <span style={{ marginLeft: "20px" }}>
                <EditOutlined style={{ fontSize: "20px" }}
                  onClick={() => {
                    setShowCollabModalState(true, collabDetails.id);
                  }}
                />
              </span>
            )}
          </div>
          <div className="post__author author vcard inline-items">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={collabDetails.senderProfilePicUrl} alt="author" />
            <div className="author-date">
              <a className="post__author-name fn" href={toArtistProfile(collabDetails.senderSlug).as} target="_blank" rel="noreferrer">
                {collabDetails.senderName}
              </a>
              <p className="common-p-style">
                Sent on  {GetDateString(collabDetails.createdAt as unknown as number)}
              </p>
            </div>
          </div>
          <p className="common-p-style">
            {collabDetails.requestData.message}
          </p>
          <p
            style={{ paddingTop: "3px" }}
            className="text-justify break-word common-p-style"
          >
            {GetScheduledDate(collabDetails.status)}{" "}
            {ConvertTimestampToDate(
              collabDetails.collabDate
            ).toLocaleDateString("en-US")}
            .
          </p>
          <div className="post-additional-info inline-items" style={{ padding: "20px 0 20px 0" }}>
            {user.artist_id === collabDetails.senderId
              ? collabStatusComponentForSender()
              : collabStatusComponentForReceiver()
            }

            {collabDetails.status === "ACTIVE" && (
              <Button
                type="primary"
                onClick={(e) => {
                  completeCollabRequest(collabDetails.id);
                }}

                loading={isCompletingRequest}
              >
                Mark completed
              </Button>
            )}
          </div>
        </article>
      </div>
    );
  }

  return (
    <>
    {collabDetails.id === "" || collabDetails.id === undefined || collabDetails.id === null && (
      <p>No such collab request</p>
    )}
      {showCollabModal.show && collabDetails.id === showCollabModal.id && (
        <div className="padding20">
          <SendCollabRequestModal
            edit
            otherUser={collabDetails.receiverId}
            collabDetails={collabDetails}
            onCollabRequestSend={() => {
              setShowCollabModalState(false, collabDetails.id);
            }}
          />
        </div>
      )}
      <div className="collabDetailCard__container">
        {getCollabCard()}
      </div>
    </>
  );
};

export default connector(CollabDetailCard);
