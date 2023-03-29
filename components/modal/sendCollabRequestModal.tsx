import { Button, DatePicker, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "state";
import * as action from "../../state/action";
import { CollabRequestData, SendCollabRequest } from "types/model";

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
  setShowCollabModalState: (show: boolean) => 
    dispatch(action.setShowCollabModalState(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  onCancel: () => void;
  otherUser: string;
  collabDetails: CollabRequestData;
} & ConnectedProps<typeof connector>;

const SendCollabRequestModal = ({
  user,
  otherUser,
  collabDetails,
  isSendingRequest,
  isAcceptingRequest,
  isRejectingRequest,
  onCancel,
  updateCollabRequest,
  sendCollabRequestAction,
  acceptCollabRequest,
  rejectCollabRequest,
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
      // console.log("Rabbal collab data is ", data);
      sendCollabRequestAction(data);
    } else {
      updateCollabRequest(collabDataCached);
    }
    setShowCollabModalState(false);
  };

  return (
    <Modal
      closable
      onCancel={onCancel}
      className="sendCollabRequestModal__modal"
      visible={true}
      footer={null}
    >
      <div className="sendCollabRequestModal__container">
        <h2 className="f-20 text-center">Collab Request</h2>
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
          <p className="mb0">Add little more details.</p>
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

        <div className="sendCollabRequestModal__textAreaContainer">
          <p className="mb0">When do you want to post this collab?</p>
          <DatePicker
            disabled={!editable}
            clearIcon={null}
            disabledDate={(d) => d.isSameOrBefore(currentDate)}
            format="DD/MM/YYYY"
            value={moment(
              collabDataCached.collabDate
                ? collabDataCached.collabDate
                : tomorrow
            )}
            onChange={(e) => {
              setCollabDataCached((prevState) => ({
                ...prevState,
                collabDate: e.toDate(),
              }));
            }}
          />
        </div>
        {editable ? (
          <div className="text-center ">
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
            <p className="mt4">
              NOTE: If you marked yourself not ready for collabs, sending this request
              would change your preferences and mark you ready for collabs.
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
                setShowCollabModalState(false);
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
                setShowCollabModalState(false);
              }}
            >
              Reject
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default connector(SendCollabRequestModal);
