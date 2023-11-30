import { Button, DatePicker, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import { CollabRequestData, SendCollabRequest } from "types/model";
import Loader from "../loader";

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isSendingRequest: state.collab.isSendingRequest,
  isAcceptingRequest: state.collab.isAcceptingRequest,
  isRejectingRequest: state.collab.isRejectingRequest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendCollabRequestAction: (data: SendCollabRequest) =>
    dispatch(action.sendCollabRequestAction(data)),
  updateCollabRequest: (data: CollabRequestData) =>
    dispatch(action.updateCollabRequest(data)),
  acceptCollabRequest: (requestId: string) =>
    dispatch(action.acceptCollabRequestAction(requestId)),
  rejectCollabRequest: (requestId: string) =>
    dispatch(action.rejectCollabRequestAction(requestId)),
  setShowCollabModalState: (show: boolean, id: string) =>
    dispatch(action.setShowCollabModalState(show, id)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  edit?: boolean;
  otherUser: string;
  collabDetails: CollabRequestData;
  onCancel?: () => void;
} & ConnectedProps<typeof connector>;

const SendCollabRequestModal = ({
  edit = false,
  user,
  otherUser,
  collabDetails,
  isSendingRequest,
  isAcceptingRequest,
  isRejectingRequest,
  updateCollabRequest,
  sendCollabRequestAction,
  acceptCollabRequest,
  rejectCollabRequest,
  onCancel,
  setShowCollabModalState,
}: Props) => {
  const currentDate = moment(new Date());
  const tomorrow = currentDate.clone().add(1, "days");
  const isNewCollab = collabDetails.id === "";
  const [collabDataCached, setCollabDataCached] =
    useState<CollabRequestData>(collabDetails);
  const [editable, setEditable] = useState(
    isNewCollab ||
      (user.artist_id === collabDetails.senderId &&
        collabDetails.status === "PENDING")
  );

  const [hasDateChanged, setDateChanged] = useState(false);

  const sendCollabRequest = () => {
    if (isNewCollab) {
      const data: SendCollabRequest = {
        receiverId: otherUser,
        requestData: {
          message: collabDataCached.requestData.message,
          collabTheme: collabDataCached.requestData.collabTheme,
        },
        collabDate: collabDataCached.collabDate ?? tomorrow.toDate(),
      };
      sendCollabRequestAction(data);
      setTimeout(() => {
        if (!isSendingRequest) {
          setShowCollabModalState(false, "");
        }
      }, 500);
      
    } else {
      updateCollabRequest(collabDataCached);
      setTimeout(() => {
        if (!isSendingRequest) {
          setShowCollabModalState(false, "");
          setShowCollabModalState(false, collabDataCached.id);
        }
      }, 500);
      
    }
    if (onCancel !== undefined) {
      onCancel();
    }
  };

  if (isSendingRequest) {
    return <Loader />
  }

  return (
    <div className="sendCollabRequestModal__modal">
      <div className="sendCollabRequestModal__container">
        <h2 className="f-20 text-center">{edit ? "Edit collab request" : "New collab request"}</h2>
        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">Add your theme.</p>
          <Input.TextArea
            disabled={!editable}
            showCount
            maxLength={50}
            value={collabDataCached.requestData?.collabTheme}
            onChange={(e) => {
              setCollabDataCached((prevState) => ({
                ...prevState,
                requestData: {
                  ...prevState.requestData,
                  collabTheme: e.target.value,
                },
              }));
            }}
          />
        </div>

        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">Add more details.</p>
          <Input.TextArea
            disabled={!editable}
            placeholder="Add details about your idea, social media platform you are hoping to post etc."
            showCount
            maxLength={200}
            value={collabDataCached.requestData?.message}
            onChange={(e) => {
              setCollabDataCached((prevState) => ({
                ...prevState,
                requestData: {
                  ...prevState.requestData,
                  message: e.target.value,
                },
              }));
            }}
          />
        </div>

        {/* Date should be allowed to be changed even for active collabs to allow collaborators to push date ahead if needed. */}
        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">Tentative completion date</p>
          <DatePicker
            clearIcon={null}
            disabledDate={(d) => d.isSameOrBefore(currentDate)}
            format="DD/MM/YYYY"
            value={moment(
              collabDataCached.collabDate
                ? collabDataCached.collabDate
                : tomorrow
            )}
            onChange={(e) => {
              setDateChanged(true);
              setCollabDataCached((prevState) => ({
                ...prevState,
                collabDate: e.toDate(),
              }));
            }}
          />
        </div>
        {editable || hasDateChanged ? (
          <div className="text-center">
          <div className="text-center twoButtonsSpacing">
            <Button
              disabled={
                collabDataCached.requestData.collabTheme.trim().length === 0
              }
              size="large"
              className="sendCollabRequestModal__button"
              loading={isSendingRequest}
              type="primary"
              onClick={sendCollabRequest}
            >
              Send
            </Button>
            <Button
              size="large"
              className="sendCollabRequestModal__button"
              onClick={() => {
                setShowCollabModalState(false, "");
              }}
            >
              Cancel
            </Button>
            </div>
            <p className="mt4">
              NOTE: If you marked yourself not ready for collabs, sending this
              request would change your preferences and mark you ready for
              collabs.
            </p>
          </div>
        ) : collabDetails.status === "PENDING" ? (
          <div className="sendCollabRequestModal__acceptRejectContainer">
            <Button
              size="large"
              className="collabDetailCard__acceptButton"
              disabled={isRejectingRequest}
              loading={isAcceptingRequest}
              onClick={() => {
                acceptCollabRequest(collabDetails.id);
                setShowCollabModalState(false, collabDetails.id);
              }}
            >
              Accept
            </Button>

            <Button
              size="large"
              className="collabDetailCard__rejectButton"
              disabled={isAcceptingRequest}
              loading={isRejectingRequest}
              onClick={() => {
                rejectCollabRequest(collabDetails.id);
                setShowCollabModalState(false, collabDetails.id);
              }}
            >
              Reject
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default connector(SendCollabRequestModal);
