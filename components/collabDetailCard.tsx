/* eslint-disable @next/next/no-img-element */
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import React, { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { CollabRequestData } from "types/model";
import { Button, Tooltip, Tag } from "antd";
import * as actions from "./../state/action";
import { acceptCollabRequest, rejectCollabRequest } from "api/collab";
import { useRouter } from "next/router";
import SendCollabRequestModal from "./modal/sendCollabRequestModal";
import { ShowEditCollabDetailIcon, ShowChatButton, ChatButtonText, ConvertTimestampToDate, GetCollabHeading, GetCollabAdditionalDetails, GetScheduledDate } from "helpers/collabCardHelper";


const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    isAcceptingRequest: state.collab.isAcceptingRequest,
    isRejectingRequest: state.collab.isRejectingRequest,
    isCancellingRequest: state.collab.isCancellingRequest,
    isCompletingRequest: state.collab.isCompletingRequest,
    showCollabModal: state.collab.showCollabModal,
  }
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  acceptCollabRequest: (id: string) =>
    dispatch(actions.acceptCollabRequestAction(id)),
  rejectCollabRequest: (id: string) =>
    dispatch(actions.rejectCollabRequestAction(id)),
  cancelCollabRequest: (id: string) =>
    dispatch(actions.cancelCollabRequestAction(id)),
  completeCollabRequest: (id: string) => dispatch(actions.completeCollabRequestAction(id)),
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
      collabTheme: ""
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined
  };
  const [collabRequestDetails, setCollabRequestDetails] = useState(emptyCollabDetails);

  useEffect(() => {
    setCollabRequestDetails(collabDetails);
  }, [collabDetails])

  const collabStatusComponentForSender = () => {
    return (
      <div className="collabDetailCard__statusContainer">
        {collabDetails.status === "PENDING" && (
          <Button
            block
            type="primary"
            loading={isCancellingRequest}
            className="common-medium-btn"
            style={{ color: "white", border: "yellow", backgroundColor: "#F8CF61", whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              cancelCollabRequest(collabDetails.id);
            }}
          >Cancel</Button>
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
          block
          type="primary"
          onClick={() => {
            acceptCollabRequest(collabDetails.id);
          }}
          style={{ color: "white", border: "green", backgroundColor: "#91D296", whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
          disabled={isRejectingRequest}
          loading={isAcceptingRequest}
          className="common-medium-btn"
        >
          Accept
        </Button>

        <Button
          block
          type="primary"
          onClick={() => {
            rejectCollabRequest(collabDetails.id);
          }}
          style={{ color: "white", border: "red", backgroundColor: "#ED6572", whiteSpace: "normal", height: 'auto', marginBottom: '10px' }}
          disabled={isAcceptingRequest}
          loading={isRejectingRequest}
          className="common-medium-btn"
        >
          Reject
        </Button>
      </>
    )
  }

  const getCollabCardTag = (status) => {
    if (status === "ACTIVE") {
      return <Tag style={{ width: "55px", marginBottom: '10px' }} color="blue">Active</Tag>;
    } else if (status === "PENDING") {
      return <Tag style={{ width: "65px", marginBottom: '10px' }} color="yellow">Pending</Tag>;
    } else if (status === "REJECTED") {
      return <Tag style={{ width: "80px", marginBottom: '10px' }} color="red">Rejected</Tag>;
    } else if (status === "EXPIRED") {
      return <Tag style={{ width: "65px", marginBottom: '10px' }} color="grey">Expired</Tag>;
    } else {
      return <Tag style={{ width: "80px", marginBottom: '10px' }} color="green">Completed</Tag>;
    }
  }

  const ppurl = (collabDetails.senderId === user.artist_id
    ? collabDetails.receiverProfilePicUrl
    : collabDetails.senderProfilePicUrl);
  return (
    <>
      {(showCollabModal.show && collabDetails.id === showCollabModal.id) && (
        <SendCollabRequestModal onCancel={() => {
          setShowCollabModalState(false, '');
        }} otherUser={collabDetails.receiverId} collabDetails={collabDetails} />
      )}
      <div className="collabDetailCard__container">
        <div className="row p-2 bg-white border rounded collab-card">
          <div className="col-md-3 mt-1 social-profile-picture">
            {(
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  router.push(
                    "/artist/profile/" +
                    (collabDetails.senderId === user.artist_id
                      ? collabDetails.receiverSlug
                      : collabDetails.senderSlug)
                  );
                }}
                className="collabDetailCard__imageNameContainer"
              >
                <img
                  className="card-img-top"
                  src={(collabDetails.senderId === user.artist_id
                    ? collabDetails.receiverProfilePicUrl
                    : collabDetails.senderProfilePicUrl)}
                  alt=""
                />
                {getCollabCardTag(collabDetails.status)}
              </div>
            )}
          </div>

          <div className="col-md-6 mt-1 collabDetailCard__textContainer">
            <b className="f-16 mb4 common-text-style"> {GetCollabHeading(user.artist_id, collabDetails)}</b><br></br>
            <p style={{ paddingTop: '3px' }} className="text-justify break-word common-p-style">
              {GetCollabAdditionalDetails(user.artist_id, collabDetails)}
            </p>
            <p style={{ paddingTop: '3px' }} className="text-justify break-word common-p-style">
              {GetScheduledDate(collabDetails.status)} {ConvertTimestampToDate(collabDetails.collabDate).toLocaleDateString("en-US")}.
            </p>
          </div>
          <div className="align-items-center align-content-center col-md-3 border-left mt-1">
            <div className="d-flex flex-column mt-4">
              {ShowEditCollabDetailIcon(collabDetails, user.artist_id, collabDetails.status) && (
                <Button
                  block
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowCollabModalState(true, collabDetails.id);
                  }}
                  style={{ color: "white", border: "green", backgroundColor: "#F8CF61", whiteSpace: "normal", height: 'auto', marginBottom: '10px', marginTop: '10px' }}
                  className="common-medium-btn"
                >
                  Edit
                </Button>
              )}
              {user.artist_id === collabDetails.senderId
                ? collabStatusComponentForSender()
                : collabStatusComponentForReceiver()}
            </div>
            <>
              {!isCompletingRequest && ShowChatButton(window.location.href, collabDetails.id, collabDetails.status) &&
                <Button
                  block
                  type="primary"
                  onClick={() => {
                    router.push(`/collab/details/${collabDetails.id}`);
                  }}
                  style={{ color: "white", border: "green", backgroundColor: "#9FBFF9", whiteSpace: "normal", height: 'auto', marginBottom: '10px', marginTop: '10px' }}
                  className="common-medium-btn"
                >
                  {ChatButtonText(collabDetails.status)}
                </Button>
              }
              {collabDetails.status === "ACTIVE" &&
                <Button
                  block
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    completeCollabRequest(collabDetails.id);
                  }}
                  style={{ color: "white", border: "green", backgroundColor: "#91D296", whiteSpace: "normal", height: 'auto', marginBottom: '10px', marginTop: '10px' }}
                  loading={isCompletingRequest}
                  className="common-medium-btn"
                >
                  Mark completed
                </Button>
              }
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default connector(CollabDetailCard);
